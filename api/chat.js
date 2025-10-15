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
      // Récupérer les messages du chat
      const { lyceeId } = req.query
      const messages = await sql`
        SELECT * FROM chat_messages 
        WHERE lycee_id = ${lyceeId}
        ORDER BY created_at ASC
        LIMIT 100
      `
      return res.status(200).json(messages)
    }

    if (req.method === 'POST') {
      // Envoyer un message
      const { lyceeId, author, text } = req.body

      console.log('POST /api/chat:', { lyceeId, author, text })

      if (!lyceeId || !author || !text) {
        return res.status(400).json({ error: 'Missing required fields: lyceeId, author, text' })
      }

      const result = await sql`
        INSERT INTO chat_messages (lycee_id, author, text)
        VALUES (${lyceeId}, ${author}, ${text})
        RETURNING *
      `

      console.log('Message inserted:', result[0])
      return res.status(201).json(result[0])
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: error.message })
  }
}

