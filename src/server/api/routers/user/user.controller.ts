import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { signUp, signIn } from "./user.services";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  signup: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        username: z.string(),
        password: z.string(),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { firstName, lastName, username, password, email } = input;
      const newUser = await signUp({
        firstName,
        lastName,
        username,
        password,
        email,
      });

      return newUser;
    }),

  signIn: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { username, password } = input;
      const success = await signIn({ username, password });

      return success;
    }),
});
