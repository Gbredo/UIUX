// Referências dos elementos principais
const featureInput = document.getElementById('feature-input');
const generateBtn = document.getElementById('generate-btn');
const addGroupBtn = document.getElementById('add-group-btn');
const backlogList = document.getElementById('backlog-list');
const workspace = document.getElementById('workspace');

// Variável global para saber qual card está sendo arrastado no momento
let draggedCard = null;

// 1. Iniciar a Dropzone do Backlog
setupDropZone(backlogList);

// 2. Gerar Cards a partir do Textarea
generateBtn.addEventListener('click', () => {
    const text = featureInput.value;
    if (!text.trim()) return;

    // Divide o texto por quebras de linha e remove linhas vazias
    const features = text.split('\n').filter(item => item.trim() !== '');

    features.forEach(featureText => {
        const card = createCard(featureText);
        backlogList.appendChild(card);
    });

    featureInput.value = ''; // Limpa o textarea
});

// 3. Criar Novo Grupo
addGroupBtn.addEventListener('click', () => {
    const group = document.createElement('div');
    group.classList.add('group');

    // Cabeçalho do grupo (Título editável + Botão de apagar)
    const header = document.createElement('div');
    header.classList.add('group-header');

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.classList.add('group-title');
    titleInput.value = 'Novo Grupo';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerText = 'X';
    
    // Lógica para deletar o grupo e devolver os cards para o backlog
    deleteBtn.addEventListener('click', () => {
        const cardsInside = groupList.querySelectorAll('.card');
        cardsInside.forEach(card => backlogList.appendChild(card));
        group.remove();
    });

    header.appendChild(titleInput);
    header.appendChild(deleteBtn);

    // Lista onde os cards serão soltos dentro do grupo
    const groupList = document.createElement('div');
    groupList.classList.add('card-list');
    setupDropZone(groupList); // Aplica a lógica de Drag and Drop na nova lista

    group.appendChild(header);
    group.appendChild(groupList);
    workspace.appendChild(group);
});

// --- FUNÇÕES AUXILIARES DE DRAG AND DROP ---

// Cria o elemento visual do Card e seus eventos
function createCard(text) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.draggable = true; // Permite arrastar o elemento (HTML5)
    card.textContent = text;

    // Quando começa a arrastar
    card.addEventListener('dragstart', () => {
        draggedCard = card;
        setTimeout(() => card.classList.add('dragging'), 0);
    });

    // Quando solta o card
    card.addEventListener('dragend', () => {
        draggedCard = null;
        card.classList.remove('dragging');
    });

    return card;
}

// Configura uma área para receber cards arrastados
function setupDropZone(dropZoneElement) {
    // Permite que a área receba o item (por padrão, o HTML bloqueia)
    dropZoneElement.addEventListener('dragover', (e) => {
        e.preventDefault(); 
        dropZoneElement.classList.add('drag-over');
    });

    // Remove feedback visual se o mouse sair da área
    dropZoneElement.addEventListener('dragleave', () => {
        dropZoneElement.classList.remove('drag-over');
    });

    // Ocorre quando o card é finalmente solto na área
    dropZoneElement.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZoneElement.classList.remove('drag-over');
        
        if (draggedCard) {
            dropZoneElement.appendChild(draggedCard); // Move o card no DOM
        }
    });
}