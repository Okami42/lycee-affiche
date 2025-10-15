// API Helper pour communiquer avec le backend
const API_BASE = import.meta.env.VITE_API_URL || '/api'

export const api = {
  // Gossips
  async getGossips(lyceeId) {
    const res = await fetch(`${API_BASE}/gossips?lyceeId=${lyceeId}`)
    return res.json()
  },

  async createGossip(lyceeId, author, content) {
    const res = await fetch(`${API_BASE}/gossips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lyceeId, author, content })
    })
    return res.json()
  },

  async updateGossip(id, updates) {
    const res = await fetch(`${API_BASE}/gossips/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
    return res.json()
  },

  // Chat
  async getChatMessages(lyceeId) {
    const res = await fetch(`${API_BASE}/chat?lyceeId=${lyceeId}`)
    return res.json()
  },

  async sendChatMessage(lyceeId, author, text) {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lyceeId, author, text })
    })
    return res.json()
  },

  // Online users
  async getOnlineUsers(lyceeId) {
    const res = await fetch(`${API_BASE}/online-users?lyceeId=${lyceeId}`)
    return res.json()
  },

  async updatePresence(lyceeId, pseudo) {
    const res = await fetch(`${API_BASE}/online-users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lyceeId, pseudo })
    })
    return res.json()
  }
}

