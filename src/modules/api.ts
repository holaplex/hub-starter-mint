import { InMemoryCache } from "@apollo/client";
import { ApolloClient } from "@apollo/client";

const api = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache({}),
})

export default api;