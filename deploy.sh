#!/bin/bash

export MIX_ENV=prod
export ENV=prod
export PORT=9823
export NODEBIN=`pwd`/assets/node_modules/.bin
export PATH="$PATH:$NODEBIN"
export SSL_KEY_PATH=/etc/letsencrypt/live/hw09.cstransky.com/privkey.pem
export SSL_CERT_PATH=/etc/letsencrypt/live/hw09.cstransky.com/cert.pem
export SSL_CACERT_PATH=/etc/letsencrypt/live/hw09.cstransky.com/chain.pem

echo "Building..."

mkdir -p ~/.config
mkdir -p priv/static

mix deps.get
mix compile
(cd assets && npm install)
(cd assets && webpack --mode production)
mix phx.digest

echo "Generating release..."
mix release

echo "Starting database..."
mix ecto.create
mix ecto.migrate
mix ecto.reset

#echo "Stopping old copy of app, if any..."
#_build/prod/rel/draw/bin/practice stop || true

echo "Starting app..."

_build/prod/rel/task_tracker3/bin/task_tracker3 foreground

