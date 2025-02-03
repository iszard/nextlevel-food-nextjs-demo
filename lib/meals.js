import { S3 } from "@aws-sdk/client-s3";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const s3 = new S3({
  region: process.env.AWS_REGION,
});
const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  //   throw new Error("Failed to fetch meals");

  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  if (process.env.AWS_REGION === "aws") {
    try {
      s3.putObject({
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
      });
    } catch (error) {
      throw new Error("AWS:Failed to save image");
    }
  } else {
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
        throw new Error("LOCAL:Failed to save image");
      }
    });
  }

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `
  ).run(meal);
}
