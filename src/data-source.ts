import { DataSource } from "typeorm";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "test",
  database: "macbookpro",
  synchronize: true,
  logging: true,
  entities: [Photo, PhotoMetadata],
  subscribers: [],
  migrations: [],
});
