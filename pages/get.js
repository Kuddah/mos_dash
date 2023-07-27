
import FIRApi from "./api/FIR"

async function main() {
  const db = new FIRApi.getListOfFir();
  const docs = await db.getListOfFir();
  console.log(docs);
}

main().catch(console.error);
