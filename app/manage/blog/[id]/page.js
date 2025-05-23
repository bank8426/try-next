"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

async function getBlogById(id) {
  console.log("asdasdasdasdasd");
  console.log(`${process.env.NEXT_PUBLIC_MOCKAPI_BASE_URL}/${id}`);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MOCKAPI_BASE_URL}/${id}`
    // { method: "GET" }
  );
  console.log("asdasdasdas");

  if (!response.ok) {
    throw new Error(`Cannot fetch blog data with id : ${id}`);
  }

  return response.json();
}

export default function ({ params }) {
  // let blog = await getBlogById(id);
  const [blogState, setBlogState] = useState({ name: "" });

  const initBlog = async () => {
    try {
      let { id } = await params;
      const blog = await getBlogById(id);
      console.log("blog");
      console.log(blog);
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
    console.log("Helloooooo");

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

      console.log("result");
      console.log(result);
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
