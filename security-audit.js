#!/usr/bin/env node

/**
 * 🔒 AUDITORIA DE SEGURANÇA - Portal da Renda de Filé
 * 
 * Este script verifica vulnerabilidades de segurança comuns
 * em aplicações Next.js e Strapi.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('🔒 AUDITORIA DE SEGURANÇA - Portal da Renda de Filé\n');
console.log('============================================================');

// Cores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

let securityScore = 0;
let totalChecks = 0;
const issues = [];

function checkPassed(message) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
  securityScore++;
  totalChecks++;
}

function checkFailed(message, severity = 'medium') {
  const icon = severity === 'high' ? '🚨' : severity === 'medium' ? '⚠️' : 'ℹ️';
  console.log(`${colors.red}${icon} ${message}${colors.reset}`);
  issues.push({ message, severity });
  totalChecks++;
}

function checkWarning(message) {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
  securityScore += 0.5;
  totalChecks++;
}

// 1. VERIFICAR ARQUIVOS DE CONFIGURAÇÃO SENSÍVEIS
console.log('\n1. VERIFICANDO ARQUIVOS DE CONFIGURAÇÃO\n');

function checkSensitiveFiles() {
  const sensitiveFiles = [
    '.env',
    '.env.local',
    '.env.production',
    'backend/.env',
    'frontend/.env.local'
  ];

  sensitiveFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Verificar se há secrets expostos
      if (content.includes('password') || content.includes('secret') || content.includes('key')) {
        if (content.includes('localhost') || content.includes('development')) {
          checkWarning(`${file} contém credenciais (ambiente de desenvolvimento)`);
        } else {
          checkFailed(`${file} pode conter credenciais sensíveis`, 'high');
        }
      } else {
        checkPassed(`${file} não contém credenciais óbvias`);
      }
    }
  });
}

// 2. VERIFICAR DEPENDÊNCIAS VULNERÁVEIS
console.log('\n2. VERIFICANDO DEPENDÊNCIAS\n');

function checkDependencies() {
  const packageFiles = [
    'frontend/package.json',
    'backend/package.json'
  ];

  packageFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      
      // Verificar dependências conhecidamente vulneráveis
      const vulnerableDeps = [
        'lodash', // versões antigas
        'moment', // deprecated
        'request', // deprecated
      ];

      let hasVulnerable = false;
      vulnerableDeps.forEach(dep => {
        if (deps[dep]) {
          checkWarning(`${file}: ${dep} pode ter vulnerabilidades conhecidas`);
          hasVulnerable = true;
        }
      });

      if (!hasVulnerable) {
        checkPassed(`${file}: Nenhuma dependência obviamente vulnerável encontrada`);
      }
    }
  });
}

// 3. VERIFICAR CONFIGURAÇÕES DO STRAPI
console.log('\n3. VERIFICANDO CONFIGURAÇÕES DO STRAPI\n');

function checkStrapiSecurity() {
  const strapiConfigFiles = [
    'backend/config/server.js',
    'backend/config/database.js',
    'backend/config/middlewares.js'
  ];

  strapiConfigFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Verificar configurações de segurança
      if (content.includes('cors')) {
        if (content.includes('origin: "*"') || content.includes("origin: '*'")) {
          checkFailed(`${file}: CORS configurado para aceitar qualquer origem`, 'medium');
        } else {
          checkPassed(`${file}: CORS configurado adequadamente`);
        }
      }

      if (content.includes('helmet')) {
        checkPassed(`${file}: Helmet configurado para segurança de headers`);
      } else {
        checkWarning(`${file}: Considere adicionar Helmet para segurança de headers`);
      }
    }
  });
}

// 4. VERIFICAR CONFIGURAÇÕES DO NEXT.JS
console.log('\n4. VERIFICANDO CONFIGURAÇÕES DO NEXT.JS\n');

function checkNextJSSecurity() {
  const nextConfigFile = 'frontend/next.config.js';
  
  if (fs.existsSync(nextConfigFile)) {
    const content = fs.readFileSync(nextConfigFile, 'utf8');
    
    // Verificar configurações de segurança
    if (content.includes('contentSecurityPolicy')) {
      checkPassed(`${nextConfigFile}: CSP configurado`);
    } else {
      checkWarning(`${nextConfigFile}: Considere adicionar Content Security Policy`);
    }

    if (content.includes('X-Frame-Options')) {
      checkPassed(`${nextConfigFile}: X-Frame-Options configurado`);
    } else {
      checkWarning(`${nextConfigFile}: Considere adicionar X-Frame-Options`);
    }
  } else {
    checkWarning('next.config.js não encontrado - considere criar para configurações de segurança');
  }
}

// 5. VERIFICAR UPLOADS E VALIDAÇÕES
console.log('\n5. VERIFICANDO CONFIGURAÇÕES DE UPLOAD\n');

function checkUploadSecurity() {
  const uploadConfig = 'backend/config/plugins.js';
  
  if (fs.existsSync(uploadConfig)) {
    const content = fs.readFileSync(uploadConfig, 'utf8');
    
    if (content.includes('sizeLimit')) {
      checkPassed(`${uploadConfig}: Limite de tamanho de arquivo configurado`);
    } else {
      checkFailed(`${uploadConfig}: Limite de tamanho de arquivo não configurado`, 'medium');
    }

    if (content.includes('allowedTypes') || content.includes('mime')) {
      checkPassed(`${uploadConfig}: Validação de tipo de arquivo configurada`);
    } else {
      checkFailed(`${uploadConfig}: Validação de tipo de arquivo não configurada`, 'high');
    }
  } else {
    checkWarning('Configuração de upload não encontrada');
  }
}

// 6. VERIFICAR AUTENTICAÇÃO E AUTORIZAÇÃO
console.log('\n6. VERIFICANDO AUTENTICAÇÃO E AUTORIZAÇÃO\n');

function checkAuthSecurity() {
  // Verificar se JWT está configurado
  const jwtFile = 'backend/config/plugins.js';
  
  if (fs.existsSync(jwtFile)) {
    const content = fs.readFileSync(jwtFile, 'utf8');
    
    if (content.includes('jwt')) {
      if (content.includes('expiresIn')) {
        checkPassed('JWT: Tempo de expiração configurado');
      } else {
        checkWarning('JWT: Considere configurar tempo de expiração');
      }
    }
  }

  // Verificar permissões públicas
  const permissionsDir = 'backend/src/api';
  if (fs.existsSync(permissionsDir)) {
    checkPassed('Estrutura de API encontrada - verifique permissões manualmente');
  }
}

// 7. VERIFICAR LOGS E MONITORAMENTO
console.log('\n7. VERIFICANDO LOGS E MONITORAMENTO\n');

function checkLogging() {
  const logFiles = [
    'backend/config/logger.js',
    'frontend/next.config.js'
  ];

  let hasLogging = false;
  logFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('log') || content.includes('winston') || content.includes('pino')) {
        checkPassed(`${file}: Sistema de logs configurado`);
        hasLogging = true;
      }
    }
  });

  if (!hasLogging) {
    checkWarning('Sistema de logs não configurado - considere implementar');
  }
}

// EXECUTAR TODAS AS VERIFICAÇÕES
async function runSecurityAudit() {
  try {
    checkSensitiveFiles();
    checkDependencies();
    checkStrapiSecurity();
    checkNextJSSecurity();
    checkUploadSecurity();
    checkAuthSecurity();
    checkLogging();

    // RELATÓRIO FINAL
    console.log('\n============================================================');
    console.log('📊 RELATÓRIO DE SEGURANÇA\n');

    const percentage = Math.round((securityScore / totalChecks) * 100);
    const scoreColor = percentage >= 80 ? colors.green : percentage >= 60 ? colors.yellow : colors.red;

    console.log(`${colors.bold}Pontuação de Segurança: ${scoreColor}${securityScore}/${totalChecks} (${percentage}%)${colors.reset}\n`);

    if (issues.length > 0) {
      console.log(`${colors.red}${colors.bold}🚨 PROBLEMAS ENCONTRADOS:${colors.reset}\n`);
      
      const highIssues = issues.filter(i => i.severity === 'high');
      const mediumIssues = issues.filter(i => i.severity === 'medium');
      const lowIssues = issues.filter(i => i.severity === 'low');

      if (highIssues.length > 0) {
        console.log(`${colors.red}${colors.bold}ALTA PRIORIDADE:${colors.reset}`);
        highIssues.forEach(issue => console.log(`  🚨 ${issue.message}`));
        console.log();
      }

      if (mediumIssues.length > 0) {
        console.log(`${colors.yellow}${colors.bold}MÉDIA PRIORIDADE:${colors.reset}`);
        mediumIssues.forEach(issue => console.log(`  ⚠️  ${issue.message}`));
        console.log();
      }

      if (lowIssues.length > 0) {
        console.log(`${colors.blue}${colors.bold}BAIXA PRIORIDADE:${colors.reset}`);
        lowIssues.forEach(issue => console.log(`  ℹ️  ${issue.message}`));
        console.log();
      }
    } else {
      console.log(`${colors.green}${colors.bold}🎉 NENHUM PROBLEMA CRÍTICO ENCONTRADO!${colors.reset}\n`);
    }

    // RECOMENDAÇÕES
    console.log(`${colors.blue}${colors.bold}📋 RECOMENDAÇÕES GERAIS:${colors.reset}\n`);
    console.log('1. Execute "npm audit" regularmente para verificar vulnerabilidades');
    console.log('2. Mantenha dependências atualizadas');
    console.log('3. Use HTTPS em produção');
    console.log('4. Configure rate limiting');
    console.log('5. Implemente logs de segurança');
    console.log('6. Configure backup automático');
    console.log('7. Use variáveis de ambiente para credenciais');
    console.log('8. Configure CSP (Content Security Policy)');
    console.log('9. Valide todas as entradas do usuário');
    console.log('10. Configure monitoramento de segurança');

    console.log('\n============================================================');
    
    if (percentage >= 80) {
      console.log(`${colors.green}${colors.bold}✅ SEGURANÇA BOA - Continue monitorando!${colors.reset}`);
    } else if (percentage >= 60) {
      console.log(`${colors.yellow}${colors.bold}⚠️  SEGURANÇA MODERADA - Corrija os problemas encontrados${colors.reset}`);
    } else {
      console.log(`${colors.red}${colors.bold}🚨 SEGURANÇA BAIXA - Ação imediata necessária!${colors.reset}`);
    }

  } catch (error) {
    console.error(`${colors.red}Erro durante auditoria: ${error.message}${colors.reset}`);
  }
}

// Executar auditoria
runSecurityAudit();
