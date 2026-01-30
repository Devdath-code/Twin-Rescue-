let latestData = {
  bpm: 0,
  temperature: 0,
  fall: false,
  timestamp: null
};

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {

      let body = req.body;

      if (typeof body === "string") {
        body = JSON.parse(body);
      }

      const bpm = Number(body?.bpm) || 0;
      const temperature = Number(body?.temperature) || 0;
      const fall = body?.fall === 1 || body?.fall === "1" || body?.fall === true;

      latestData = {
        bpm,
        temperature,
        fall,
        timestamp: new Date().toISOString()
      };

      return res.status(200).json({ success: true });
    }

    if (req.method === "GET") {
      return res.status(200).json(latestData);
    }

    return res.status(405).json({ error: "Method not allowed" });

  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}