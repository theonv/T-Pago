# T-Pago
## Configurando o Banco de Dados

Este projeto utiliza o MariaDB como sistema de gerenciamento de banco de dados. Para configurar o ambiente de desenvolvimento, siga os passos abaixo:

**1. Instalando o MariaDB:**

*   **Windows:**
    1.  Acesse o site oficial do MariaDB: [https://mariadb.org/download/](https://mariadb.org/download/)
    2.  Baixe o instalador adequado para o seu sistema operacional (Windows).
    3.  Execute o instalador e siga as instruções. Durante a instalação, anote a senha do usuário `root` (será necessária posteriormente).
*   **Linux (exemplo Ubuntu/Debian):**
    ```bash
    sudo apt update
    sudo apt install mariadb-server
    ```
    Após a instalação, você pode definir a senha do root com:
    ```bash
    sudo mysql_secure_installation
    ```
*   **macOS:**
    *   Você pode usar o Homebrew:
        ```bash
        brew update
        brew install mariadb
        ```
    *   Ou baixar o instalador no site oficial.

**2. Instalando o HeidiSQL:**

O HeidiSQL é um cliente gráfico para gerenciar bancos de dados MySQL e MariaDB.

*   **Windows:**
    1.  Acesse o site oficial do HeidiSQL: [https://www.heidisql.com/download.php](https://www.heidisql.com/download.php)
    2.  Baixe o instalador e execute-o.

**3. Configurando a Conexão no HeidiSQL:**

1.  Abra o HeidiSQL.
2.  Clique em "Novo" para criar uma nova sessão.
3.  Configure os seguintes parâmetros:
    *   **Tipo de rede:** `MySQL (TCP/IP)`
    *   **Nome do host / IP:** `127.0.0.1` (se o MariaDB estiver na sua máquina local) ou o endereço IP do servidor.
    *   **Usuário:** `root` (ou outro usuário com permissões de criação de banco de dados).
    *   **Senha:** A senha que você definiu durante a instalação do MariaDB.
    *   **Porta:** `3306` (porta padrão).
4.  Clique em "Abrir" para testar a conexão.

**4. Criando o Banco de Dados com o Script:**

1.  Após conectar-se ao servidor no HeidiSQL, clique com o botão direito do mouse na raiz da árvore de objetos (o nome do seu servidor) e selecione "Criar novo" -> "Banco de dados". Dê um nome ao seu banco de dados (exemplo: `nomcriacao.sql`).
2.  Selecione o banco de dados recém-criado na lista de bancos de dados.
3.  Abra a aba "Consulta".
4.  **Importante:** Certifique-se de que o banco de dados que você criou esteja selecionado no menu dropdown no canto inferior esquerdo da aba "Consulta".
5.  Cole o conteúdo do seu arquivo `criacao.sql` na área de texto da aba "Consulta".
6.  Clique no botão "Executar" (ícone de triângulo verde) para executar o script.

**Exemplo de como executar o script (alternativa):**

Você também pode executar o script diretamente pela linha de comando, após conectar-se ao MariaDB:

```bash
mysql -u root -p nome_do_seu_banco < nome_docriacao.sql