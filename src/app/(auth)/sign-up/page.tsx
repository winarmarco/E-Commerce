"use client";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import Link from "next/link";

const loginSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
});

const SignInPage = () => {
  const { mutate: signUp } = api.user.signup.useMutation({
    onError: (error) => {
      const {message: errMessage} = error;
      if (errMessage.includes("email")) {
        form.setError("email", {message: errMessage});
      } else if (errMessage.includes("username")) {
        form.setError("username", {message: errMessage});
      } else {
        form.setError("root", {message: errMessage});
      }
    },
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    signUp(values);
  };
  return (
    <div className="w-[500px]">
      <h1 className="mb-8 text-3xl font-semibold">SIGN UP</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-y-6 gap-x-4"
        >
          {form.formState.errors.root && (
          <p className="mb-4 col-span-2 text-sm font-medium text-destructive">
            {form.formState.errors.root.message}
          </p>
        )}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="jsmith@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-10 col-span-2">
            Submit
          </Button>
        </form>
      </Form>
      <p className="mt-8">
        Already have an account?{" "}
        <Link href="/sign-in" className="underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;
