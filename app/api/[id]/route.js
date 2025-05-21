export async function GET(request, { params }) {
  console.log("Asdasdas");
  let { id } = await params;

  console.log("---------");

  // console.log(request);

  return Response.json({ text: "Hello", id });
}
