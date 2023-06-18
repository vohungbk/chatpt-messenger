import openai from './chatgpt'

const query = async (prompt: string, chatId: string, model: string) => {
  const res = await openai
    .createCompletion({
      model: model,
      prompt,
      max_tokens: 1000,
      temperature: 0,
    })
    .then((res) => res.data.choices[0].text)
    .catch((error) => console.log('error', error))
  return res
}

export default query
