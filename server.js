import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// 🔒 pega o token do Render (Environment)
const TOKEN = process.env.TOKEN;

// rota de teste
app.get("/", (req, res) => {
  res.send("Backend rodando 🚀");
});

// rota do frete
app.post("/frete", async (req, res) => {

  try {

    let { cep } = req.body;

    if (!cep) {
      return res.status(400).json({ error: "CEP não informado" });
    }

    // 🔥 limpa o CEP (remove hífen, espaço, etc)
    const cepLimpo = cep.replace(/\D/g, '');

    const response = await fetch("https://www.melhorenvio.com.br/api/v2/me/shipment/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        from: { postal_code: "11060003" }, // seu CEP origem
        to: { postal_code: cepLimpo },
        products: [{
          id: "1",
          width: 20,
          height: 10,
          length: 25,
          weight: 1,
          insurance_value: 1000, // ⚠️ obrigatório
          quantity: 1
        }]
      })
    });

    const data = await response.json();

    // 🔍 debug (se precisar ver erro real)
    console.log("Resposta Melhor Envio:", data);

    // valida retorno
    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Nenhum frete encontrado" });
    }

    res.json(data);

  } catch (error) {
    console.error("Erro no servidor:", error);
    res.status(500).json({ error: "Erro ao calcular frete" });
  }

});

// ⚠️ porta obrigatória do Render
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});