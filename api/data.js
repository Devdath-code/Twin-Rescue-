let latestData = {
  bpm: 0,
  temperature: 0,
  fall: false,
  timestamp: null
};

export default function handler(req, res) {
  if (req.method === "POST") {
    const { bpm, temperature, fall } = req.body;

    latestData = {
      bpm: bpm ?? 0,
      temperature: temperature ?? 0,
      fall: fall ?? false,
      timestamp: new Date().toISOString()
    };

    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    return res.status(200).json(latestData);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
