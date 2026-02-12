#!/usr/bin/env node

/**
 * Script de Gerenciamento do Projeto Salom Service Site Mobile (Node.js)
 * Autor: Arquiteto Sênior (Assistente AI)
 * Descrição: Automatiza configuração, execução, testes e sincronização Git sem dependências externas de ambiente (.env).
 * Uso: node manage-project.js [OPÇÃO] [ARGS...]
 * 
 * Opções:
 *   dev       - Configura ambiente e inicia servidor de desenvolvimento
 *   prod      - Instala dependências, roda testes e gera build de produção (agora em /docs)
 *   sync      - Sincroniza com git (pull). Use: sync "mensagem de commit" para push
 *   test      - Apenas roda os testes
 *   setup     - Apenas instala dependências (sem configuração de .env)
 *   help      - Mostra mensagem de ajuda
 */

import { execSync } from 'child_process';
import { existsSync, appendFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Configurações Globais
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_DIR = __dirname;
const LOG_FILE = resolve(PROJECT_DIR, 'project_manager.log');

// Cores para saída no terminal (ANSI escape codes)
const COLORS = {
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  RESET: '\x1b[0m'
};

// ==============================================================================
// Funções Auxiliares
// ==============================================================================

function log(type, message) {
  const date = new Date().toISOString().replace('T', ' ').split('.')[0];
  let color = COLORS.RESET;

  switch (type) {
    case 'INFO': color = COLORS.BLUE; break;
    case 'SUCCESS': color = COLORS.GREEN; break;
    case 'WARN': color = COLORS.YELLOW; break;
    case 'ERROR': color = COLORS.RED; break;
  }

  console.log(`${color}[${type}]${COLORS.RESET} ${message}`);
  
  // Append to log file
  try {
    appendFileSync(LOG_FILE, `[${date}] [${type}] ${message}\n`);
  } catch (err) {
    console.error(`Erro ao escrever no log: ${err.message}`);
  }
}

function runCommand(command, errorMessage = 'Comando falhou') {
  try {
    execSync(command, { stdio: 'inherit', cwd: PROJECT_DIR });
    return true;
  } catch (error) {
    log('ERROR', `${errorMessage}: ${error.message}`);
    return false;
  }
}

function checkRequirements() {
  log('INFO', 'Verificando requisitos do sistema...');
  try {
    const nodeVersion = execSync('node -v').toString().trim();
    const npmVersion = execSync('npm -v').toString().trim();
    const gitVersion = execSync('git --version').toString().trim();
    
    log('INFO', `Node.js: ${nodeVersion}`);
    log('INFO', `NPM: ${npmVersion}`);
    log('INFO', `Git: ${gitVersion}`);
  } catch (e) {
    log('ERROR', 'Falha ao verificar requisitos. Certifique-se de ter Node, NPM e Git instalados.');
    process.exit(1);
  }
}

// ==============================================================================
// Operações Principais
// ==============================================================================

function installDeps() {
  log('INFO', 'Instalando/Atualizando dependências...');
  if (runCommand('npm ci', 'Falha ao instalar dependências')) {
    log('SUCCESS', 'Dependências instaladas com sucesso.');
  } else {
    process.exit(1);
  }
}

function runTests() {
  log('INFO', 'Executando testes automatizados...');
  if (runCommand('npm run test run', 'Falha na execução dos testes')) {
    log('SUCCESS', 'Todos os testes passaram.');
  } else {
    process.exit(1);
  }
}

function buildProd() {
  log('INFO', 'Iniciando build de produção (output: docs/)...');
  if (runCommand('npm run build', 'Falha no build de produção')) {
    // Verificação de segurança: check docs/index.html
    if (existsSync(resolve(PROJECT_DIR, 'docs', 'index.html'))) {
      log('SUCCESS', 'Build de produção concluído com sucesso em /docs.');
    } else {
      log('ERROR', 'Build falhou: docs/index.html não encontrado.');
      process.exit(1);
    }
  } else {
    process.exit(1);
  }
}

function startDev() {
  log('INFO', 'Iniciando servidor de desenvolvimento...');
  runCommand('npm run dev', 'Falha ao iniciar servidor de desenvolvimento');
}

function gitSync(commitMsg) {
  log('INFO', 'Iniciando sincronização com repositório remoto...');
  
  // Pull
  log('INFO', 'Baixando atualizações remotas (git pull)...');
  if (runCommand('git pull origin main', 'Falha ao baixar atualizações')) {
    log('SUCCESS', 'Código atualizado.');
  } else {
    process.exit(1);
  }
  
  // Push (se houver mensagem de commit)
  if (commitMsg) {
    log('INFO', `Enviando alterações locais com mensagem: "${commitMsg}"...`);
    runCommand('git add .');
    if (runCommand(`git commit -m "${commitMsg}"`, 'Falha no commit')) {
        if (runCommand('git push origin main', 'Falha ao enviar alterações')) {
            log('SUCCESS', 'Alterações enviadas com sucesso.');
        } else {
            process.exit(1);
        }
    } else {
        process.exit(1);
    }
  } else {
    log('INFO', 'Nenhuma mensagem de commit fornecida. Apenas sincronização (pull) realizada.');
  }
}

function showHelp() {
  console.log(`
${COLORS.BLUE}Gerenciador do Projeto Salom Service Site Mobile (Node.js)${COLORS.RESET}

Uso: node manage-project.js [OPÇÃO] [ARGS...]

Opções:
  dev       - Configura ambiente e inicia servidor de desenvolvimento
  prod      - Instala dependências, roda testes e gera build de produção (em /docs)
  sync      - Sincroniza com git (pull). Use: sync "mensagem de commit" para push
  test      - Apenas roda os testes
  setup     - Apenas instala dependências (sem .env)
  help      - Mostra esta mensagem de ajuda
`);
}

// ==============================================================================
// Lógica Principal (Main)
// ==============================================================================

const args = process.argv.slice(2);
const command = args[0] || 'help';
const param = args[1]; // Opcional, ex: mensagem de commit

// Cria arquivo de log se não existir
if (!existsSync(LOG_FILE)) {
    try {
        appendFileSync(LOG_FILE, '');
    } catch (e) {
        console.error('Não foi possível criar arquivo de log.');
    }
}

switch (command) {
  case 'dev':
    checkRequirements();
    installDeps();
    startDev();
    break;
  case 'prod':
    checkRequirements();
    installDeps();
    runTests();
    buildProd();
    break;
  case 'sync':
    checkRequirements();
    gitSync(param);
    break;
  case 'test':
    checkRequirements();
    runTests();
    break;
  case 'setup':
    checkRequirements();
    installDeps();
    break;
  case 'help':
  default:
    showHelp();
    break;
}
