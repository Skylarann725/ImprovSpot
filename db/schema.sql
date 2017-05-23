CREATE DATABASE mastergame_db;

USE `mastergame_db`;

CREATE TABLE `gameinfo` (
    game_id INTEGER AUTO_INCREMENT NOT NULL,
    game_name VARCHAR(255) NOT NULL,
    instructions VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    avg_rating FLOAT(255) DEFAULT NULL,
   	min_players TINYINT NOT NULL,
   	max_players TINYINT DEFAULT NULL,
  	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (game_id)
    );

CREATE TABLE `userinfo` (
	user_id INTEGER AUTO_INCREMENT NOT NULL UNIQUE,
	user_name VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	game_id INTEGER,
	PRIMARY KEY (user_id),
	FOREIGN KEY (game_id) REFERENCES gameinfo(game_id)
);

CREATE TABLE `comments` (
	comment_id INTEGER AUTO_INCREMENT NOT NULL,
	comment VARCHAR(255) NULL,
	rating INTEGER NULL,
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	game_id INTEGER,
	PRIMARY KEY (comment_id),
	FOREIGN KEY (game_id) REFERENCES gameinfo(game_id)
);



