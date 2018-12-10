# music-album-web-app
Web application using Node, React and MySQL to store information about music albums.

## Requirements

* MySQL
* Nodejs
* npm

**Note:** the Nodejs used for the was 8.0 and greater. For Nodejs version 6.0,
the path for concurrently binary changes, thus making the package.json to change
from `./node_modules/.bin/concurrently` to `./node_modules/concurrently/bin`.

**Note**: For the interaction with the database to work, the user (`root` in
this case) shall have its plugin `mysql_native_password` set. This was achieved
by running the following command in the MySQL CLI:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

## Prepare

To prepare the environment and initialize data, run

```bash
./setup.sh
```

Note: the default user/password used for this are root/password. For the
initialization to succeed, the root user must be created. If you use a different
password, `setup.sh` and `server/database/pool-factory.js`.

## Execute

To setup and run the server, run

```bash
npm start
```

## To-dos

* Set password from command line (environment variable or argument) for
  `setup.sh` and `server/database/pool-factory.js`.
* Add tests for the Node server (include API validation)
* Add tests for the React client
* Make it possible to connect to the MySQL database without
  `mysql_native_password` plugin set

## Issues

* In Chrome, when coming back from the page to add new albums to a collection,
  the pages contents are just a JSON in the form of
  `{"id": <collection_id>, "name": <collection_name>}`. It was found out that
  this happens because Chrome retrieves the pages from the disk cache.
  In Firefox, this does not happen and pages are re-rendered correctly after
  coming back from the CollectionAddAlbums page.
