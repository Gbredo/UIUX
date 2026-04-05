/* ── Mock de dados ─────────────────────── */
const colaborador = {
  nome:         "Dr. Roberto Alcantara",
  cargo:        "Diretor de Operações Logísticas",
  departamento: "Cadeia de Suprimentos",
  predio:       "Prédio Administrativo Central",
  andar:        "4º andar",
  sala:         "Sala 402-B",
  email:        "roberto.alcantara@empresa.com.br",
  telefone:     "(11) 3333-4444",
  celular:      "(11) 98888-7777",
};

/* ── Iniciais para avatar ──────────────── */
function iniciais(nome) {
  const partes = nome.replace(/^Dr\.\s*/i, "").split(" ");
  return (partes[0][0] + (partes[1]?.[0] ?? "")).toUpperCase();
}

/* ── Renderiza um item label + valor ───── */
function criarItem(label, valor, destaque = false) {
  const div = document.createElement("div");
  div.className = "profile-item";
  div.innerHTML = `
    <span class="item-label">${label}</span>
    <span class="item-value${destaque ? " highlight" : ""}">${valor}</span>
  `;
  return div;
}

/* ── Preenche o card ───────────────────── */
function renderCard(dados) {
  document.getElementById("avatar").textContent    = iniciais(dados.nome);
  document.getElementById("card-name").textContent = dados.nome;
  document.getElementById("card-role").textContent = dados.cargo;

  const identity = document.getElementById("group-identity");
  identity.appendChild(criarItem("Cargo",        dados.cargo));
  identity.appendChild(criarItem("Departamento", dados.departamento));

  const location = document.getElementById("group-location");
  location.appendChild(criarItem("Prédio", dados.predio));
  location.appendChild(criarItem("Andar",  dados.andar));
  location.appendChild(criarItem("Sala",   dados.sala));

  const contact = document.getElementById("group-contact");
  contact.appendChild(criarItem("E-mail",  dados.email,    true));
  contact.appendChild(criarItem("Fixo",    dados.telefone));
  contact.appendChild(criarItem("Celular", dados.celular));
}

renderCard(colaborador);
