// Simple test endpoint
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  return res.status(200).json({ 
    message: 'API fonctionne !',
    timestamp: new Date().toISOString()
  })
}

