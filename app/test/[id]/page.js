export default async function Page({ params }) {
  const { id } = await params;
  return <h1>Hello, Blog Post Page! with id : {id}</h1>;
}
