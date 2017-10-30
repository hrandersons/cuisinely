#!/bin/bash
set -x
if [ $TRAVIS_BRANCH == 'develop' ] ; then
    # Initialize a new git repo in _site, and push it to our server.
    git remote add deploy "deploy@repo:/var/repo"
    git config user.name "boisbb18"
    git config user.email "bois.bb18@gmail.com"
    
    git add .
    git commit -m "Deploy"
    git push --force deploy master
else
    echo "Not deploying, since this branch isn't master."
fi