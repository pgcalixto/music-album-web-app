#!/usr/bin/env bash

mysql -u root --password=password < init.sql
(cd server && npm install)
(cd client && npm install)
