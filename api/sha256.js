export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Gérer les requêtes préflight CORS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const crypto = require("crypto");
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: "Missing data field" });
    }

    const hash = crypto.createHash("sha256").update(data).digest("hex");
    return res.status(200).json({ hash });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
