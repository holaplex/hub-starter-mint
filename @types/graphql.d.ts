
declare module '*/customer.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const CreateCustomer: DocumentNode;
export const CreateCustomerWallet: DocumentNode;
export const GetCustomerWallet: DocumentNode;
export const GetCustomerTreasury: DocumentNode;
export const GetCustomerCollections: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/drop.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const MintNft: DocumentNode;
export const GetDrop: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/mint.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const MintDrop: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/collections.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetCollections: DocumentNode;

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

  export default defaultDocument;
}
    