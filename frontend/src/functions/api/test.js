export async function onRequest(context) {
  return new Response(`MY_SECRET = ${context.env.MY_SECRET || "not found"}`);
}
