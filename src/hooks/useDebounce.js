import { useEffect, useRef } from 'react';

/**
 * Hook para executar uma função após um delay, cancelando se houver novas chamadas
 * @param {function} callback - Função a ser executada
 * @param {number} delay - Delay em milissegundos
 * @param {array} dependencies - Array de dependências
 */
export function useDebounce(callback, delay, dependencies = []) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Limpa o timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Define um novo timeout
    timeoutRef.current = setTimeout(() => {
      callback();
    }, delay);

    // Cleanup: limpa o timeout se o componente desmontar
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, dependencies);
}
