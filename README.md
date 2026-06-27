# Carteira Digital de Certificados

Sistema Web desenvolvido para centralizar o envio, validação e acompanhamento de certificados acadêmicos de **Horas Complementares** em Instituições Públicas de Ensino Superior.

O sistema permite que estudantes submetam certificados em PDF para análise, enquanto administradores realizam a validação e acompanham o andamento das solicitações.

---

# Tecnologias

- PHP 8.3+
- Laravel 12
- React
- Inertia.js
- Vite
- MySQL
- Eloquent ORM

---

# Funcionalidades da Versão Beta

## Estudante

- Login
- Dashboard
- Listagem de certificados enviados
- Envio de certificado (PDF)

## Administrador

- Login
- Dashboard
- Visualização de todos os certificados
- Aprovação de certificados
- Rejeição de certificados

---

# Instalação

## 1. Clonar o projeto

```bash
git clone https://github.com/SEU_USUARIO/carteira_digital_certificados.git

cd carteira_digital_certificados
```

---

## 2. Instalar dependências do PHP

```bash
composer install
```

---

## 3. Instalar dependências do Frontend

```bash
npm install
```

---

## 4. Configurar o arquivo .env

Copie o arquivo de exemplo.

```bash
cp .env.example .env
```

ou no Windows

```bash
copy .env.example .env
```

Configure as informações do banco.

Exemplo:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=carteira_digital
DB_USERNAME=root
DB_PASSWORD=
```

---

## 5. Gerar a chave da aplicação

```bash
php artisan key:generate
```

---

## 6. Executar as migrations

```bash
php artisan migrate
```

---

## 7. Popular o banco de dados

```bash
php artisan db:seed
```

Esse comando criará:

- Instituição de teste
- Categorias
- Usuário Administrador
- Usuário Estudante

---

## 8. Criar o link do Storage

Necessário para visualizar os PDFs enviados.

```bash
php artisan storage:link
```

---

## 9. Iniciar o servidor Laravel

```bash
php artisan serve
```

---

## 10. Iniciar o Vite

Em outro terminal:

```bash
npm run dev
```

---

# Usuários de Teste

## Administrador

```
Email:
admin@cdc.com

Senha:
password
```

---

## Estudante

```
Email:
aluno1@cdc.com
aluno2@cdc.com

Senha:
password
```

---

# Fluxo de Teste

## Como estudante

1. Fazer login
2. Acessar "Novo Certificado"
3. Selecionar uma categoria
4. Informar título
5. Informar horas
6. Enviar um PDF

Depois acessar:

```
Meus Certificados
```

para visualizar o certificado enviado.

---

## Como administrador

1. Fazer login
2. Acessar "Gerenciar Certificados"
3. Visualizar todos os certificados enviados
4. Aprovar ou rejeitar um certificado

---

# Estrutura do Projeto

```
app/
    Http/
        Controllers/
        Requests/

    Models/

database/
    migrations/
    seeders/

resources/
    js/
        Pages/
            Dashboard/
            Certificados/

routes/
    web.php
```

---

# Próximas Funcionalidades

- Policies (Controle de Permissões)
- Dashboard com progresso de horas
- Download de certificados
- Justificativa de rejeição
- Cálculo automático das horas
- Regras específicas por instituição
- Sistema de notificações
- Pesquisa e filtros
  
---

# Fluxo da Aplicação

```
Login

↓

Dashboard

↓

Enviar Certificado

↓

Administrador Analisa

↓

Aprovar/Rejeitar

↓

Status Atualizado
```
