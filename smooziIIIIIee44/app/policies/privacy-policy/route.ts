import { readFile } from "fs/promises";
import path from "path";

// يعرض ملف content/privacypolicy.html كما هو تمامًا بدون أي تعديل على المحتوى أو الشكل.
export async function GET() {
  const filePath = path.join(process.cwd(), "public", "content", "privacypolicy.html");
  const html = await readFile(filePath, "utf-8");

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
