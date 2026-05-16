#!/bin/bash

# publicディレクトリを先に作成
mkdir -p ./public

# ビルド時刻をUTC形式でJSONファイルに出力するスクリプト
echo "{\"buildTime\": \"$(TZ='Asia/Tokyo' date +"%Y-%m-%dT%H:%M:%S%z")\"}" > ./public/build-info.json