# 1. Inventário de Estados (A Matriz de UX) - Cenário A

**Padrão:** O sistema exibe os dados atuais, mostrando o nível de umidade do solo em porcentagem e um gráfico da última semana, indicando que a lavoura está saudável.

**Carregando:** O sistema mostra que está processando a informação usando um *skeleton loading* (blocos cinzas no lugar dos gráficos) ou um ícone de carregamento giratório, garantindo que a tela não fique congelada.

**Vazio:** Caso seja um talhão recém-cadastrado que não gerou dados , a tela exibe uma ilustração simples de um campo vazio. A chamada para ação (*CTA*) é um botão escrito "Verificar Sensores" ou "Atualizar Status".

**Erro:** Se os sensores estiverem offline (sem internet) , a interface muda para um tom de alerta e exibe uma mensagem informando a falha. Para o usuário se recuperar, o sistema mostra os dados em cache (última vez que teve sinal) e um botão para "Tentar Reconectar".

**Sucesso:** Quando o carregamento termina ou a internet volta, a conclusão da tarefa é confirmada por uma notificação verde rápida (*toast*) no topo da tela.

---

# 2. Arquitetura de Microcopy (O Texto da Interface)

Labels (Rótulos e Botões):
  - Tentar Reconectar (Botão de ação no estado de Erro)Atualizar Status (Botão de CTA no estado Vazio)
  - Última medição: (Rótulo para informar os dados em cache no estado de Erro)

Mensagens de Erro amigáveis (sem jargões técnicos):
  - "Parece que a fazenda está sem sinal de internet no momento. Exibindo os dados da última sincronização." (Para o estado de Erro offline).
  - "Ainda não recebemos informações deste talhão. Verifique se os sensores estão ligados." (Para o estado Vazio de um talhão novo).

Mensagem de Sucesso:
  - "Sincronização concluída! Os níveis de umidade estão atualizados."

---

# 3. Wireframes de Estados (Esboço Visual)

https://www.figma.com/design/9gKXvEM573XBOaep99QPFc/wireframe--handoff-?node-id=0-1&t=DlOc4ZMs1faMNKEp-1

---

# 4. Critérios de Aceite (Handoff para os Desenvolvedores)

Regra 1 (Lidando com a falta de internet):
  - **Dado que** o produtor rural abre o aplicativo em uma área da fazenda sem internet,
  - **Quando** o sistema tenta buscar as informações de umidade do solo,
  - **Então** o sistema deve exibir os dados da última sincronização salva em cache e mostrar a mensagem de erro "Parece que a fazenda está sem sinal...".

Regra 2 (Lidando com o talhão recém-cadastrado):
  - **Dado que** o produtor acessa a tela de um talhão recém-cadastrado,
  - **Quando** os sensores ainda não tiverem enviado a primeira leitura de dados,
  - **Então** o sistema deve exibir o estado Vazio com a mensagem "Ainda não recebemos informações..." e o botão "Atualizar Status".

Regra 3 (Confirmação de reconexão):
  - **Dado que** o aplicativo estava offline mostrando dados em cache,
  - **Quando** o usuário clica em "Tentar Reconectar" e o sinal de internet é restabelecido,
  - **Então** o sistema deve carregar os dados novos e exibir a notificação de sucesso "Sincronização concluída!".
