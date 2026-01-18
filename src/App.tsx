import { useState } from 'react'
import { generateTutorial } from './lib/gemini'
import './App.css'

function App() {
  const [apiKey, setApiKey] = useState('')
  const [topic, setTopic] = useState('')
  const [tutorial, setTutorial] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!apiKey) {
      setError('Please enter your Gemini API key')
      return
    }
    if (!topic) {
      setError('Please enter a tutorial topic')
      return
    }

    setLoading(true)
    setError('')
    try {
      const result = await generateTutorial(apiKey, topic)
      setTutorial(result)
    } catch (err) {
      setError('Failed to generate tutorial. Please check your API key.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>🎓 Tuto R.I.A.L</h1>
      <p className="subtitle">AI-Powered Tutorial Generator</p>

      <div className="input-section">
        <input
          type="password"
          placeholder="Enter your Gemini API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="input"
        />
        
        <input
          type="text"
          placeholder="What do you want to learn? (e.g., React Hooks)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="input"
        />

        <button 
          onClick={handleGenerate} 
          disabled={loading}
          className="button"
        >
          {loading ? 'Generating...' : 'Generate Tutorial'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {tutorial && (
        <div className="tutorial">
          <h2>Your Tutorial:</h2>
          <div className="content">{tutorial}</div>
        </div>
      )}
    </div>
  )
}

export default App
