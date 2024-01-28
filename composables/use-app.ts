interface KeyValue {
  [key: string]: any;
}

const SETTING_QUERY = gql`
  query settings {
    settings {
      key
      current
    }
  }
`;

export const useApp = () => {
  const search = useState("app-search", () => "");
  const limit = 10;
  const formatDate = "dd/MM/yyyy";
  const formatTime = "hh:ss";
  const formatDateTime = `${formatDate} ${formatTime}`;
  const setting = useState<KeyValue>("app-setting", () => {
    return {
      formatDate,
      formatTime,
      formatDateTime,
    };
  });

  const { client } = useApolloClient();

  async function loadSetting() {
    const { data, errors } = await client.query({ query: SETTING_QUERY });
    console.log({ data, errors });
    if (data) {
      const { settings } = data;
      for (const { key, current } of settings) {
        setting.value[key] = current;
      }
      console.log(setting.value);
    }
  }

  return {
    search,
    limit,
    formatDate,
    formatTime,
    formatDateTime,
    setting,
    loadSetting,
  };
};
