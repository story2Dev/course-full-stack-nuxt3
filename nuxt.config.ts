// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: "netlify",
  },
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "https://em-content.zobj.net/source/microsoft-teams/363/disguised-face_1f978.png",
        },
      ],
    },
  },
  modules: [
    '@nuxtjs/tailwindcss', '@bg-dev/nuxt-naiveui'
  ],
  tailwindcss: {
    exposeConfig: true
  },
  runtimeConfig: {
    public: {
      authApi: process.env.NHOST_AUTH_URL,
    }
  }
});
