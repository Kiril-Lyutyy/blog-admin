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
('The Midnight Whisker Chronicles', 'Tonight was a silent hunt in the garden. The crickets were unusually loud, but I remained focused.', FLOOR(1 + RAND() * 3)),
('Catnip Dreams and Nighttime Schemes', 'I dreamed of fields full of catnip and endless laser dots. Reality isn’t so bad, but dreams are sweeter.', FLOOR(1 + RAND() * 3)),
('The Great Sofa Siege', 'The humans took over my favorite spot, so I strategized a way to reclaim it. Stealth and patience won the day.', FLOOR(1 + RAND() * 3)),
('Mouse Hunt: Success!', 'At dawn, I caught a mouse toy. Victory tastes sweet. I left it as a gift by the door.', FLOOR(1 + RAND() * 3)),
('Shadows and Paws', 'I chased my shadow for 10 minutes. It kept running away. Maybe one day I’ll catch it.', FLOOR(1 + RAND() * 3)),
('The Window Watcher', 'Sitting by the window is the best. Birds, squirrels, and the occasional suspicious neighbor come by.', FLOOR(1 + RAND() * 3)),
('Laundry Day Adventures', 'I jumped into the laundry basket and got buried under soft clothes. A cozy trap!', FLOOR(1 + RAND() * 3)),
('The Untold Story of the Lost Feather', 'I found a feather today. It is now my prized possession, until the humans find it.', FLOOR(1 + RAND() * 3)),
('Nighttime Symphony', 'The hum of the fridge, the ticking clock, and my soft purring compose a perfect melody.', FLOOR(1 + RAND() * 3)),
('Curtain Climbing Techniques', 'I refined my curtain climbing skills. The humans don’t appreciate it, but I do.', FLOOR(1 + RAND() * 3)),
('Breakfast Negotiations', 'I meowed insistently until the humans served an extra helping. Persistence pays off.', FLOOR(1 + RAND() * 3)),
('The Lost Toy Mystery', 'One toy is missing. I have no idea where it went. Suspicious.', FLOOR(1 + RAND() * 3)),
('The Great Escape Plan', 'I almost escaped through the slightly open door. Next time, I’ll be faster.', FLOOR(1 + RAND() * 3)),
('Sunbeam Lounging Level: Expert', 'Perfected the art of stretching in the warm sunbeams. Ultimate relaxation achieved.', FLOOR(1 + RAND() * 3)),
('The Case of the Invisible Bug', 'I stalked a bug that vanished in thin air. Ghost bugs exist.', FLOOR(1 + RAND() * 3)),
('Pawprints on the Keyboard', 'Left my mark on the humans’ important documents. They were not amused.', FLOOR(1 + RAND() * 3)),
('Chasing the Red Dot Redux', 'That dot returned! The battle continues. I am ready.', FLOOR(1 + RAND() * 3)),
('The Pillow Fortress', 'Built a fortress out of pillows. Invincible!', FLOOR(1 + RAND() * 3)),
('Night Vision Trials', 'Tested my night vision under the bed. Results: excellent.', FLOOR(1 + RAND() * 3)),
('The Yarn Ball Conquest', 'Rolled the yarn ball all over the house. Total chaos and fun.', FLOOR(1 + RAND() * 3));