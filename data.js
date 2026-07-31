// ==========================================
// WOLFY WORLD - BASE DE DATOS
// ==========================================

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const CARD_DATABASE = [
    // RANGO C
    { id: 'lobito', name: 'Lobito', rank: 'C', orbs: ['blanco'], hp: 20, dmg: 10 },
    { id: 'espadachin', name: 'Espadachín', rank: 'C', orbs: ['rojo'], hp: 25, dmg: 12 },
    { id: 'arquero', name: 'Arquero', rank: 'C', orbs: ['verde'], hp: 20, dmg: 15 },
    { id: 'escolar', name: 'Escolar', rank: 'C', orbs: ['azul'], hp: 30, dmg: 10 },
    { id: 'pintor', name: 'Pintor', rank: 'C', orbs: ['morado'], hp: 20, dmg: 12 },
    { id: 'resortero', name: 'Resortero', rank: 'C', orbs: ['amarillo'], hp: 35, dmg: 8 },
    // RANGO B
    { id: 'boxeador', name: 'Boxeador', rank: 'B', orbs: ['rojo'], hp: 50, dmg: 20 },
    { id: 'corredor', name: 'Corredor', rank: 'B', orbs: ['blanco'], hp: 40, dmg: 25 },
    { id: 'bibliotecario', name: 'Bibliotecario', rank: 'B', orbs: ['azul'], hp: 60, dmg: 18 },
    { id: 'patinador', name: 'Patinador', rank: 'B', orbs: ['amarillo'], hp: 45, dmg: 22 },
    { id: 'chef', name: 'Chef Lobito', rank: 'B', orbs: ['rojo', 'amarillo'], hp: 55, dmg: 20 },
    // RANGO A
    { id: 'canonero', name: 'Cañonero', rank: 'A', orbs: ['rojo', 'verde'], hp: 100, dmg: 35 },
    { id: 'cientifico', name: 'Científico', rank: 'A', orbs: ['morado', 'azul'], hp: 120, dmg: 30 },
    { id: 'medico', name: 'Médico', rank: 'A', orbs: ['blanco', 'azul'], hp: 150, dmg: 25 },
    // RANGO S
    { id: 'ninja', name: 'Ninja Sakura', rank: 'S', orbs: ['rojo', 'azul', 'verde'], hp: 200, dmg: 50 },
    { id: 'rey', name: 'Rey Lobo', rank: 'S', orbs: ['dorado'], hp: 300, dmg: 60 }
];

const ENEMY_DATABASE = [
    { id: 'tronco', name: 'Tronco Místico', hp: 300, atk: 15, weak: ['verde', 'azul'], reward: 100 },
    { id: 'slime', name: 'Slime Tóxico', hp: 150, atk: 10, weak: ['morado', 'blanco'], reward: 50 },
    { id: 'dragon', name: 'Dragón de Fuego', hp: 800, atk: 30, weak: ['azul', 'blanco'], reward: 300 },
    { id: 'fantasma', name: 'Fantasma Real', hp: 500, atk: 20, weak: ['dorado', 'rojo'], reward: 200 }
];

const DUP_REWARDS = {
    'C': { opt1: { amount: 3, type: 'XS' }, opt2: { amount: 1, type: 'S' } },
    'B': { opt1: { amount: 5, type: 'XS' }, opt2: { amount: 1, type: 'S' } },
    'A': { opt1: { amount: 10, type: 'XS' }, opt2: { amount: 3, type: 'S' } },
    'S': { opt1: { amount: 20, type: 'XS' }, opt2: { amount: 5, type: 'S' } }
};

function getLevelUpCost(level) { return level * 50; }

function getSizeBonus(size) {
    const bonuses = { 'XS': 1, 'S': 1.1, 'M': 1.25, 'L': 1.5, 'XL': 2.0 };
    return bonuses[size] || 1;
}
