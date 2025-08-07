import Link from "next/link";

async function getBlogs() {
  const response = await fetch(process.env.MOCKAPI_BASE_URL);

  if (!response.ok) {
    throw new Error("Cannot fetcg blogs data");
  }

  return response.json();
}

export default async function () {
  const blogs = await getBlogs();

  return (
    <>
      Blog list
      {blogs.map((blog, index) => {
        return (
          <div key={`blog-${index}`}>
            <div>
              {blog.id}. {blog.name}
            </div>

            <Link href={`/blog/${blog.id}`}>
              <button className="px-4 bg-blue-400">Read more</button>
            </Link>
          </div>
        );
      })}
    </>
  );
}
