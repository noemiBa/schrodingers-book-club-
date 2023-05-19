CREATE DATABASE IF NOT EXISTS bookclubdb;
USE bookclubdb;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS books;

CREATE TABLE users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE books (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  ISBN VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  excerpt TEXT,
  cover VARCHAR(255),
  genre VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE recommendations (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  userID INT NOT NULL,
  ISBN VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE tags (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE book_tags (
  book_id INT UNSIGNED NOT NULL,
  tag_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (book_id, tag_id),
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);

INSERT INTO books (ISBN, title, author, excerpt, cover, genre)
VALUES ('9780156012195', 'The Little Prince', 'Antoine de Saint-Exupéry', 'And now here is my secret, a very simple secret: It is only with the heart that one can see rightly; what is essential is invisible to the eye.', 'https://covers.openlibrary.org/b/id/7268667-L.jpg', 'Childrens Literature');

INSERT INTO books (ISBN, title, author, excerpt, cover, genre)
VALUES ('9780451532084', 'Little Women', 'Louisa May Alcott', 'Christmas won''t be Christmas without any presents,'' grumbled Jo, lying on the rug.', 'https://covers.openlibrary.org/b/id/9066778-L.jpg', 'Young Adult Fiction');

INSERT INTO books (ISBN, title, author, excerpt, cover, genre)
VALUES ('9781400031702', 'The Secret History', 'Donna Tartt', 'Does such a thing as ''the fatal flaw'', that showy dark crack running down the middle of a life, exist outside of literature?', 'https://covers.openlibrary.org/b/id/7891406-L.jpg', 'Fiction');

INSERT INTO books (ISBN, title, author, excerpt, cover, genre)
VALUES ('9780525559474', 'The Midnight Library', 'Matt Haig', 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.', 'https://covers.openlibrary.org/b/id/10313767-L.jpg', 'Fiction');

INSERT INTO books (ISBN, title, author, excerpt, cover, genre)
VALUES ('9781401324643', 'The 100-Year-Old Man Who Climbed Out the Window and Disappeared', 'Jonas Jonasson', 'It''s said that his room looked as if he''d left in a hurry, which didn''t make any sense at all, because there wasn''t anything in his life he''d been rushing to.', 'https://covers.openlibrary.org/b/id/7383472-L.jpg', 'Fiction');

INSERT INTO books (ISBN, title, author, excerpt, cover, genre)
VALUES ('9780143034902', 'The Shadow of the Wind', 'Carlos Ruiz Zafón', 'People tend to complicate their own lives, as if living weren''t already complicated enough.', 'https://covers.openlibrary.org/b/id/10107706-L.jpg', 'Fiction');

INSERT INTO books (ISBN, title, author, excerpt, cover, genre)
VALUES ('9780141439570', 'The Picture of Dorian Gray', 'Oscar Wilde', 'Behind every exquisite thing that existed, there was something tragic. Worlds had to be in travail, that the meanest flower might blow...', 'https://covers.openlibrary.org/b/id/14314591-L.jpg', 'Fiction');

INSERT INTO books (ISBN, title, author, excerpt, cover, genre)
VALUES ('9780545790352', 'Harry Potter and the Sorcerer''s Stone', 'J. K. Rowling', 'Mr. And Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much.', 'https://covers.openlibrary.org/b/id/12020813-L.jpg', 'Wizards');

INSERT INTO users (username, password) VALUES ('FrodoBaggins', 'OneRingToRuleThemAll');
INSERT INTO users (username, password) VALUES ('HermioneGranger', 'WingardiumLeviosa');
INSERT INTO users (username, password) VALUES ('SherlockHolmes', 'ElementaryMyDearWatson');
INSERT INTO users (username, password) VALUES ('KatnissEverdeen', 'Mockingjay');
INSERT INTO users (username, password) VALUES ('test', 'test');

INSERT INTO tags (name) VALUES ('Fairy Tale');
INSERT INTO tags (name) VALUES ('Young Adult Fiction');
INSERT INTO tags (name) VALUES ('Fiction');
INSERT INTO tags (name) VALUES ('Non-Fiction');
INSERT INTO tags (name) VALUES ('Childrens Literature');
INSERT INTO tags (name) VALUES ('Romance');
INSERT INTO tags (name) VALUES ('Mystery');
INSERT INTO tags (name) VALUES ('Self Help');
INSERT INTO tags (name) VALUES ('True Crime');
INSERT INTO tags (name) VALUES ('Travel');
INSERT INTO tags (name) VALUES ('Western');
INSERT INTO tags (name) VALUES ('Satire');
INSERT INTO tags (name) VALUES ('Thriller');
INSERT INTO tags (name) VALUES ('Comedy');
INSERT INTO tags (name) VALUES ('Horror');
INSERT INTO tags (name) VALUES ('Fantasy');

-- Assign tags to books
INSERT INTO book_tags (book_id, tag_id) VALUES (1, 1);  -- The Little Prince - Fairy Tale
INSERT INTO book_tags (book_id, tag_id) VALUES (2, 2);  -- Little Women - Young Adult Fiction
INSERT INTO book_tags (book_id, tag_id) VALUES (3, 3);  -- The Secret History - Fiction
INSERT INTO book_tags (book_id, tag_id) VALUES (4, 4);  -- The Midnight Library - Non-Fiction
INSERT INTO book_tags (book_id, tag_id) VALUES (5, 5);  -- The 100-Year-Old Man Who Climbed Out the Window and Disappeared - Childrens Literature
INSERT INTO book_tags (book_id, tag_id) VALUES (6, 6);  -- The Shadow of the Wind - Romance
INSERT INTO book_tags (book_id, tag_id) VALUES (7, 7);  -- The Picture of Dorian Gray - Mystery
INSERT INTO book_tags (book_id, tag_id) VALUES (8, 8);  -- Harry Potter and the Sorcerer's Stone - Self Help
INSERT INTO book_tags (book_id, tag_id) VALUES (1, 9);  -- The Little Prince - True Crime