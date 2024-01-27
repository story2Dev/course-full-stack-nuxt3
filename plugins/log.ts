export default defineNuxtPlugin(() => {
    return {
      provide: {
        log: {
            info: (msg: string) => {
              // conditionally log xxxx
              console.info(msg)
            },
            error: (msg: string) => console.error(msg),
            warn: (msg: string) => console.warn(msg),
        },
      },
    };
  });
  