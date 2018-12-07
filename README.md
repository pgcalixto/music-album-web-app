# music-album-web-app
Web application using Node, React and MySQL to store information about music albums.

## Requirements

* MySQL
* npm

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
