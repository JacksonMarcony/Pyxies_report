import { sign } from "jsonwebtoken";

export const generateToken = (email: string, id: number) => {
  const token = sign(
    {
      subject: email,
    },
    process.env.JWT_TOKEN,
    {
      expiresIn: "30min",
      subject: String(id),
    }
  );

  return token;
};
