# Form Admin

Este é um projeto de administração de formulários construído com Next.js, Supabase e Tailwind CSS.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm (gerenciador de pacotes)
- Conta no Supabase

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd form-admin
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione as seguintes variáveis:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://husubeidubwsuzuuyiga.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1c3ViZWlkdWJ3c3V6dXV5aWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMjkyMjEsImV4cCI6MjA1OTYwNTIyMX0.nifiHMZnSUJChakiAiGSDXqCkdPfqoUJTJR5ZzvgQ00
   ```
   - ⚠️ **Importante**: O arquivo `.env.local` está configurado para ser ignorado pelo Git (veja `.gitignore`). Isso é uma medida de segurança para evitar que chaves sensíveis sejam commitadas no repositório.
   - Se você precisar compartilhar as variáveis de ambiente com outros desenvolvedores, faça isso de forma segura, como através de um gerenciador de segredos ou comunicação direta.

## Executando o Projeto

### Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
pnpm dev
```

O servidor estará disponível em [http://localhost:3000](http://localhost:3000)

### Produção

Para construir a aplicação para produção:

```bash
pnpm build
```

Para iniciar o servidor de produção:

```bash
pnpm start
```

## Scripts Disponíveis

- `pnpm dev`: Inicia o servidor de desenvolvimento
- `pnpm build`: Constrói a aplicação para produção
- `pnpm start`: Inicia o servidor de produção
- `pnpm lint`: Executa o linter para verificar problemas de código

## Tecnologias Utilizadas

- Next.js 15
- React 19
- Supabase
- Tailwind CSS
- TypeScript
- Radix UI
- React Hook Form
- Zod
- Framer Motion

## Estrutura do Projeto

- `/app`: Páginas e rotas da aplicação
- `/components`: Componentes reutilizáveis
- `/lib`: Utilitários e configurações
- `/hooks`: Hooks personalizados
- `/public`: Arquivos estáticos
- `/styles`: Estilos globais

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. 