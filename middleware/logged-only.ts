export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuth, sessionCookie } = useAuth();
  console.log(to.meta)
  console.log(sessionCookie.value?.user?.defaultRole)
  if(!isAuth.value) return navigateTo('/login')
});
