#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cat $DIR/header.js $DIR/Classes/*.js $DIR/MenuTabs/*.js $DIR/ChatCommands/*.js $DIR/Utilities/*.js $DIR/footer.js > $DIR/124753_nightly.user.js
echo "124753_nightly.user.js created at $(date)";