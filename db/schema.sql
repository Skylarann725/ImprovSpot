CREATE DATABASE mastergame_db;

USE `mastergame_db`;

CREATE TABLE `gameinfo` (
    game_id INTEGER AUTO_INCREMENT NOT NULL,
    game_name VARCHAR(255) NOT NULL,
    instructions TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    avg_rating FLOAT(5,4) DEFAULT NULL,
   	min_players TINYINT NOT NULL,
   	max_players TINYINT DEFAULT NULL,
  	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (game_id)
);

CREATE TABLE `userinfo` (
	user_id INTEGER AUTO_INCREMENT NOT NULL UNIQUE,
	username TEXT NOT NULL,
	firstname VARCHAR(20) NOT NULL,
	lastname VARCHAR(20) NOT NULL,
	password VARCHAR(255) NOT NULL,
	game_id INTEGER,
	PRIMARY KEY (user_id),
	FOREIGN KEY (game_id) REFERENCES gameinfo(game_id)
);

CREATE TABLE `comments` (
	comment_id INTEGER AUTO_INCREMENT NOT NULL,
	comment TEXT NULL,
	rating INTEGER NULL,
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	game_id INTEGER,
	PRIMARY KEY (comment_id),
	FOREIGN KEY (game_id) REFERENCES gameinfo(game_id)
);

CREATE TABLE `iMachine`(
	id INT AUTO_INCREMENT PRIMARY KEY,
	Relationship VARCHAR(100) NOT NULL,
	Thing VARCHAR(100) NOT NULL,
	Place VARCHAR(100) NOT NULL
);

CREATE TABLE `locations`(
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	group_level VARCHAR(255) NOT NULL,
	improv_type VARCHAR(255) NOT NULL,
	location VARCHAR(255) NOT NULL,
	date_established VARCHAR(255) NOT NULL
);
