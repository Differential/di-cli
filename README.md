di-cli
======

Differential command line tool.


###Install

    $ sudo npm install di-cli -g
    
###Usage

    $ di create yourappname
    
    1. Creates repo in differential org
    2. Clones meteor-boilerplate
    3. Changes remotes to point to the newly created repo in github

    Options:
      -p (https, ssh) - if ommited, it checks for ssh keys and uses those, otherwise just uses github preferred https. (ex: di create yourappname -p https)
