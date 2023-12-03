export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
      // handle error, e.g. report to a service
    }
    // Also possible
    nuxtApp.hook('vue:error', (error, instance, info) => {
      // handle error, e.g. report to a service
      if (process.env.NODE_ENV === 'development') {
        console.error(error)
        return
      }
      $fetch('/api', {
        method: 'POST',
        body: {
            message: error?.message,
        }
      })
    })
  })