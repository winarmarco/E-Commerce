import {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
} from "./user.repository";
import { validatePassword } from "./utils";

export const fetchUserRole = async ({ id }: { id: string }) => {
  const user = await fetchUser({ id });

  return user.role;
};

export const fetchUser = async ({ id }: { id: string }) => {
  const user = await getUserById({ id });

  if (!user) throw Error("User not found!");

  return user;
};

export const signIn = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const user = await getUserByUsername({ username });

  if (!user) throw new Error("User not found!");

  const { password: hashedPassword, salt } = user;

  const validateUser = validatePassword(password, hashedPassword, salt);

  if (!validateUser) throw new Error("Password is wrong!");

  return {
    success: true,
    user: {
      id: user.id,
      username: user.username,
    },
  };
};

export const signUp = async ({
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
  const userWithEmail = await getUserByEmail({ email });
  if (userWithEmail) throw new Error("User with that email has been taken");

  const userWithUsername = await getUserByUsername({ username });
  if (userWithUsername)
    throw new Error("User with that username has been taken");

  const newUser = await createUser({
    firstName,
    lastName,
    username,
    password,
    email,
  });

  if (!newUser) throw new Error("Failed creting user!");

  return newUser;
};
