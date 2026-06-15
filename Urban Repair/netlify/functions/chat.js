const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event, context) => {
    // Validação do método para garantir que é um POST
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { message } = JSON.parse(event.body);
        
        // Inicialização com a chave de API
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // Modelo atualizado conforme prova nas imagens
        const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

        const result = await model.generateContent("Tu és um assistente especializado da Urban Repair. Responde de forma profissional e técnica. Pergunta do utilizador: " + message);

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: result.response.text() })
        };
    } catch (error) {
        console.error("ERRO DETALHADO:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
