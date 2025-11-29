#!/bin/bash
echo "{\"buildTime\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\"}" > ../public/build-info.json