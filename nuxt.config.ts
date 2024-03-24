import { KEY_TOKEN } from "./constants";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // nitro: {
  //   preset: "netlify",
  // },
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
    pageTransition: { name: 'slide-left', mode: 'out-in' },
  },
  css:['~/assets/css/style.css'],
  modules: [
    '@nuxtjs/tailwindcss', '@bg-dev/nuxt-naiveui','@nuxtjs/apollo', 'nuxt-icon',
    '@nuxt/test-utils/module', '@nuxtjs/i18n',
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
        wsEndpoint: `wss://hsdqwvptbexpgufmcoyb.graphql.ap-southeast-1.nhost.run/v1`,
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
  },
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en-US.json'
      },
      {
        code: 'lo',
        name: 'Lao',
        file: 'lo-LA.json'
      },
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'lo',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root' // recommended
    }
  }
});
