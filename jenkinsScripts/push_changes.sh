#!/bin/bash
git add README.md
git commit -m "Pipeline ejecutada por $EXECUTOR. Motivo: $MOTIVO"
git push origin ci_jenkins