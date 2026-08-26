# Carteira Digital de Certificados

Sistema Web desenvolvido para centralizar o envio, validação e acompanhamento de certificados acadêmicos relacionados a **Horas Complementares**.

O projeto tem como contexto inicial o **Instituto Federal de Mato Grosso do Sul (IFMS)** e busca reduzir a burocracia associada ao armazenamento, submissão e validação de certificados, oferecendo ao estudante maior transparência sobre sua situação acadêmica.

A arquitetura da aplicação foi estruturada de forma a permitir, futuramente, sua adaptação às regras de outras instituições públicas de ensino superior, como universidades federais e estaduais.

---

# Escopo do Projeto

O projeto foi inicialmente concebido como uma **Carteira Digital de Certificados**, com a possibilidade de centralizar diferentes tipos de certificados e atividades acadêmicas.

Durante o desenvolvimento, o escopo foi deliberadamente reduzido para priorizar a entrega de uma aplicação funcional e reduzir a complexidade inicial.

## Escopo atual

A versão atual é destinada à **gerência de certificados de Horas Complementares**, contemplando:

- envio de certificados;
- armazenamento dos documentos;
- consulta dos certificados submetidos;
- validação por responsável institucional;
- aprovação ou rejeição;
- acompanhamento do status.

## Fora do escopo atual

Não fazem parte da implementação atual:

- emissão ou geração de certificados;
- gerenciamento de estágio;
- gerenciamento completo de atividades de extensão;
- integração com gov.br;
- sistema avançado de notificações;
- aplicação mobile.

Esses recursos poderão ser considerados em versões futuras.

> **Nota:** o sistema atualmente gerencia certificados já existentes. A emissão dos certificados pelas instituições ou pelos organizadores das atividades permanece fora do escopo da aplicação.

---

# Tecnologias

## Backend

- **PHP 8.3+**
- **Laravel 12**
- **Eloquent ORM**
- Laravel Breeze
- Form Requests
- Policies (previstas para a próxima etapa)

## Frontend

- **React 18**
- **Inertia.js 2**
- **Vite 7**
- Tailwind CSS
- Axios

## Banco de Dados

- **MySQL 8.0+**

## Controle de versão

- Git
- GitHub

---

# Requisitos para Execução

Antes de executar o projeto, certifique-se de possuir:

### PHP

- PHP **8.3 ou superior**
A instalação do PHP pode variar de acordo com o sistema operacional.

---

### Composer

- Composer **2.x**

Verifique com:

```bash
composer --version

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
├── Http/
│   ├── Controllers/
│   └── Requests/
│
├── Models/
│
database/
├── migrations/
└── seeders/
│
resources/
└── js/
    ├── Components/
    ├── Layouts/
    └── Pages/
        ├── Auth/
        ├── Dashboard/
        ├── Certificados/
        └── Profile/
│
routes/
└── web.php
```

---

# Testes
Estrutura prevista para condução de testes:
## Funcionalidades:
- autenticação;
- cadastro de certificados;
- upload de documentos;
- consultas de certificados;
- aprovação e rejeição;

## Autorização:
- estudante acessa somente seus próprios certificados;
- administrador acessa certificados de diferentes estudantes;
- tentativa de estudante de realizar ações administrativas;

## Regras de Negócio;
- Cálculo de horas;
- Limites institucionais;
- Regras por categoria;
- Regras por período/semestre;

##
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
