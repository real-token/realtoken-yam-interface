#!/bin/bash

# Script pour obtenir un token JWT via l'API GraphQL
# Usage: ./scripts/get-token.sh email password

EMAIL="${1:-michael@realt.co}"
PASSWORD="${2}"

if [ -z "$PASSWORD" ]; then
  echo "Usage: $0 <email> <password>"
  echo "Ou définissez les variables: EMAIL et PASSWORD"
  exit 1
fi

API_URL="${NEXT_PUBLIC_API_URL:-https://api.realtoken.network/graphql}"

echo "🔐 Tentative de connexion à ${API_URL}..."
echo "📧 Email: ${EMAIL}"

RESPONSE=$(curl -s -X POST "${API_URL}" \
  -H "Content-Type: application/json" \
  -d "{
    \"query\": \"mutation Login(\$email: String!, \$password: String!) { auth { login(email: \$email, password: \$password) { token } } }\",
    \"variables\": {
      \"email\": \"${EMAIL}\",
      \"password\": \"${PASSWORD}\"
    }
  }")

TOKEN=$(echo "$RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Erreur lors de la récupération du token:"
  echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
  exit 1
fi

echo "✅ Token obtenu avec succès!"
echo ""
echo "Ajoutez cette ligne dans votre fichier .env:"
echo "AUTH_TOKEN=${TOKEN}"
echo ""
echo "Ou copiez-collez directement:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "AUTH_TOKEN=${TOKEN}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
