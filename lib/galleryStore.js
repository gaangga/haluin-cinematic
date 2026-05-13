import fs from "fs/promises";
import path from "path";

const galleryPath = path.join(process.cwd(), "data", "gallery.json");

export async function readGallery() {
  try {
    const data = await fs.readFile(galleryPath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function addGalleryItem(item) {
  const gallery = await readGallery();

  const newGallery = [item, ...gallery].slice(0, 200);

  await fs.mkdir(path.dirname(galleryPath), { recursive: true });
  await fs.writeFile(galleryPath, JSON.stringify(newGallery, null, 2));

  return newGallery;
}
