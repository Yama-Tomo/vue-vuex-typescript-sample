#!/bin/sh

until wget -O - $1 >/dev/null 2>&1; do
  >&2 echo "Wait for backend API server [$1]"
  sleep 1
done
