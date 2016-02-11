#!/bin/sh
FILE="`readlink -f \"$1\"`"
[ -e "$FILE" ] || touch "$FILE"
PERMISSIONS=`stat "$FILE" --format "%U"`

if [ $PERMISSIONS == $USER ]; then
    emacsclient --server-file=work -c -n "$FILE"
else
    emacsclient --server-file=work -c -n /sudo::"$FILE"
fi
