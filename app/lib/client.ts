import { GraphQLClient } from "graphql-request";
import { queryOptions } from "@tanstack/react-query";
import {
  GetCharacterDocument,
  SearchCharactersDocument,
} from "~/generated/graphql";
import type {
  GetCharacterQuery,
  GetCharacterQueryVariables,
  SearchCharactersQuery,
  SearchCharactersQueryVariables,
} from "~/generated/graphql";

const API_URL = "https://rickandmortyapi.com/graphql";

const client = new GraphQLClient(API_URL);

export const Client = {
  search(variables: SearchCharactersQueryVariables) {
    return queryOptions({
      queryKey: ["search", variables],
      queryFn: () =>
        client.request<SearchCharactersQuery, SearchCharactersQueryVariables>(
          SearchCharactersDocument,
          variables
        ),
    });
  },
  getCharacter(variables: GetCharacterQueryVariables) {
    return queryOptions({
      queryKey: ["character", variables.id],
      queryFn: () =>
        client.request<GetCharacterQuery, GetCharacterQueryVariables>(
          GetCharacterDocument,
          variables
        ),
    });
  },
};
