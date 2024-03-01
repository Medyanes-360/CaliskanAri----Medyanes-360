import fs from "fs";
const filename = "/01. 4. Sınıf Matematik - 1. Ünite -  4-5-6 Basamaklı Sayılar - Test/story.html";
export default async function api(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.write(await fs.readFileSync(filename, "utf-8"));
  res.end();
}