# Auth Server

## Beskrivning
Detta projekt är en autentiseringsserver byggd med Node.js och Express som hanterar användarautentisering och registrering. Servern implementerar säker inloggning och registrering med token-baserad autentisering samt övervakning med Prometheus och Grafana.

## Funktioner
- **Användarautentisering:** Token-baserad autentisering med `accessToken`, `refreshToken`, och `csrfToken`.
- **Säkerhet:** Lagring av `accessToken` i `httpOnly` cookies och användning av CSRF-skydd.
- **Övervakning:** Integrering av Prometheus för insamling av användarmetriker, såsom antal inloggningar och eventuella fel.
- **Docker-kompatibilitet:** Servern är containeriserad med Docker och inkluderar Docker Compose-konfiguration för att underlätta distributionen.

## Förutsättningar
För att köra projektet behöver du ha:
- [Node.js](https://nodejs.org/) installerat.
- [Docker och Docker Compose](https://www.docker.com/) installerat.

## Installation

1. **Klona detta repository:**
   ```bash
   git clone https://github.com/ditt-anvandarnamn/auth-server.git
   cd auth-server
