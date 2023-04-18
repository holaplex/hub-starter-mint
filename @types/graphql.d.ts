
declare module '*/customer.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const CreateCustomer: DocumentNode;
export const CreateCustomerWallet: DocumentNode;
export const GetCustomerWallet: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/drop.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const MintNft: DocumentNode;
export const GetDrops: DocumentNode;
export const GetDrop: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/key.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const ForgeKey: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/me.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetMe: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/project.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetProjectDrop: DocumentNode;
export const GetProjectDrops: DocumentNode;

  export default defaultDocument;
}
    