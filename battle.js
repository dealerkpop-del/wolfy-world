// ==========================================
// WOLFY WORLD - BATTLE LOGIC
// ==========================================

const BOARD_SIZE = 6;
const COLORS = ['blanco', 'rojo', 'verde', 'azul'];

// Estado del juego
let playerHP = 100;
const playerMaxHP = 100;
let enemyHP = 300;
const enemyMaxHP = 300;
let board = [];
let isPlayerTurn = true;

// Datos del enemigo (Debilidades)
const enemyData = {
    name: "Tronco Místico",
    weakTo: ['verde', 'azul'], // x2 daño
    attackDamage: 15
};

// Inicializar
window.onload = () => {
    const name = localStorage.getItem('wolfyPlayer') || "Viajero";
    document.getElementById('player-name-display').textContent = name;
    initBoard();
};

function initBoard() {
    const boardEl = document.getElementById('board');
    boardEl.innerHTML = '';
    board = [];
    
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        board.push(color);
        
        const orb = document.createElement('div');
        orb.className = `orb ${color}`;
        orb.id = `orb-${i}`;
        boardEl.appendChild(orb);
    }
}

// ==========================================
// SISTEMA DE COMBATE
// ==========================================

function playCard(color) {
    if (!isPlayerTurn) return;
    
    // 1. Contar orbes del color
    let count = 0;
    const indicesToClear = [];
    
    board.forEach((c, i) => {
        if (c === color) {
            count++;
            indicesToClear.push(i);
        }
    });
    
    if (count === 0) return; // No hay orbes de ese color

    // 2. Calcular daño base (10 por orbe)
    let damage = count * 10;
    let isWeakness = false;

    // 3. Aplicar debilidad x2
    if (enemyData.weakTo.includes(color)) {
        damage *= 2;
        isWeakness = true;
    }

    // 4. Aplicar daño al enemigo
    enemyHP = Math.max(0, enemyHP - damage);
    updateHUD();
    showFloatingDamage(damage, isWeakness);

    // 5. Destruir orbes y rellenar
    indicesToClear.forEach(i => {
        board[i] = COLORS[Math.floor(Math.random() * COLORS.length)];
        const orb = document.getElementById(`orb-${i}`);
        orb.className = `orb ${board[i]}`;
    });

    // 6. Verificar victoria o turno enemigo
    if (enemyHP <= 0) {
        setTimeout(() => endBattle(true), 500);
    } else {
        isPlayerTurn = false;
        setTimeout(enemyTurn, 1000);
    }
}

function enemyTurn() {
    // El Tronco ataca
    playerHP = Math.max(0, playerHP - enemyData.attackDamage);
    updateHUD();
    
    // Animación de ataque (sacudida)
    document.getElementById('player-hud').style.transform = 'translateX(-10px)';
    setTimeout(() => document.getElementById('player-hud').style.transform = 'translateX(10px)', 100);
    setTimeout(() => document.getElementById('player-hud').style.transform = 'translateX(0)', 200);

    if (playerHP <= 0) {
        setTimeout(() => endBattle(false), 500);
    } else {
        isPlayerTurn = true;
    }
}

// ==========================================
// UI Y EFECTOS
// ==========================================

function updateHUD() {
    const ePct = (enemyHP / enemyMaxHP) * 100;
    const pPct = (playerHP / playerMaxHP) * 100;
    
    document.getElementById('enemy-hp-bar').style.width = ePct + '%';
    document.getElementById('enemy-hp-text').textContent = `${enemyHP} / ${enemyMaxHP} HP`;
    
    document.getElementById('player-hp-bar').style.width = pPct + '%';
    document.getElementById('player-hp-text').textContent = `${playerHP} / ${playerMaxHP} HP`;
}

function showFloatingDamage(amount, isWeak) {
    const msg = document.createElement('div');
    msg.className = `damage-text ${isWeak ? 'weak' : ''}`;
    msg.textContent = isWeak ? `¡DEBIL! -${amount}` : `-${amount}`;
    
    // Posicionar sobre el enemigo
    const enemyRect = document.getElementById('enemy-sprite').getBoundingClientRect();
    msg.style.left = (enemyRect.left + enemyRect.width / 2 - 40) + 'px';
    msg.style.top = (enemyRect.top) + 'px';
    
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 1000);
}

function endBattle(victory) {
    const overlay = document.getElementById('message-overlay');
    const text = document.getElementById('message-text');
    overlay.classList.remove('hidden');
    
    if (victory) {
        text.textContent = "¡Victoria!";
        text.style.color = "#2ed573";
    } else {
        text.textContent = "Derrota...";
        text.style.color = "#ff4757";
    }
}
