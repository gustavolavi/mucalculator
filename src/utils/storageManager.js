/**
 * Gerencia o salvamento e carregamento de builds no localStorage
 */

const STORAGE_KEY = 'mu_calculator_builds';

/**
 * Obtém todas as builds salvas
 * @returns {object} Objeto com builds por classe
 */
export function getAllBuilds() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error('Erro ao carregar builds:', error);
    return {};
  }
}

/**
 * Obtém a build salva para uma classe específica
 * @param {string} classCode - Código da classe (SM, BK, ME, MG, DL)
 * @returns {object} Build salva ou null
 */
export function getBuild(classCode) {
  try {
    const builds = getAllBuilds();
    // Backwards compatible: return raw entry if present
    return builds[classCode] || null;
  } catch (error) {
    console.error(`Erro ao carregar build da classe ${classCode}:`, error);
    return null;
  }
}

/**
 * Obtém uma build salva em um slot específico (1-3)
 * @param {string} classCode
 * @param {number|string} slot
 */
export function getBuildSlot(classCode, slot = 1) {
  try {
    const builds = getAllBuilds();
    const cls = builds[classCode];
    if (!cls) return null;
    // novo formato: { slots: { 1: {...}, 2: {...}, 3: {...} } }
    if (cls.slots) {
      return cls.slots[String(slot)] || null;
    }
    // legacy: cls may be a single build object -> return it for slot 1
    return slot === 1 ? cls : null;
  } catch (error) {
    console.error(
      `Erro ao carregar build (slot) da classe ${classCode}:`,
      error
    );
    return null;
  }
}

/**
 * Salva uma build para uma classe
 * @param {string} classCode - Código da classe
 * @param {object} buildData - Dados da build (level, resets, distribution)
 */
export function saveBuild(classCode, buildData) {
  try {
    const builds = getAllBuilds();
    builds[classCode] = {
      ...buildData,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
  } catch (error) {
    console.error(`Erro ao salvar build da classe ${classCode}:`, error);
  }
}

/**
 * Salva uma build em um slot específico (1-3)
 * @param {string} classCode
 * @param {number|string} slot
 * @param {object} buildData
 */
export function saveBuildSlot(classCode, slot = 1, buildData) {
  try {
    const builds = getAllBuilds();
    const cls = builds[classCode] || {};
    // migrate legacy single-build format into slots[1] if needed
    let slots = cls.slots || {};
    if (
      !cls.slots &&
      (cls.level !== undefined || cls.distribution !== undefined)
    ) {
      // move legacy build into slot 1
      slots = {
        1: {
          level: cls.level,
          resets: cls.resets,
          distribution: cls.distribution,
          savedAt: cls.savedAt || new Date().toISOString(),
        },
      };
    }
    slots[String(slot)] = {
      ...buildData,
      savedAt: new Date().toISOString(),
    };
    builds[classCode] = { ...cls, slots };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
  } catch (error) {
    console.error(`Erro ao salvar build (slot) da classe ${classCode}:`, error);
  }
}

/**
 * Limpa a build salva para uma classe em um slot específico
 * @param {string} classCode
 * @param {number|string} slot
 */
export function clearBuildSlot(classCode, slot = 1) {
  try {
    const builds = getAllBuilds();
    const cls = builds[classCode];
    if (!cls) return;
    if (cls.slots) {
      delete cls.slots[String(slot)];
      builds[classCode] = cls;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
    } else if (slot === 1) {
      // legacy single build => clear entire class
      delete builds[classCode];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
    }
  } catch (error) {
    console.error(`Erro ao limpar build (slot) da classe ${classCode}:`, error);
  }
}

/**
 * Limpa a build salva para uma classe
 * @param {string} classCode - Código da classe
 */
export function clearBuild(classCode) {
  try {
    const builds = getAllBuilds();
    delete builds[classCode];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
  } catch (error) {
    console.error(`Erro ao limpar build da classe ${classCode}:`, error);
  }
}

/**
 * Limpa todas as builds salvas
 */
export function clearAllBuilds() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar todas as builds:', error);
  }
}
