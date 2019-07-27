#!/bin/sh

USER_ID=${LOCAL_UID:-0}
GROUP_ID=${LOCAL_GID:-0}

echo "Starting with UID : $USER_ID, GID: $GROUP_ID"
adduser -u $USER_ID -g $GROUP_ID -s /bin/sh -D user

exec su-exec user "$@"
