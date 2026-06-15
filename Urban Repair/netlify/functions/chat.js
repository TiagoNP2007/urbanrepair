const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
    const { message } = JSON.parse(event.body);

    // Debug: Verifica se a chave está a ser lida
    console.log("Chave carregada? Comprimento:", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : "Indefinida");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Atualizado para o modelo que confirmaste:
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

    const result = await model.generateContent("Tu és um assistente especializado da Urban Repair. Responde de forma profissional e técnica. Pergunta do utilizador: " + message);

    return {
        statusCode: 200,
        body: JSON.stringify({ reply: result.response.text() })
    };
} catch (error) {
    // Log do erro real para lermos no Netlify
    console.error("ERRO DETETADO:", error.message);
    return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message })
    };
}
