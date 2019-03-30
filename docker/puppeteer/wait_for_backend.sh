#!/bin/bash

until curl $BACKEND_HOST >/dev/null 2>&1; do
  >&2 echo "Wait for backend API server"
  sleep 1
done
