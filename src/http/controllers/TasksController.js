import { db } from "../../config/sql.js";

export const TaskController = {
  async tasks(req, res) {
    try {
      const userId = req.auth.id;
      const { isCompleted } = req.query;

      let sql = "SELECT * FROM tasks WHERE userId = ?";
      const params = [userId];

      if (isCompleted !== undefined) {
        sql += " AND isCompleted = ?";
        params.push(isCompleted === "true" ? 1 : 0);
      }

      sql += " ORDER BY id DESC";

      const [tasks] = await db.query(sql, params);

      return res.status(200).json(tasks);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong." });
    }
  },

  async view(req, res) {
    try {
      const [result] = await db.query(
        "SELECT * FROM tasks WHERE userId = ? AND id = ?",
        [req.auth.id, req.params.id]
      );

      if (result.length === 0) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      const task = result[0];

      return res.status(200).json({
        task: task,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong." });
    }
  },

  async create(req, res) {
    try {
      const { title, description } = req.body;

      const [result] = await db.query(
        "INSERT INTO tasks (title, description, isCompleted, userId) VALUES (?, ?, ?, ?)",
        [title, description, false, req.auth.id]
      );

      return res.status(200).json({
        message: "Tasks created sucessfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong." });
    }
  },

  async markAsCompleted(req, res) {
    try {
      const [result] = await db.query(
        "SELECT * FROM tasks WHERE userId = ? AND id = ?",
        [req.auth.id, req.params.id]
      );

      if (result.length === 0) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      const task = result[0];

      if (task.isCompleted) {
        return res.status(422).json({
          message: "Cannot update tasks status its already completed.",
        });
      }

      await db.query(
        "UPDATE tasks SET isCompleted = ?, updatedAt = ? WHERE id = ? AND userId = ?",
        [true, new Date(), req.params.id, req.auth.id]
      );

      return res.status(200).json({
        message: "Tasks marked as completed successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong." });
    }
  },

  async deleteTask(req, res) {
    try {
      const [result] = await db.query(
        "SELECT * FROM tasks WHERE userId = ? AND id = ?",
        [req.auth.id, req.params.id]
      );

      if (result.length === 0) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      await db.query("DELETE FROM tasks WHERE id = ? AND userId = ?", [
        req.params.id,
        req.auth.id,
      ]);

      return res.status(200).json({
        message: "Tasks deleted",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong." });
    }
  },
};
