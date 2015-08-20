# Path to your oh-my-zsh installation.
export ZSH=$HOME/.oh-my-zsh

DEFAULT_USER=mpuchalla

# auto-update zsh (in days).
export UPDATE_ZSH_DAYS=5

# Uncomment the following line to disable auto-setting terminal title.
DISABLE_AUTO_TITLE=true

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
DISABLE_UNTRACKED_FILES_DIRTY="true"

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.

source $ZSH/oh-my-zsh.sh

# wheres my path at
export PATH="/home/mpuchalla/projects/ansible/bin:/home/mpuchalla/.autojump/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/home/mpuchalla/bin"
export PYTHONPATH=/home/mpuchalla/projects/ansible/lib:
export MANPATH=/home/mpuchalla/projects/ansible/docs/man:
export ANSIBLE_INVENTORY=~/ansible_hosts
# what's my fav. editor
export EDITOR=/usr/bin/emacs

[[ -s ~/.autojump/etc/profile.d/autojump.sh ]] && . ~/.autojump/etc/profile.d/autojump.sh

# Antigen Section
source ~/antigen.zsh
antigen use oh-my-zsh
antigen bundle zsh-users/zsh-syntax-highlighting
antigen bundle git 
#antigen bundle common-aliases 
antigen bundle dircycle 
antigen bundle dirhistory 
antigen bundle encode64 
antigen bundle git-extras 
antigen bundle mvn 
antigen bundle nyan 
antigen bundle rand-quote 
antigen bundle sudo 
#antigen bundle tmux 
#antigen bundle tmuxinator 
antigen bundle vagrant 
antigen bundle wd 
antigen bundle web-search
antigen bundle sharat87/autoenv
antigen bundle command-not-found
antigen bundle zsh-users/zsh-syntax-highlighting
antigen theme agnoster
antigen apply

export ALTERNATE_EDITOR=""
export EDITOR="emacsclient -t"                  # $EDITOR should open in terminal
export VISUAL="emacsclient -c -a emacs"         # $VISUAL opens in GUI with non-daemon as alternate

DISABLE_AUTO_TITLE=true

### alias section ###
alias dusch='du -sch'
alias mtail='multitail' 

### source local private config file
. ~/.private_local_config

unalias ag

export DICPATH="~/.hunspell/dict/"
#setenv DICPATH ~/.hunspell/dict/
