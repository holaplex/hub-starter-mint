// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import holaplex from "@/modules/holaplex";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { buffer } from "micro";
import { CreateCustomerWallet } from "@/mutations/customer.graphql";
import {
  AssetType,
  CreateCustomerWalletInput,
  CreateCustomerWalletPayload,
} from "@/graphql.types";
import db from "@/modules/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface CustomerWalletCreatedPayload {
  customer_id: string;
  treasury_id: string;
  project_id: string;
}

enum HolaplexWebhookEvent {
  CustomerTreasuryCreated = "customer_treasury.created",
}

interface CustomerWalletCreatedEvent {
  event_type: HolaplexWebhookEvent.CustomerTreasuryCreated;
  payload: CustomerWalletCreatedPayload;
}

type HolaplexWebhookEventResponse = CustomerWalletCreatedEvent;

interface CreateCustomerWalletData {
  createCustomerWallet: CreateCustomerWalletPayload;
}

interface CreateCustomerWalletVars {
  input: CreateCustomerWalletInput;
}

const secret = process.env.HOLAPLEX_WEBHOOK_SECRET as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const payload = (await buffer(req)).toString();
  const headers = req.headers as unknown as WebhookRequiredHeaders;

  const wh = new Webhook(secret);
  let msg;

  try {
    msg = wh.verify(payload, headers) as HolaplexWebhookEventResponse;
  } catch (err) {
    res.status(400).json({});
  }

  switch (msg?.event_type) {
    case HolaplexWebhookEvent.CustomerTreasuryCreated:
      const { data } = await holaplex.mutate<
        CreateCustomerWalletData,
        CreateCustomerWalletVars
      >({
        mutation: CreateCustomerWallet,
        variables: {
          input: {
            customer: msg?.payload.customer_id,
            assetType: process.env.HOLAPLEX_WALLET_ASSET_TYPE as AssetType,
          },
        },
      });

      await db.wallet.create({
        data: {
          holaplexCustomerId: msg?.payload.customer_id as string,
          address: data?.createCustomerWallet.wallet.address as string,
        },
      });
      break;
  }

  res.json({});
}
