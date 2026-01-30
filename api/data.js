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

      if (!body) {
        return res.status(200).json({ ignored: true });
      }

      if (typeof body === "string") {
        try {
          body = JSON.parse(body);
        } catch {
          return res.status(200).json({ ignored: true });
        }
      }

      latestData = {
        bpm: Number(body.bpm) || 0,
        temperature: Number(body.temperature) || 0,
        fall: body.fall === 1 || body.fall === "1" || body.fall === true,
        timestamp: new Date().toISOString()
      };

      return res.status(200).json({ success: true });
    }

    if (req.method === "GET") {
      return res.status(200).json(latestData);
    }

    return res.status(405).json({ error: "Method not allowed" });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(200).json({ recovered: true });
  }
}