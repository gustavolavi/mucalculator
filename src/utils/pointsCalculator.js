/**
 * Configuração de classes e seus atributos iniciais
 */
const CLASSES = {
  SM: {
    name: 'Mago',
    pointsPerLevel: 5,
    initialAttributes: { FOR: 18, AGI: 18, VIT: 15, ENE: 30 },
  },
  BK: {
    name: 'Guerreiro',
    pointsPerLevel: 5,
    initialAttributes: { FOR: 28, AGI: 20, VIT: 25, ENE: 10 },
  },
  ME: {
    name: 'Elfa',
    pointsPerLevel: 5,
    initialAttributes: { FOR: 22, AGI: 25, VIT: 20, ENE: 15 },
  },
  MG: {
    name: 'Magic Gladiator',
    pointsPerLevel: 7,
    initialAttributes: { FOR: 26, AGI: 26, VIT: 26, ENE: 26 },
  },
  DL: {
    name: 'Dark Lord',
    pointsPerLevel: 7,
    initialAttributes: { FOR: 26, AGI: 20, VIT: 20, ENE: 15, CMD: 25 },
  },
};

/**
 * Calcula os pontos recebidos em um reset específico
 * @param {number} resetNumber - Número do reset (1-1000)
 * @returns {number} Pontos recebidos neste reset
 */
function getPointsForReset(resetNumber) {
  if (resetNumber === 1) return 600;
  if (resetNumber >= 2 && resetNumber <= 10) return 150;
  if (resetNumber >= 11 && resetNumber <= 30) return 100;
  if (resetNumber > 30) return 20;
  return 0;
}

/**
 * Calcula o total de pontos de resets
 * @param {number} totalResets - Número total de resets do personagem
 * @returns {number} Total de pontos de todos os resets
 */
function calculateResetPoints(totalResets) {
  let totalPoints = 0;
  for (let i = 1; i <= totalResets; i++) {
    totalPoints += getPointsForReset(i);
  }
  return totalPoints;
}

/**
 * Calcula os pontos por level
 * @param {string} classCode - Código da classe (SM, BK, ME, MG, DL)
 * @param {number} level - Nível do personagem (1-400)
 * @returns {number} Total de pontos por subir de nível
 */
function calculateLevelPoints(classCode, level) {
  const classData = CLASSES[classCode];
  if (!classData) return 0;

  // Level inicial é 1, então pontos = (level - 1) * pointsPerLevel
  return (level - 1) * classData.pointsPerLevel;
}

/**
 * Calcula o total de pontos disponíveis
 * @param {string} classCode - Código da classe (SM, BK, ME, MG, DL)
 * @param {number} level - Nível do personagem (1-400)
 * @param {number} resets - Número total de resets (0-1000)
 * @returns {object} Objeto com o total de pontos e detalhes
 */
function calculateTotalPoints(classCode, level, resets) {
  const classData = CLASSES[classCode];

  if (!classData) {
    throw new Error(`Classe inválida: ${classCode}`);
  }

  if (level < 1 || level > 400) {
    throw new Error(`Nível inválido: ${level}. Deve estar entre 1 e 400`);
  }

  if (resets < 0 || resets > 1000) {
    throw new Error(`Resets inválido: ${resets}. Deve estar entre 0 e 1000`);
  }

  const levelPoints = calculateLevelPoints(classCode, level);
  const resetPoints = calculateResetPoints(resets);
  const totalPoints = levelPoints + resetPoints;

  return {
    class: classCode,
    className: classData.name,
    level,
    resets,
    levelPoints,
    resetPoints,
    totalPoints,
    pointsPerLevel: classData.pointsPerLevel,
  };
}

export {
  CLASSES,
  calculateTotalPoints,
  calculateResetPoints,
  calculateLevelPoints,
};
