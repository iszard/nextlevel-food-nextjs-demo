import sql from "better-sqlite3";

let db = null;

if (process.env.DATABASE_TYPE === "sqlite") {
  db = sql("meals.db");
}

export async function getMealsSql() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  //   throw new Error("Failed to fetch meals");

  return db?.prepare("SELECT * FROM meals").all();
}

export async function getMealSql(slug) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return db?.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMealSql(meal) {
  db?.prepare(
    `
    INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `
  ).run(meal);
}
