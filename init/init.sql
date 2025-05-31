DROP DATABASE IF EXISTS admin_blog;
CREATE DATABASE admin_blog;
USE admin_blog;

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE role_permissions (
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE refresh_tokens (
  token VARCHAR(255) PRIMARY KEY,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO roles (name) VALUES ('admin'), ('editor'), ('viewer');

INSERT INTO permissions (name) VALUES
  ('manage_users'),
  ('edit_posts'),
  ('view_posts');

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE
  (r.name = 'admin') OR
  (r.name = 'editor' AND p.name IN ('edit_posts', 'view_posts')) OR
  (r.name = 'viewer' AND p.name = 'view_posts');

-- Create a default admin user, email: 'admin@example.com', password: 'admin123'
INSERT INTO users (email, password, role_id)
VALUES (
  'admin@example.com',
  '$2b$10$vq3r0I5PA.GgrYSqyo12ye5LPYLQH79j7oB/AgYvqV.4MP.2zgdfy',
  (SELECT id FROM roles WHERE name = 'admin')
);

-- Insert test editor user, email: editor@example.com, password: editor123
INSERT INTO users (email, password, role_id)
VALUES (
  'editor@example.com',
  '$2b$10$pt8f7DlDnJe5q/hcQzEf/.pRmyUz4IBqwxHTmfUk44j7oBrPAeVmC', -- hashed 'editor123'
  (SELECT id FROM roles WHERE name = 'editor')
);

-- Insert test viewer user, email: viewer@example.com, password: viewer123
INSERT INTO users (email, password, role_id)
VALUES (
  'viewer@example.com',
  '$2b$10$nQyLUTLdk1Rj4l82QqgDS.Ffhh4KUzydFD6TDfG5U1cRZr6XZgyDK', -- hashed 'viewer123'
  (SELECT id FROM roles WHERE name = 'viewer')
);

-- Insert 5 black cat blog posts
-- Random post authors from user IDs 1-3
INSERT INTO posts (title, content, author_id) VALUES
(
  'Midnight Patrols and Moonlight Meows',
  'Last night, I embarked on my usual rooftop surveillance. All seemed quiet until a suspicious moth landed on the window. I stared it down for 27 minutes. It blinked first.',
  FLOOR(1 + RAND() * 3)
),
(
  'The Mysterious Red Dot: A Chronicle',
  'It appeared again. That elusive red dot. I lunged, I pounced, I even did a backflip. But just as quickly as it came, it vanished. One day, it will be mine.',
  FLOOR(1 + RAND() * 3)
),
(
  'Human Keyboard Habits: An Investigation',
  'I sat on the keyboard today. Again. It seems to greatly disturb the humans, which means I must be close to discovering its true power. The shift key tastes odd.',
  FLOOR(1 + RAND() * 3)
),
(
  'The Empty Bowl Tragedy',
  'At 3:02 AM, I discovered my food bowl was nearly—*gasp*—empty. I wailed into the night. The humans awoke. Crisis averted. Tuna was served.',
  FLOOR(1 + RAND() * 3)
),
(
  'Sunbeams and Philosophy',
  'Today I lay in a sunbeam for 6 hours and pondered the mysteries of the universe. Why chase mice when we could simply nap instead? A question for the ages.',
  FLOOR(1 + RAND() * 3)
);