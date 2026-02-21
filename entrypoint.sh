#!/bin/bash
set -e

STATE_DIR="${OPENCLAW_STATE_DIR:-/data/.openclaw}"
mkdir -p "${STATE_DIR}/credentials"
chmod 700 "${STATE_DIR}"

chown -R openclaw:openclaw /data
chmod 700 /data

export NODE_OPTIONS="--max-old-space-size=2048"

if [ ! -d /data/.linuxbrew ]; then
  cp -a /home/linuxbrew/.linuxbrew /data/.linuxbrew
fi

rm -rf /home/linuxbrew/.linuxbrew
ln -sfn /data/.linuxbrew /home/linuxbrew/.linuxbrew

exec gosu openclaw node src/server.js
