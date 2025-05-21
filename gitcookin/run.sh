#! /bin/bash

# Frontend - Open in a New Terminal Window #
osascript -e 'tell application "Terminal" to do script "cd ~/Code/GitCookin/gitcookin/src && npm start"'

# Backend #
osascript -e 'tell application "Terminal" to do script "
cd ~/Code/GitCookin/gitcookin/backend &&
source ~/venv/bin/activate &&
uvicorn main:app --reload"' 


# VS Code #
code ~/Code/GitCookin/gitcookin

