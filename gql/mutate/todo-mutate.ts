export const INSERT_TODO = gql`
  mutation insert_todo_one($object: todo_insert_input!) {
    todo: insert_todo_one(object: $object) {
      id
      task
    }
  }
`;

export const DELETE_TODO = gql`
  mutation ($id: Int!) {
    delete_todo_by_pk(id: $id) {
      id
      task
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation ($id: Int!, $set: todo_set_input) {
    todo: update_todo_by_pk(pk_columns: { id: $id }, _set: $set) {
      id
      task
    }
  }
`;
