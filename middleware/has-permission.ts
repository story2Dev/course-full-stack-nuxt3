export default defineNuxtRouteMiddleware((_to, from) => {
  const { isAuth, sessionCookie } = useAuth();
  const permissions = _to?.meta?.permissions as string[];
  const { defaultRole } = sessionCookie.value?.user;
  if (!permissions.includes(defaultRole))
    return navigateTo("/403");
});
