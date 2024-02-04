export default defineEventHandler(async (event) => {
  return {
    status: 200,
    body: {
      message: "hello",
    },
  };
});
