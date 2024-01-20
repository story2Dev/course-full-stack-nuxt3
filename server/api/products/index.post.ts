export default defineEventHandler(async (event) => {
  const body = await readBody(event);
    return {
      status: 200,
      body: {
        data: body,
        message: 'Add product',
      },
    }
  });