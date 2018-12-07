CREATE DATABASE IF NOT EXISTS music_records;

USE music_records;

DROP TABLE IF EXISTS
    collection_albums,
    collection,
    album;

CREATE TABLE album (
    id int(11) NOT NULL AUTO_INCREMENT,
    title varchar(50) NOT NULL,
    artist varchar(100) NOT NULL,
    year int NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE collection (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE collection_albums (
    collection_id int(11) NOT NULL,
    album_id int(11) NOT NULL,
    PRIMARY KEY (collection_id, album_id),
    FOREIGN KEY (collection_id)
        REFERENCES collection(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (album_id)
        REFERENCES album(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO album (title, artist, year) VALUES
    ('Quen II', 'Queen', 1974),
    ('Help!', 'Beatles', 1965),
    ('Gemini', 'Macklemore', 2017),
    ('Tim Maia', 'Tim Maia', 1973),
    ('Vamos pro mundo', 'Os Novos Baianos', 1974),
    ('Reggae Power: Ao Vivo', 'Natiruts', 2006),
    ('Velocidade da Luz', 'Grupo Revelação', 2006),
    ('WS In Miami Beach', 'Wesley Safadao', 2017),
    ('A diferença está no ar - volume 3', 'Aviões do Forró', 2006);

INSERT INTO collection (name) VALUES
    ('Preferidos'),
    ('Forró'),
    ('Internacionais'),
    ('Antigas');

INSERT INTO collection_albums (collection_id, album_id) VALUES
    (1, 1),
    (1, 3),
    (1, 4),
    (1, 6),
    (2, 8),
    (2, 9),
    (3, 1),
    (3, 2),
    (3, 3),
    (4, 1),
    (4, 2),
    (4, 4),
    (4, 5);
