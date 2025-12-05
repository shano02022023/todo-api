import jwt from "jsonwebtoken";

export const AuthService = {
  async generateAuthToken(userCreds) {
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in .env");
    }
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in .env");
    }

    const token = jwt.sign(
      {
        id: userCreds.id,
        email: userCreds.email,
        name: userCreds.name,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return token;
  },
};
