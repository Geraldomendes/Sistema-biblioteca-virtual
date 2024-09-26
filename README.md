# Sistema de Biblioteca Virtual

Este projeto é um sistema de biblioteca virtual desenvolvido na disciplina de Programação para a Web II na linguagem **TypeScript**. O sistema permite que os usuários se cadastrem, façam login, gerenciem seu perfil, consultem livros disponíveis, e gerenciem empréstimos e cadastros de livros.

## Funcionalidades

- **Login**: Usuários podem fazer login no sistema com suas credenciais.
- **Cadastrar-se**: Novos usuários podem se cadastrar criando uma conta.
- **Página home**: Exibe as principais funcionalidades do sistema.
- **Perfil pessoal**: Usuários podem visualizar e editar suas informações pessoais.
- **Consulta de livros**: Permite que os usuários consultem os livros disponíveis na biblioteca.
- **Empréstimo de livros**: Usuários podem solicitar o empréstimo de livros.
- **Cadastrar livros**: Admins ou usuários autorizados podem cadastrar novos livros no sistema.
- **Editar livros**: Admins ou usuários autorizados podem editar as informações dos livros cadastrados.

## Requisitos para Execução

Para rodar a aplicação, siga os passos abaixo:

### 1. Clone o Repositório

```bash
git clone https://github.com/Geraldomendes/Sistema-biblioteca-virtual
```

### 2. Configuração da API

1. No terminal, entre na pasta da **API**:
   ```bash
   cd api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```

4. Gere o cliente do Prisma:
   ```bash
   npx prisma generate
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### 3. Configuração do Cliente (Front-end)

1. No terminal, entre na pasta do **cliente**:
   ```bash
   cd client
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Tecnologias Utilizadas

- **TypeScript**: Linguagem utilizada para escrever o código.
- **Prisma**: ORM utilizado para interagir com o banco de dados.
- **Node.js**: Ambiente de execução da API.
- **React**: Biblioteca utilizada no front-end.
- **Express**: Framework utilizado na construção da API.

---