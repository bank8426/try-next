import { NextResponse } from "next/server";
import { jwtVerify, importJWK } from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  try {
    const token = request.cookies.get("token").value;
    const secretJWK = {
      kty: "oct", // key type
      k: process.env.JOSE_SECRET, // key value
    };

    const secretKey = await importJWK(secretJWK, "HS256");
    const { payload } = await jwtVerify(token, secretKey);

    if (payload.email != "bank") {
      throw new Error("Invalid user");
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("user", JSON.stringify({ email: payload.email }));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.log(error);

    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/manage/blog/:path*"],
};
