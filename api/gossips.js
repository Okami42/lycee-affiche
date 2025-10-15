import { sql } from './db.js'

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    if (req.method === 'GET') {
      // Récupérer les gossips d'un lycée
      const { lyceeId } = req.query
      const gossips = await sql`
        SELECT * FROM gossips 
        WHERE lycee_id = ${lyceeId}
        ORDER BY created_at DESC
      `
      return res.status(200).json(gossips)
    }

    if (req.method === 'POST') {
      // Créer un nouveau gossip
      const { lyceeId, author, content } = req.body
      const result = await sql`
        INSERT INTO gossips (lycee_id, author, content, likes, comments)
        VALUES (${lyceeId}, ${author}, ${content}, '[]'::jsonb, '[]'::jsonb)
        RETURNING *
      `
      return res.status(201).json(result[0])
    }

    if (req.method === 'PUT') {
      // Mettre à jour un gossip (likes ou comments)
      const { id } = req.query
      const { likes, comments } = req.body

      if (likes !== undefined) {
        const result = await sql`
          UPDATE gossips 
          SET likes = ${JSON.stringify(likes)}::jsonb
          WHERE id = ${id}
          RETURNING *
        `
        return res.status(200).json(result[0])
      }

      if (comments !== undefined) {
        const result = await sql`
          UPDATE gossips 
          SET comments = ${JSON.stringify(comments)}::jsonb
          WHERE id = ${id}
          RETURNING *
        `
        return res.status(200).json(result[0])
      }
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: error.message })
  }
}

