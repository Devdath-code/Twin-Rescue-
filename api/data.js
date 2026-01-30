export default async function handler(req, res) {
  if (req.method === "POST") {

    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const { bpm, temperature, fall } = body;

    latestData = {
      bpm: Number(bpm) || 0,
      temperature: Number(temperature) || 0,
      fall: fall === 1 || fall === true,
      timestamp: new Date().toISOString()
    };

    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    return res.status(200).json(latestData);
  }

  return res.status(405).json({ error: "Method not allowed" });
}