# API de Transações - Desafio Itaú Unibanco

![GitHub repo size](https://img.shields.io/github/repo-size/gbrmaia/desafio-itau?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/iuricode/desafio-itau?style=for-the-badge)

> Esta API REST foi desenvolvida como parte do desafio de programação do Itaú Unibanco. Ela permite o gerenciamento de transações financeiras, fornecendo estatísticas em tempo real, como soma, média, maior, menor valor e total de transações realizadas nos últimos 60 segundos.

---

## ⚙️ Endpoints Implementados

### 1. **Receber Transações - `POST /transacao`**
   - **Entrada**:
     ```json
     {
       "valor": 123.45,
       "dataHora": "2020-08-07T12:34:56.789-03:00"
     }
     ```
   - **Regras**:
     - O valor deve ser positivo (>= 0).
     - A data não pode ser no futuro.
   - **Respostas**:
     - `201 Created`: Transação aceita e armazenada.
     - `422 Unprocessable Entity`: Dados inválidos.
     - `400 Bad Request`: JSON malformado.

### 2. **Limpar Transações - `DELETE /transacao`**
   - **Descrição**: Apaga todas as transações armazenadas na memória.
   - **Resposta**:
     - `200 OK`: Todas as transações foram apagadas.

### 3. **Calcular Estatísticas - `GET /estatistica`**
   - **Descrição**: Retorna estatísticas das transações realizadas nos últimos 60 segundos.
   - **Saída**:
     ```json
     {
       "count": 10,
       "sum": 1234.56,
       "avg": 123.456,
       "min": 12.34,
       "max": 123.56
     }
     ```
   - **Resposta**:
     - `200 OK`: Estatísticas calculadas com sucesso.

---

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- **Node.js** (versão 16+).
- **NPM** (gerenciador de pacotes do Node.js).
- Máquina com **Linux**, **Windows** ou **macOS**.
- Familiaridade básica com APIs REST e JSON.

---

## 🚀 Instalando e Executando o Projeto

Siga estas etapas para executar o projeto:

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute o servidor
```bash
npm run start
```

### 4. Acesse a API
- **Base URL**: `http://localhost:3000`
- **Documentação Swagger**: `http://localhost:3000/api/help`

---

## ☕ Exemplos de Uso

### Criar uma Transação
```bash
curl -X POST http://localhost:3000/transacao \
-H "Content-Type: application/json" \
-d '{"valor": 150.50, "dataHora": "2023-01-23T10:30:00.000Z"}'
```

### Limpar Transações
```bash
curl -X DELETE http://localhost:3000/transacao
```

### Consultar Estatísticas
```bash
curl -X GET http://localhost:3000/estatistica
```

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** com **NestJS**.
- **Swagger** para documentação interativa.
- Armazenamento em memória (sem banco de dados).
- Logger com **@nestjs/common/Logger**.
- Tratamento de erros e validação com **ValidationPipe** e **DTOs**.
