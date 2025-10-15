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

      console.log('PUT request:', { id, likes, comments })

      if (!id) {
        return res.status(400).json({ error: 'Missing id parameter' })
      }

      if (likes !== undefined) {
        console.log('Updating likes for gossip', id, 'with', likes)
        const result = await sql`
          UPDATE gossips
          SET likes = ${JSON.stringify(likes)}::jsonb
          WHERE id = ${id}
          RETURNING *
        `
        console.log('Update result:', result)
        return res.status(200).json(result[0])
      }

      if (comments !== undefined) {
        console.log('Updating comments for gossip', id, 'with', comments)
        const result = await sql`
          UPDATE gossips
          SET comments = ${JSON.stringify(comments)}::jsonb
          WHERE id = ${id}
          RETURNING *
        `
        console.log('Update result:', result)
        return res.status(200).json(result[0])
      }

      return res.status(400).json({ error: 'Missing likes or comments in body' })
    }

    if (req.method === 'DELETE') {
      // Supprimer un gossip
      const { id } = req.query
      const { currentUser } = req.body

      // Récupérer le gossip pour vérifier l'auteur
      const gossip = await sql`
        SELECT * FROM gossips WHERE id = ${id}
      `

      if (gossip.length === 0) {
        return res.status(404).json({ error: 'Gossip not found' })
      }

      // Vérifier si l'utilisateur est Admin ou l'auteur du gossip
      if (currentUser === 'Admin' || gossip[0].author === currentUser) {
        await sql`
          DELETE FROM gossips WHERE id = ${id}
        `
        return res.status(200).json({ message: 'Gossip deleted successfully' })
      } else {
        return res.status(403).json({ error: 'Unauthorized' })
      }
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: error.message })
  }
}

