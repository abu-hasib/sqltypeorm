"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Photo_1 = require("./entity/Photo");
const PhotoMetadata_1 = require("./entity/PhotoMetadata");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "test",
    database: "macbookpro",
    synchronize: true,
    logging: true,
    entities: [Photo_1.Photo, PhotoMetadata_1.PhotoMetadata],
    subscribers: [],
    migrations: [],
});
//# sourceMappingURL=data-source.js.map