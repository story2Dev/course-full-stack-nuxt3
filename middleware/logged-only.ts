export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuth } = useAuth();
  if(!isAuth.value) return navigateTo('/login')
});
