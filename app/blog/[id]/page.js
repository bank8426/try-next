import Image from "next/image";

async function getBlogById(id) {
  const response = await fetch(
    `${process.env.MOCKAPI_BASE_URL}/${id}`
    // { method: "GET" }
  );
  console.log("asdasdasdas");

  if (!response.ok) {
    throw new Error(`Cannot fetch blog data with id : ${id}`);
  }

  return response.json();
}

export default async function ({ params }) {
  let { id } = await params;
  let blog = await getBlogById(id);

  console.log(blog);

  return (
    <div>
      <div>
        {blog.id}. {blog.name}
      </div>
      <div>Content : {blog.content}</div>

      <div>Author : {blog.author}</div>
      <div>Description : {blog.description}</div>
      <Image src={blog.imageUrl} height={100} width={100} alt="" />
    </div>
  );
}
