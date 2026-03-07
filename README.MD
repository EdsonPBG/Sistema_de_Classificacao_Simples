School Management CLI
Sistema de linha de comando (CLI) para gestão escolar, desenvolvido em JavaScript puro. Este projeto evoluiu de um simples script de treino para uma aplicação modularizada com persistência de dados e lógica de relatórios.

🚀 Evolução do Projeto
Este repositório documenta minha jornada de aprendizado em lógica de programação e arquitetura back-end. O sistema foi construído incrementalmente:

Fase 1: CRUD básico em memória.

Fase 2: Modularização e Separação de Responsabilidades (Services, Repository, Utils).

Fase 3: Persistência de dados em arquivos JSON e Relatórios estatísticos.

🛠️ Tecnologias e Arquitetura:
O projeto foi estruturado seguindo princípios de Clean Code e separação de interesses:

* Camada de Dados (Repository): Responsável por interagir com o sistema de arquivos (fs) e gerir a integridade do JSON.

* Camada de Negócio (Service): Onde residem as regras de aprovação, cálculos de média e lógica de ordenação.

* Camada de Validação (Utils): Funções puras para garantir que nenhum dado inconsistente entre no sistema.

*   Interface (Main/Index): Orquestração do fluxo de entrada do usuário.

✨ Funcionalidades Atuais:
[x] Gestão de Alunos: Cadastro, Edição, Busca e Exclusão com confirmação.

[x] Persistência Local: Carregamento automático no início e salvamento ao sair.

[x] Inteligência de ID: Algoritmo para garantir IDs únicos, mesmo após reiniciar o sistema.

[x] Relatórios Avançados:

Média geral da turma.

Identificação dinâmica de Melhor e Pior aluno (Top Performer).

[x] Ordenação Dinâmica: Visualização por ordem alfabética ou por desempenho (notas).

Fase 4: Refatoração para Programação Defensiva e Padronização de Respostas. Implementação de um protocolo de comunicação entre Service e Index, garantindo que a interface nunca manipule dados brutos diretamente.

✨ Funcionalidades Atuais (Melhoria de detalhe):
Edição Inteligente: Sistema de atualização parcial (patch) que permite ao usuário alterar apenas campos específicos, mantendo os dados originais caso o campo seja deixado em branco.

Recálculo Automático: Inteligência de negócio que atualiza o status de aprovação em tempo real sempre que uma nota é editada.

🧠 Desafios Superados (Adicione estes itens):
Programação Defensiva: Implementação de validações condicionais no Service para proteger a integridade dos dados sem sacrificar a experiência do usuário (UX).

Desacoplamento (Layer Separation): Blindagem da camada de persistência, onde o index.js agora consome apenas resultados processados pelo Service, seguindo padrões de design de sistemas escaláveis.

📦 Como instalar e usar:

Pré-requisitos: Ter o Node.js instalado.

Instalação:

Bash
 npm install
Execução:

Bash
 node index.js

🧠 Desafios Superados (Log Técnico):

Sincronismo: Implementação de leitura/escrita síncrona para garantir a ordem das operações em CLI.

Normalização de Dados: Tratamento de strings (trim/lowercase) para buscas robustas por nome.

Tratamento de Exceções: Uso de blocos try/catch para evitar que o sistema quebre caso o arquivo de banco de dados seja deletado ou esteja vazio.

📈 Próximos Passos:

[ ] Implementar escrita assíncrona para melhorar performance.

[ ] Adicionar testes unitários para os validadores.

[ ] Criar sistema de "Logs de Erro" em arquivo separado.

[ ] Migração para TypeScript e, posteriormente, NestJS.

✍️ Desenvolvido por Edson Gomes

"Estudando back-end para construir sistemas escaláveis e robustos."