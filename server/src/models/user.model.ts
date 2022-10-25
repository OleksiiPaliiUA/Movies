import { UUID, STRING, literal } from "sequelize";
import db from "../db";

export default db.define(
  "users",
  {
    uuid: {
      type: UUID,
      primaryKey: true,
      defaultValue: literal("uuid_generate_v4()"),
    },
    fullName: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    refreshToken: {
      type: STRING,
      allowNull: true,
    },
  },
  { timestamps: true }
);
