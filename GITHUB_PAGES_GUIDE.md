# Guia de Deploy no GitHub Pages

## ✅ Configuração Realizada

O projeto foi configurado para deploy no GitHub Pages usando `gh-pages`.

## 📝 Passos para Deploy

### 1. **Atualize o `homepage` no package.json**

Se você ainda não fez, abra `package.json` e altere:

```json
"homepage": "https://seu-usuario.github.io/mucalculator"
```

Substitua `seu-usuario` pelo seu username do GitHub.

### 2. **Crie um repositório no GitHub**

- Va para [github.com](https://github.com)
- Clique em "New repository"
- Nomeie como `mucalculator`
- NÃO inicialize com README, .gitignore ou license
- Clique em "Create repository"

### 3. **Configure o Git Localmente**

No terminal, execute:

```powershell
# Inicie o git
git init

# Adicione o repositório remoto (use a URL que aparece no GitHub)
git remote add origin https://github.com/seu-usuario/mucalculator.git

# Renomeie a branch para main
git branch -M main

# Adicione todos os arquivos
git add .

# Faça o commit inicial
git commit -m "Initial commit"

# Envie para o GitHub
git push -u origin main
```

### 4. **Deploy para GitHub Pages**

Execute no terminal:

```powershell
npm run deploy
```

Este comando vai:

- ✅ Compilar a aplicação React
- ✅ Enviar a pasta `/build` para a branch `gh-pages`
- ✅ Publicar automaticamente no GitHub Pages

### 5. **Configure o GitHub Pages**

- Va para seu repositório no GitHub
- Clique em "Settings"
- Vá para "Pages" (na sidebar esquerda)
- Em "Source", selecione `gh-pages` como branch
- Clique em "Save"

### 6. **Acesse sua aplicação**

Aguarde 1-2 minutos e acesse:

```
https://seu-usuario.github.io/mucalculator
```

## 📝 Notas Importantes

- **Sempre use `npm run deploy`** e nunca `npm run build` seguido de push manual
- A branch `gh-pages` é gerada automaticamente - não edite ela manualmente
- Seu código fica em `main`, o deploy fica em `gh-pages`
- Futuras atualizações: apenas execute `npm run deploy` novamente

## 🔧 Troubleshooting

**Página não aparece:**

- Espere 2-3 minutos após o primeiro deploy
- Verifique se `homepage` no package.json está correto
- Verifique se a branch `gh-pages` existe nas settings

**Erro ao fazer deploy:**

- Certifique-se de que o repositório remoto está correto: `git remote -v`
- Verifique se tem permissão no repositório
- Tente fazer `npm run build` manualmente primeiro
