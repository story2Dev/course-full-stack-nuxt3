import { KEY_TOKEN } from "./constants";

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
    '@nuxtjs/tailwindcss', '@bg-dev/nuxt-naiveui','@nuxtjs/apollo', 'nuxt-icon'
  ],
  tailwindcss: {
    exposeConfig: true
  },
  runtimeConfig: {
    public: {
      authApi: process.env.NHOST_AUTH_URL,
      uploadUrl: process.env.NHOST_STORAGE_URL,
    }
  },

  apollo: {
    autoImports: true,
    clients: {
      default: {
        httpEndpoint: process.env.NHOST_GRAPHQL_URL +'',
        browserHttpEndpoint: '',
        wsEndpoint: '',
        httpLinkOptions: {},
        wsLinkOptions: {},
        websocketsOnly: false,
        connectToDevTools: false,
        defaultOptions: {},
        inMemoryCacheOptions: {},
        tokenName: KEY_TOKEN,
        tokenStorage: 'cookie',
        authType: 'Bearer',
        authHeader: 'Authorization'
      },
    }
  }
});
