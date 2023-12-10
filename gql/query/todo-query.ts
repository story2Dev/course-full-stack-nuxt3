export const TODO_QUERY = gql`
  query todo(
    $limit: Int
    $offset: Int
    $orderBy: [todo_order_by!]
    $where: todo_bool_exp
  ) {
    todos: todo(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      task
    }
  }
`;
