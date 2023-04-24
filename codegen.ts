import type { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";

dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  documents: ["**/*.graphql"],
  schema: [
    {
      [process.env.HOLAPLEX_API_ENDPOINT as string]: {
        headers: {
          Authorization: process.env.HOLAPLEX_AUTH_TOKEN as string,
        },
      },
    },
    "./schema.graphql",
  ],
  generates: {
    "./holaplex.graphql": {
      schema: {
        [process.env.HOLAPLEX_API_ENDPOINT as string]: {
          headers: {
            Authorization: process.env.HOLAPLEX_AUTH_TOKEN as string,
          },
        },
      },
      plugins: ["schema-ast"],
    },
    "./@types/graphql.d.ts": {
      plugins: ["typescript-graphql-files-modules"],
    },
    "./src/graphql.types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};
export default config;
