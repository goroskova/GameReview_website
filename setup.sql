
-- make sure the websiteuser account is set up and has the correct privileges
CREATE USER IF NOT EXISTS websiteuser IDENTIFIED BY 'websitepassword';
GRANT INSERT, SELECT, UPDATE, DELETE ON website.* TO websiteuser;


-- accounts table
DROP TABLE IF EXISTS accounts;
CREATE TABLE IF NOT EXISTS accounts (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(25) NOT NULL,
  pass VARCHAR(60) NOT NULL,
  roles VARCHAR(60) DEFAULT "default"
);

-- user:admin   pass:password
-- user:user1   pass:p455w0rd
-- user:user2   pass:p455w0rd
-- user:user3   pass:p455w0rd
-- user:Dreizehn   pass:p455w0rd
-- user:knakeroo   pass:p455w0rd
-- user:hahaalan   pass:p455w0rd


-- game_details table
DROP TABLE IF EXISTS game_details;
CREATE TABLE IF NOT EXISTS game_details (
  game_id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  game_name VARCHAR(45) NOT NULL,
  game_publisher VARCHAR(25) NOT NULL,
  game_year_of_release INT(4) DEFAULT 2022 NOT NULL,
  game_user_id MEDIUMINT UNSIGNED NOT NULL, 
  game_description LONGTEXT NOT NULL,
  game_category VARCHAR(100) DEFAULT NULL,
  game_added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  game_rate INT(1) UNSIGNED DEFAULT 5 NOT NULL,
  game_img LONGTEXT NOT NULL,
  new INT(1) DEFAULT NULL

);
-- alter table game_details add column new int(1) after game_rate
--update game_details set new = 1 where game_year_of_release=2020;

INSERT INTO game_details(game_name, game_publisher, game_year_of_release, game_user_id, game_description,game_added_at, game_rate, game_img, game_category) 
VALUES("StarCraft II: Heart of the Swarm","Blizzard Entertainment", 2010, 1, "Heart of the Swarm is a sequel to Wings of Liberty.It focuses on Sarah Kerrigan and the development of a zerg empire", "2022-11-09 17:23:02", 5, 
"https://www.mobygames.com/images/covers/l/267358-starcraft-ii-heart-of-the-swarm-macintosh-front-cover.jpg", "Strategy");



-- reviews table
-- (Games with IDs 1-7 have 3 reviews each)
DROP TABLE IF EXISTS reviews;
CREATE TABLE IF NOT EXISTS reviews (
  review_id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  review_username MEDIUMINT UNSIGNED NOT NULL,
  review_game_id MEDIUMINT UNSIGNED NOT NULL,
  review_added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  review_text LONGTEXT NOT NULL, 
  review_rating INT(1) DEFAULT NULL

);
INSERT INTO reviews(review_username, review_game_id, review_added_at, review_text, review_rating) 
VALUES(6, 1, "2022-09-25 17:23:02", "Its bloody awesome, builds on WoL and makes the whole shebang better.. well done Bliz! If you like RTS your gonna love this ride. Bliz rarely disappoints and this is no exception", 5);

INSERT INTO reviews(review_username, review_game_id, review_added_at, review_text, review_rating) 
VALUES(7, 1, "2022-11-15 17:23:02", "if u are a fan of rts games there is nothing better than this so 10 out of 10 SP is just great as well 2nd of trylogy", 5);

INSERT INTO reviews(review_username, review_game_id, review_added_at, review_text, review_rating) 
VALUES(2, 1, "2022-11-23 17:23:02", "Heart of the Swarm is ScarCraft made better. Welcoming to newcomers, but never dumbed-down, the franchise at its best.", 5);


