#!/bin/sh

current=$(cd $(dirname $0);pwd)

if [ -e $current/../node_modules/@types/react ]; then
  rm -rf $current/../node_modules/@types/react
fi