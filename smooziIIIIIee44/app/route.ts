import { readFile } from "fs/promises";
import path from "path";

// يعرض ملف content/home.html كما هو تمامًا بدون أي تعديل على المحتوى أو الشكل.
export async function GET() {
  const filePath = path.join(process.cwd(), "public", "content", "home.html");
  const html = await readFile(filePath, "utf-8");

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
