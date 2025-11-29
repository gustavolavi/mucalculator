import React, { useState, useEffect } from 'react';
import { calculateTotalPoints, CLASSES } from '../utils/pointsCalculator';
import {
  getBuildSlot,
  saveBuildSlot,
  clearBuildSlot,
} from '../utils/storageManager';
import { useDebounce } from '../hooks/useDebounce';
import '../styles/Calculator.css';

function Calculator() {
  const [selectedClass, setSelectedClass] = useState('SM');
  const [level, setLevel] = useState(400);
  const [resets, setResets] = useState(1000);
  const [result, setResult] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [totalInputs, setTotalInputs] = useState({
    FOR: '',
    AGI: '',
    VIT: '',
    ENE: '',
    CMD: '',
  });
  const [lastEditedTotal, setLastEditedTotal] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(1);

  // Distribuição de pontos
  const [distribution, setDistribution] = useState({
    FOR: 0,
    AGI: 0,
    VIT: 0,
    ENE: 0,
    CMD: 0,
  });

  // Carrega a build salva quando a classe muda
  useEffect(() => {
    const savedBuild = getBuildSlot(selectedClass, selectedSlot);
    if (savedBuild) {
      setLevel(savedBuild.level);
      setResets(savedBuild.resets);
      setDistribution(savedBuild.distribution);
      // sincroniza totalInputs com initial + distribution
      const totals = {};
      Object.keys(CLASSES[selectedClass].initialAttributes).forEach((k) => {
        const init = CLASSES[selectedClass].initialAttributes[k] || 0;
        totals[k] = init + (savedBuild.distribution[k] || 0);
      });
      setTotalInputs((prev) => ({ ...prev, ...totals }));
      // Recalcula com os valores carregados
      try {
        const points = calculateTotalPoints(
          selectedClass,
          savedBuild.level,
          savedBuild.resets
        );
        setResult(points);
      } catch (error) {
        console.error('Erro ao carregar build salva:', error);
      }
    } else {
      // Se não há build salva, reseta para valores padrão
      setLevel(400);
      setResets(1000);
      setDistribution({ FOR: 0, AGI: 0, VIT: 0, ENE: 0, CMD: 0 });
      // sincroniza totalInputs com initial
      const totals = {};
      Object.keys(CLASSES[selectedClass].initialAttributes).forEach((k) => {
        totals[k] = CLASSES[selectedClass].initialAttributes[k] || 0;
      });
      setTotalInputs((prev) => ({ ...prev, ...totals }));
      setResult(null);
    }
  }, [selectedClass, selectedSlot]);

  // Salva a build atual sempre que há mudança
  const saveBuildAutomatically = (newLevel, newResets, newDistribution) => {
    setIsSaving(true);
    saveBuildSlot(selectedClass, selectedSlot, {
      level: newLevel,
      resets: newResets,
      distribution: newDistribution,
    });
    // Remove o indicador de salvamento após 500ms
    setTimeout(() => setIsSaving(false), 500);
  };

  const handleCalculate = () => {
    try {
      const points = calculateTotalPoints(
        selectedClass,
        parseInt(level),
        parseInt(resets)
      );
      setResult(points);
      // sincroniza totalInputs com initial + distribution atual
      const totals = {};
      Object.keys(CLASSES[selectedClass].initialAttributes).forEach((k) => {
        const init = CLASSES[selectedClass].initialAttributes[k] || 0;
        totals[k] = init + (distribution[k] || 0);
      });
      setTotalInputs((prev) => ({ ...prev, ...totals }));
      // Salva a build quando calcula
      saveBuildAutomatically(parseInt(level), parseInt(resets), distribution);
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };

  const handleInputChange = (e, setter, min, max) => {
    const value = e.target.value;
    if (value === '') {
      setter('');
      return;
    }

    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      setter(numValue);
    }
  };

  const handleDistributionChange = (attribute, value) => {
    const numValue = value === '' ? 0 : parseInt(value);
    if (!isNaN(numValue) && numValue >= 0) {
      const newDistribution = {
        ...distribution,
        [attribute]: numValue,
      };
      setDistribution(newDistribution);
      // Atualiza o total correspondente (initial + novo distribuído)
      const initialValue =
        CLASSES[selectedClass].initialAttributes[attribute] || 0;
      const newTotal = initialValue + numValue;
      setTotalInputs((prev) => ({ ...prev, [attribute]: newTotal }));
      // Salva automaticamente com debounce
      if (result) {
        saveBuildAutomatically(level, resets, newDistribution);
      }
    }
  };
  // Quando o usuário edita o total, atualiza o campo totalInputs (edição livre)
  // A conversão para 'distribution' será feita com debounce para não interferir
  const handleTotalChange = (attribute, value) => {
    const strValue = value === '' ? '' : value;
    setTotalInputs((prev) => ({ ...prev, [attribute]: strValue }));
    setLastEditedTotal(attribute);
  };

  // Aplica o valor digitado no total ao distribution após debouncing
  useDebounce(
    () => {
      if (!lastEditedTotal) return;
      const attr = lastEditedTotal;
      const raw = totalInputs[attr];
      const numValue = raw === '' ? 0 : parseInt(raw);
      if (isNaN(numValue) || numValue < 0) return;
      const initialValue = CLASSES[selectedClass].initialAttributes[attr] || 0;
      // o valor a distribuir não pode ser negativo no sistema de atributos
      const toDistribute = Math.max(0, numValue - initialValue);
      const newDistribution = {
        ...distribution,
        [attr]: toDistribute,
      };
      setDistribution(newDistribution);
      // sincroniza o totalInputs (mantém o número digitado)
      setTotalInputs((prev) => ({ ...prev, [attr]: numValue }));
      if (result) {
        saveBuildAutomatically(level, resets, newDistribution);
      }
      setLastEditedTotal(null);
    },
    700,
    [totalInputs, lastEditedTotal]
  );

  const handleClearBuild = () => {
    if (
      window.confirm(
        `Deseja limpar a build salva para ${CLASSES[selectedClass].name}?`
      )
    ) {
      clearBuildSlot(selectedClass, selectedSlot);
      setLevel(400);
      setResets(1000);
      setDistribution({ FOR: 0, AGI: 0, VIT: 0, ENE: 0, CMD: 0 });
      // sincroniza totalInputs com initial
      const totals = {};
      Object.keys(CLASSES[selectedClass].initialAttributes).forEach((k) => {
        totals[k] = CLASSES[selectedClass].initialAttributes[k] || 0;
      });
      setTotalInputs((prev) => ({ ...prev, ...totals }));
      setResult(null);
    }
  };

  const getAvailablePoints = () => {
    if (!result) return 0;
    const used = Object.values(distribution).reduce((a, b) => a + b, 0);
    return result.totalPoints - used;
  };

  const getAttributesToShow = () => {
    if (selectedClass === 'DL') {
      return ['FOR', 'AGI', 'VIT', 'ENE', 'CMD'];
    }
    return ['FOR', 'AGI', 'VIT', 'ENE'];
  };

  const isDistributionValid = () => {
    if (!result) return true;
    return getAvailablePoints() >= 0;
  };

  return (
    <div className="calculator-wrapper">
      <div className="calculator-container">
        <h1>MU Calculator - Calculadora de Pontos</h1>

        <div className="input-section">
          <div className="input-group">
            <label htmlFor="class-select">Classe:</label>
            <select
              id="class-select"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {Object.entries(CLASSES).map(([code, data]) => (
                <option key={code} value={code}>
                  {code} - {data.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="level-input">Nível (1-400):</label>
            <input
              id="level-input"
              type="number"
              min="1"
              max="400"
              value={level}
              onChange={(e) => handleInputChange(e, setLevel, 1, 400)}
              placeholder="1"
            />
          </div>

          <div className="input-group">
            <label htmlFor="resets-input">Resets (0-1000):</label>
            <input
              id="resets-input"
              type="number"
              min="0"
              max="1000"
              value={resets}
              onChange={(e) => handleInputChange(e, setResets, 0, 1000)}
              placeholder="0"
            />
          </div>

          <button onClick={handleCalculate} className="calculate-btn">
            Calcular
          </button>

          {result && (
            <button onClick={handleClearBuild} className="clear-btn">
              Limpar Build
            </button>
          )}
        </div>

        {result && (
          <div className="result-section">
            <h2>Resultado</h2>
            <div className="result-card">
              <div className="result-header">
                <h3>
                  {result.className} (Nível {result.level})
                </h3>
                <p className="resets-info">{result.resets} Resets</p>
              </div>

              <div className="result-details">
                <div className="detail-row">
                  <span className="detail-label">Pontos por Level:</span>
                  <span className="detail-value">{result.levelPoints}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Pontos de Resets:</span>
                  <span className="detail-value">{result.resetPoints}</span>
                </div>
                <div className="detail-row total">
                  <span className="detail-label">Total de Pontos:</span>
                  <span className="detail-value">{result.totalPoints}</span>
                </div>
              </div>

              <div className="calculation-info">
                <p>
                  <strong>Cálculo:</strong> {result.levelPoints} (level) +{' '}
                  {result.resetPoints} (resets) = {result.totalPoints}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {result && (
        <div className="distribution-container">
          <h2>Distribuição de Pontos</h2>
          <div className="distribution-card">
            <div className="attribute-header">
              <div className="attr-col attr-name">Atributo</div>
              <div className="attr-col attr-initial">Inicial</div>
              <div className="attr-col attr-input">Distribuir</div>
              <div className="attr-col attr-total">Total</div>
            </div>

            <div className="attributes-list">
              {getAttributesToShow().map((attr) => {
                const initialValue =
                  CLASSES[selectedClass].initialAttributes[attr] || 0;
                const distributedValue = distribution[attr] || 0;
                const totalValue = initialValue + distributedValue;

                return (
                  <div key={attr} className="attribute-row">
                    <div className="attr-col attr-name">
                      <span className="attr-label">{attr}</span>
                    </div>
                    <div className="attr-col attr-initial">
                      <span className="attr-value">{initialValue}</span>
                    </div>
                    <div className="attr-col attr-input">
                      <input
                        id={`dist-${attr}`}
                        type="number"
                        min="0"
                        value={distribution[attr]}
                        onChange={(e) =>
                          handleDistributionChange(attr, e.target.value)
                        }
                        className={isDistributionValid() ? '' : 'error'}
                        placeholder="0"
                      />
                    </div>
                    <div className="attr-col attr-total">
                      <input
                        id={`total-${attr}`}
                        type="number"
                        min={0}
                        value={
                          totalInputs[attr] !== ''
                            ? totalInputs[attr]
                            : totalValue
                        }
                        onChange={(e) =>
                          handleTotalChange(attr, e.target.value)
                        }
                        className={`total-input ${
                          isDistributionValid() ? '' : 'error'
                        }`}
                        placeholder={initialValue.toString()}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="distribution-summary">
              {isSaving && (
                <div className="saving-indicator">✓ Salvando...</div>
              )}
              <div
                className={`summary-item ${
                  isDistributionValid() ? '' : 'error'
                }`}
              >
                <span className="summary-label">Pontos Usados:</span>
                <span className="summary-value">
                  {Object.values(distribution).reduce((a, b) => a + b, 0)}
                </span>
              </div>
              <div
                className={`summary-item total ${
                  isDistributionValid() ? '' : 'error'
                }`}
              >
                <span className="summary-label">Pontos Restantes:</span>
                <span className="summary-value">{getAvailablePoints()}</span>
              </div>
            </div>

            <div className="slot-controls">
              <label htmlFor="slot-select">Slot:</label>
              <select
                id="slot-select"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(parseInt(e.target.value))}
              >
                <option value={1}>Build 1</option>
                <option value={2}>Build 2</option>
                <option value={3}>Build 3</option>
              </select>

              <button
                className="save-slot-btn"
                onClick={() => {
                  // salva explicitamente no slot selecionado
                  setIsSaving(true);
                  saveBuildSlot(selectedClass, selectedSlot, {
                    level,
                    resets,
                    distribution,
                  });
                  setTimeout(() => setIsSaving(false), 500);
                }}
              >
                Salvar nesta slot
              </button>
            </div>

            {!isDistributionValid() && (
              <div className="error-message">
                ⚠️ Você distribuiu mais pontos do que disponível!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Calculator;
