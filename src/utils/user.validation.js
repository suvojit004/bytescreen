const mongoose = require("mongoose");
const { z } = require("zod");

const createUserSchema = z.object({
  firstName: z.string().min(2),

  email: z
    .string()
    .email(),

  password: z
    .string()
    .min(8),

  role: z.enum([
    "super_admin",
    "admin",
    "editor",
  ]),
});
const userIdSchema = z.object({
  id: z.string().refine(
    (id) =>
      mongoose.Types.ObjectId.isValid(
        id
      ),
    {
      message:
        "Invalid user id",
    }
  ),
});


module.exports = {
  createUserSchema, userIdSchema
};