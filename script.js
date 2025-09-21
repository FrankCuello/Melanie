// Crear estrellas
function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 2 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Crear flores flotantes
function createFloatingFlowers() {
    const flowers = ['🌻', '🌼', '💛', '✨', '🌟', '💫'];
    
    for (let i = 0; i < 15; i++) {
        const flower = document.createElement('div');
        flower.classList.add('flower');
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.left = Math.random() * 100 + '%';
        flower.style.top = Math.random() * 100 + '%';
        flower.style.animationDelay = Math.random() * 6 + 's';
        flower.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        flower.addEventListener('click', () => {
            createParticleExplosion(flower);
            updateCombo();
        });
        
        document.body.appendChild(flower);
    }
}

// Crear partículas
function createParticles() {
    setInterval(() => {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 4000);
    }, 200);
}

// Explosión de partículas al hacer click
function createParticleExplosion(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#ffd700', '#ff6b47', '#00ff88', '#ff6b6b'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = Math.random() * 100 + 50;
        
        document.body.appendChild(particle);
        
        let x = 0, y = 0, opacity = 1;
        const animate = () => {
            x += Math.cos(angle) * velocity * 0.02;
            y += Math.sin(angle) * velocity * 0.02;
            opacity -= 0.02;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        animate();
    }
}

// Sistema de combos
let combo = 0;
function updateCombo() {
    combo++;
    document.getElementById('comboCounter').textContent = `x${combo}`;
    
    if (combo === 10) {
        showAchievement('¡COMBO MASTER!', '🔥 10 flores tocadas');
    } else if (combo === 25) {
        showAchievement('¡FLOWER COLLECTOR!', '🌻 25 flores mágicas');
    }
    
    // Reset combo después de 3 segundos sin actividad
    clearTimeout(window.comboTimeout);
    window.comboTimeout = setTimeout(() => {
        combo = 0;
        document.getElementById('comboCounter').textContent = 'x0';
    }, 3000);
}

// Mostrar logros
function showAchievement(title, description) {
    const achievement = document.getElementById('achievement');
    achievement.innerHTML = `
        <div class="achievement-title">${title}</div>
        <div>${description}</div>
    `;
    achievement.classList.add('show');
    
    setTimeout(() => {
        achievement.classList.remove('show');
    }, 3000);
}

// Power-up especial
function activatePowerUp() {
    // Crear lluvia de flores
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.style.position = 'absolute';
            flower.style.fontSize = '2rem';
            flower.style.left = Math.random() * 100 + '%';
            flower.style.top = '-50px';
            flower.textContent = Math.random() > 0.5 ? '🌻' : '💛';
            flower.style.pointerEvents = 'none';
            flower.style.zIndex = '999';
            
            document.body.appendChild(flower);
            
            let y = -50;
            const fall = () => {
                y += 5;
                flower.style.top = y + 'px';
                flower.style.transform = `rotate(${y * 2}deg)`;
                
                if (y < window.innerHeight + 50) {
                    requestAnimationFrame(fall);
                } else {
                    flower.remove();
                }
            };
            fall();
        }, i * 100);
    }
    
    // Mostrar mensaje especial
    showAchievement('¡POWER-UP ACTIVADO!', '🚀 Lluvia de flores mágicas');
    
    // Efecto de pantalla
    document.body.style.filter = 'hue-rotate(60deg) brightness(1.2)';
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 2000);
}

// Mostrar primer logro
setTimeout(() => {
    showAchievement('¡BIENVENIDA AL JUEGO!', '🌻 Día de flores iniciado');
}, 2000);

// Inicializar todo
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createFloatingFlowers();
    createParticles();
});

// Easter eggs
let secretCode = '';
document.addEventListener('keydown', (e) => {
    secretCode += e.key.toLowerCase();
    if (secretCode.includes('melanie')) {
        showAchievement('¡CÓDIGO SECRETO!', '👑 Melanie es genial');
        secretCode = '';
    }
    if (secretCode.length > 10) secretCode = secretCode.slice(-10);
});

// Efectos de hover en el título
document.addEventListener('DOMContentLoaded', () => {
    const mainTitle = document.querySelector('.main-title');
    
    mainTitle.addEventListener('mouseenter', () => {
        mainTitle.style.transform = 'scale(1.05) rotateY(5deg)';
    });

    mainTitle.addEventListener('mouseleave', () => {
        mainTitle.style.transform = 'scale(1) rotateY(0deg)';
    });
});