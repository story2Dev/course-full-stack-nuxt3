const INSERT = gql`
  mutation insert_log_logs_one($object: log_logs_insert_input!) {
    log: insert_log_logs_one(object: $object) {
      id
      data
      createdAt: created_at
      title
      ip
      tag
      uuidId: uuid_id
      userId: user_id
      intId: int_id
    }
  }
`;

export type LogInput = {
  title: string;
  tag: string;
  uuid_id?: string;
  data?: any;
  int_id?: number;
};

export const useLog = () => {
  const { client } = useApolloClient();

  async function insertLog(log: LogInput) {
    try {
      const { sessionCookie } = useAuth();
      const userInfo: any = await $fetch("/api/ip", { method: "GET" });
      console.log({ userInfo });
      console.log(typeof userInfo)
      const { ip, user_agent } = userInfo;
      const { data, errors } = await client.mutate({
        mutation: INSERT,
        variables: {
          object: {
            ...log,
            user_id: sessionCookie.value?.user.id,
            ip,
            user_agent,
          },
        },
      });
      if (data) {
        return data;
      }
    } catch (error) {
      throw new Error(`[insertLog]: error: ${error}`);
    }
  }

  return {
    insertLog,
  };
};
