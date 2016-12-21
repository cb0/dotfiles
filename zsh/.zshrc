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
COMPLETION_WAITING_DOTS="false"

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
xulrunnerPath=/home/mpuchalla/projects/xulrunner/
export PATH="/home/mpuchalla/projects/ansible/bin:/home/mpuchalla/projects/dasht/bin:/home/mpuchalla/.autojump/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/home/mpuchalla/bin:$xulrunnerPath"
export PYTHONPATH=/home/mpuchalla/projects/ansible/lib:
export MANPATH=/home/mpuchalla/projects/ansible/docs/man:
export ANSIBLE_INVENTORY=~/ansible_hosts
# what's my fav. editor
export EDITOR=emacs
export ALTERNATE_EDITOR=emacs
export VISUAL=emacs
export GOPATH=~/.gopath

#dasht completion
source /home/mpuchalla/projects/dasht/etc/zsh/completions.zsh

[[ -s ~/.autojump/etc/prle.d/autojump.sh ]] && . ~/.autojump/etc/profile.d/autojump.sh

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
antigen bundle thewtex/tmux-mem-cpu-load
antigen theme agnoster
antigen apply

export ALTERNATE_EDITOR=""
export EDITOR="emacsclient -t"                  # $EDITOR should open in terminal
export VISUAL="emacsclient -c -a emacs"         # $VISUAL opens in GUI with non-daemon as alternate

DISABLE_AUTO_TITLE=true

### alias section ###
alias dusch='du -sch'
alias mtail='multitail' 
alias cache-search='apt-cache search'
alias apt-update='sudo apt-get update'
alias apt-upgrade='sudo apt-get upgrade'

#tmux to ssh host and attach if possible
function tsh {
    ssh -4 -C -t "$1" "tmux attach || tmux"
}
#mosh to host if possible, else try tsh, else ssh 
function msh {
    ssh mpu01 "tPmux list-sessions" 2&>1 > /dev/null && mosh "$1" -- "tmux attach" || mosh "$1" -- "tmux" || tsh "$1" || ssh -4 -C -c blowfish-cbc "$1"
}
#I'm used to use ssh over explicit tsh
alias ssh=tsh

#tsh uses same autocomplete as ssh
compdef '_dispatch ssh ssh' tsh
compdef '_dispatch ssh ssh' msh

function shSpeedTest {
    yes | pv | ssh $1 "cat /dev/null" 
}
#and shSpeedTest aswell uses the ssh autocomplete
compdef '_dispatch ssh ssh' shSpeedTest

### source local private config file
. ~/.private_local_config

#unalias ag

export DICPATH="~/.hunspell/dict/"
#setenv DICPATH ~/.hunspell/dict/

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
# Setting ag as the default source for fzf
export FZF_DEFAULT_COMMAND='ag -l -g ""'
export FZF_DEFAULT_OPTS="--extended --cycle"

# fkill - kill process
fkill() {
  pid=$(ps -ef | sed 1d | fzf -m | awk '{print $2}')
  if [ "x$pid" != "x" ]
  then
    kill -${1:-9} $pid
  fi
}

vagrant_list() {
    tmp=$(cat ~/.vagrant.d/data/machine-index/index | jq '.machines[] | {name, vagrantfile_path, state}' | jq '.name + "," + .state  + "," + .vagrantfile_path'| sed 's/^"\(.*\)"$/\1/'| column -s, -t | sort -rk 2 | fzf );
    echo $tmp | awk '{ print $1 }'
}

vs(){ vagrant ssh $(vagrant_list);}
vup(){ vagrant up $(vagrant_list);}
vhalt() { vagrant halt $(vagrant_list);}

export WECHALLUSER="cb0"
export WECHALLTOKEN="231AB-042DE-A3D81-FB67D-949A1-60091"

export PHPBREW_SET_PROMPT=1
source /home/mpuchalla/.phpbrew/bashrc
