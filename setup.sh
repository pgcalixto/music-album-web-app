#!/usr/bin/env bash

mysql -u root --password=password < init.sql
npm install
(cd server && npm install)
(cd client && npm install)
