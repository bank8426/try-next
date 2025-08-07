export async function GET(request, { params }) {
  let { id } = await params;

  return Response.json({ text: "Hello", id });
}
