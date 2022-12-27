import { query } from "./_generated/server";

export default query(async ({ db }): Promise<{}> => {
  console.log("getCounter ");
  const counterDoc = await db.query("counter_table").first();
  if (counterDoc === null) {
    return 0;
  } 
  return counterDoc.counter;
});