import { initDatabase } from './db.js'

export default async function handler(req, res) {
  try {
    await initDatabase()
    return res.status(200).json({ message: 'Database initialized successfully' })
  } catch (error) {
    console.error('Init Error:', error)
    return res.status(500).json({ error: error.message })
  }
}

