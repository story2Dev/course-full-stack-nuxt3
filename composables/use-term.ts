import { TERMS_QUERY } from "~/gql/query";
import type { GqlVariables, Term } from "~/types";

export const useTerm = () => {
  const { client } = useApolloClient();
  // get for many terms
  async function getTerms(variables?: Partial<GqlVariables>) {
    const { data, errors } = await client.query({ query: TERMS_QUERY });
    if(errors) {
      throw new Error(`[useTerm] getTerms: errors: ${errors}`)
    }

    const items: Term[] = data?.terms || [];
    return {
        items,
        errors
    }
  }

  // get by pk
  async function getTerm(id: number) {}

  async function insert(input: Partial<Term>) {}

  async function update(id: number, input: Partial<Term>) {}

  async function remove(id: number) {}

  return {
    getTerms,
    getTerm,
    insert,
    update,
    remove,
  }
};
