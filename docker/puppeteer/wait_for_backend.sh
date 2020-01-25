#!/bin/sh

limit=${2:-60}
count=0

until wget -O - $1 >/dev/null 2>&1; do
  >&2 echo "Wait for backend API server [$1]"
  sleep 1
  count=`expr $count + 1`

  if [ $count -eq $limit ]; then
    exit 1
  fi    
done
