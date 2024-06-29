import { db } from "@/server/db";
import crypto from "crypto";
import { hashPassword } from "./utils";

export const getUserByEmail = async ({ email }: { email: string }) => {
  const user = await db.user.findFirst({
    where: { email },
  });

  return user;
};

export const getUserByUsername = async ({ username }: { username: string }) => {
  const user = await db.user.findFirst({
    where: { username },
  });

  return user;
};

export const getUserById = async ({ id }: { id: string }) => {
  const user = await db.user.findFirst({
    where: { id },
  });

  if (!user) throw new Error(`User with id ${id} not found`);

  return user;
};

export const createUser = async ({
  firstName,
  lastName,
  username,
  password,
  email,
}: {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}) => {
  const newUser = await db.$transaction(async (prisma) => {
    const cart = await prisma.cart.create({
      data: {},
    });
    const { salt, genHash } = hashPassword(password);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        password: genHash,
        email,
        salt,
        cartId: cart.id,
      },
    });

    return user;
  });

  return newUser;
};
