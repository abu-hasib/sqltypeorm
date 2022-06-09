"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("./data-source");
const Photo_1 = require("./entity/Photo");
const PhotoMetadata_1 = require("./entity/PhotoMetadata");
console.log("Hello from sqltypeorm");
const photo = new Photo_1.Photo();
photo.name = "Me and Bears";
photo.description = "I am near polar bears";
photo.filename = "photo-with-bears.jpg";
photo.views = 1;
photo.isPublished = true;
const photo1 = new Photo_1.Photo();
photo1.name = "Sql portait.";
photo1.description = "A huge potrait of the SQL logo";
photo1.filename = "photo-sql-potrait.jpg";
photo1.views = 29;
photo1.isPublished = false;
const metadata = new PhotoMetadata_1.PhotoMetadata();
metadata.height = 640;
metadata.width = 480;
metadata.compressed = true;
metadata.comment = "cybershoot";
metadata.orientation = "portrait";
metadata.photo = photo1;
async function main() {
    await data_source_1.AppDataSource.initialize();
    const photoRepository = data_source_1.AppDataSource.getRepository(Photo_1.Photo);
    const metadataRepository = data_source_1.AppDataSource.getRepository(PhotoMetadata_1.PhotoMetadata);
    const all = await photoRepository.find();
    console.log("All photos from the db: ", all);
    const firstPhoto = await photoRepository.findOneBy({ id: 15 });
    console.log("@@: ", firstPhoto);
    const meAndBearsPhoto = await photoRepository.findOneBy({
        name: "Me and Bears",
    });
    console.log("Me and Bears photo from the db: ", meAndBearsPhoto);
    const allViewedPhotos = await photoRepository.findBy({ views: 1 });
    console.log("All viewed photos: ", allViewedPhotos);
    const allPublishedPhotos = await photoRepository.findBy({
        isPublished: true,
    });
    console.log("All published photos: ", allPublishedPhotos);
    const [photos, photosCount] = await photoRepository.findAndCount();
    console.log("All photos: ", photos);
    console.log("Photos count: ", photosCount);
    const photoToUpdate = await photoRepository.findOneBy({
        id: 15,
    });
    if (!photoToUpdate)
        return;
    photoToUpdate.name = "Me, my friends and polar bears";
    await photoRepository.save(photoToUpdate);
    await photoRepository.save(photo1);
    await metadataRepository.save(metadata);
    const relatedPhotos = await photoRepository.find({
        relations: {
            metadata: true,
        },
    });
    console.log("###: ", relatedPhotos);
}
main();
//# sourceMappingURL=index.js.map