# Chat App

Aplicação de chat em tempo real com autenticação, envio de imagens, utilizadores online e mais de 30 temas visuais.

> **Âmbito do projecto:** este é um projecto de estudo. Fi-lo para me familiarizar com WebSockets (Socket.io), a stack MERN, autenticação com JWT e o Zustand, e para pôr em prática a comunicação em tempo real entre utilizadores. Não é um produto final.

## Demo

🔗 **[Ver demo](https://chat-app-s-1.onrender.com)**

## Funcionalidades

- Registo, login e logout com JWT num cookie `httpOnly` (válido 7 dias) e password encriptada com bcrypt
- Mensagens em tempo real com **Socket.io**: chegam sem recarregar a página
- Envio de imagens nas mensagens (guardadas no Cloudinary)
- Indicador de utilizadores online
- Perfil com actualização da foto
- Mais de 30 temas do daisyUI; o tema escolhido fica guardado no browser
- Ecrãs de carregamento (skeletons) para a lista de contactos e as mensagens
- Rotas protegidas: só utilizadores autenticados acedem ao chat
- Em produção, o próprio servidor Express serve o front-end compilado

## Tecnologias

| Front-end | Back-end |
|---|---|
| React 19 + Vite | Node.js + Express 5 |
| Tailwind CSS 4 + daisyUI 5 | Socket.io |
| Zustand | MongoDB + Mongoose |
| Socket.io Client | JWT + bcryptjs + cookie-parser |
| React Router · Axios | Cloudinary |

## Estrutura

```
Chat-App-S/
├── FrontEnd/   # aplicação React (Vite) — porta 5173
└── BackEnd/    # API Express + Socket.io — porta 4000
```

## Como correr localmente

### Pré-requisitos

- **Node.js 20 ou superior**
- Uma base de dados **MongoDB** (local ou [MongoDB Atlas](https://www.mongodb.com/atlas))
- Uma conta **[Cloudinary](https://cloudinary.com)**

### 1. Clonar o repositório

```bash
git clone https://github.com/Cleyton-Tembe/Chat-App-S.git
cd Chat-App-S
```

### 2. Variáveis de ambiente

Cria `BackEnd/.env`:

```env
PORT=4000
MONGO_URL=mongodb+srv://<utilizador>:<password>@<cluster>/<base-de-dados>
JWT_SECRET=um-segredo-longo-e-aleatorio
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_CLOUD_KEY=...
CLOUDINARY_CLOUD_SECRET=...
```

Cria `FrontEnd/.env`. É isto que faz o front-end falar com a API em `localhost:4000`:

```env
VITE_NODE_ENV=development
```

### 3. Arrancar o back-end

```bash
cd BackEnd
npm install
npm run dev
```

### 4. Arrancar o front-end

Noutro terminal:

```bash
cd FrontEnd
npm install
npm run dev
```

Abre `http://localhost:5173`. Para testares o tempo real, cria duas contas e entra com cada uma numa janela diferente (por exemplo, uma janela normal e uma anónima).

### Correr em modo de produção

Na raiz do projecto, com `NODE_ENV=production` no `BackEnd/.env`:

```bash
npm run build   # instala as dependências e compila o front-end
npm start       # o Express serve a API, o Socket.io e o front-end
```

## Autor

**Cleyton Tembe** — [GitHub](https://github.com/Cleyton-Tembe)
