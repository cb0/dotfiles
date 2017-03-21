#!/bin/bash

echo "started" > out.log
# DIR=$(pwd)
# FILES="\"/home/mpuchalla/projects/dotfiles/conkeror/main-org.org\""
emacs -Q --batch \
          --eval "(progn
          (require 'org)(require 'ob)(require 'ob-tangle)
          (mapc (lambda (file)
                 (find-file (expand-file-name file \"~/.conkerorrc/\"))
                 (org-babel-tangle)
                 (kill-buffer)) '("\"/home/mpuchalla/projects/dotfiles/conkeror/main-org.org\"")))"
#2>&1 | grep -i tangled
