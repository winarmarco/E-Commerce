import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { signUp, signIn, fetchUserRole } from "./user.services";

export const userRouter = createTRPCRouter({
  getUserRole: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;
    const role = await fetchUserRole({ id });
    return role;
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
    .mutation(async ({ input }) => {
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
    .mutation(async ({ input }) => {
      const { username, password } = input;
      const success = await signIn({ username, password });

      return success;
    }),
});
