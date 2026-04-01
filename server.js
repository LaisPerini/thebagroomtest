import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(cors()); // 🔥 ESSENCIAL
app.use(express.json());

app.post("/frete", async (req, res) => {

  try {

    const response = await fetch("https://melhorenvio.com.br/api/v2/me/shipment/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjQ0ZWNiYmYxZTk3N2U0YjRkODU3OGI2NzlkMzcxNWMyOWVlOTFlYWRlNDcxNGE4ZTE3MzY2YTBmOWFkM2Q5ZTI0MDZjOGMwZDFjZmM5YTIiLCJpYXQiOjE3NzQ5MjUxMTAuNTg1Mjk3LCJuYmYiOjE3NzQ5MjUxMTAuNTg1MywiZXhwIjoxODA2NDYxMTEwLjU3MzA5OCwic3ViIjoiYTE2ZGFmYjktZTdmMS00ZjVlLWIwNGQtNWI5NjJjMzFlNGIwIiwic2NvcGVzIjpbImNhcnQtcmVhZCIsImNhcnQtd3JpdGUiLCJjb21wYW5pZXMtcmVhZCIsImNvbXBhbmllcy13cml0ZSIsImNvdXBvbnMtcmVhZCIsImNvdXBvbnMtd3JpdGUiLCJub3RpZmljYXRpb25zLXJlYWQiLCJvcmRlcnMtcmVhZCIsInByb2R1Y3RzLXJlYWQiLCJwcm9kdWN0cy1kZXN0cm95IiwicHJvZHVjdHMtd3JpdGUiLCJwdXJjaGFzZXMtcmVhZCIsInNoaXBwaW5nLWNhbGN1bGF0ZSIsInNoaXBwaW5nLWNhbmNlbCIsInNoaXBwaW5nLWNoZWNrb3V0Iiwic2hpcHBpbmctY29tcGFuaWVzIiwic2hpcHBpbmctZ2VuZXJhdGUiLCJzaGlwcGluZy1wcmV2aWV3Iiwic2hpcHBpbmctcHJpbnQiLCJzaGlwcGluZy1zaGFyZSIsInNoaXBwaW5nLXRyYWNraW5nIiwiZWNvbW1lcmNlLXNoaXBwaW5nIiwidHJhbnNhY3Rpb25zLXJlYWQiLCJ1c2Vycy1yZWFkIiwidXNlcnMtd3JpdGUiLCJ3ZWJob29rcy1yZWFkIiwid2ViaG9va3Mtd3JpdGUiLCJ3ZWJob29rcy1kZWxldGUiLCJ0ZGVhbGVyLXdlYmhvb2siXX0.HWfXYWryHrC4wOef0po8dSqsFSH0bpfBXNtSL-KoyOyVrT-bBVoI_wij440YOpYzJvsHKeakf8mOErgSyY3b0SkBIgZ1B0z5-puCfs170-yt69KvQM8W6ZdPQZsovzwoGYEejk2vaP1CEq0n5qB6KX51M734N3eFuCPvbELZkNqou3C4myI2v46Gk3DoR8YaqfaY9unTMydBxumA2c3T21KxWLiEVuif6LEmARRxQ4joBdQ81SSQL_Ud48dGbkrBZ_aJO6rAXlcaQdDDRBQ0xRD4fWFgvb5glugpy_2a8z38AulaJTr18589nx1fpQcHQPoNXg7rQCc7sAcaz5VySSdVNO9JRupc5auN7odqKMzCj_sQNFxKNydoZR4ZyeO2NU_-8kFU_EAxckt-zypXAotOMwk4psWppPtrJSm5ES81bwlJYFjgdRDHCY-CdJ1m8vzDNswCTzFH5ZE5tPl_iLn629BJUsOYtJJvUV9Tf4POqWAgGhxRM2KfgwIPLR8sX2u_7dAXP8OAEpvx5k9npcEy4JPS5qqFoYp0M2cA6LQQckbKNCR97QkredcrJOiBg2e1RgC2hvARZ_gxpLAJThJuA0UFLG0AogKFjpj3i-FVnsYi_tjHJhlYaqBbzgxDMpYFd3Bj8uMmbbszRubZ7xYuDTNu4q4T9gHvKV4zPMo"
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
          insurance_value: 2000,
          quantity: 1
        }]
      })
    });

    const data = await response.json();

console.log("RESPOSTA FRETE:", JSON.stringify(data, null, 2));

    res.json(data);

  } catch (error) {
    console.log("ERRO:", error);
    res.status(500).json({ error: "Erro no frete" });
  }

});

app.listen(10000, () => {
  console.log("Servidor rodando na porta 10000");
});

app.get("/datas/:bolsaId", (req, res) => {

  const bolsaId = req.params.bolsaId;

  const alugueis = [
    { bolsa_id: "serpenti-verde", inicio: "2026-04-05", fim: "2026-04-10" },
    { bolsa_id: "chanel-classic", inicio: "2026-04-08", fim: "2026-04-12" }
  ];

  const filtrado = alugueis.filter(a => a.bolsa_id === bolsaId);

  res.json(filtrado);

});