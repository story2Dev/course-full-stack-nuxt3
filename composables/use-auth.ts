import { KEY_SESSION, KEY_TOKEN } from "~/constants";

export const useAuth = () => {
  const config = useRuntimeConfig();
  const sessionCookie = useCookie<any>(KEY_SESSION);
  const tokenData = useCookie<string>(KEY_TOKEN);

  const isAdmin = computed(
    () => sessionCookie.value?.user?.defaultRole === "admin"
  );
  const isAuth = computed(() => !!sessionCookie.value);

  const user = computed(() => sessionCookie.value?.user || null);

  function setAuth(_session: any) {
    tokenData.value = _session.accessToken;
    sessionCookie.value = {
      ..._session,
      accessTokenExpiresIn: Date.now() + _session.accessTokenExpiresIn * 1000,
    };
  }

  async function signIn(email: string, password: string) {
    try {
      const req: any = await $fetch(
        config.public.authApi + "/signin/email-password",
        {
          method: "POST",
          body: {
            email,
            password,
          },
        }
      );
      const { session } = req;
      setAuth(session);
      return true;
    } catch (error) {
      return false;
    }
  }

  async function refreshToken() {
    try {
      const { accessTokenExpiresIn, refreshToken } = sessionCookie.value || {}
      if (!refreshToken || !accessTokenExpiresIn) return;
      if (accessTokenExpiresIn - 300 > Date.now()) return;
      const res = await $fetch(config.public.authApi + "/token", {
        method: "POST",
        body: {
          refreshToken,
        },
      });
      setAuth(res);
    } catch (error) {
      throw new Error(`[useAuth] refreshToken: error: ${error}`);
    }
  }

  async function logOut() {
    try {
      const { refreshToken } = sessionCookie.value;
      sessionCookie.value = null;
      tokenData.value = "";
      const req: any = await $fetch(config.public.authApi + "/signout", {
        method: "POST",
        body: { all: true, refreshToken },
      });
      navigateTo("/login");
    } catch (error) {
      navigateTo("/login");
    }
  }

  return {
    signIn,
    refreshToken,
    isAdmin,
    isAuth,
    sessionCookie,
    user,
    logOut,
    setAuth
  };
};
