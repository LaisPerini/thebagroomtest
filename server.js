import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/frete", async (req, res) => {

  try {

    const response = await fetch("https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer SEU_TOKEN_AQUI"
      },
      body: JSON.stringify({
        from: { postal_code: "11060-003" },
        to: { postal_code: req.body.to.postal_code },
        products: [{
          id: "1",
          width: 30,
          height: 10,
          length: 30,
          weight: 1,
          insurance_value: 500, // 🔥 ESSENCIAL
          quantity: 1
        }]
      })
    });

    const data = await response.json();

    console.log("RESPOSTA FRETE:", data);

    res.json(data);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro no frete" });
  }

});

app.listen(10000, () => {
  console.log("Servidor rodando na porta 10000");
});