#!/bin/sh
# entrypoint.sh - Corrigir permissões do volume antes de iniciar a aplicação

echo "Checking permissions for /app/data..."

# Se eu estiver rodando como root (inicialmente), ajusto as permissões
if [ "$(id -u)" = "0" ]; then
    echo "Running as root. Fixing permissions for /app/data..."
    mkdir -p /app/data
    chown -R node:node /app/data
    
    # Abaixar privilégios para o usuário 'node' e rodar o comando final
    echo "Switching to user 'node'..."
    exec su-exec node "$@"
else
    # Se já não sou root (improvável dada a configuração do Docker, mas possível)
    echo "Running as non-root. Assuming permissions are correct or handled elsewhere."
    exec "$@"
fi
