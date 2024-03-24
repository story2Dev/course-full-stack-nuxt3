export default defineEventHandler(async (event) => {
  const QUERY = `
        query {
            todo{
                id
                task
                status
            }
        }
    `;
  const req = await $fetch(process.env.NHOST_GRAPHQL_URL + "", {
    method: "POST",
    body: {
      query: QUERY,
    },
  });
  
  return {
    message: "Todos",
    status: 200,
    data: req
  };
});
