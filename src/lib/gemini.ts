import { GoogleGenerativeAI } from '@google/generative-ai'

export async function generateTutorial(apiKey: string, topic: string): Promise<string> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `Create a comprehensive, step-by-step tutorial about: ${topic}

The tutorial should include:
1. Introduction and why it's important
2. Prerequisites
3. Main concepts explained simply
4. Step-by-step instructions with examples
5. Common mistakes to avoid
6. Next steps and resources

Format the tutorial in a clear, educational style suitable for beginners.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    return text
  } catch (error) {
    console.error('Error generating tutorial:', error)
    throw new Error('Failed to generate tutorial. Please check your API key and try again.')
  }
}
