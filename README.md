# MU Calculator

Uma calculadora de build interativa para o jogo **MU Online** - The Classic 97D.

## Sobre o Projeto

O **MU Calculator** é uma ferramenta web que auxilia jogadores do servidor privado "The Classic MU 97D" a otimizar suas builds de personagens. O jogo possui um sistema de **resets**, onde personagens retornam ao nível 1 após resetar, mas mantêm pontos de atributo acumulados para distribuir livremente.

### Objetivo

Criar uma calculadora que permita:

- Simular diferentes distribuições de atributos (Força, Agilidade, Vitalidade, Energia)
- Calcular estatísticas resultantes (HP, Dano, Taxa de Ataque, Defesa, etc.)
- Visualizar o impacto de cada reset na progressão do personagem
- Comparar diferentes builds para otimizar o desenvolvimento
- Simular a progressão com o sistema de resets do servidor

## Classes do Jogo

O servidor possui 5 classes de personagens, todas elas podem distribuir pontos livremente entre os atributos básicos:

| Código | Nome            | Atributos Disponíveis       |
| ------ | --------------- | --------------------------- |
| BK     | Guerreiro       | AGI, FOR, ENE, VIT          |
| ME     | Elfa            | AGI, FOR, ENE, VIT          |
| SM     | Mago            | AGI, FOR, ENE, VIT          |
| DL     | Dark Lord       | AGI, FOR, ENE, VIT, **CMD** |
| MG     | Magic Gladiator | AGI, FOR, ENE, VIT          |

### Atributos

- **AGI (Agilidade)**: Aumenta taxa de acerto e evasão
- **FOR (Força)**: Aumenta dano físico
- **ENE (Energia)**: Aumenta dano mágico e pontos de mana
- **VIT (Vitalidade)**: Aumenta pontos de vida (HP)
- **CMD (Comando)**: Exclusivo da classe DL - afeta minions/invocações

### Distribuição Inicial de Atributos por Classe

Cada classe começa com uma distribuição de atributos pré-definida:

| Classe | FOR | AGI | VIT | ENE | CMD |
| ------ | --- | --- | --- | --- | --- |
| SM     | 18  | 18  | 15  | 30  | -   |
| BK     | 28  | 20  | 25  | 10  | -   |
| ME     | 22  | 25  | 20  | 15  | -   |
| MG     | 26  | 26  | 26  | 26  | -   |
| DL     | 26  | 20  | 20  | 15  | 25  |

### Progressão por Nível

Cada classe recebe pontos adicionais ao subir de nível:

| Classe     | Pontos por Nível |
| ---------- | ---------------- |
| SM, BK, ME | 5 pontos         |
| MG, DL     | 7 pontos         |

**Detalhes:**

- **Nível Inicial**: 1
- **Nível Máximo**: 400 (alcançável em resets muito altos)
- **Total de Pontos por Level até 400**: Variável conforme classe
  - SM, BK, ME: 5 × 399 (do nível 2 ao 400) = 1.995 pontos
  - MG, DL: 7 × 399 (do nível 2 ao 400) = 2.793 pontos

## Sistema de Resets - The Classic MU 97D

### Distribuição de Pontos por Reset

| Faixa de Resets | Pontos Recebidos |
| --------------- | ---------------- |
| Reset 1         | 600 pontos       |
| Reset 2 a 10    | 150 pontos       |
| Reset 11 a 30   | 100 pontos       |
| Reset 31+       | 20 pontos        |

### Limite Máximo

- **Máximo de Resets**: 1000 resets

### Exemplo de Cálculo

Um personagem com 50 resets receberia:

- Reset 1: 600 pontos
- Resets 2-10 (9 resets × 150): 1.350 pontos
- Resets 11-30 (20 resets × 100): 2.000 pontos
- Resets 31-50 (20 resets × 20): 400 pontos
- **Total: 4.350 pontos para distribuir**

## Project Structure

```
mucalculator
├── public
│   └── index.html
├── src
│   ├── index.js
│   ├── App.js
│   ├── components
│   │   └── HelloWorld.js
│   ├── hooks
│   │   └── useExample.js
│   └── styles
│       └── App.css
├── package.json
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js: Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Setup

1. **Create the React App**:
   Run the following command in your terminal to create a new React application:

   ```
      npx create-react-app mucalculator
   ```

2. **Navigate to the Project Directory**:
   Change into your project directory:

   ```
      cd mucalculator
   ```

3. **Install Additional Packages**:
   If you need to install any additional packages, you can do so using npm or yarn. For example:
   ```
   npm install <package-name>
   ```

### Running the Application

To start the development server, run:

```
npm start
```

This will open your application in the default web browser at `http://localhost:3000`.

### Project Components

- **public/index.html**: The main HTML file where the React app is rendered.
- **src/index.js**: The entry point of the application.
- **src/App.js**: The main App component.
- **src/components/HelloWorld.js**: A simple functional component that displays a greeting message.
- **src/hooks/useExample.js**: A custom hook for reusable logic.
- **src/styles/App.css**: CSS styles for the application.

## License

This project is licensed under the MIT License.
