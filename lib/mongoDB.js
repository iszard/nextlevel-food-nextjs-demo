import { databaseURL } from "@/app/resources";
import { MongoClient } from "mongodb";

export async function getMealsMongoDB() {
  let foodDetails = [];

  try {
    const client = await MongoClient.connect(databaseURL);
    const db = client.db();
    const foodDetailsCollection = db.collection("food_details");

    foodDetails = await foodDetailsCollection.find().toArray();

    client.close();
  } catch (error) {
    const msg = JSON.stringify(error);
    throw new Error(`Failed to fetch food_details, error: ${msg}`);
  }

  return new Promise(
    (resolve) => resolve(foodDetails),
    (reject) => {
      const msg = JSON.stringify(reject);
      throw new Error(`Failed to fetch food_details, error: ${msg}`);
    }
  );
}

export async function getMealMongoDB(slug) {
  let foodDetails = null;

  try {
    const client = await MongoClient.connect(databaseURL);
    const db = client.db();
    const foodDetailsCollection = db.collection("food_details");

    foodDetails = await foodDetailsCollection.findOne({
      slug: slug,
    });

    client.close();
  } catch (error) {
    throw new Error("Failed to fetch food details");
  }

  return foodDetails;
}

export async function saveMealMongoDB(meal) {
  try {
    const client = await MongoClient.connect(databaseURL);
    const db = client.db();
    const meetupsCollection = db.collection("food_details");

    const result = await meetupsCollection.insertOne(meal);

    client.close();
  } catch (error) {
    const msg = JSON.stringify(error);
    throw new Error(`MongoDB: Failed to save food details, error: ${msg}`);
  }
}
