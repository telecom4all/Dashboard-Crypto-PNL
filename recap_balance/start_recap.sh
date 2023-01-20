#!/bin/bash
echo "Passage dans l'environement virtuel"

now=$(date +"%d/%m/%Y %T")
echo $now

PATH=/home/angelz/recap_balance
cd $PATH
source $PATH/.venv/bin/activate

echo "Execution du recap"


for file in ./*.py; do
    if [ -f "$file" ]; then
        python $file
    fi
done