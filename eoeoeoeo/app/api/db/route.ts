import { readDb, writeDb, type Database } from "@/lib/db"

// This endpoint reads/writes content/db.json at request time, so it can
// never be statically generated.
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const db = await readDb()
    return Response.json(db)
  } catch (error) {
    return Response.json({ error: "Could not read the database." }, { status: 500 })
  }
}

function isValidDatabase(value: unknown): value is Database {
  if (!value || typeof value !== "object") return false
  const v = value as Record<string, unknown>
  if (!v.settings || typeof v.settings !== "object") return false
  if (!Array.isArray(v.products)) return false
  return true
}

export async function PUT(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  if (!isValidDatabase(body)) {
    return Response.json(
      { error: "Database must include a 'settings' object and a 'products' array." },
      { status: 400 },
    )
  }

  try {
    await writeDb(body)
    return Response.json({ ok: true })
  } catch (error) {
    return Response.json({ error: "Could not save the database." }, { status: 500 })
  }
}
