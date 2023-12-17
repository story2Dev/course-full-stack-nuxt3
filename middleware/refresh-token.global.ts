export default defineNuxtRouteMiddleware((to, from) => {
   useAuth().refreshToken()
})