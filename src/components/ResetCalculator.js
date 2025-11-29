import React, { useState, useEffect } from 'react';
import { calculateResetCost } from '../utils/resetCosts';
import { useDebounce } from '../hooks/useDebounce';
import '../styles/ResetCalculator.css';

export default function ResetCalculator() {
  const [currentReset, setCurrentReset] = useState(0);
  const [targetReset, setTargetReset] = useState(1);
  // valor controlado livre para o input do target (string) para permitir digitação
  const [targetInput, setTargetInput] = useState(String(1));
  const [playerType, setPlayerType] = useState('free');
  const [result, setResult] = useState(null);

  // Recalcular quando mudar valores
  useEffect(() => {
    const costData = calculateResetCost(currentReset, targetReset, playerType);
    setResult(costData);
  }, [currentReset, targetReset, playerType]);

  // Sincroniza targetInput quando targetReset muda (por validação externa)
  useEffect(() => {
    setTargetInput(String(targetReset));
  }, [targetReset]);

  const handleCurrentResetChange = (e) => {
    const value = Math.max(0, Math.min(999, parseInt(e.target.value) || 0));
    setCurrentReset(value);
    if (value >= targetReset) {
      const newTarget = value + 1;
      setTargetReset(newTarget);
      setTargetInput(String(newTarget));
    }
  };

  // Atualiza o campo do input livremente (string) — validação acontece com debounce
  const handleTargetResetChange = (e) => {
    // permite string vazia enquanto digita
    setTargetInput(e.target.value);
  };

  // Debounce para validar o valor digitado e aplicar a mudança ao estado real
  useDebounce(
    () => {
      const raw = targetInput.trim();
      const parsed = parseInt(raw, 10);

      if (!raw || Number.isNaN(parsed)) {
        // Se vazio ou inválido, ajusta para mínimo válido
        const minVal = Math.min(1000, currentReset + 1);
        setTargetReset(minVal);
        setTargetInput(String(minVal));
        return;
      }

      // Clampa entre currentReset+1 e 1000
      const clamped = Math.max(currentReset + 1, Math.min(1000, parsed));
      setTargetReset(clamped);
      setTargetInput(String(clamped));
    },
    600,
    [targetInput, currentReset]
  );

  const formatNumber = (num) => {
    if (typeof num === 'string') return num;
    return num.toLocaleString('pt-BR');
  };

  const formatZen = (num) => {
    if (typeof num === 'string') return num;

    // Formata com k para milhares
    if (num >= 1000) {
      const remainder = num % 1000;

      // Se tem resto, mostra o valor completo formatado
      if (remainder !== 0) {
        return formatNumber(num);
      }

      // Conta quantos "000" (grupos de 1000) existem
      let tempNum = num;
      let kCount = 0;
      while (tempNum >= 1000 && tempNum % 1000 === 0) {
        kCount++;
        tempNum = Math.floor(tempNum / 1000);
      }

      // Formata o número base (sem os zeros)
      const formatted = formatNumber(tempNum);

      // Formata o número completo para mostrar entre parênteses
      const originalFormatted = formatNumber(num);

      return `${formatted}${'k'.repeat(kCount)} (${originalFormatted})`;
    }

    return formatNumber(num);
  };
  const formatJoiaName = (type) => {
    return type
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const renderJoiasDetails = (joiasObj) => {
    if (!joiasObj || Object.keys(joiasObj).length === 0) {
      return <span className="joias-none">Nenhuma</span>;
    }
    const entries = Object.entries(joiasObj);
    return (
      <div className="joias-details">
        {entries.map(([type, qty]) => (
          <div key={type} className="joia-item">
            <span className="joia-name">{formatJoiaName(type)}</span>
            <span className="joia-quantity">{qty}</span>
          </div>
        ))}
      </div>
    );
  };

  const formatJoiasSimple = (joiasObj) => {
    if (!joiasObj || Object.keys(joiasObj).length === 0) return 'Nenhuma';
    const entries = Object.entries(joiasObj);
    return entries
      .map(([type, qty]) => `${qty} ${formatJoiaName(type)}`)
      .join(' + ');
  };

  return (
    <div className="reset-calculator-container">
      <h2>Calculadora de Reset</h2>

      <div className="reset-inputs-wrapper">
        <div className="reset-input-group">
          <label>Reset Atual:</label>
          <input
            type="number"
            min="0"
            max="1000"
            value={currentReset}
            onChange={handleCurrentResetChange}
            className="reset-input"
          />
        </div>

        <div className="reset-input-group">
          <label>Reset Objetivo:</label>
          <input
            type="text"
            value={targetInput}
            onChange={handleTargetResetChange}
            className="reset-input"
          />
        </div>

        <div className="reset-input-group">
          <label>Tipo de Jogador:</label>
          <select
            value={playerType}
            onChange={(e) => setPlayerType(e.target.value)}
            className="reset-select"
          >
            <option value="free">Free</option>
            <option value="vip">VIP</option>
          </select>
        </div>
      </div>

      {result && (
        <div className="reset-result">
          <div className="result-summary">
            <div className="summary-item">
              <span className="summary-label">Resets a fazer:</span>
              <span className="summary-value">{result.resetsToGo}</span>
            </div>
            {playerType === 'free' ? (
              <>
                <div className="summary-item">
                  <span className="summary-label">Zen Total:</span>
                  <span className="summary-value zen-free">
                    {formatZen(result.totalZenFree)}
                  </span>
                </div>
                <div className="summary-item joias-summary">
                  <span className="summary-label">Joias Total:</span>
                  <div className="summary-value joias-free">
                    {renderJoiasDetails(result.totalJoiasFree)}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="summary-item">
                  <span className="summary-label">Zen Total:</span>
                  <span className="summary-value zen-vip">
                    {formatZen(result.totalZenVip)}
                  </span>
                </div>
                <div className="summary-item joias-summary">
                  <span className="summary-label">Joias Total:</span>
                  <div className="summary-value joias-vip">
                    {renderJoiasDetails(result.totalJoiasVip)}
                  </div>
                </div>
              </>
            )}
          </div>

          {result.details.length > 0 && (
            <div className="reset-breakdown">
              <h3>Detalhamento por Reset</h3>
              <div className="breakdown-scroll">
                <table className="breakdown-table">
                  <thead>
                    <tr>
                      <th>Reset</th>
                      {playerType === 'free' ? (
                        <>
                          <th>Zen</th>
                          <th>Joias</th>
                        </>
                      ) : (
                        <>
                          <th>Zen VIP</th>
                          <th>Joias VIP</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {result.details.map((detail) => (
                      <tr key={detail.reset} className="breakdown-row">
                        <td className="reset-number">{detail.reset}</td>
                        {playerType === 'free' ? (
                          <>
                            <td className="zen-free">
                              {formatZen(detail.zenFree)}
                            </td>
                            <td className="joias-free">
                              {formatJoiasSimple(detail.joiasFree)}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="zen-vip">
                              {formatZen(detail.zenVip)}
                            </td>
                            <td className="joias-vip">
                              {formatJoiasSimple(detail.joiasVip)}
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
