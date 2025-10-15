import { sql } from './db.js'

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    if (req.method === 'GET') {
      // Récupérer les utilisateurs en ligne (actifs dans les 5 dernières minutes)
      const { lyceeId } = req.query
      
      // Nettoyer les utilisateurs inactifs
      await sql`
        DELETE FROM online_users 
        WHERE last_seen < NOW() - INTERVAL '5 minutes'
      `
      
      const users = await sql`
        SELECT pseudo, last_seen FROM online_users 
        WHERE lycee_id = ${lyceeId}
        ORDER BY last_seen DESC
      `
      return res.status(200).json(users)
    }

    if (req.method === 'POST') {
      // Mettre à jour la présence d'un utilisateur
      const { lyceeId, pseudo } = req.body
      const result = await sql`
        INSERT INTO online_users (lycee_id, pseudo, last_seen)
        VALUES (${lyceeId}, ${pseudo}, NOW())
        ON CONFLICT (lycee_id, pseudo) 
        DO UPDATE SET last_seen = NOW()
        RETURNING *
      `
      return res.status(200).json(result[0])
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: error.message })
  }
}

