const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  const { message } = JSON.parse(event.body);
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent(`Tu és um assistente especializado da Urban Repair. Responde de forma profissional e técnica sobre reabilitação de edifícios, impermeabilizações e Capoto. Pergunta: ${message}`);
    return { statusCode: 200, body: JSON.stringify({ reply: result.response.text() }) };
  } catch (error) {
    // Isto vai enviar a mensagem técnica real do sistema em vez da frase fixa
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
}
