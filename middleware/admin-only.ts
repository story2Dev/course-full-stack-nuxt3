export default defineNuxtRouteMiddleware((to, from) => {
    const { isAdmin } = useAuth();
    if(!isAdmin.value) {
        // go back
        return navigateTo('/')
    }
  });