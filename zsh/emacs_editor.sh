#!/bin/sh
FILE="`readlink -f \"$1\"`"
[ -e "$FILE" ] || touch "$FILE"
PERMISSIONS=`stat "$FILE" --format "%U"`

if [ $PERMISSIONS == $USER ]; then
    emacsclient -n "$FILE"
else
    emacsclient -n /sudo::"$FILE"
fi
