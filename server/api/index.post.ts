export default defineEventHandler(async (event) => {
    const discordUsername = 'App Error Handler';
    const discordApi = process.env.DISCORD_WEB_HOOK_URL;
    const body = await readBody(event);
    if (body?.message) {
      $fetch(discordApi+'', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: body.message,
          username: discordUsername,
        }),
      });
      return 'success';
    }
    return 'fail';
  });