"use client";
import { Button } from "@/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Input } from "@/components/input";
import { config } from "@/constant/config";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const login = () => {
  const route = useRouter();
  const session = useSession();
  const accountFormSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .max(30, {
        message: "Name must not be longer than 30 characters.",
      }),
    password: z
      .string({
        required_error: "Please select a language.",
      })
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .max(30, {
        message: "Name must not be longer than 30 characters.",
      }),
  });

  type AccountFormValues = z.infer<typeof accountFormSchema>;

  const defaultValues: Partial<AccountFormValues> = {
    username: "",
    password: "",
  };

  const form = useForm({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: any) {
    signIn("credentials", data);
  }

  useEffect(() => {
    if(session?.status === 'authenticated'){
      route.push('/user')
    }
  }, [session?.status, route]);

  return (
    <div
      className={cn("grid gap-12 w-full h-screen justify-center items-center")}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Vui lòng nhập name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Vui lòng nhập password" {...field} type="password"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
export default login;
