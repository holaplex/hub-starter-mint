import type { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";

dotenv.config();

const holaplexSchema = {
  [process.env.HOLAPLEX_API_ENDPOINT as string]: {
    headers: {
      Authorization: process.env.HOLAPLEX_AUTH_TOKEN as string,
    },
  },
};

const config: CodegenConfig = {
  overwrite: true,
  documents: ["**/*.graphql"],
  schema: [holaplexSchema, "./app.graphql"],
  generates: {
    "./@types/graphql.d.ts": {
      plugins: ["typescript-graphql-files-modules"],
    },
    "./src/graphql.types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
    "./holaplex.graphql": {
      schema: holaplexSchema,
      plugins: ["schema-ast"],
    },
  },
};
export default config;
