#!/bin/bash
git add components/buildunix-community/
git commit -m "revert: fully restore 3D model to previous working state"
git push origin main
git push personal main
git checkout redesign/pre-launch-v2
git merge main
git push origin redesign/pre-launch-v2
git push personal redesign/pre-launch-v2
git checkout main
