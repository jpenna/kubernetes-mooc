#!/bin/bash

# Push the current exercise to the remote repository and create the release

EXERCISE_NUMBER=$1
COMMIT_MESSAGE=$2
EXERCISE_DESCRIPTION="${3:-$COMMIT_MESSAGE}"

if [[ -z "$EXERCISE_NUMBER" || -z "$COMMIT_MESSAGE" ]]; then
  echo -e "\033[31mError: Usage: $0 <exercise_number> <commit_message> [exercise_description]\033[0m"
  exit 1
fi

if ! [[ "$EXERCISE_NUMBER" =~ ^[0-9]\.[0-9]$ ]]; then
  echo -e "\033[31mError: Exercise number must be in the format single_digit.single_digit (e.g., 1.2)\033[0m"
  exit 1
fi

if ! grep -q "$EXERCISE_NUMBER" README.md; then
  echo -e "\033[31mError: Exercise number $EXERCISE_NUMBER not found in README.md.\033[0m"
  exit 1
fi


echo -e "\033[32mPushing exercise $EXERCISE_NUMBER\033[0m"

git add .
git commit -m "$2"
git push

echo -e "\033[32mCreating release $EXERCISE_NUMBER\033[0m"

gh release create "$EXERCISE_NUMBER" --title "$EXERCISE_NUMBER" --notes "$COMMIT_MESSAGE"
