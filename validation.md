[1] SCORE DE QUALIDADE (0 a 100)
**50/100**
- Dois BLOCKERS por campos citados em RN críticos não existirem no modelo de dados (/business_rules/4/involved_fields/1/field e /business_rules/5/involved_fields/0/field).
- Regras RN-005 e RN-006 são centrais para create/update e ordenação de cards; ausência de campos torna implementação ambígua.
- Falta de definição explícita de campos “idempotencyKey” e “position” impede validação e persistência coerentes.
- Não há POA existente cobrindo as lacunas de modelagem citadas, exigindo decisão do PO.
- Impacto direto em fluxo principal (ingestão e ordenação), elevando risco técnico.

[2] VEREDITO
- READY_FOR_IMPLEMENTATION: **false**
- BLOCKERS: **FIND-001, FIND-002**

[3] LISTA DE ACHADOS (por severidade)

**FIND-001**
- Severidade: **BLOCKER**
- Tipo: **Dados**
- Onde: RN-005; /business_rules/4/involved_fields/1/field = "idempotencyKey"; ausência em ENT-005 /data_model/entities/4/fields
- Problema: RN-005 referencia o campo ENT-005.idempotencyKey, mas o modelo ENT-005 não define esse campo.
- Evidência: RN-005 lista idempotencyKey em involved_fields (/business_rules/4/involved_fields/1/field), enquanto ENT-005 não possui esse campo (/data_model/entities/4/fields).
- Impacto: Define o comportamento create/update na ingestão (UC-006). Sem o campo, não há contrato de dados para garantir idempotência; implementação fica bloqueada.
- Ação recomendada: Definir explicitamente o campo (nome, tipo, obrigatoriedade) no ENT-005 ou ajustar a regra para usar campo existente; requer decisão via POA.

**FIND-002**
- Severidade: **BLOCKER**
- Tipo: **Dados**
- Onde: RN-006; /business_rules/5/involved_fields/0/field = "position"; ausência em ENT-005 /data_model/entities/4/fields
- Problema: RN-006 referencia o campo ENT-005.position para ordenação, mas o modelo ENT-005 não define esse campo.
- Evidência: RN-006 inclui position em involved_fields (/business_rules/5/involved_fields/0/field), enquanto ENT-005 não possui esse campo (/data_model/entities/4/fields).
- Impacto: Persistência e ordenação de cards por drag & drop ficam sem definição de contrato, bloqueando a implementação do RF-005/RN-006.
- Ação recomendada: Definir explicitamente o campo de ordenação (nome, tipo, semântica) no ENT-005 ou ajustar a regra; requer decisão via POA.

[4] CONTRADIÇÕES ENTRE REGRAS (RN)
- Nenhum conflito direto identificado entre as RNs fornecidas.

[5] GAPS CRÍTICOS (POAs NOVOS)

**POA-004**
- Pergunta objetiva: O Card deve possuir campo **idempotencyKey** (ou equivalente) para suportar a atualização idempotente no ingresso?
- IDs afetados: RN-005, ENT-005, UC-006, RF-012
- Por que é crítico: Sem definição explícita do campo, não há contrato para atualizar card existente com base em evento externo.
- Opções:
  - H1: Definir `idempotencyKey` (string) em ENT-005 e usá-lo como chave de atualização.
  - H2: Substituir por `externalObjectId` já persistido no card (renome/uso explícito), mantendo RN-005 alinhada.
  - H3: Definir chave composta (ex.: boardId+externalId) e documentar no modelo.
- Recomendação conservadora: **Negar atualização automática** até a chave de idempotência estar definida (modo seguro).

**POA-005**
- Pergunta objetiva: Qual é o campo de **ordenação de card** (ex.: `position`, `orderIndex`) e seu tipo/semântica?
- IDs afetados: RN-006, ENT-005, RF-005, UC-003
- Por que é crítico: A regra de ordenação e persistência depende do campo; sem isso, não há contrato para drag & drop.
- Opções:
  - H1: Definir `position` (number) em ENT-005 com ordenação estável por coluna.
  - H2: Definir `orderIndex` (number) + `columnId` e ordenar por par (columnId, orderIndex).
  - H3: Definir ordenação por timestamps de movimento, documentando a regra.
- Recomendação conservadora: **Persistir movimentos sem reordenar automaticamente** até o campo ser definido.

[6] RESUMO EXECUTIVO PARA O PRÓXIMO AGENTE
- Existem 2 BLOCKERS relacionados a campos ausentes no modelo de dados (idempotencyKey e position).
- RN-005 e RN-006 dependem desses campos para create/update e ordenação de cards.
- Criar/decidir POA-004 e POA-005 antes de implementar ingestão e drag & drop.
- Ajustar ENT-005 (Card) com campos e tipos definidos, ou revisar regras para usar campos existentes.
- Verificar alinhamento com UC-006 e RF-005/RF-012 após decisão.
- **NÃO PROSSEGUIR** até resolver os BLOCKERS.
