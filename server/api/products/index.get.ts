export default defineEventHandler(async (event) => {
  const products = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  ).then((res) => res.json());
  return {
    status: 200,
    body: {
      products,
      message: "Hello from products get",
    },
  };
});
