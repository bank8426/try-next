import { headers } from "next/headers";
import Link from "next/link";

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
  const blogs = await getBlogs();
  const headerRequest = await headers();
  const user = JSON.parse(headerRequest.get("user"));

  return (
    <div>
      Hello {user.email}
      <div>Manage Blogs</div>
      {blogs.map((blog, index) => {
        return (
          <div key={`blog-${index}`}>
            <div>
              {blog.id}. {blog.name}
            </div>

            <Link href={`/manage/blog/${blog.id}`}>
              <button className="px-4 bg-blue-400">Edit</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
