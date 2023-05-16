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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

INSERT INTO books (ISBN, title, author, excerpt, cover)
VALUES ('9780156012195', 'The Little Prince', 'Antoine de Saint-Exupéry', 'And now here is my secret, a very simple secret: It is only with the heart that one can see rightly; what is essential is invisible to the eye.', 'https://covers.openlibrary.org/b/id/7268667-L.jpg');

INSERT INTO books (ISBN, title, author, excerpt, cover)
VALUES ('9780451532084', 'Little Women', 'Louisa May Alcott', 'Christmas won''t be Christmas without any presents,'' grumbled Jo, lying on the rug.', 'https://covers.openlibrary.org/b/id/9066778-L.jpg');

INSERT INTO books (ISBN, title, author, excerpt, cover)
VALUES ('9781400031702', 'The Secret History', 'Donna Tartt', 'Does such a thing as ''the fatal flaw'', that showy dark crack running down the middle of a life, exist outside of literature?', 'https://covers.openlibrary.org/b/id/7891406-L.jpg');

INSERT INTO books (ISBN, title, author, excerpt, cover)
VALUES ('9780525559474', 'The Midnight Library', 'Matt Haig', 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.', 'https://covers.openlibrary.org/b/id/10313767-L.jpg');

INSERT INTO books (ISBN, title, author, excerpt, cover)
VALUES ('9781401324643', 'The 100-Year-Old Man Who Climbed Out the Window and Disappeared', 'Jonas Jonasson', 'It''s said that his room looked as if he''d left in a hurry, which didn''t make any sense at all, because there wasn''t anything in his life he''d been rushing to.', 'https://covers.openlibrary.org/b/id/7383472-L.jpg');

INSERT INTO books (ISBN, title, author, excerpt, cover)
VALUES ('9780143034902', 'The Shadow of the Wind', 'Carlos Ruiz Zafón', 'People tend to complicate their own lives, as if living weren''t already complicated enough.', 'https://covers.openlibrary.org/b/id/10107706-L.jpg');

INSERT INTO books (ISBN, title, author, excerpt, cover)
VALUES ('9780141439570', 'The Picture of Dorian Gray', 'Oscar Wilde', 'Behind every exquisite thing that existed, there was something tragic. Worlds had to be in travail, that the meanest flower might blow...', 'https://covers.openlibrary.org/b/id/14314591-L.jpg');

INSERT INTO books (ISBN, title, author, excerpt, cover)
VALUES ('9780545790352', 'Harry Potter and the Sorcerer''s Stone', 'J. K. Rowling', 'Mr. And Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much.', 'https://covers.openlibrary.org/b/id/12020813-L.jpg');

