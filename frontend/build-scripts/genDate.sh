#!/bin/bash

# publicディレクトリを先に作成
mkdir -p ../public

# ビルド時刻をUTC形式でJSONファイルに出力するスクリプト
echo "{\"buildTime\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\"}" > ../public/build-info.json