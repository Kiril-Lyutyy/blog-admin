-- CREATE TABLE Students (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(100),
--     last_name VARCHAR(100),
--     email VARCHAR(100) UNIQUE
-- );

-- CREATE TABLE Courses (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(100),
--     description VARCHAR(500)
-- );

-- CREATE TABLE Enrollments (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     student_id INT,
--     course_id INT,
--     grade INT,
--     FOREIGN KEY (student_id) REFERENCES Students(id),
--     FOREIGN KEY (course_id) REFERENCES Courses(id)
-- );

-- -- Insert sample data into Students, Courses, and Enrollments tables
-- INSERT INTO Students (first_name, last_name, email) VALUES
-- ('Alice', 'Smith', 'alice@example.com'),
-- ('Bob', 'Brown', 'bob@example.com'),
-- ('Charlie', 'Johnson', 'charlie@example.com');

-- INSERT INTO Courses (title, description) VALUES
-- ('SQL Basics', 'Intro to SQL'),
-- ('Node.js Essentials', 'Learn Node.js from scratch'),
-- ('Data Structures', 'Intro to algorithms and data structures');

-- INSERT INTO Enrollments (student_id, course_id, grade) VALUES
-- (1, 1, 90),
-- (1, 2, 80),
-- (2, 1, 85),
-- (2, 3, 95),
-- (3, 2, 70);
