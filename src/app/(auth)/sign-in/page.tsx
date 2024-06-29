"use client";
import React from "react";
import * as z from "zod";

import { type User } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { db } from "@/server/db";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(5),
});

const SignInPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    // console.log(values);
    const { username, password } = values;
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (!res) return form.setError("root", { message: "Failed Signing in" });

    if (res.ok) {
      return router.push("/");
    }

    if (res.error) {
      form.setError("root", { message: "Credentials not found" });
    }
  };

  return (
    <div className="w-[500px]">
      <h1 className="mb-8 text-3xl font-semibold">LOGIN</h1>
      <Form {...form}>
        {form.formState.errors.root && (
          <p className="mb-4 text-sm font-medium text-destructive">
            {form.formState.errors.root.message}
          </p>
        )}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
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
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-10">
            Submit
          </Button>
        </form>
      </Form>
      <p className="mt-8">Don't have an account? <Link href="/sign-up" className="underline">Sign up</Link></p>
    </div>
  );
};

export default SignInPage;
