import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if(!body.password) {
    return ''
  }

  const saltRounds = 10
  const hash = await bcrypt.hash(body.password, saltRounds);
  return hash;
});
