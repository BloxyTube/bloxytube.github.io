#!/bin/bash

SYNC_FILE="sync.txt"

# Check if sync.txt exists, create if not
if [[ ! -f "$SYNC_FILE" ]]; then
    echo "0" > "$SYNC_FILE"
fi

# Read current sync number
SYNC_NUM=$(<"$SYNC_FILE")

# Increment sync number
SYNC_NUM=$((SYNC_NUM + 1))

# Save the updated number back to sync.txt
echo "$SYNC_NUM" > "$SYNC_FILE"

# Add all changes
git add .

# Commit with message and co-author
git commit -m "sync ($SYNC_NUM)

Co-authored-by: BloxyTube Syncer <sync@bloxytube.github.io>"

# Push to current branch
git push