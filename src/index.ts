import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";
console.log("Hello from sqltypeorm");

const photo = new Photo();
photo.name = "Me and Bears";
photo.description = "I am near polar bears";
photo.filename = "photo-with-bears.jpg";
photo.views = 1;
photo.isPublished = true;

// create a photo
const photo1 = new Photo();
photo1.name = "Sql portait.";
photo1.description = "A huge potrait of the SQL logo";
photo1.filename = "photo-sql-potrait.jpg";
photo1.views = 29;
photo1.isPublished = false;

// create a photo metadata
const metadata = new PhotoMetadata();
metadata.height = 640;
metadata.width = 480;
metadata.compressed = true;
metadata.comment = "cybershoot";
metadata.orientation = "portrait";
metadata.photo = photo1; // this way we connect them

async function main() {
  await AppDataSource.initialize();
  // await AppDataSource.manager.save(photo);
  // console.log("Photo has been saved. Photo id is", photo.id);

  // const savedPhotos = await AppDataSource.manager.find(Photo);
  // console.log("All photos from the db: ", savedPhotos);

  const photoRepository = AppDataSource.getRepository(Photo);
  const metadataRepository = AppDataSource.getRepository(PhotoMetadata);
  // await photoRepository.save(photo);
  // console.log("Photo has been saved!");

  /* query dB */
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

  /* updating dB */
  const photoToUpdate = await photoRepository.findOneBy({
    id: 15,
  });
  if (!photoToUpdate) return;
  photoToUpdate.name = "Me, my friends and polar bears";
  await photoRepository.save(photoToUpdate);

  /* delete from dB 
  const photoToRemove = await photoRepository.findOneBy({
    id: 17,
  });
  if (!photoToRemove) return;
  await photoRepository.remove(photoToRemove); */

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
