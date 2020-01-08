#!/bin/bash

export MIX_ENV=prod
export PORT=9823

echo "Stopping old copy of app, if any..."

_build/prod/rel/task_tracker3/bin/task_tracker3 stop || true

echo "Starting app..."

# Foreground for testing and for systemd
_build/prod/rel/task_tracker3/bin/task_tracker3 foreground

