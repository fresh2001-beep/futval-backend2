export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const key = req.query.key;
  if (!key) return res.status(400).json({ error: 'Missing API key' });

  try {
    const response = await fetch('https://api.football-data.org/v4/competitions/PL/teams', {
      headers: { 'X-Auth-Token': key }
    });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
