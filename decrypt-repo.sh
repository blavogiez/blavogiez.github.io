#!/usr/bin/env bash
cat archive.tar.gz.enc.part-* > archive.tar.gz.enc
openssl enc -d -aes-256-cbc -salt -pbkdf2 -iter 200000 \
  -in archive.tar.gz.enc \
  -out archive.tar.gz \
  -pass env:ARCHIVE_KEY
tar -xzf archive.tar.gz
rm archive.tar.gz*