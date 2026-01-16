# Domain Model — Kanban Hub UI (Foundation)

## Vocabulário do domínio (entidades e VOs)
- **Module**: área/processo do negócio que contém a árvore e os boards.
- **ModuleNode**: nó da árvore do módulo (hierárquico) que pode apontar para um board.
- **Board**: quadro kanban com colunas, CardType e (opcional) IngressSource.
- **Column**: coluna do board, configurável e ordenável.
- **Card**: unidade de trabalho, com dados de entrada/saída, props, labels e pluginData.
- **CardHistoryEvent**: evento estruturado do histórico do card.
- **CardType**: contrato que define campos e exibição do card.
- **CardTypeField**: definição de campo do CardType (label, tipo, modo, binding).
- **Label**: etiqueta do board aplicada aos cards.
- **IngressSource**: configuração de ingestão de eventos externos.
- **WebhookConnector**: conector webhook configurável (execução manual no MVP).
- **PluginRegistry**: registro de plugins disponíveis para cards.
- **User**: usuário do sistema com papéis/permissões.
- **Session**: sessão autenticada (mock no MVP).

## Relacionamentos principais (via IDs)
- Module → ModuleNode (moduleId)
- ModuleNode → ModuleNode (parentId) e ModuleNode → Board (boardId)
- Board → Column (boardId)
- Board → CardType (cardTypeId)
- Board → IngressSource (ingressSourceId)
- Card → Board (boardId)
- Card → Column (columnId)
- Card → CardType (cardTypeId — provisório)
- Card → Label (labels[])
- Card → CardHistoryEvent (cardId)
- CardType → CardTypeField (cardTypeId)
- Label → Board (boardId)

## Invariantes e regras de consistência (evidenciadas)
- **RN-001**: Card sempre possui CardType associado (pendente POA-004 para o campo no Card).
- **RN-002**: Board sempre possui exatamente 1 CardType associado.
- **RN-003**: sourceData é somente leitura e só IngressSource escreve.
- **RN-004**: inputs/props editáveis; outputs readonly no MVP (exceto plugins).
- **RN-005**: todo evento relevante do card gera CardHistoryEvent.
- **RN-006**: IngressSource cria/atualiza card conforme externalObjectIdPath.
- **RN-007**: variáveis inexistentes em webhook viram null e geram warning no histórico.

## Decisões provisórias e lacunas (TBD/UNKNOWN)
- **POA-004**: `Card.cardTypeId` modelado como opcional até definição se o Card guarda o CardType ou deriva do Board.
- **POA-003**: estrutura de sessão/autenticação é mock; detalhes de token/expiração são TBD.
- **Label fields**: o spec não detalha atributos (ex.: cor). Mantido apenas `name`.
- **User roles/status**: valores e semântica de papéis/estado são TBD.
- **ModuleNode.moduleId / Column.boardId / Card.boardId/columnId**: relações necessárias para UI, derivadas do fluxo e descrições, mas não explicitadas no data_model.

## STOP CONDITION
O modelo cobre entidades e contratos suficientes para INC-001 e INC-002 (login mock, módulos, árvore e board read-only) e habilita a base para INC-003+ (cards, histórico, configurações e integrações mock). O restante permanece TBD.
