document.addEventListener('DOMContentLoaded', function() {
    // Carrega os dados do JSON
    fetch('destinos.json')
        .then(response => response.json())
        .then(data => {
            // Preenche o carrossel com os 3 primeiros destinos
            const carouselInner = document.querySelector('.carousel-inner');
            carouselInner.innerHTML = '';
            
            data.destinos.slice(0, 3).forEach((destino, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.className = carousel-item ${index === 0 ? 'active' : ''};
                carouselItem.innerHTML = `
                    <img src="${destino.imagem}" class="d-block w-100" alt="${destino.nome}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${destino.nome}</h5>
                        <p>${destino.descricao.substring(0, 100)}...</p>
                    </div>
                `;
                carouselInner.appendChild(carouselItem);
            });

            // Preenche todos os cards
            const containerCards = document.getElementById('container-cards');
            containerCards.innerHTML = '';
            
            data.destinos.forEach(destino => {
                const cardCol = document.createElement('div');
                cardCol.className = 'col-lg-4 col-md-6 mb-4';
                cardCol.innerHTML = `
                    <div class="card h-100">
                        <a href="detalhes.html?id=${destino.id}">
                            <img src="${destino.imagem}" class="card-img-top" alt="${destino.nome}">
                        </a>
                        <div class="card-body">
                            <h5 class="card-title">${destino.nome}</h5>
                            <p class="card-text">${destino.descricao}</p>
                            <a href="detalhes.html?id=${destino.id}" class="btn btn-primary">Ver detalhes</a>
                        </div>
                    </div>
                `;
                containerCards.appendChild(cardCol);
            });

            // Página de detalhes
            if (window.location.pathname.includes('detalhes.html')) {
                const urlParams = new URLSearchParams(window.location.search);
                const destinoId = parseInt(urlParams.get('id'));
                const destino = data.destinos.find(d => d.id === destinoId);
                
                if (destino) {
                    document.title = MundoEmRota - ${destino.nome};
                    
                    // Atualiza a imagem de capa
                    const imagemCapa = document.getElementById('imagem-capa');
                    imagemCapa.src = destino.imagem;
                    imagemCapa.alt = destino.nome;
                    
                    // Atualiza o conteúdo
                    const cardBody = document.querySelector('.main .card-body');
                    cardBody.innerHTML = `
                        <h2>${destino.nome}</h2>
                        <h6 class="mt-4">Paisagens deslumbrantes:</h6>
                        <p>${destino.detalhes.paisagens}</p>
                        
                        <h6>Pontos turísticos famosos:</h6>
                        <ul class="mb-3">
                            ${destino.detalhes.pontosTuristicos.map(item => <li>${item}</li>).join('')}
                        </ul>
                        
                        <h6>Cultura vibrante:</h6>
                        <p>${destino.detalhes.cultura}</p>
                        
                        <h6>Clima:</h6>
                        <p>${destino.detalhes.clima}</p>
                        
                        <h6>Locomoção:</h6>
                        <p>${destino.detalhes.locomocao}</p>
                        
                        <a href="index.html" class="btn btn-outline-primary mt-3">Voltar para todos os destinos</a>
                    `;
                } else {
                    // Se não encontrar o destino, redireciona para a página principal
                    window.location.href = 'index.html';
                }
            }
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
});

// Menu responsivo
function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
}

