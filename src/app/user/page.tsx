"use client";

import { Button } from "@/components/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const User = () => {
  const route = useRouter();
  const logout = () => {
    signOut();
    console.info('logout')
    route.push("/login");
  };
  return (
    <>
      <p>User</p>
      <Button onClick={logout}>Logout</Button>
    </>
  );
};
export default User;
