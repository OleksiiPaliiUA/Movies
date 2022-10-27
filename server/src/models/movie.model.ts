import { UUID, ARRAY, STRING, INTEGER, literal } from 'sequelize';
import db from '../db/connect.db';

export default db.define(
  'movies',
  {
    uuid: {
      type: UUID,
      primaryKey: true,
      defaultValue: literal('uuid_generate_v4()'),
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    time: {
      type: ARRAY(STRING),
      allowNull: false,
    },
    rating: {
      type: INTEGER,
      allowNull: true,
    },
  },
  { timestamps: false },
);
