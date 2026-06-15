#!/bin/bash

# Push the current exercise to the remote repository and create the release

EXERCISE_NUMBER=$1
COMMIT_MESSAGE=$2
EXERCISE_DESCRIPTION="${3:-$COMMIT_MESSAGE}"

if [[ -z "$EXERCISE_NUMBER" || -z "$COMMIT_MESSAGE" ]]; then
  echo "Usage: $0 <exercise_number> <commit_message> [exercise_description]"
  exit 1
fi

if ! [[ "$EXERCISE_NUMBER" =~ ^[0-9]\.[0-9]$ ]]; then
  echo "Error: Exercise number must be in the format single_digit.single_digit (e.g., 1.2)"
  exit 1
fi


git add .
git commit -m "$2"
git push

gh release create "$EXERCISE_NUMBER" --title "$EXERCISE_NUMBER" --notes "$COMMIT_MESSAGE"
