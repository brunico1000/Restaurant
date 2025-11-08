// Dados do cardápio com nomes de imagens
const menuItems = [
    {
        id: 1,
        name: "Bruschetta Italiana",
        price: "R$ 24,90",
        description: "Pão italiano grelhado com tomate fresco, manjericão e azeite de oliva",
        category: "entradas",
        image: "bruschetta.jpg"
    },
    {
        id: 2,
        name: "Carpaccio de Filé Mignon",
        price: "R$ 38,90",
        description: "Finas fatias de filé mignon com rúcula, parmesão e molho de mostarda",
        category: "entradas",
        image: "carpaccio.jpg"
    },
    {
        id: 3,
        name: "Risotto de Cogumelos",
        price: "R$ 42,90",
        description: "Arroz arbório cremoso com cogumelos silvestres e parmesão",
        category: "principais",
        image: "risotto.jpg"
    },
    {
        id: 4,
        name: "Filé Mignon ao Molho Madeira",
        price: "R$ 68,90",
        description: "Filé mignon grelhado com molho madeira e purê de batatas",
        category: "principais",
        image: "file-mignon.jpg"
    },
    {
        id: 5,
        name: "Salmão Grelhado",
        price: "R$ 52,90",
        description: "Salmão grelhado com legumes sautée e molho de ervas",
        category: "principais",
        image: "salmao.jpg"
    },
    {
        id: 6,
        name: "Tiramisu",
        price: "R$ 18,90",
        description: "Clássica sobremesa italiana com café, mascarpone e cacau",
        category: "sobremesas",
        image: "tiramisu.jpg"
    },
    {
        id: 7,
        name: "Brownie com Sorvete",
        price: "R$ 16,90",
        description: "Brownie de chocolate com sorvete de baunilha e calda de caramelo",
        category: "sobremesas",
        image: "brownie.jpg"
    },
    {
        id: 8,
        name: "Cheesecake de Frutas Vermelhas",
        price: "R$ 19,90",
        description: "Cheesecake cremoso com calda de frutas vermelhas",
        category: "sobremesas",
        image: "cheesecake.jpg"
    }
];

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Carregar itens do menu
    loadMenuItems();
    
    // Configurar filtros do menu
    setupMenuFilters();
    
    // Configurar navegação suave
    setupSmoothScroll();
    
    // Configurar animações de scroll
    setupScrollAnimations();
    
    // Configurar header scroll
    setupHeaderScroll();
    
    // Configurar formulário de contato
    setupContactForm();
    
    // Configurar menu mobile
    setupMobileMenu();
});

// Carregar itens do menu
function loadMenuItems(category = 'all') {
    const menuContainer = document.querySelector('.menu-items');
    menuContainer.innerHTML = '';
    
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    
    filteredItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item animated-item';
        menuItemElement.innerHTML = `
            <div class="menu-item-image">
                <img src="images/${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkY4QzQyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJydW5pY28ncyBGb29kPC90ZXh0Pjwvc3ZnPg=='">
            </div>
            <div class="menu-item-content">
                <div class="menu-item-title">
                    <h3>${item.name}</h3>
                    <span class="menu-item-price">${item.price}</span>
                </div>
                <p>${item.description}</p>
            </div>
        `;
        menuContainer.appendChild(menuItemElement);
    });
    
    // Ativar animações para os novos itens
    setTimeout(() => {
        const animatedItems = document.querySelectorAll('.animated-item');
        animatedItems.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add('visible');
            }
        });
    }, 100);
}

// Configurar filtros do menu
function setupMenuFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Carregar itens da categoria selecionada
            const category = this.getAttribute('data-category');
            loadMenuItems(category);
        });
    });
}

// Configurar navegação suave
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Fechar menu mobile se estiver aberto
                closeMobileMenu();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Configurar animações de scroll
function setupScrollAnimations() {
    const animatedItems = document.querySelectorAll('.animated-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedItems.forEach(item => {
        observer.observe(item);
    });
}

// Configurar header scroll
function setupHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
}

// Configurar formulário de contato
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envio do formulário
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value || 'Usuário';
            
            // Mostrar mensagem de sucesso
            alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`);
            
            // Limpar formulário
            this.reset();
        });
    }
}

// Configurar menu mobile
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevenir scroll do body quando menu estiver aberto
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Fechar menu ao clicar em um link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Fechar menu mobile
function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Verificar se elemento está na viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Botão CTA do hero
document.querySelector('.cta-button').addEventListener('click', function() {
    closeMobileMenu();
    document.querySelector('#menu').scrollIntoView({
        behavior: 'smooth'
    });
});

// Adicionar classe loaded quando a página carregar
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});