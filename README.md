# site-mercado

# FRONT-END
yarn install\
yarn start

# BANCO DE DADOS
O banco de dados esta hospedado no azure os dados para autenticar são:\
servidor: sitemercado.database.windows.net\
usuario: adm\
senha: P@ssw0rd

# BACK-END
Basta executar o projeto que o swagger será aberto com a documentação dos métodos disponível.\
Por padrão a API inicializara no endereço 'https://localhost:44321/api'. \
Caso você inicie a API em uma porta diferente será necessario acessar arquivo config.js no projeto de FRONT END que se encontra na pasta public e alterar a variável 'window.REACT_APP_API_URL' para o novo endereço da API.
