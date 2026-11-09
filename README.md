# Particle Magic 3D

Experimento de partículas 3D com formas, gestos e comandos de voz opcionais.

**Estado:** projeto experimental de portfólio, com melhorias de reprodutibilidade e testes. Autor: Waly Robert.

## Executar

Requer Node.js 22.16 ou superior e npm.

```bash
npm ci
npm run dev
```

Abra o endereço informado pelo Vite. Para produção local: `npm run build` e `npm run preview`. Os arquivos estáticos ficam em `dist/`.

## Recursos e limites

- Cena Three.js/React Three Fiber com 15.000 partículas por padrão.
- Formas selecionáveis e reconhecimento de mão com MediaPipe.
- Câmera somente após clicar em **Ativar câmera**; pode ser desativada a qualquer momento.
- Fallback de GPU para CPU na criação do reconhecedor.
- Limpeza de câmera/modelo após troca de modo, falha ou desmontagem.

O modelo e WASM do MediaPipe são baixados de Google/CDN ao ativar o rastreamento; a versão WASM corresponde à dependência npm. O reconhecimento de mãos roda no navegador. Comandos de voz dependem da API do navegador, que pode usar um serviço remoto de reconhecimento; não são apresentados como processamento de voz offline.

HTTPS ou localhost é necessário para câmera/microfone. O modo com câmera é sobreposição visual, sem promessa de ancoragem WebXR. Sem permissões ou modelo, as formas continuam disponíveis pelos botões. Desempenho e disponibilidade variam por dispositivo. Os testes não certificam rastreamento real em todo hardware.

## Verificação

```bash
npm test
npm run build
```

O build verifica TypeScript antes de compilar. O CI repete os testes e build em Node.js 22. `package-lock.json` registra as versões instaladas. Testes de DOM usam APIs simuladas e não substituem validação real de codecs, permissões, hardware ou provedores externos.

## Origem e organização

Derivado do projeto do autor no Google AI Studio. Esta versão adiciona entrada Vite portátil, estilos Tailwind compilados localmente, limites e correções do fluxo principal. As alterações são locais; não substituem automaticamente a versão no Studio.

- `App.tsx` e `components/`: interface e fluxo da aplicação.
- `utils/` e/ou `services/`: conversão, validação ou integração.
- `tests/`: regressões do comportamento principal.
- `.github/workflows/ci.yml`: verificação automática.

## Dados e licenciamento

Use arquivos de exemplo sintéticos ou que você tenha autorização para compartilhar. Segredos, dependências instaladas e builds são excluídos do Git. As dependências/modelos mantêm suas próprias licenças. Uma licença de redistribuição para o código deste projeto ainda não foi definida pelo autor.
