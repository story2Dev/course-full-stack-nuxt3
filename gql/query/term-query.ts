export const TERMS_QUERY = gql`
  query terms (
    $where: terms_bool_exp
    $limit: Int
    $offset: Int
    $orderBy: [terms_order_by!]
  ){
    terms(
        where: $where
        limit: $limit
        offset: $offset
        order_by: $orderBy
    ) {
      id
      name
      parentId: parent_id
      groupId: group_id
      createdAt: created_at
      updatedAt: updated_at
    }
    aggregate: terms_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
