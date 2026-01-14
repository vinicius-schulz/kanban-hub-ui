# Domain Foundation — Hub Kanban Configurável (MVP)

## Vocabulário do domínio (entidades e Value Objects)

### Entidades
- **Módulo (Module)**: agrupador de processos/áreas do negócio, exibido na listagem inicial. (ENT-001)
- **Nó de Árvore (TreeNode)**: item navegável da árvore de um módulo; pode apontar para um board (folha). (ENT-002)
- **Board**: quadro Kanban associado a um CardType; configura colunas, labels e integrações. (ENT-003)
- **Coluna (Column)**: coluna de um board com posição/ordem definida pelo usuário. (ENT-004)
- **Card**: unidade de trabalho, com dados separados em buckets e histórico. (ENT-005)
- **CardType**: define layout e campos do card. (ENT-006)
- **CardTypeField**: definição de campo com binding em buckets (inputs/outputs/props). (ENT-007)
- **IngressSource**: configuração de entrada externa para criação/atualização de cards. (ENT-008)
- **Plugin (registro)**: catálogo de componentes visuais que podem ser usados nos cards. (ENT-009)
- **Webhook (Connector)**: conector de saída configurável com templates. (ENT-010)
- **Label**: etiqueta aplicável a cards em um board. (ENT-011)
- **Usuário (User)**: usuário com role e status. (ENT-012)
- **Histórico de Card (CardHistoryEntry)**: evento estruturado associado a um card. (ENT-013)

### Value Objects / Tipos comuns
- **ISODateString**: string em formato ISO 8601.
- **JSONValue**: tipo serializável para payloads e buckets de dados.

### Enums
- **CardTypeFieldType**: `string | number | date | boolean | enum | object | array`. (CardType.Field.type)
- **CardTypeFieldMode**: `editable | readonly`. (CardType.Field.mode)
- **PluginStatus**: `active | inactive`. (Plugin.status)
- **WebhookMethod**: `GET | POST | PUT | PATCH | DELETE`. (Webhook.method)

## Relacionamentos (evidentes no spec)
- TreeNode possui `parentId` (auto-relacionamento) e `boardId` para apontar a um Board. (ENT-002)
- Board referencia `cardTypeId`. (ENT-003 + RN-001)
- Card referencia `cardTypeId`. (ENT-005 + RN-001)
- IngressSource referencia `boardId`. (ENT-008)
- Label referencia `boardId`. (ENT-011)
- CardHistoryEntry é associado a um Card (relacionamento implícito pela natureza do histórico). (ENT-013)

## Invariantes e regras de consistência (evidentes)
- **RN-001**: Board e Card sempre possuem CardType (associação obrigatória). 
- **RN-002**: Dados do card devem ser separados em `sourceData`, `cardData.inputs`, `cardData.outputs`, `props` e `pluginData`.
- **RN-003**: Histórico de card deve registrar eventos com `type`, `summary`, `payload`, `createdAt`, `createdBy`.
- **RN-004**: Warnings não bloqueiam processamento; variáveis ausentes em templates devem resultar em `null`.
- **RN-007**: Plugin ausente no código não deve quebrar o card (falha tolerante no plugin).
- **RN-008**: Templates de webhook aceitam variáveis de ingress e do card.

## Decisões provisórias e lacunas (TBD/UNKNOWN)
- **IDs explícitos**: o spec não lista campos `id` nas entidades, mas são necessários para UI/state; tratados como IDs tipados (TBD-001).
- **Card.position**: RN-006 exige ordenação, porém o campo de posição não está definido no modelo. (POA-005, TBD-002)
- **Card.idempotencyKey**: RN-005 cita idempotência; campo não definido no Card. (POA-004, TBD-003)
- **Card.columnId / Card.boardId**: vínculo do card ao board/coluna não está explícito nos campos; necessário para Kanban (TBD-004).
- **Column.boardId**: associação da coluna ao board não está explícita nos campos (TBD-005).
- **Formato do CardType**: persistência da definição de CardType (JSON Schema vs modelo simplificado) está indefinida. (POA-003)
- **Role/Status de usuário**: enumerações não definidas; mantidas como string até decisão. (POA-002)

## STOP CONDITION
O domínio inclui entidades, enums e contratos necessários para suportar os fluxos iniciais:
- Listagem de módulos e navegação (Módulo + TreeNode).
- Abrir board e operar cards (Board, Column, Card, CardHistoryEntry).
- Configuração de board (CardType, IngressSource, Webhook, Label, Plugin).
Itens em aberto estão explicitamente marcados como TBD/UNKNOWN.
