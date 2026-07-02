import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

export type Product = {
  handle: string
  title: string
  priceFormatted: string
  description: string
  available: boolean
  image: string | null
}

export type SiteSettings = {
  storeName: string
  announcement: string
  contactEmail: string
  adminPasscode: string
}

export type Database = {
  settings: SiteSettings
  products: Product[]
}

const DB_PATH = join(process.cwd(), "content", "db.json")

export async function readDb(): Promise<Database> {
  const raw = await readFile(DB_PATH, "utf-8")
  return JSON.parse(raw) as Database
}

export async function writeDb(db: Database): Promise<void> {
  await writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8")
}
