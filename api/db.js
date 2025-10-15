import { neon } from '@neondatabase/serverless'

// Connexion à Neon Database
const sql = neon(process.env.DATABASE_URL)

export { sql }

// Fonction pour initialiser les tables
export async function initDatabase() {
  try {
    // Table gossips
    await sql`
      CREATE TABLE IF NOT EXISTS gossips (
        id SERIAL PRIMARY KEY,
        lycee_id INTEGER NOT NULL,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        likes JSONB DEFAULT '[]'::jsonb,
        comments JSONB DEFAULT '[]'::jsonb
      )
    `

    // Table chat_messages
    await sql`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id SERIAL PRIMARY KEY,
        lycee_id INTEGER NOT NULL,
        author TEXT NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Table online_users
    await sql`
      CREATE TABLE IF NOT EXISTS online_users (
        id SERIAL PRIMARY KEY,
        lycee_id INTEGER NOT NULL,
        pseudo TEXT NOT NULL,
        last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(lycee_id, pseudo)
      )
    `

    // Index pour améliorer les performances
    await sql`CREATE INDEX IF NOT EXISTS idx_gossips_lycee ON gossips(lycee_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_gossips_created ON gossips(created_at DESC)`
    await sql`CREATE INDEX IF NOT EXISTS idx_chat_lycee ON chat_messages(lycee_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_chat_created ON chat_messages(created_at DESC)`

    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}

