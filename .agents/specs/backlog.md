# CapacitaTE — Backlog e estado do projeto

> **Para o agente que continuar:** leia este arquivo depois de `CLAUDE.md`, `.agents/rules/guidelines.md`,
> `.agents/specs/capacitate-modular.md` e `.agents/specs/formularios.md` (estrutura oficial dos 3 formulários públicos,
> escrita pelo usuário; vale sobre os PDFs). Para a futura migração a um Supabase local: `.agents/specs/migracao-supabase-local.md`. Ele registra o que já foi feito, o que está aplicado no Supabase,
> o que falta e as decisões tomadas com o usuário. **Atualize-o a cada versão.**

Última atualização: 25/10/2026 · versão **v.4.3.7** · branch de trabalho `develop` (cada versão também é
sincronizada na `main`, que é o site publicado no GitHub Pages).

---

## 0. Retomada rápida (atualizada em 25/10/2026, versão v.3.9.9)

**Novidades após a retomada abaixo:** (a) e-mail de confirmação **funcionando** (segredos do Gmail cadastrados; 0004e e 0004f
aplicadas; testado pela auditoria `net._http_response` = 200). (b) **v.3.9.9 — Lixeira:** botão Excluir em inscrições,
presenças e avaliações; a resposta vai para `public.deleted_responses` e pode ser restaurada (seção "Lixeira" de cada
módulo). Migração **0004g aplicada** pelo usuário. RPCs `staff_delete_response(p_table, p_id)` e `staff_restore_response(p_deleted)`;
exigem edição no módulo; auditoria `submission.delete`/`submission.restore`. Testado com a conta robô (excluir, restaurar,
anônimo bloqueado). Restaurar falha se já houver resposta ativa do mesmo CPF.

**v.4.0.0:** botão "Excluir permanentemente" (com confirmação) na Lixeira; RPC `staff_purge_response`, auditoria `submission.purge`. **Migração 0004h pendente: o usuário precisa rodá-la no SQL Editor** (sem ela o botão dá erro).

**v.4.0.1:** o Painel de vagas (Inscrição) tem "Adicionar cidade convidada" (UF + cidade do catálogo IBGE): grava em `training.municipalities` (Etapa 2 do cadastro) e atualiza as cidades do formulário. Sem teste automatizado na interface (só `node --check`); o usuário deve conferir.

**v.4.0.2:** o e-mail de confirmação chegava com cabeçalhos no corpo (o denomailer quebrava o assunto acentuado longo). A função `enviar-confirmacao` agora usa `npm:nodemailer` e envia versão texto e HTML. Função reimplantada e **testada pelo usuário em 25/10/2026: o e-mail chega correto (Outlook, tema escuro)**. Resta testar presença e avaliação.

**v.4.0.3 (Fase 5, parte 1):** Relatório etapas 7 e 8 com "Usar dados do CapacitaTE" (`app.importFromCapacitaTE`, `xlsxExport.fetchRows`; mesmas linhas da exportação entregues ao mesmo parser; `training.sources.*` = capacitate|arquivo). Etapa 11 mostra a fonte e 4 conferências cruzadas (`crossCheckIssues`). Testado: ida e volta exportação→parser em node e a lógica das conferências; botões não testados no navegador.

**v.4.0.4:** Configurações › Conexão com a Nuvem não exige mais que cada pessoa informe endereço e chave: o site já usa o projeto padrão (`js/core/config.js`) e o card mostra "Conectado automaticamente"; os campos ficaram em "Avançado" (instalações próprias).

**v.4.0.5:** (a) Reorganização pedida pelo usuário: o **Relatório final** saiu da página da capacitação e virou aba de **Relatórios** (nova tela `view-report-final`, `app.renderReportFinal`); a página `#capacitacao/<id>` tem 3 etapas: 1 Cadastro e inscrição, 2 Presença, 3 Avaliação (cada uma com o seu formulário e a sua exportação). (b) Admin ganhou as abas **Pessoas** (busca, edição, histórico) e **Importar base** (mapeamento de colunas, pré-visualização, política de conflito, lotes de 500, planilha de rejeitadas). (c) Criadas, **sem aplicar**: `0004h_lixeira_excluir_definitivo.sql` (precisa ser rodada: botão Excluir permanentemente), `0004i_pessoas_importacao.sql` (precisa ser rodada: Pessoas e Importar), `0005_rls_endurecida.sql` (só depois do checklist em `publicacao-e-seguranca.md`). Nada disso foi testado no navegador nem contra a nuvem (as funções SQL novas dependem de o usuário aplicar as migrações).

**v.4.1.0 (fechamento do escopo combinado):** Modo recepção (botão no cartão de cada formulário: QR em tela cheia), inclusão manual de respostas (inscrição e presença, via `staff_submit`, testada na nuvem), barras na prévia da avaliação, `scripts/testes-formularios.html` e `node scripts/testes-formularios.js` (16/16), checklist de segurança em Configurações (verificações ao vivo).

**v.4.1.1:** o botão Excluir da lista de capacitações (e `openConfirmDeleteModal`) só aparece e funciona para administrador (`app.canDeleteTraining`); antes qualquer usuário via. Correção pedida pelo usuário; o banco só passa a impor isso com a 0005.

**v.4.1.2:** sincronização automática (`app.startAutoSync`): 4 s após abrir, a cada 2 min com a aba visível, ao voltar para a aba e ao recuperar a internet; só com login; usa `syncWithCloud({silent:true})` (sem aviso se nada mudou, não recarrega o assistente enquanto a pessoa digita; trava contra execuções simultâneas). Não testada ao longo do tempo no navegador.

**v.4.1.3:** Painel de vagas (Inscrição): "Adicionar por planilha" (colunas Município e UF, ou Código IBGE; ignora as que já existem e informa as não encontradas) e "Baixar planilha modelo" (aba Cidades com exemplos da UF da capacitação e aba Instruções). Lógica de busca testada em node; fluxo de arquivo não testado no navegador.

**v.4.1.4:** as cidades do formulário se atualizam sozinhas quando a lista da capacitação muda (quem pode editar, ao abrir/atualizar a tela; uma tentativa por lista nova; se falhar, o aviso com o botão continua). Não testada no navegador.

**v.4.1.5:** (a) Admin › Importar base ganhou "Importar também como respostas de uma capacitação" (RPC `admin_import_responses`, migração **0004j**): inscrição, presença (dia pelo carimbo, fuso de Brasília) e avaliação (notas pelas colunas `[item]`), mantendo o carimbo original, sem e-mail, repetidas ignoradas. (b) Prévia da avaliação: distribuição da nota geral e palavras mais citadas. Nada testado no navegador nem na nuvem (a 0004j não foi aplicada).

**v.4.1.6:** removidos os botões "Voltar a rascunho" e "Gerar novo link" dos 3 formulários (a RPC `staff_rotate_token` continua no banco, sem uso na tela); o modo recepção agora abre ao clicar no QR Code (botão da barra removido). Não testado no navegador.

**v.4.1.7:** Painel de vagas: a planilha de cidades agora abre uma janela de confirmação com as cidades encontradas para marcar/desmarcar antes de importar (e avisos de repetidas e não encontradas); novo botão "Excluir cidades..." (escolhe e confirma; inscrições já feitas não são apagadas); a UF escolhida no seletor vale para as linhas da planilha sem UF. Não testado no navegador.

**v.4.1.8:** corrigido o "Marcar todas" das janelas de cidades (o atualizador do contador desmarcava a própria caixa no meio do laço; lógica reproduzida e testada em node).

**v.4.1.9:** o município sede (flag `isSede` ou nome do polo na UF da capacitação) não pode ser excluído em "Excluir cidades..." (caixa desabilitada com a nota "município sede"; a gravação também ignora a sede). Não testado no navegador.

**v.4.2.0:** removido o botão "Encerrar" dos 3 formulários (sem Encerrar e sem Voltar a rascunho, o estado só avança de rascunho para aberto; `updateForm` ainda aceita status se for preciso). Na tela de Inscrição o Painel de vagas (com a importação/adição/exclusão de cidades) vem primeiro; o cartão do formulário (QR Code, link) fica logo abaixo. Não testado no navegador.

**v.4.2.1:** o seletor de UF do Painel de vagas começa em "Selecionar UF" (antes vinha GO); a lista de cidades fica desabilitada até escolher a UF. Na planilha, linhas sem UF usam a UF escolhida ou, se nenhuma, a da capacitação.

**v.4.2.2:** carregamento (barra animada, tempo mínimo de 0,7 s) ao ler a planilha de cidades, ao adicionar e ao excluir cidades (`showBusy` em `formularios/base.js`). Não testado no navegador.

**v.4.2.3:** Painel de vagas com coluna UF e linhas compactas (`table-compact`; `c.table(headers, rows, empty, extraClass)`). Não testado no navegador.

**v.4.2.4:** removido o rótulo "UF" solto ao lado do seletor de UF no Painel de vagas (o seletor já diz "Selecionar UF").

**v.4.2.5:** depois da barra de carregamento (importar cidades por planilha e excluir cidades), aparece a confirmação "Concluído" com a mensagem e o botão Continuar; a lista só atualiza depois do clique (`showBusy` devolve `done(mensagem)`, `pickModal` aceita `afterClose`). Não testado no navegador.

**v.4.2.6:** Painel de vagas com a coluna "Código INEP" (código do município, igual ao IBGE de 7 dígitos) antes do Município. Interpretação do pedido "código INEP e a cidade": o usuário pode ter querido outra coisa (confirmar).

**v.4.2.7:** células e cabeçalhos do Painel de vagas centralizados (`.table-compact`).

**v.4.2.8:** a barra de carregamento das cidades agora é de 0 a 100% com porcentagem na tela e duração mínima de 1,5 s (sobe até 90% com o tempo e fecha em 100% quando o trabalho termina). O usuário escreveu "0 a 10%"; interpretado como 0 a 100% (confirmar).

**v.4.2.9:** Painel de vagas com a coluna "Distância da sede" (km em linha reta, via `convocacaoParser.calculateDistanceToPolo`; "Sede" para o polo). Cidades adicionadas pelo painel (avulsa e planilha) já gravam `distanceKm` calculado (antes ficava 0). Não testado no navegador.

**v.4.3.0 (revisão geral, 25/10/2026):** varredura no navegador automático (conta robô) de Dashboard, Capacitações, Relatórios (3 abas), Configurações, Administração (5 abas), etapas 1-3 da 16ª e assistente (etapas 1, 3, 7, 8, 11, 12): sem erros de JavaScript. Achados e correções:
- A 0005 já está aplicada no banco (anon recebe 401). Antes do login o app tentava sincronizar, recebia 401 e mostrava "Modo Local (Offline)": `db.syncFromCloud` agora só roda com login (ou no modo de transição).
- **A 17ª CTE (`cap_1792950620999`) não existe mais na nuvem**: entre 21:13 e 21:17 de 25/10 ela foi excluída pelo botão Excluir da lista (único caminho que apaga na nuvem); a exclusão apagou em cascata os formulários e as respostas. Se ainda existir no navegador do usuário, a sincronização a reenviaria, mas os formulários/respostas não voltam.
- Exclusão de capacitação: o aviso dizia "banco de dados local"; agora diz que apaga também na nuvem com formulários e respostas (sem Lixeira). A exclusão passa a ser registrada na auditoria (`training.delete`) e, se a nuvem recusar, o usuário é avisado (antes o erro era engolido e a capacitação voltava na sincronização).
- Limpeza antiga `cap_16cte_pontes_lacerda` no início agora é só local.
- Observação: usuário não administrador só vê as capacitações em que tem permissão (0005); capacitações locais fora dessa permissão contam como "falha" ao sincronizar.

**v.4.3.1:** páginas públicas dos formulários voltam a abrir no tema **claro** por padrão; botão "Modo escuro/claro" no canto superior direito, escolha lembrada no navegador (`publico/publico-tema.js`, carregado no `<head>`; `publico.css` com `:root[data-theme="dark"]`). Testado em navegador automático (claro por padrão, clique alterna e salva). Substitui o "escuro por padrão" da v.3.9.7.

**v.4.3.2:** os formulários de inscrição, presença e avaliação já nascem **abertos** (`createForm` grava `status: aberto`; textos e aviso atualizados). Atenção: o link já recebe respostas antes de a pessoa conferir a configuração. Não testado no navegador.

**v.4.3.3:** a exportação (e o "Usar dados do CapacitaTE") da presença agora preenche nascimento, telefone, município, categoria e cargos de quem já era inscrito, buscando na inscrição e no cadastro de pessoas (`xlsxExport.attendanceRowsComplete`). Isso muda a decisão da v.3.9.6 de deixar essas colunas em branco para inscritos (como no formulário original do Google); `attendanceRows` padrão continua em branco e o `validar-exportacao.html` segue válido. Testado em node com dados simulados.

**v.4.3.4:** quadro de frequência sem a coluna "% presença": agora a coluna é "Certificado" (Sim se esteve presente em pelo menos um dia; regra do usuário: um dia já basta). O filtro "Somente faltosos" virou "Inscritos sem nenhuma presença". O relatório Word/estatísticas não foram alterados (continuam com as taxas de participação próprias).

**v.4.3.5:** a importação de municípios por planilha usa **a mesma janela** em todos os lugares (assistente, Banco de municípios e Painel de vagas, contexto `painel` em `openImportMunicipalitiesModal(ctx, training, onDone)`): conferência com contadores, distâncias a partir do polo, busca e marcação; ao confirmar mostra a barra 0-100% (mín. 1,5 s) e a tela "Concluído" com Continuar. "Baixar planilha modelo" dentro da janela e no painel. O "Importar por planilha" simplificado da v.4.1.3 foi removido. Testado no navegador automático (abrir pelo painel, ler planilha de 3 linhas, barra, confirmação, Continuar, gravação e atualização do formulário simuladas sem tocar nos dados).

**v.4.3.6:** removido o resumo "N presentes hoje / N inscritos · dia: N" do cartão do formulário de presença (o quadro de frequência continua mais abaixo).

**v.4.3.7 (revisão geral final, 25/10/2026):** testes do núcleo 34/34, formulários 16/16, sintaxe de todos os JS OK; varredura no navegador automático de todas as telas (painel, Relatórios, Configurações, Administração, etapas da 17ª, assistente) e das 3 páginas públicas reais da 17ª (claro e escuro) sem erros de JavaScript. Banco: 0004h, 0004i, 0004j e 0005 aplicadas (funções respondem; anon recebe 401). Corrigido: o convite do formulário de inscrição ficava congelado com a quantidade de municípios e o estado do momento da criação ("1 municípios do Estado de Goiás"); agora acompanha a lista ("23 municípios dos Estados de Goiás e Mato Grosso"), inclusive nos formulários antigos (corrigido ao abrir a tela; o da 17ª já foi corrigido).

**v.4.3.8:** migração para Supabase local preparada: `.env.example` com blocos A (Supabase que o app usa) e B (migração: `ORIGEM_DB_URL`, `DESTINO_DB_URL`, `DESTINO_CONFIRMACAO_URL`, `PG_IMAGEM`); `.env` do usuário refeito no novo modelo (nuvem antiga guardada em comentário); `migrar-para-local.bat` + `scripts/migrar-para-local.js` (pg_dump/psql via Docker; copia estrutura, dados e usuários do login com senhas). **Não testado:** nesta máquina não há Docker nem Supabase local ainda.

**v.4.3.9:** migração pode rodar no próprio servidor do Supabase (porta 5432 fechada para fora): `PG_REDE` no .env põe o container do pg_dump/psql na rede do docker do Supabase (host `db`); sem ela, `--add-host=host.docker.internal:host-gateway` (Linux). .env do usuário conferido: ORIGEM via Session pooler aws-0-us-east-1 testada (PG 17, 4 usuários).
Situação dos dados: a 17ª CTE voltou à nuvem (sincronizada do navegador do usuário) com os 3 formulários abertos; há **duas capacitações "18"** (`cap_1792964120170` e `cap_1792963949609`) e uma sem número (`cap_1792963109769`) — conferir duplicidade; 3 pessoas "Teste Automatizado" ainda no banco.

**E-mails (25/10/2026, 18:27-18:29):** os 3 e-mails de confirmação (inscrição, presença e avaliação da 17ª CTE) chegaram corretamente ao usuário: validado de ponta a ponta. A 17ª CTE foi recadastrada pelo usuário depois da exclusão acidental.

**Pendências finais (25/10/2026):**
1. **Usuário, SQL Editor, nesta ordem:** `0004h`, `0004i`, `0004j` (botões Excluir permanentemente, Pessoas/Importar base, Importar respostas históricas).
2. **Usuário, conferir no navegador** (tudo o que foi feito desde a v.4.0.3 foi validado só por sintaxe e testes de SQL/REST): Relatórios › Relatório final; etapas 2 e 3; adicionar cidade (manual e por planilha) e atualização automática das cidades do formulário; Excluir/Lixeira/Restaurar; Modo recepção; Incluir manualmente; gráficos da avaliação; checklist; Admin › Pessoas e Importar base (incluindo respostas históricas com a planilha de uma capacitação antiga); sincronização automática; Excluir capacitação só para administrador.
3. **Usuário:** testar e-mails de presença e avaliação (só o de inscrição foi validado).
4. **Segurança final:** com o checklist todo OK, `0005_rls_endurecida.sql` (reverter: bloco no fim do arquivo) e religar o limite de tentativas (`update app_settings set value='true' where key='rate_limit_enabled'`).
5. **Limpeza:** apagar as pessoas "Teste Automatizado" (SQL na seção 5).
6. **Permissões:** a conta "Matheus Morato" (perfil Usuário) precisa das permissões em Administração › Permissões.
7. **Não feito:** nuvem de palavras em imagem (a prévia usa lista de palavras com tamanho proporcional; a nuvem completa continua no Relatório); testes automatizados das páginas públicas no navegador.

## 0.1 Retomada anterior (troca de sessão/conta em 25/10/2026, versão v.3.9.7)

**Onde paramos:** Fases 0–4 concluídas; Fase 3 com pendências menores; Fases 5 e 6 por fazer. A última entrega foi a
v.3.9.7 (formulários conforme `formularios.md`, PDF, tema escuro, limite de tentativas desligado).

**Primeiro, confirme com o usuário se ele já fez (e teste em seguida):**
1. Segredos `GMAIL_USER` e `GMAIL_APP_PASSWORD` em Edge Functions > Secrets (sem eles a função `enviar-confirmacao`
   responde "Configure GMAIL_USER..."). Teste: chamar `POST /functions/v1/enviar-confirmacao` com
   `{"table":"registrations","record":{"id":"<id>"}}` de uma inscrição real e ver `answers.email_sent_at` e `audit_log`
   (`email.sent`/`email.error`). A inscrição do usuário na 17ª CTE (`cap_1792950620999`, e-mail matheus.h.h@hotmail.com)
   ainda não recebeu e-mail.
2. Migrações **0004e** (gatilhos pg_net do e-mail) e **0004f** (limite desligado; regras de nome/nascimento) no SQL Editor.
   Teste da 0004e: inscrição nova em formulário de teste → `answers.email_sent_at` preenchido em poucos segundos.
3. Limpeza das pessoas "Teste Automatizado" (SQL na seção 5).

**Próximas tarefas, em ordem sugerida:**
1. Fase 5 (seção 13 da especificação): etapas 7 e 8 do Relatório com "Usar dados do CapacitaTE" (montar as linhas no
   formato de `xlsxExport.registrationRows/attendanceRows/evaluationRows` e passar ao mesmo
   `excelParser.parseRegistrationRows/parseAttendanceRows/parseEvaluationRows`); registrar `data.sources.*`; conferências
   cruzadas na etapa 11; Admin › Importar base e Admin › Pessoas (seção 7.3/7.4); RPC `admin_import_people`.
2. Fase 6: migração 0005 (RLS endurecida em `trainings`/`master_team`, revogar anon), checklist em Configurações,
   religar o limite de tentativas (`app_settings.rate_limit_enabled = 'true'`) antes de divulgar amplamente.
3. Pendências menores: inclusão manual de respostas (`staff_submit`, já existe no SQL), modo recepção (QR no telão),
   gráficos/nuvem de palavras na prévia da avaliação, `scripts/testes-formularios.html` (seção 4.5 do `formularios.md`).

**Como o usuário prefere trabalhar:** português; respostas objetivas; configuração do Supabase por SQL para colar no
SQL Editor; cada versão vai para `develop` e para `main` (merge num `git worktree` temporário, nunca `git checkout main`
na pasta dele); atualizar este backlog em toda versão.

**Mapa rápido do código:**
| O quê | Onde |
|---|---|
| Núcleo (config, client, router, registro, auth, permissões, QR, exportação, esquema dos formulários) | `js/core/` |
| Página da capacitação (3 etapas) | `js/modules/capacitacao/module.js` |
| Telas de inscrição/presença/avaliação | `js/modules/formularios/base.js` + `js/modules/{inscricao,presenca,avaliacao}/module.js` |
| Administração | `js/modules/admin/` |
| Relatório (assistente de 12 etapas, modo cadastro) | `js/app.js` (`openWizard(id, passo, { mode })`) + `js/modules/relatorio/module.js` |
| Páginas públicas | `publico/` (motor `publico.js`, esquema em `js/core/formSchema.js`) |
| SQL | `supabase/migrations/0001…0004f` e `supabase/schema.sql` (tudo, idempotente) |
| Edge Functions | `supabase/functions/admin-invite-user`, `supabase/functions/enviar-confirmacao` |
| Modelos de e-mail do Auth | `supabase/templates/` |
| Testes | `scripts/testes-core.html` (+ `node scripts/testes-core.js`), `scripts/validar-exportacao.html` (servidor local) |

**IDs úteis:** 16ª CTE `cap_1792886367131` (Pontes e Lacerda/MT); 17ª CTE `cap_1792950620999` (Goiânia/GO, formulários
do usuário em rascunho, incluindo 2 formulários de presença por dia do modelo antigo, que ele pode excluir).

## 1. Decisões combinadas com o usuário

- **develop e main juntas:** toda versão concluída vai para a `develop` e, em seguida, merge `--no-ff` na `main`
  com a mensagem `v.X.Y.Z: sincroniza branch main com a develop (...)`. A `main` é o site no ar:
  https://mathmorato.github.io/CapacitaTE/
- **Senhas:** o admin **não** vê nem define senhas de outros (removido na v.3.8.2). Cada pessoa cria a senha pelo
  link do convite ou por "Esqueci minha senha". Criar/trocar senha exige digitar duas vezes e força mínima
  "Razoável" (v.3.8.9).
- **Administrador Chefe** (coluna `profiles.is_superadmin`): só `morato@ufg.br`. Só ele exclui usuários e altera
  nomes de outros. Não pode ser rebaixado, desativado nem excluído. O papel só muda pelo SQL Editor.
- **Admins:** `morato@ufg.br` (Administrador Chefe), `jose.souza@discente.ufg.br` e a conta de testes
  `morato+robo@ufg.br` (admin, criada pelo usuário para os testes automatizados do agente; a senha fica com o
  usuário — peça a ele se precisar, nunca grave em arquivo).
- **E-mails:** enviados pelo SMTP do Gmail da conta `morato@ufg.br`, com remetente `cecate@ufg.br` (alias já
  autorizado no Gmail). Resend e domínio próprio foram descartados (sem custo e sem depender da TI).
  Modelos em português em `supabase/templates/` (os seis foram colados no Supabase pelo usuário).
- **Segundo fator** dos formulários públicos: data de nascimento (ou e-mail, se não houver data). Não remover sem
  decisão explícita do usuário (LGPD).
- **Sem domínio próprio por enquanto**; Site URL = GitHub Pages.
- **Limite de tentativas desligado** (25/10, o usuário estava testando e foi bloqueado): `app_settings.rate_limit_enabled = 'false'`.
  Religar antes de divulgar amplamente (risco: tentativa de datas de nascimento para ver dados de outra pessoa).
- **Presença em formulário único** (decisão do usuário no chat, posterior ao `formularios.md`, que ainda fala em um token por sessão): a "sessão" é o dia do envio.
- **Formulários públicos em tema escuro por padrão** e comprovante em **PDF** (não imagem).
- **Configuração do Supabase sempre por SQL** (arquivo em `supabase/migrations/` para colar no SQL Editor). Telas do painel
  só para o que o SQL não alcança (publicar Edge Function, segredos das funções, SMTP e modelos de e-mail do Auth).

## 2. Configuração do Supabase (projeto `tjvhbkhttxbjajcznfrp`, organização CECATE-CO)

| Item | Situação |
|---|---|
| Migração 0002 (login, perfis, permissões, auditoria) | ✅ aplicada |
| Migração 0002b (Administrador Chefe) | ✅ aplicada |
| Migração 0003 (pessoas, formulários, respostas) | ✅ aplicada |
| Migração 0004 (funções públicas dos formulários) | ✅ aplicada |
| Migração 0004b (Meu perfil, foto, limite de tentativas, textos "Administrador Chefe") | ✅ aplicada (25/10) |
| Migração 0004c (notas da avaliação com itens padrão) | ✅ aplicada (teste de 25/10 gravou as 7 notas) |
| Migração 0004d (presença em formulário único; registro por dia do envio) | ✅ aplicada (teste de 25/10: session_key = dia do envio) |
| Edge Function **`enviar-confirmacao`** (e-mail após inscrição, presença e avaliação) | ✅ publicada (Verify JWT desligado) · ⏳ **faltam os segredos** `GMAIL_USER` e `GMAIL_APP_PASSWORD` (a função responde "Configure GMAIL_USER...") |
| Migração **0004e** (gatilhos pg_net que chamam a função; substituem os Database Webhooks do painel) | ⏳ **pendente** — o usuário precisa rodar |
| Migração **0004f** (limite de tentativas desligado por padrão, liberação dos bloqueados, nome com 2 palavras, nascimento ≥ 1920) | ⏳ **pendente** — o usuário precisa rodar |
| Migração 0005 (RLS endurecida: tirar acesso anônimo de `trainings`/`master_team`) | ⏳ não escrita (Fase 6) |
| Edge Function `admin-invite-user` (só ação `invite`) | ✅ publicada pelo painel, "Verify JWT" desligado |
| SMTP Gmail (smtp.gmail.com:465, user morato@ufg.br, remetente cecate@ufg.br) | ✅ |
| Site URL `https://mathmorato.github.io/CapacitaTE/` + Redirect URLs (Pages, localhost:*, 127.0.0.1:*) | ✅ |
| Modelos de e-mail em português (6) | ✅ |
| Cadastro aberto desligado (`disable_signup: true`) | ✅ conferido pela API |

Ordem para um projeto novo: `supabase/schema.sql` contém tudo (idempotente). Depois, primeiro admin com
`select public.bootstrap_admin('email');` e `update public.profiles set is_superadmin = true where email = '...';`.

## 3. Fases da especificação (seção 14)

| Fase | Situação | Versões |
|---|---|---|
| 0. Renomeação | ✅ | v.3.7.7 |
| 1. Núcleo modular (core, registro de módulos, router, menu gerado) | ✅ docx da 16ª CTE idêntico ao da v.3.7.6 | v.3.7.8 |
| 2. Login e permissões | ✅ testado no Supabase real | v.3.8.0 – v.3.8.5, v.3.8.7 |
| 3. Pessoas e formulários | 🔶 em andamento (falta inclusão manual, modo recepção, gráficos da avaliação, teste em celular real) | v.3.8.6 – v.3.9.0 |
| 4. Exportação .xlsx no formato Google Forms | ✅ teste 12.4: 18/18 (`scripts/validar-exportacao.html`) | v.3.9.6 |
| 5. Integração com o Relatório + importação da base | ⏳ | |
| 6. Segurança final (0005, checklist) | ⏳ | |

### Fase 3 — detalhamento

- ✅ Banco: 0003 e 0004 (+ correções 0004b e 0004c).
- ✅ Funções públicas testadas no Supabase real (formulário, CPF, segundo fator, duplicidade, fechado, LGPD,
  bloqueio de leitura anônima, auditoria com CPF mascarado).
- ✅ Páginas públicas `publico/inscricao.html`, `presenca.html`, `avaliacao.html` + `publico.js`/`publico.css` +
  `js/core/formSchema.js`. Teste ponta a ponta no Chrome a 360 px: inscrição, presença de inscrito (tela verde) e
  avaliação funcionam; claro e escuro OK.
- ✅ **Reorganização pedida pelo usuário (v.3.9.0):** o trabalho segue 3 etapas por capacitação, na página
  `#capacitacao/<id>/<etapa>` (`js/modules/capacitacao/module.js`), aberta pelo botão "Abrir" na lista de
  Capacitações e no Dashboard:
  1. **Cadastro e inscrição:** resumo dos dados da capacitação (botões para o assistente) + formulário de inscrição.
  2. **Presença e avaliação:** sessões de presença (uma por dia, criadas pelas datas, ou avulsas) + avaliação +
     cartão "Exportar em Excel" (botões desativados até a Fase 4).
  3. **Relatório final:** progresso e atalhos para o assistente de 12 etapas.
  **Cadastro inicial (v.3.9.1)** = só a identificação + as cidades convidadas: `app.openWizard(id, passo, { mode: 'cadastro' })`
  mostra apenas as etapas 1 e 3 do assistente (exibidas como "Etapa 1/2 do cadastro"), avança 1 → 3 sem exigir as
  etapas do relatório e "Concluir cadastro" leva a `#capacitacao/<id>/1`. "Nova Capacitação" já abre nesse modo.
  O restante (equipe, estrutura, fotos etc.) fica no Relatório final (modo normal, 12 etapas, numeração original). As cidades podem mudar depois do
  link gerado: o cartão do formulário mostra um aviso em destaque e atualiza a lista sem trocar link nem QR.
  Menu: Dashboard, Capacitações, **Relatórios** (abas Equipe Técnica | Estrutura do Curso), Administração,
  Configurações. Inscrição/Presença/Avaliação não têm item próprio no menu (registro com `menu: []`), mas
  continuam na matriz de permissões.
- ✅ Telas internas (`js/modules/formularios/base.js` + `inscricao|presenca|avaliacao/module.js`): criar formulário
  (municípios convocados e texto de apresentação automáticos), abrir/encerrar/rascunho, agendamento, configuração,
  link + QR (SVG, PNG 1024, SVG, cartaz A4), "Gerar novo link"; inscrição: painel de vagas e lista com
  cancelar/restaurar; presença: quadro de frequência e exclusão de registros; avaliação: médias por item
  (geral, CACS, Gestão), taxa de resposta e exclusão. Atualização automática a cada 30 s.
- ✅ QR: `js/vendor/qrcode.min.js` (qrcode-generator 1.4.4, MIT) + `js/core/qr.js`.
- ✅ **Fase 4 (v.3.9.6):** `js/core/xlsxExport.js` gera as 3 planilhas com abas, cabeçalhos (copiados das originais
  de `input/`, inclusive espaços, `
` e `

`), formatos e a aba "Inscritos" com COUNTIF/COUNTIFS e valores em
  cache. Datas gravadas como número de série calculado do dia/hora de parede (o SheetJS deslocava em 1 h datas de
  épocas com horário de verão: 19/02/2006 virava 18/02/2006 22:59). Botões na etapa 2 (permissão `export`, auditoria).
  Teste `scripts/validar-exportacao.html` (abrir por servidor local): cabeçalhos, valores, ExcelParser e StatsEngine.
- ✅ A pedido do usuário (v.3.9.6): removidos "Cancelar/Restaurar" das inscrições e "Excluir" dos registros de presença.
- ✅ **Formulários conforme `formularios.md` (v.3.9.7):** `FORM_SCHEMAS` em `js/core/formSchema.js` (seções, `showIf`,
  `exportHeader`), renderizador único em `publico/publico.js`: faixa "CPF: ***.xxx.xxx-** — trocar", resumo com "editar"
  antes de enviar a inscrição, seções condicionais limpas ao trocar a categoria, erro do servidor leva ao campo,
  "Outro:" na avaliação, legendas "1 = ruim / 5 = excelente", títulos dos comprovantes, botão "Confirmar presença".
  Tema escuro padrão; comprovante em PDF gerado no navegador (sem biblioteca; Helvetica/WinAnsi). Pendente:
  `scripts/testes-formularios.html` pedido na seção 4.5 do `formularios.md` (os testes ponta a ponta cobrem os fluxos).
- ⏳ **Próximo:** Fase 5 (Relatório usando os dados do CapacitaTE nas etapas 7 e 8 + importação da base) e Fase 6
  (segurança final, migração 0005). Pendências menores: inclusão manual (`staff_submit`), modo recepção, gráficos.
- ⏳ Teste em celular real (QR lido pela câmera) — só o usuário pode fazer.
- ⏳ Permissões: os módulos novos devem se registrar com `actions` para aparecerem na matriz de permissões.

## 4. Também entregue (pedidos do usuário fora da especificação)

- Superadmin → "Administrador Chefe"; renomear e excluir usuários (v.3.8.5, v.3.8.7).
- Usuário no menu lateral (foto/iniciais, nome, papel) com menu "Editar perfil" / "Sair" (v.3.8.7).
- "Meu perfil": nome, e-mail (confirmação por link) e foto 160×160 guardada em `profiles.avatar` (v.3.8.7).
- Tela de carregamento ao abrir o painel (v.3.8.9).
- Convite com permissões por lista suspensa (nível por módulo) e perfis prontos (v.3.9.0).
- **Formulários públicos no desenho dos Google Forms do CECATE (v.3.9.2)**, a partir dos PDFs enviados pelo usuário:
  rótulos exatos ("Nome Completo:", "Confirme o E-mail", "Município que representa:", "CPF:  XXX.XXX.XXX-XX" etc.),
  seções condicionais "Gestores" e "CACS-FUNDEB", presença com cabeçalho "Polo - UF" + datas + texto de boas-vindas
  e seção "Inscrição" com o segundo telefone, avaliação com as seções "AVALIAR", "Instituição vinculada:" (obrigatória)
  e "CECATE". Diferenças mantidas de propósito: CPF primeiro (auto-preenchimento) e caixas de veracidade/LGPD.
  Texto de apresentação da inscrição com "convoca" e os canais de contato (inclui e-mail cecate@ufg.br).
- Modais "Sair do preenchimento": barra de carregamento animada e tempo mínimo de 1,2 s (v.3.9.2).
- **Presença em formulário único (v.3.9.3, decisão do usuário):** um link/QR para todos os dias. Com
  `session_key = 'unico'`, o servidor grava cada presença com o dia do envio (`_attendance_session`, fuso
  America/Sao_Paulo, migração 0004d); a pessoa registra presença em cada dia e o quadro de frequência tem uma
  coluna por dia. Formulários por dia criados antes ficam listados como "modelo anterior" (só excluir).
- **E-mail de confirmação (v.3.9.4, pedido do usuário):** Edge Function `enviar-confirmacao` chamada por Database
  Webhooks (trocados na v.3.9.5 por gatilhos pg_net da migração 0004e, URL em `app_settings`); relê o registro no banco pelo id (não confia no corpo recebido), envia pelo SMTP do Gmail (porta 465,
  remetente cecate@ufg.br) e marca `answers.email_sent_at` (envio único). Opção "Enviar e-mail de confirmação" por
  formulário (`config.sendEmail`, ligada por padrão). Auditoria `email.sent` / `email.error`. Limite do Gmail
  ~500/dia (usuário confirmou que não chega perto).
- Cartão do formulário em rascunho mostra aviso em destaque com "Abrir agora" (v.3.9.3): o usuário achou que a
  inscrição "não funcionava" porque o formulário estava em rascunho.
- Confirmação de senha e medidor de força (v.3.8.9).
- `input/` e `output/` fora do Git (v.3.7.9) — ainda estão no histórico antigo; reescrever só se o usuário pedir.

## 5. Pendências do usuário

0. **E-mail de confirmação:** criar os segredos `GMAIL_USER` e `GMAIL_APP_PASSWORD` em Edge Functions > Secrets e rodar a 0004e e a 0004f no SQL Editor.
1. Configurar o e-mail de confirmação: publicar `enviar-confirmacao` (Verify JWT desligado), segredos `GMAIL_USER` e `GMAIL_APP_PASSWORD`, e rodar `supabase/migrations/0004e_email_gatilhos.sql` (gatilhos no lugar dos webhooks, que no painel novo ficam em Integrations).
   Opcional: colar de novo os modelos de `supabase/templates/` (correção da faixa laranja do topo).
2. Abrir os formulários (estão em rascunho) quando quiser divulgar os links.
3. Limpar as pessoas de teste (SQL abaixo).
4. Testar no celular real e ler o QR.
5. Validar o texto de consentimento LGPD com a UFG (`formSchema.DEFAULTS.consentText`).
6. Enviar a base histórica de pessoas (Fase 5).

```sql
-- Limpeza dos dados de teste (pessoas "Teste Automatizado" criadas pelos testes do agente)
delete from public.evaluations  where cpf in (select cpf from public.people where full_name = 'Teste Automatizado');
delete from public.attendance   where cpf in (select cpf from public.people where full_name = 'Teste Automatizado');
delete from public.registrations where cpf in (select cpf from public.people where full_name = 'Teste Automatizado');
delete from public.people where full_name = 'Teste Automatizado';
```

## 6. Como testar (para o agente)

- Os testes rodam com Python + Chrome headless via CDP (scripts temporários no scratchpad da sessão, não versionados):
  login na API com a conta robô, criação de formulários temporários com `session_key = 'teste-e2e'`, navegação
  nas páginas públicas a 360 px e limpeza ao final (apagar os `forms` remove as respostas em cascata; `people`
  só sai pelo SQL acima).
- Regressão do Relatório: gerar o .docx da 16ª CTE com os dados de `input/` na versão atual e na v.3.7.6 e comparar
  `word/document.xml` (deve ser idêntico; duas imagens de páginas de PDF variam a cada execução, normal).
- `scripts/testes-core.html` e `node scripts/testes-core.js`: CPF, formatos, router, registro e permissões.
- SQL: validar com `pglast` (parser do Postgres) antes de entregar; o agente não executa SQL no projeto.

### Regras de segurança dos testes (obrigatórias — aprendidas em 25/10/2026)

- **Nunca apagar nem alterar dados que o teste não criou.** Em 25/10 um roteiro apagou um formulário de inscrição
  criado pelo usuário na 16ª CTE (recriado em seguida). Testes que criam formulários devem usar uma capacitação
  de teste própria ou conferir o `id` do que acabaram de criar antes de apagar.
- **Sincronizar a `main` sem trocar de branch na pasta do usuário:** em 25/10, `git checkout main` com a `main`
  local desatualizada apagou `input/` e `output/` do disco (eram rastreados nas versões antigas; restaurados com
  `git restore --source=75ed084 --worktree -- input output`). Use um `git worktree` temporário para o merge na `main`.

## 7. Problemas conhecidos

- O modal de confirmação do app (`openConfirmModal`) mostra "concluído" sem esperar ações assíncronas; na exclusão
  de usuários o resultado real aparece em um toast.
- Topbar pode quebrar o título em telas médias (cosmético).
- Aviso de cidades alteradas no cartão do formulário (v.3.9.0) não foi testado no navegador com dados reais (o teste foi interrompido para não mexer nos formulários do usuário).
