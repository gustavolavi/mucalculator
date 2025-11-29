/**
 * Tabela de custos de reset por faixa
 * Baseado em: The Classic MU 97D
 *
 * Tipos de joias:
 * - bless
 * - soul
 * - creation
 * - life
 * - chaos
 * - fortunaDoImperador
 */

const NO_GEMS = {};

export const RESET_COSTS_TABLE = [
  {
    resetStart: 0,
    resetEnd: 1,
    zenFree: 50000,
    zenVip: 50000,
    joiasFree: NO_GEMS,
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 2,
    resetEnd: 10,
    zenFree: 90000,
    zenVip: 70000,
    joiasFree: NO_GEMS,
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 11,
    resetEnd: 20,
    zenFree: 100000,
    zenVip: 90000,
    joiasFree: NO_GEMS,
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 21,
    resetEnd: 30,
    zenFree: 150000,
    zenVip: 100000,
    joiasFree: NO_GEMS,
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 31,
    resetEnd: 50,
    zenFree: 200000,
    zenVip: 100000,
    joiasFree: NO_GEMS,
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 51,
    resetEnd: 70,
    zenFree: 300000,
    zenVip: 200000,
    joiasFree: NO_GEMS,
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 71,
    resetEnd: 100,
    zenFree: 400000,
    zenVip: 300000,
    joiasFree: NO_GEMS,
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 101,
    resetEnd: 150,
    zenFree: 2000000,
    zenVip: 1000000,
    joiasFree: NO_GEMS,
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 151,
    resetEnd: 200,
    zenFree: 4000000,
    zenVip: 2000000,
    joiasFree: NO_GEMS,
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 201,
    resetEnd: 250,
    zenFree: 6000000,
    zenVip: 3500000,
    joiasFree: NO_GEMS,
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 251,
    resetEnd: 300,
    zenFree: 10000000,
    zenVip: 8000000,
    joiasFree: NO_GEMS,
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 301,
    resetEnd: 350,
    zenFree: 12000000,
    zenVip: 10000000,
    joiasFree: NO_GEMS,
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 351,
    resetEnd: 400,
    zenFree: 15000000,
    zenVip: 11000000,
    joiasFree: NO_GEMS,
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 401,
    resetEnd: 450,
    zenFree: 18000000,
    zenVip: 12000000,
    joiasFree: NO_GEMS,
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 451,
    resetEnd: 500,
    zenFree: 40000000,
    zenVip: 15000000,
    joiasFree: NO_GEMS,
    jiasVip: NO_GEMS,
  },
  {
    resetStart: 501,
    resetEnd: 549,
    zenFree: 55000000,
    zenVip: 20000000,
    joiasFree: NO_GEMS,
    jiasVip: NO_GEMS,
  },
  {
    resetStart: 550,
    resetEnd: 599,
    zenFree: 80000000,
    zenVip: 30000000,
    joiasFree: {
      bless: 1,
    },
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 600,
    resetEnd: 649,
    zenFree: 150000000,
    zenVip: 40000000,
    joiasFree: {
      bless: 1,
      soul: 1,
    },
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 650,
    resetEnd: 699,
    zenFree: 215000000,
    zenVip: 80000000,
    joiasFree: {
      bless: 2,
      creation: 2,
    },
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 700,
    resetEnd: 749,
    zenFree: 350000000,
    zenVip: 100000000,
    joiasFree: {
      bless: 2,
      soul: 2,
      life: 2,
    },
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 750,
    resetEnd: 799,
    zenFree: 350000000,
    zenVip: 100000000,
    joiasFree: {
      bless: 3,
      soul: 3,
      life: 5,
    },
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 800,
    resetEnd: 819,
    zenFree: 500000000,
    zenVip: 500000000,
    joiasFree: {
      creation: 7,
      soul: 7,
      chaos: 7,
    },
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 820,
    resetEnd: 849,
    zenFree: 550000000,
    zenVip: 500000000,
    joiasFree: {
      creation: 7,
      soul: 7,
      chaos: 7,
    },
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 850,
    resetEnd: 899,
    zenFree: 620000000,
    zenVip: 500000000,
    joiasFree: {
      life: 7,
      chaos: 7,
      creation: 7,
    },
    joiasVip: NO_GEMS,
  },
  {
    resetStart: 900,
    resetEnd: 949,
    zenFree: 1200000000,
    zenVip: 1000000000,
    joiasFree: {
      bless: 20,
      chaos: 20,
      soul: 20,
      life: 12,
    },
    joiasVip: {
      bless: 20,
      chaos: 20,
      soul: 20,
      life: 8,
    },
  },
  {
    resetStart: 950,
    resetEnd: 1000,
    zenFree: 2000000000,
    zenVip: 1500000000,
    joiasFree: {
      fortunaDoImperador: 8,
      creation: 20,
      soul: 20,
      life: 20,
    },
    joiasVip: {
      fortunaDoImperador: 6,
      creation: 15,
      soul: 15,
      life: 15,
    },
  },
];

/**
 * Agrupa e soma os tipos de joias de um array
 * @param {array} joiasArray - Array de objetos de joias (ex: [{bless: 1}, {bless: 2, soul: 1}])
 * @returns {object} Objeto com contagem total de cada tipo de joia
 */
function aggregateJoias(joiasArray) {
  const aggregated = {};

  joiasArray.forEach((joiasObj) => {
    if (!joiasObj || Object.keys(joiasObj).length === 0) {
      return;
    }

    Object.entries(joiasObj).forEach(([type, qty]) => {
      aggregated[type] = (aggregated[type] || 0) + qty;
    });
  });

  return aggregated;
}

/**
 * Obtém o custo para um reset específico
 * @param {number} resetNumber - Número do reset
 * @param {string} playerType - 'free' ou 'vip'
 * @returns {object} { zenFree, zenVip, joiasFree, jiasVip }
 */
export function getResetCost(resetNumber, playerType = 'free') {
  const row = RESET_COSTS_TABLE.find(
    (r) => resetNumber >= r.resetStart && resetNumber <= r.resetEnd
  );

  if (!row) {
    return { zenFree: 0, zenVip: 0, joiasFree: NO_GEMS, joiasVip: NO_GEMS };
  }

  return row;
}

/**
 * Calcula o custo total de reset da posição atual até o objetivo
 * @param {number} currentReset - Reset atual
 * @param {number} targetReset - Reset objetivo
 * @param {string} playerType - 'free' ou 'vip'
 * @returns {object} { totalZenFree, totalZenVip, totalJoiasFree, totalJoiasVip, details }
 */
export function calculateResetCost(
  currentReset,
  targetReset,
  playerType = 'free'
) {
  if (currentReset >= targetReset) {
    return {
      totalZenFree: 0,
      totalZenVip: 0,
      totalJoiasFree: {},
      totalJoiasVip: {},
      resetsToGo: 0,
      details: [],
    };
  }

  let totalZenFree = 0;
  let totalZenVip = 0;
  const joiasFreeLists = [];
  const joiasVipLists = [];
  const details = [];

  // Itera por cada reset que precisa fazer
  for (let reset = currentReset + 1; reset <= targetReset; reset++) {
    const cost = getResetCost(reset, playerType);
    totalZenFree += cost.zenFree;
    totalZenVip += cost.zenVip;
    joiasFreeLists.push(cost.joiasFree);
    joiasVipLists.push(cost.joiasVip);
    details.push({
      reset,
      zenFree: cost.zenFree,
      zenVip: cost.zenVip,
      joiasFree: cost.joiasFree,
      joiasVip: cost.joiasVip,
    });
  }

  return {
    totalZenFree,
    totalZenVip,
    totalJoiasFree: aggregateJoias(joiasFreeLists),
    totalJoiasVip: aggregateJoias(joiasVipLists),
    resetsToGo: targetReset - currentReset,
    details,
  };
}
