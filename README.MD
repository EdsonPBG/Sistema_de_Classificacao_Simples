# School Management API
Sistema de gestão escolar que evoluiu de uma ferramenta de linha de comando (CLI) para uma **API RESTful** robusta, desenvolvida em Node.js com persistência em banco de dados relacional e arquitetura em camadas.

🚀 Evolução do Projeto
Este repositório documenta minha jornada de aprendizado em lógica de programação e arquitetura back-end. O sistema foi construído incrementalmente:

* **Fase 1:** CRUD básico em memória.
* **Fase 2:** Modularização e Separação de Responsabilidades (Services, Repository, Utils).
* **Fase 3:** Persistência de dados em arquivos JSON e Relatórios estatísticos.
* **Fase 4:** Migração para API Web (Express), implementação de Middlewares (Log, Autenticação, Tratamento de Erro Global) e banco de dados relacional.

🛠️ Tecnologias e Arquitetura:
O projeto foi estruturado seguindo princípios de Clean Code, Programação Defensiva e separação de interesses em camadas:

* **Node.js & Express:** Core da aplicação para criação do servidor e gerenciamento de rotas.
* **MySQL & Driver `mysql2`:** Persistência de dados relacional utilizando pool de conexões e suporte a Promises (`async/await`).
* **Camada de Rotas (Routes):** Mapeamento dos endpoints da API.
* **Camada de Controle (Controllers):** Orquestração das requisições e respostas HTTP (sem lógica de negócio).
* **Camada de Negócio (Services):** Onde residem as regras de aprovação, cálculos e a construção de consultas SQL dinâmicas e seguras.
* **Camada de Validação (Utils):** Funções puras para garantir que nenhum dado inconsistente entre no sistema.
* **Middlewares:** Interceptadores globais para autenticação por cabeçalho, logs de requisições e tratamento centralizado de exceções.

✨ Funcionalidades Atuais:
- [x] **Gestão de Alunos:** Cadastro, Edição, Busca e Exclusão direto no banco de dados.
- [x] **Busca Avançada:** Filtros dinâmicos por Turma e Status montados direto na Query SQL para maior performance.
- [x] **Segurança:** Uso de *Prepared Statements* (`?`) nas queries para prevenção contra ataques de *SQL Injection*.
- [x] **Edição Inteligente:** Sistema de atualização parcial (*patch*) que mantém os dados originais caso o campo seja deixado em branco.
- [x] **Recálculo Automático:** Inteligência de negócio que atualiza o status de aprovação em tempo real sempre que uma nota é editada.

🧠 Desafios Superados (Log Técnico):
- **Desacoplamento (Layer Separation):** Blindagem das camadas onde o Controller apenas consome resultados processados pelo Service, permitindo que o sistema seja escalável.
- **Tratamento de Exceções Global:** Implementação de um Middleware de Erro Global que captura falhas em qualquer ponto do fluxo, padroniza a resposta e evita que o servidor caia.
- **Queries Dinâmicas:** Construção de SQL dinâmico usando `WHERE 1=1` para concatenar filtros opcionais de forma limpa.

📂 Estrutura do Projeto
media_alunos/
├── DataBase/
│   └── database.js      # Pool de conexão com o MySQL
├── src/
│   ├── Controllers/     # Gerenciamento de fluxo HTTP
│   ├── Middleware/      # Segurança, logs e erros globais
│   ├── Routes/          # Definição dos caminhos da API
│   ├── Services/        # Regras de negócio e consultas SQL
│   └── utils/           # Validadores puros
├── app.js               # Configuração do Express
├── index.js             # Inicialização do servidor
└── README.MD

🛣️ Rotas da API (Em desenvolvimento)
| Método | Rota | Descrição | Parâmetros de Query (Opcionais) |
| :--- | :--- | :--- | :--- |
| GET | /alunos | Lista alunos com filtros | status, turma |

📦 Como instalar e usar:

Pré-requisitos:

Ter o Node.js instalado.

Ter o MySQL Server rodando na máquina.

Passo a Passo:

Clone o repositório para sua máquina.

Instale as dependências do projeto:

Bash
npm install
Acesse o seu gerenciador do MySQL (Ex: MySQL Workbench) e crie o banco de dados e a tabela:

SQL
CREATE DATABASE escola;
USE escola;

CREATE TABLE alunos (
  id_aluno INT AUTO_INCREMENT PRIMARY KEY,
  nome_aluno VARCHAR(50) NOT NULL,
  nota_aluno DECIMAL(4,2) NOT NULL,
  turma_aluno VARCHAR(20) DEFAULT 'sem turma' NOT NULL,
  status_aluno ENUM('aprovado', 'reprovado') NOT NULL
);
Configure suas credenciais de acesso ao banco (usuário e senha) no arquivo DataBase/database.js.

Execute o projeto:

Bash
node index.js
📈 Próximos Passos:

[ ] Finalizar a migração das rotas de criação, edição e exclusão para SQL.

[ ] Adicionar testes unitários para os validadores.

[ ] Criar sistema de "Logs de Erro" salvos em arquivos físicos.

[ ] Migração para TypeScript e, posteriormente, NestJS.

✍️ Desenvolvido por Edson Gomes
"Estudando back-end para construir sistemas escaláveis e robustos."