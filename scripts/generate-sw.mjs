import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const templatePath = "./public/firebase-messaging-sw.template.js";
const outputPath = "./public/firebase-messaging-sw.js";

let file = fs.readFileSync(templatePath, "utf8");

file = file
  .replace(/__API_KEY__/g, process.env.VITE_FIREBASE_API_KEY)
  .replace(/__AUTH_DOMAIN__/g, process.env.VITE_FIREBASE_AUTH_DOMAIN)
  .replace(/__PROJECT_ID__/g, process.env.VITE_FIREBASE_PROJECT_ID)
  .replace(/__STORAGE_BUCKET__/g, process.env.VITE_FIREBASE_STORAGE_BUCKET)
  .replace(
    /__MESSAGING_SENDER_ID__/g,
    process.env.VITE_FIREBASE_MESSAGING_SENDER_ID
  )
  .replace(/__APP_ID__/g, process.env.VITE_FIREBASE_APP_ID);

fs.writeFileSync(outputPath, file);

console.log("✅ firebase-messaging-sw.js generated");