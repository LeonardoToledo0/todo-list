# 🛠️ Tasks - Front End (Next.js)

Interface web da **Replic**, uma plataforma moderna de gestão de tarefas com autenticação via JWT e backend em NestJS.

Desenvolvido com **Next.js 15**, **Tailwind CSS**, **Zustand** e outros recursos modernos de frontend.

---

## 🚀 Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Axios](https://axios-http.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [JWT Decode](https://github.com/auth0/jwt-decode)
- [DND Kit](https://dndkit.com/) (Drag & Drop)
- [React Hot Toast](https://react-hot-toast.com/)
- [Tabler Icons](https://tabler.io/icons)

---

## 📦 Requisitos

> ⚠️ Recomendado usar **Node.js v18 ou superior**

- Node.js
- Yarn ou npm
- Backend NestJS rodando (API da Replic)

---

## 🌐 Deploy do Backend

A API está disponível em produção no endpoint:

[https://api-tasks.oberionchain.space/](https://api-tasks.oberionchain.space/)

---

## 🖥️ Telas da Aplicação

| Tela                        | Descrição                                                            |
| --------------------------- | -------------------------------------------------------------------- |
| **Login**                   | Formulário para autenticação do usuário com email e senha            |
| **Cadastro**                | Formulário para registro de novos usuários com nome, email e senha   |
| **Criação de Tarefas**      | Tela para adicionar novas tarefas com título, descrição e prioridade |
| **Visualização de Tarefas** | Listagem interativa de tarefas com filtros, edição e exclusão        |
| **Responsividade**          | Interface otimizada para desktop, tablets e dispositivos móveis      |

---

## ⚙️ Scripts

| Comando      | Ação                                                   |
| ------------ | ------------------------------------------------------ |
| `yarn dev`   | Inicia o projeto em modo desenvolvimento com Turbopack |
| `yarn build` | Compila a aplicação para produção                      |
| `yarn start` | Inicia a aplicação em modo produção                    |
| `yarn lint`  | Executa o linter                                       |

---

## 🔧 Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/LeonardoToledo0/todo-list.git

# 2. Acesse a pasta
cd todo-list

# 3. Instale as dependências
yarn

# 4. Crie um arquivo .env.local e configure a URL da API
cp .env.example .env.local
# Depois edite .env.local para colocar a URL do backend:
# NEXT_PUBLIC_API_URL=https://api-tasks.oberionchain.space/

# 5. Rode o projeto
yarn dev
``

---

## ✍️ Autor

Desenvolvido por **Leonardo Toledo**
📧 leotoledo010@gmail.com
🔗 [github.com/leonardotoledo0](https://github.com/LeonardoToledo0)

---

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT**.

Veja o arquivo [LICENSE](./LICENSE) para detalhes completos.

---
```
