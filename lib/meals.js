import { S3 } from "@aws-sdk/client-s3";
import sql from "better-sqlite3";
import fs from "node:fs";
import slugify from "slugify";
import xss from "xss";
import { getMealMongoDB, getMealsMongoDB, saveMealMongoDB } from "./mongoDB";
import { getMealSql, getMealsSql, saveMealSql } from "./sqLite";

const s3 = new S3({
  region: process.env.REGION,
});
const db = sql("meals.db");

export async function getMeals() {
  if (process.env.DATABASE_TYPE === "mongodb") {
    return await getMealsMongoDB();
  }

  return await getMealsSql();
}

export async function getMeal(slug) {
  if (process.env.DATABASE_TYPE === "mongodb") {
    return await getMealMongoDB(slug);
  }

  return await getMealSql(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  if (process.env.IMAGE_STORING === "aws") {
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

  if (process.env.DATABASE_TYPE === "mongodb") {
    saveMealMongoDB(meal);
  } else {
    saveMealSql(meal);
  }
}
