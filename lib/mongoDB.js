import { databaseURL } from "@/app/resources";
import { MongoClient } from "mongodb";

export async function getMealsMongoDB() {
  try {
    const client = await MongoClient.connect(databaseURL);
    const db = client.db();
    const foodDetailsCollection = db.collection("food_details");

    const foodDetails = await foodDetailsCollection.find().toArray();

    client.close();

    return new Promise(
      (resolve) => resolve(foodDetails),
      (reject) => {
        const msg = JSON.stringify(reject);
        throw new Error(`Failed to fetch food_details, error: ${msg}`);
      }
    );
  } catch (error) {
    const msg = JSON.stringify(error);
    throw new Error(`Failed to fetch food_details, error: ${msg}`);
  }
}

export async function getMealMongoDB(slug) {
  try {
    const client = await MongoClient.connect(databaseURL);
    const db = client.db();
    const foodDetailsCollection = db.collection("food_details");

    const foodDetails = await foodDetailsCollection.findOne({
      slug: slug,
    });

    client.close();

    return foodDetails;
  } catch (error) {
    throw new Error("Failed to fetch food details");
  }
}

export async function saveMealMongoDB(meal) {
  try {
    const client = await MongoClient.connect(databaseURL);
    const db = client.db();
    const meetupsCollection = db.collection("food_details");

    const result = await meetupsCollection.insertOne(meal);

    console.log(result);

    client.close();
  } catch (error) {
    const msg = JSON.stringify(error);
    throw new Error(`MongoDB: Failed to save food details, error: ${msg}`);
  }
}
