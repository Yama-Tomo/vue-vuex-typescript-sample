#!/bin/sh

USER_ID=${LOCAL_UID:-0}
GROUP_ID=${LOCAL_GID:-0}

echo "Starting with UID : $USER_ID, GID: $GROUP_ID"
adduser -u $USER_ID -g $GROUP_ID -s /bin/sh -D user

if [ "`id user`" != "" ]; then
  for path in $CHANGE_PERMISSION_PATHS
  do
    [ -e $path ] && chown -R user. $path
  done
fi

exec su-exec user "$@"
