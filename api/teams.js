export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://fresh2001-beep.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const key = process.env.FOOTBALL_API_KEY;
  if (!key) return res.status(500).json({ error: 'API key not configured' });

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
