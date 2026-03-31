import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const TOKEN = process.env.TOKEN; // 🔒 seguro

app.post("/frete", async (req, res) => {

  const { cep } = req.body;

  try {

    const response = await fetch("https://www.melhorenvio.com.br/api/v2/me/shipment/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        from: { postal_code: "11000-000" },
        to: { postal_code: cep },
        products: [{
          id: "1",
          width: 20,
          height: 10,
          length: 25,
          weight: 1
        }]
      })
    });

    const data = await response.json();

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: "Erro ao calcular frete" });
  }

});

app.get("/", (req, res) => {
  res.send("Backend rodando 🚀");
});

app.listen(10000, () => {
  console.log("Rodando...");
});