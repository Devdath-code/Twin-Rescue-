export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    return res.status(200).json({ success: true });
  }
  res.status(405).json({ error: "Method not allowed" });
}
