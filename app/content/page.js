import Image from "next/image";

async function getBlogs() {
  const response = await fetch(
    process.env.MOCKAPI_BASE_URL
    // { method: "GET" }
  );
  console.log("asdasdasdas");

  if (!response.ok) {
    throw new Error("Cannot fetcg blogs data");
  }

  return response.json();
}

export default async function () {
  // userEffect
  const blogs = await getBlogs();
  console.log(blogs);
  // console.log(result.body.json());

  return (
    <>
      {blogs.map((blog, index) => {
        return (
          <div key={`blog-${index}`}>
            <div>{blog.id}</div>
            <div>{blog.name}</div>
            <div>{blog.content}</div>
            <Image
              src={blog.imageUrl}
              height={50}
              width={50}
              alt="Picture of the author"
            />
            <div>{blog.author}</div>
            <div>{blog.description}</div>
            ------------------------
          </div>
        );
      })}
    </>
  );
}
