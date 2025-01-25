# API de Transações - Desafio Itaú Unibanco

![GitHub repo size](https://img.shields.io/github/repo-size/gbrmaia/desafio-itau?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/gbrmaia/desafio-itau?style=for-the-badge)

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

### 2. **Limpar Transação por Id - `POST /transacao`**

- **Entrada**:
  ```json
  {
    "id": "272f3935-5024-45ea-9f28-2bbbfda1b0dd"
  }
  ```
- **Descrição**: Apaga determinada transição através do seu id único.
- **Resposta**:
  - `200 OK`: A transação foi apagada.

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
git clone https://github.com/gbrmaia/desafio-itau.git
cd desafio-itau
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute o servidor

```bash
npm run start
```

### 3.1 Execute o servidor em modo desenvolvedor

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

### Apagar uma Transação pelo seu Id

```bash
curl -X POST http://localhost:3000/transacao \
-H "Content-Type: application/json" \
-d '{"id": "272f3935-5024-45ea-9f28-2bbbfda1b0dd"}'
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
- Armazenamento em memória **(sem banco de dados)**.
- Logger com **@nestjs/common/Logger**.
- Tratamento de erros e validação com **ValidationPipe** e **DTOs**.

---

## 🗂️ Estrutura do Projeto

```
src
├── transaction
│   ├── constants
│   │   └── error-messages.ts         # Mensagens de erro reutilizáveis e gerenciáveis
│   ├── dto
│   │   └── create-transaction.dto.ts # DTO para validação de entrada
│   ├── schemas
│   │   └── transaction.schema.ts     # Esquema do MongoDB para transações
│   ├── transaction.controller.spec.ts # Testes do controlador de transações
│   ├── transaction.controller.ts      # Controlador principal do módulo de transações
│   ├── transaction.module.ts          # Declaração do módulo de transações
│   ├── transaction.service.spec.ts    # Testes do serviço de transações
│   ├── transaction.service.ts         # Lógica de negócios e manipulação de transações
├── app.module.ts                      # Módulo raiz da aplicação
├── main.ts                            # Arquivo principal da aplicação
```

---

## ✅ TODO

Uma lista de tarefas e ideias para futuras implementações no projeto, organizadas por prioridade e complexidade:

### 🔧 Funcionalidades Prioritárias (próximos dias)

- [ ] **Testes Unitários para TransactionModule**:
  - Dívida técnica
- [x] **Integrar MongoDB no projeto**:
  - Feito.
- [ ] **Implementar testes unitários básicos**:
  - Testar o comportamento dos endpoints principais (`/transacao`, `/estatistica`, `/delete`).
  - Simular casos de erro como valores negativos ou data inválida.
- [ ] **Criar um Health Check endpoint (`GET /health`)**:
  - Verificar a conectividade com o MongoDB.
  - Retornar status da aplicação.

### 🌟 Funcionalidades e Melhorias Adicionais

- [ ] **Autenticação e segurança**:
  - Adicionar autenticação com JWT para proteger os endpoints.
  - Permitir criar e gerenciar tokens para autenticação.
- [ ] **Filtro customizado para logs**:
  - Implementar um sistema de logs com diferentes níveis (`info`, `warn`, `error`) utilizando uma biblioteca como `winston` ou `pino`.
- [ ] **Configurar um Dockerfile para containerizar a aplicação**:
  - Criar um ambiente dockerizado para facilitar a execução e distribuição da aplicação.
  - Configurar um arquivo `docker-compose` para rodar o MongoDB junto com a aplicação.
- [ ] **Aprimorar a documentação Swagger**:
  - Adicionar exemplos mais ricos e casos de erro para os endpoints.
  - Documentar os requisitos de autenticação no Swagger (após implementar JWT).

### 🚀 Funcionalidades Futuras (Médio/Longo Prazo)

- [x] **Customizar o intervalo de cálculo de estatísticas**:
  - Feito.
- [ ] **Melhorar a performance do cálculo de estatísticas**:
  - Utilizar índices ou estruturas otimizadas para buscar apenas as transações relevantes.
  - Implementar caching para reduzir o custo de operações repetidas.
- [ ] **Dashboard de monitoramento**:
  - Criar um pequeno painel com métricas sobre as transações e estatísticas, utilizando frameworks como React ou Angular.

### 🛠️ Manutenção Contínua

- [ ] Refatorar e organizar os serviços e módulos.
- [ ] Atualizar dependências regularmente para evitar problemas de segurança.
- [ ] Adicionar mais testes unitários e de integração para garantir a qualidade do código.

---

⚡ _Se tiver novas ideias, adicione à lista para priorizar futuramente!_
