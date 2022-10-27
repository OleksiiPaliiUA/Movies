DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "movies" ("uuid" UUID DEFAULT uuid_generate_v4() , "name" VARCHAR(255) NOT NULL, "time" VARCHAR(255)[] NOT NULL, "rating" INTEGER, PRIMARY KEY ("uuid"));
CREATE TABLE "users" ("uuid" UUID DEFAULT uuid_generate_v4() , "fullName" VARCHAR(255) NOT NULL, "email" VARCHAR(255) NOT NULL UNIQUE, "password" VARCHAR(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("uuid"));

INSERT INTO "movies" ("uuid","name","time","rating") VALUES (uuid_generate_v4(),'Spider-man', ARRAY['15:30', '16:30'], 5);
INSERT INTO "movies" ("uuid","name","time","rating") VALUES (uuid_generate_v4(),'Cab', ARRAY['15:30', '20:30'], 6);
INSERT INTO "movies" ("uuid","name","time","rating") VALUES (uuid_generate_v4(),'Train 2', ARRAY['11:30', '16:30'], 7);
INSERT INTO "movies" ("uuid","name","time","rating") VALUES (uuid_generate_v4(),'Bullet Train', ARRAY['12:30', '16:30'], NULL);
INSERT INTO "movies" ("uuid","name","time","rating") VALUES (uuid_generate_v4(),'House of Dragons', ARRAY['12:30', '13:30'], NULL);

INSERT INTO "users" ("uuid","fullName","email","password","createdAt","updatedAt") VALUES (uuid_generate_v4(),'Tom Hanks', 'tom@tom.com', '$2b$12$XTPK1W1WuE/0vSl4AP/D0uQ9shjUeGWw/VXKCf5PslhfPHvtc3X3C','2022-10-27 14:11:01.344+03', '2022-10-27 14:11:01.344+03');
INSERT INTO "users" ("uuid","fullName","email","password","createdAt","updatedAt") VALUES (uuid_generate_v4(),'Jeffrey Stone', 'jeff@gmail.com', '$2b$12$XTPK1W1WuE/0vSl4AP/D0uQ9shjUeGWw/VXKCf5PslhfPHvtc3X3C','2022-10-27 14:11:01.344+03', '2022-10-27 14:11:01.344+03');
INSERT INTO "users" ("uuid","fullName","email","password","createdAt","updatedAt") VALUES (uuid_generate_v4(),'Richard Smith', 'rickos@hot.com', '$2b$12$XTPK1W1WuE/0vSl4AP/D0uQ9shjUeGWw/VXKCf5PslhfPHvtc3X3C','2022-10-27 14:11:01.344+03', '2022-10-27 14:11:01.344+03');
