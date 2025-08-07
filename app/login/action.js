"use server";
import { SignJWT, importJWK } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState, formData) {
  let email = formData.get("email");
  let password = formData.get("password");

  const secretJWK = {
    kty: "oct",
    k: process.env.JOSE_SECRET,
  };

  if (email != "bank" || password != "1234")
    return { message: "Invalid username or password" };

  const secretKey = await importJWK(secretJWK, "HS256");
  const token = await new SignJWT({ email })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secretKey);

  cookies().set("token", token);

  redirect("/manage/blog");
}
