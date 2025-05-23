"use client";
import { useActionState } from "react";
import { login } from "./action";

export default function () {
  const initState = { message: "" };
  const [state, formAction] = useActionState(login, initState);
  return (
    <form action={formAction}>
      <div>
        Email :
        <input type="text" name="email" />
      </div>
      <div>
        Password :
        <input type="password" name="password" />
      </div>
      <div>Message : {state.message}</div>
      <button className="px-4 bg-blue-400">Login</button>
    </form>
  );
}
