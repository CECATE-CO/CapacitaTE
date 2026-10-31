@echo off
REM Migra banco, dados e usuários do login da nuvem para o Supabase local (dados do .env; precisa do Docker aberto)
cd /d "%~dp0"
node scripts\migrar-para-local.js
pause
