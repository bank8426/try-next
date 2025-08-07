"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

async function getBlogById(id) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MOCKAPI_BASE_URL}/${id}`
  );

  if (!response.ok) {
    throw new Error(`Cannot fetch blog data with id : ${id}`);
  }

  return response.json();
}

export default function ({ params }) {
  const [blogState, setBlogState] = useState({ name: "" });
  const router = useRouter();

  const initBlog = async () => {
    try {
      let { id } = await params;
      const blog = await getBlogById(id);
      setBlogState(blog);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initBlog();
  }, []);

  const handleChangeBlogName = (event) => {
    setBlogState((prevState) => ({
      ...prevState,
      name: event.target.value,
    }));
  };

  const handleSubmitEditBlogName = async (event) => {
    event.preventDefault();

    try {
      let result = await fetch(
        `${process.env.NEXT_PUBLIC_MOCKAPI_BASE_URL}/${blogState.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogState),
        }
      );

      if (!result.ok) {
        throw new Error(`Cannot update blog data with id : ${blogState.id}`);
      }

      alert("Update blog name successfully");

      router.push("/manage/blog");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link
        className="bg-green-800"
        href="/manage/blog"
      >{`< Back to manage page`}</Link>
      {blogState && (
        <>
          <div>{blogState.id}.</div>
          <div>
            <form onSubmit={handleSubmitEditBlogName}>
              Name :{" "}
              <input
                onChange={handleChangeBlogName}
                name="name"
                type="text"
                value={blogState.name}
                className="border-2 bg-gray-900"
              />
              <button className="px-4 bg-blue-400">Update</button>
            </form>
          </div>
          <div>Content : {blogState.content}</div>

          <div>Author : {blogState.author}</div>
          <div>Description : {blogState.description}</div>
          <Image src={blogState.imageUrl} height={100} width={100} alt="" />
        </>
      )}
    </div>
  );
}
