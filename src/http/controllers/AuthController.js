import { db } from "../../config/sql.js";
import { AuthService } from "../services/authService.js";
import bcrypt from "bcryptjs";

export const AuthController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const hashed = await bcrypt.hash(password, 10);

      const [updateRes] = await db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashed]
      );

      const [result] = await db.query(
        "SELECT * FROM users WHERE id = ?",
        updateRes.insertId
      );

      if (result === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = result[0];

      const token = await AuthService.generateAuthToken({
        id: user?.id,
        name: user?.name,
        email: user?.email,
      });

      return res.status(201).json({
        message: "User registered successfully!",
        token,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong." });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);

      if (rows.length === 0) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      const user = rows[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = await AuthService.generateAuthToken({
        id: user?.id,
        email: user?.email,
        name: user?.name,
      });

      return res.json({
        message: `Welcome ${user?.name}!`,
        token,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong." });
    }
  },
};
