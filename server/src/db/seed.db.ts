import * as dotenv from 'dotenv';
dotenv.config();
import * as fs from 'fs';
import db from './connect.db';

if (process.env.NODE_ENV !== 'production') {
  const seedQuery = fs.readFileSync('src/db/seed.db.query.sql', {
    encoding: 'utf8',
  });
  db.query(seedQuery).then(() => {
    console.log('Seeding completed!\nDefault password for users: 233');
  });
}
