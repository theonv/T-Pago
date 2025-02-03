## Pré-requisitos

*   **Node.js e npm (ou yarn):** Certifique-se de ter o Node.js instalado. Você pode baixá-lo em [https://nodejs.org/](https://nodejs.org/). O npm (Node Package Manager) é instalado junto com o Node.js. Se preferir usar o yarn, você pode instalá-lo globalmente com `npm install -g yarn`.
*   **MariaDB:** Instale o MariaDB seguindo as instruções para o seu sistema operacional: [https://mariadb.org/download/](https://mariadb.org/download/).
*   **HeidiSQL (opcional, mas recomendado):** Um cliente gráfico para gerenciar o MariaDB: [https://www.heidisql.com/download.php](https://www.heidisql.com/download.php).

## Configuração do Banco de Dados

1.  **Crie um banco de dados no MariaDB:** Use o HeidiSQL ou a linha de comando para criar um novo banco de dados (ex: `meu_banco_de_dados`).
2.  **Importe o schema do banco de dados:** Se você tiver um arquivo SQL com o schema do banco de dados (ex: `schema.sql`), execute-o no HeidiSQL na aba "Consulta" após selecionar o banco de dados criado ou use o comando `mysql -u seu_usuario -p seu_banco < schema.sql` no terminal.

## Configuração do Backend

1.  **Clone o repositório:**
    ```bash
    git clone [URL inválido removido]
    cd seu-repositorio
    ```

2.  **Instale as dependências:**
    ```bash
    npm install  # Ou yarn install
    ```
    Este comando lê o arquivo `package.json` e instala todas as dependências listadas, incluindo `express`, `mysql2` e `dotenv`.

3.  **Configure as variáveis de ambiente:**

    *   **Crie um arquivo `.env` na raiz do projeto.**
    *   **Adicione as seguintes variáveis no arquivo `.env`, substituindo pelos seus valores reais:**

    ```
    DB_HOST=localhost       # Ou o endereço do seu servidor MariaDB
    DB_USER=seu_usuario       # Seu usuário do MariaDB
    DB_PASSWORD=sua_senha     # Sua senha do MariaDB
    DB_DATABASE=meu_banco_de_dados # O nome do banco de dados que você criou
    PORT=3000                 # Porta para o servidor (opcional, padrão 3000)
    ```

    **IMPORTANTE:** O arquivo `.env` deve ser adicionado ao `.gitignore` para não ser versionado no Git, pois contém informações sensíveis como senhas.
