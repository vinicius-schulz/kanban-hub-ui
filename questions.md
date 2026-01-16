[1] RESUMO (até 10 linhas)
- Total de POAs: 6
- Severidade: BLOCKER=1 | HIGH=2 | MEDIUM=2 | LOW=1
- Principais temas: modelo de dados do Card (cardTypeId), autenticação/sessão, requisitos de UCs administrativos, rastreabilidade UX (UC↔telas/rotas), perfis/permitências, semântica de warnings de ingestão.
- Dependências externas: possível SSO/IdP externo para autenticação (se aplicável).

[2] BACKLOG DE POAs PRIORIZADO
- POA-004
  - severity: BLOCKER | category: Dados | impact: [Persistência, API, State]
  - affected_ids: [RN-001, ENT-005, ENT-003]
  - Pergunta principal: O Card deve armazenar cardTypeId próprio ou a associação com CardType é derivada exclusivamente do Board?
  - Follow-ups:
    1) Se Card tiver cardTypeId, ele é obrigatório e imutável?
    2) Existe algum caso onde um Card possa divergir do CardType do Board?
    3) Qual entidade é a fonte de verdade para CardType?
    4) Como validar RN-001 (Card sempre possui CardType) no backend?
  - Quem responde (papel): PO/Arquiteto de dados
  - Evidência ideal a coletar: Documento de modelo de dados ou diagrama ER atualizado.
  - Critério de encerramento: Definição explícita do campo cardTypeId no Card ou regra de derivação única via Board, com atualização de RN-001/ENT-005.

- POA-003
  - severity: HIGH | category: Operação | impact: [Segurança, API, UI]
  - affected_ids: [UC-001, RF-001]
  - Pergunta principal: Qual é o mecanismo de autenticação/sessão (tipo de token, expiração, recuperação de senha)?
  - Follow-ups:
    1) O login será local (usuário/senha) ou SSO externo?
    2) Qual o tempo de expiração e política de refresh?
    3) Há requisitos de MFA?
    4) Como é o fluxo de recuperação de senha?
  - Quem responde (papel): PO/Segurança/Arquiteto
  - Evidência ideal a coletar: Política de autenticação, requisitos de segurança, decisão técnica.
  - Critério de encerramento: Especificação do mecanismo (JWT/cookie/SSO) com expiração e recuperação definidas.

- POA-005
  - severity: HIGH | category: Regras | impact: [UI, API, State]
  - affected_ids: [UC-005, UC-008, UC-010]
  - Pergunta principal: Devemos definir requisitos funcionais atômicos para UC-005/UC-008/UC-010 ou retirar esses UCs do escopo do MVP?
  - Follow-ups:
    1) Quais operações de CRUD são obrigatórias no MVP para módulos/boards/labels?
    2) Plugins precisam de CRUD completo ou apenas ativar/desativar?
    3) Usuários/permissões requerem criação, edição e desativação no MVP?
    4) Há critérios de aceite mínimos para cada UC administrativo?
  - Quem responde (papel): PO/PM
  - Evidência ideal a coletar: Lista de escopo MVP e critérios de aceite por UC.
  - Critério de encerramento: RFs criados ou UCs removidos do MVP explicitamente.

- POA-001
  - severity: MEDIUM | category: Permissões | impact: [UI, State]
  - affected_ids: [ACT-002]
  - Pergunta principal: O perfil “Gestor” é obrigatório no MVP ou pode ser omitido (somente Operacional/Admin)?
  - Follow-ups:
    1) Quais permissões específicas o Gestor precisa além do Operacional?
    2) Gestor acessa telas administrativas?
    3) Gestor pode editar CardTypes/IngressSources?
  - Quem responde (papel): PO/PM
  - Evidência ideal a coletar: Matriz de papéis e permissões.
  - Critério de encerramento: Papel definido com conjunto explícito de permissões ou confirmação de exclusão do MVP.

- POA-006
  - severity: MEDIUM | category: UX | impact: [UI, State]
  - affected_ids: [UC-002, UC-003, UC-005, UC-011, SCR-002, SCR-003, SCR-004, SCR-005, RTE-002, RTE-003, RTE-004, RTE-005]
  - Pergunta principal: Como alinhar o mapeamento UC ↔ telas/rotas: permitir múltiplas telas/rotas por UC ou ajustar o spec.md para refletir apenas uma principal?
  - Follow-ups:
    1) As telas secundárias devem aparecer na rastreabilidade oficial?
    2) Há necessidade de separar UCs por tela/rota?
    3) O spec.json pode aceitar múltiplas telas/rotas por UC?
  - Quem responde (papel): PO/UX/Arquiteto
  - Evidência ideal a coletar: Sitemap ou fluxo de navegação aprovado.
  - Critério de encerramento: Decisão registrada e alinhamento entre spec.md e spec.json.

- POA-002
  - severity: LOW | category: Fluxo | impact: [UI, State, Observabilidade]
  - affected_ids: [RN-006]
  - Pergunta principal: Quando não houver externalObjectIdPath/valor no payload, o sistema deve registrar warning ou apenas informativo no histórico?
  - Follow-ups:
    1) Existe algum nível de severidade para eventos de ingestão?
    2) O histórico precisa expor warnings no UI?
  - Quem responde (papel): PO/Operação
  - Evidência ideal a coletar: Política de logging/histórico do produto.
  - Critério de encerramento: Definição de severidade e comportamento do evento no histórico.

[3] PERGUNTAS AGRUPADAS POR SESSÃO (Roteiro)
- Sessão 1 (alta prioridade / blockers)
  1) POA-004: O Card deve armazenar cardTypeId próprio ou derivar do Board?
  2) POA-003: Mecanismo de autenticação/sessão (token/cookie/SSO, expiração e recuperação).

- Sessão 2 (regras e dados)
  1) POA-005: RFs para UCs administrativos ou retirar do MVP?
  2) POA-001: Papel Gestor no MVP e permissões.

- Sessão 3 (integrações e RNFs)
  1) POA-006: Alinhamento UC ↔ telas/rotas.
  2) POA-002: Semântica de warnings no histórico de ingestão.
