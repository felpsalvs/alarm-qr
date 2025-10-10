4# Alarm QR

Um aplicativo Android que funciona como despertador inteligente. O alarme só para quando o usuário escaneia um QR code específico previamente configurado, garantindo que ele esteja realmente acordado e ativo.

## 🎯 Funcionalidades

- **Configuração de QR Code**: Escaneie e salve um QR code de referência
- **Sistema de Alarme**: Som em loop + vibração contínua
- **Validação por QR**: Scanner de câmera que compara QR escaneado com o configurado
- **Parada Automática**: Alarme para automaticamente ao escanear QR correto
- **Armazenamento Seguro**: QR code salvo de forma segura no dispositivo
- **Funcionamento Offline**: 100% offline, sem necessidade de internet

## 🚀 Como Usar

1. **Primeira Configuração**
   - Abra o app e vá para a aba "Alarm"
   - Toque em "Configurar QR" e escaneie o código que deseja usar
   - O QR será salvo automaticamente

2. **Usar o Alarme**
   - Toque em "Iniciar alarme"
   - O app começará a tocar som e vibrar
   - Aponte a câmera para o QR code configurado
   - O alarme para automaticamente ao detectar o QR correto

3. **Parar Manualmente**
   - Use o botão "Parar" como fallback se o QR não estiver disponível

## 🛠️ Tecnologias

- **React Native** + **Expo SDK 54**
- **TypeScript** para tipagem estática
- **Expo Router** para navegação
- **expo-camera** para scanner QR
- **expo-av** para reprodução de áudio
- **expo-secure-store** para armazenamento seguro
- **expo-haptics** para feedback tátil

## 📱 Requisitos

- **Android 5.0+** (API 21+)
- **Câmera** para scanner QR
- **Permissões**: Câmera, áudio, vibração

## 🏗️ Desenvolvimento

### Instalação
```bash
# Clone o repositório
git clone <repository-url>
cd alarm-qr

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npx expo start
```

### Comandos Úteis
```bash
# Iniciar no Android
npx expo start --android

# Build para produção
npx expo build:android

# Executar linting
npm run lint
```

### Estrutura do Projeto
```
alarm-qr/
├── app/                    # Expo Router (navegação)
│   ├── (tabs)/            # Navegação por tabs
│   │   └── alarm.tsx      # Tela principal do alarme
├── components/            # Componentes reutilizáveis
├── constants/             # Constantes e configurações
├── docs/                  # Documentação do projeto
├── .cursor/               # Regras e notas do Cursor
└── README.md
```

## 📚 Documentação

- **[PRD](docs/PRD.md)**: Requisitos do produto
- **[Especificações Técnicas](docs/TECHNICAL_SPECS.md)**: Arquitetura e implementação
- **[Fluxos do Usuário](docs/USER_FLOWS.md)**: Jornada do usuário

## 🔒 Privacidade e Segurança

- **100% Offline**: Nenhum dado é enviado para servidores
- **Armazenamento Seguro**: QR code criptografado no dispositivo
- **Sem Telemetria**: Nenhum rastreamento ou coleta de dados
- **Permissões Mínimas**: Apenas as permissões necessárias

## 🎵 Áudio

O app usa um som de alarme de domínio público da Wikimedia Commons. Em versões futuras, será incluído um asset local para funcionamento completamente offline.

## 🐛 Reportar Problemas

Se encontrar algum problema:
1. Verifique se as permissões de câmera e áudio estão habilitadas
2. Teste em um dispositivo físico (emuladores podem ter limitações)
3. Certifique-se de que o QR code está bem iluminado e focado

## 📄 Licença

Este projeto é open source. Veja o arquivo LICENSE para detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:
1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abra um Pull Request

---

**Desenvolvido com ❤️ para ajudar pessoas a acordarem de verdade!**