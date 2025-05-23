const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "autoriaweb",
});

app.use(express.json());
app.use(cors());

app.post('/api/cadastro', (req, res) =>{

    const { nome, sobrenome, email, telefone, senha } = req.body;

    if (!nome || !sobrenome || !email || !telefone || !senha) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const nomeCompleto = `${nome} ${sobrenome}`;
    const tipo_usuario = "estudante";

    const sql = "INSERT INTO usuarios (nome, email, telefone, senha_hash, tipo_usuario) VALUES (?, ?, ?, ?, ?)";
    const values = [nomeCompleto, email, telefone, senha, tipo_usuario];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erro ao inserir usuário:", err);
            return res.status(500).json({ error: "Erro ao cadastrar." });
        }
        return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    });
})

app.listen(3001, () => {
    console.log("rodando na porta 3001");
});