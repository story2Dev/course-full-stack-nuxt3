import { NhostClient } from "@nhost/nhost-js";

export const useNhost = () => {
  const nhost = new NhostClient({
    authUrl: "https://hsdqwvptbexpgufmcoyb.auth.ap-southeast-1.nhost.run/v1",
    storageUrl:
      "https://hsdqwvptbexpgufmcoyb.storage.ap-southeast-1.nhost.run/v1",
    graphqlUrl:
      "https://hsdqwvptbexpgufmcoyb.graphql.ap-southeast-1.nhost.run/v1",
    functionsUrl:
      "https://hsdqwvptbexpgufmcoyb.functions.ap-southeast-1.nhost.run/v1",
  });

  const auth = useAuth();

  nhost.auth.onTokenChanged((res) => {
    console.log("onTokenChanged", res);
    if (res) {
      auth.setAuth(res);
    }
  });

  nhost.auth.onAuthStateChanged((res, session) => {
    console.log("onAuthStateChanged", res, session);

    if (session) {
      auth.setAuth(session);
    }
  });

  return {
    nhost,
  };
};
