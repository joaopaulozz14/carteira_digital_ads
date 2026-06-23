> CLONANDO E CONFIGURANDO PROJETO:

1. git clone <url>
2. composer install
3. npm install;
4. cp .env.example .env
5. php artisan key:generate
6. configurar banco (.ENV)
7. php artisan migrate
8. php artisan serve (rodar backend)
9. npm run dev (rodar frontend)

 OBS: git remote set-url origin <novo_endereço_do_repositório> (caso necessário - mudar o repositório local e apontá-lo para outro link do github)

---

> OUTROS PACOTES INSTALADOS:

	- Breeze:
		composer require laravel/breeze --dev

	- REACT/INERTIA:
		php artisan breeze:install react (Breeze already installs 'Inertia' -> you can use it to generate 'REACT' or 'VUE' files for auth);

	- Atualizações ou Instalação:
		NPM INSTALL/UPDATE | COMPOSER UPDATE/INSTALL | NPM AUDIT FIX (corrigir vulnerabilidades)

	- Rodando:
		NPM RUN DEV (Rodar frontend) | PHP ARTISAN SERVE (Rodar backend)

> OBS: Não é necessário instalar o 'Breeze' ou 'REACT/INERTIA' novamente - ele não altera a 'Vendor', somente gera arquivos diretamente na aplicação.

---

> ATUALIZANDO ALTERAÇÕES:

1. git status (verificar alterações atuais)
2. git add . (todas as pastas) ou git add database/migrations (caminho ou arquivo específico)
3. git commit -m "Criando Estrutura Inicial do Banco de Dados"
4. git checkout -b feature/database_structure (criando branch 'feature/...')
4. git push origin feature/database-structure (add arquivos para nova branch)
5. depois, no github, revisar e dar 'merge' na main

> OBS:
Use 'git pull' - irá baixar os arquivos que estão no 'github', mas que não estão no seu projeto local. Se não fizer isso, o 'commit' será rejeitado. EX: O 'README' é alterado no 'github' -> você deve baixar a última versão desse arquivo no seu projeto local. O mesmo vale para qualquer arquivo inconsistente entre o 'projeto github' e o seu 'projeto local'.

---

### 📌 Desenvolvimento de Funcionalidades

Cada nova funcionalidade deve ser desenvolvida em uma branch separada.

#### Exemplos:

```text
feature/prototipo-telas
feature/models-certificados
feature/migrations-iniciais
feature/upload-certificados
```

---

## 🔄 Fluxo de Trabalho

### 0. Criando repositório pela primeira vez:

- git init (inicializar repositório - com 'git instalado')
- git add . (selecionar todas as pastas)
- git commit -m "Initial commit - Laravel" (descrever)
= git remote add origin <URL> (linkando com o github pela url)
- git branch -M main (renomeando branch 'master' para 'main')
- git push -u origin main (salvando alterações no github)

[Esses comandos devem ser colocados no 'terminal' - depois de acessado seu 'projeto']


### 1. Atualizar projeto local

Antes de iniciar uma nova tarefa:

```bash
git checkout main
git pull origin main
```

---

### 2. Criar nova branch

```bash
git checkout -b feature/nome-da-feature
```

Exemplo:

```bash
git checkout -b feature/models-certificados
```

---

### 3. Realizar alterações (código)

Exemplo:

* criação de models
* migrations
* telas
* controllers

---

### 4. Verificar alterações

```bash
git status
```

---

### 5. Adicionar arquivos

```bash
git add .
```

---

### 6. Criar commit

Os commits devem possuir mensagens claras e objetivas.

#### Exemplos:

```bash
git commit -m "Add certificate model and migration"
```

```bash
git commit -m "Create upload certificate screen"
```

---

### 7. Enviar branch para o GitHub

```bash
git push origin nome-da-branch
```

Exemplo:

```bash
git push origin feature/models-certificados
```

---

### 8. Criar Pull Request

Após finalizar a funcionalidade:

* acessar o GitHub;
* criar um Pull Request;
* solicitar revisão;
* realizar merge na branch `main`.

---

## ⚠️ Boas Práticas

* Não desenvolver diretamente na branch `main`;
* Criar commits pequenos e organizados;
* Utilizar nomes descritivos para branches e commits;
* Sempre atualizar a branch local antes de iniciar uma nova tarefa;
* Testar alterações antes do envio para o repositório remoto.

---

---


# 📚 Carteira Digital de Certificados (CDC)

Sistema web para gerenciamento de certificados acadêmicos, com foco em **Horas Complementares** em instituições de ensino superior.

---

## 🎯 Objetivo

Permitir que estudantes façam upload de certificados e acompanhem, de forma transparente, o progresso de horas obrigatórias, enquanto administradores validam e aplicam regras institucionais automaticamente.

---

## 🧠 Problema Resolvido

Atualmente, o processo de validação de horas complementares é:

* Burocrático
* Manual
* Pouco transparente
* Suscetível a erros e retrabalho

O CDC propõe:

✔ Centralização
✔ Automação
✔ Transparência
✔ Redução de esforço administrativo

---

## 🔄 Fluxo do Sistema

1. Estudante realiza login
2. Envia certificado (PDF + dados)
3. Sistema registra como **PENDENTE**
4. Administrador analisa:

   * Aprova ou rejeita (com justificativa)
5. Sistema aplica regras institucionais
6. Dashboard é atualizado automaticamente

---

## 🧩 Conceito Central

> O sistema funciona como um **motor de regras aplicado a certificados**.

* Certificados = dados
* Regras = restrições institucionais
* Sistema = aplicação dessas regras

---

## ⚙️ Tecnologias

### Backend

* Laravel (PHP)

### Frontend

* React (via Inertia.js)

### Autenticação

* Laravel Breeze

### Banco de Dados

* MySQL

### ORM

* Eloquent

### Arquitetura

* MVC (Model-View-Controller) + Services

---

## 🏗️ Estrutura do Projeto

```
app/
 ├── Models/
 ├── Http/Controllers/
 ├── Services/

resources/
 ├── js/Pages/
 ├── views/

routes/
 ├── web.php
```

---

## 🗄️ Modelagem de Dados

Principais entidades:

* Usuário
* Certificado
* Categoria
* Regra
* Instituição

Destaque:

> As regras são armazenadas no banco de dados, permitindo adaptação por instituição sem alteração de código.

---

## 🚀 Setup do Projeto

### Pré-requisitos

* PHP 12
* Composer
* NPM (REACT)
* MySQL

---

### Passo a passo

```bash
# Clonar repositório
git clone <URL>
cd carteira-digital

# Instalar dependências
composer install
npm install

# Configurar ambiente
cp .env.example .env
php artisan key:generate

# Configurar banco no .env
DB_DATABASE=carteira_certificados
DB_USERNAME=...
DB_PASSWORD=...

# Rodar migrations
php artisan migrate

# Iniciar frontend
npm run dev

# Iniciar servidor
php artisan serve
```

## 👥 Equipe

* Backend
* Frontend
* Gerente de Projeto




<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework. You can also check out [Laravel Learn](https://laravel.com/learn), where you will be guided through building a modern Laravel application.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.
