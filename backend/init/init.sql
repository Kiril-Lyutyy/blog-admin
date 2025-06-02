CREATE DATABASE IF NOT EXISTS admin_blog;
USE admin_blog;

CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
  token VARCHAR(255) PRIMARY KEY,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO roles (name)
SELECT * FROM (SELECT 'admin') AS tmp
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'admin')
UNION ALL
SELECT * FROM (SELECT 'editor') AS tmp
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'editor')
UNION ALL
SELECT * FROM (SELECT 'viewer') AS tmp
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'viewer');

INSERT INTO permissions (name)
SELECT * FROM (SELECT 'manage_users') AS tmp
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE name = 'manage_users')
UNION ALL
SELECT * FROM (SELECT 'edit_posts') AS tmp
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE name = 'edit_posts')
UNION ALL
SELECT * FROM (SELECT 'view_posts') AS tmp
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE name = 'view_posts');

INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.name = 'admin';

INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'editor' AND p.name IN ('edit_posts', 'view_posts');

INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'viewer' AND p.name = 'view_posts';

INSERT INTO users (email, password, role_id)
SELECT 'admin@example.com', '$2b$10$vq3r0I5PA.GgrYSqyo12ye5LPYLQH79j7oB/AgYvqV.4MP.2zgdfy', r.id
FROM roles r WHERE r.name = 'admin' AND NOT EXISTS (
  SELECT 1 FROM users WHERE email = 'admin@example.com'
);

INSERT INTO users (email, password, role_id)
SELECT 'editor@example.com', '$2b$10$vq3r0I5PA.GgrYSqyo12ye5LPYLQH79j7oB/AgYvqV.4MP.2zgdfy', r.id
FROM roles r WHERE r.name = 'editor' AND NOT EXISTS (
  SELECT 1 FROM users WHERE email = 'editor@example.com'
);

INSERT INTO users (email, password, role_id)
SELECT 'viewer@example.com', '$2b$10$vq3r0I5PA.GgrYSqyo12ye5LPYLQH79j7oB/AgYvqV.4MP.2zgdfy', r.id
FROM roles r WHERE r.name = 'viewer' AND NOT EXISTS (
  SELECT 1 FROM users WHERE email = 'viewer@example.com'
);

INSERT INTO posts (title, content, author_id)
SELECT * FROM (SELECT
  'The Midnight Whisker Chronicles' AS title,
  'Tonight was a silent hunt in the garden. The crickets were unusually loud, but I remained focused, stalking every shadow and whisper of wind to perfect my stealth.' AS content,
  FLOOR(1 + RAND() * 3) AS author_id
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'The Midnight Whisker Chronicles');

INSERT IGNORE INTO posts (title, content, author_id) VALUES
('The Midnight Whisker Chronicles', 'Tonight was a silent hunt in the garden. The crickets were unusually loud, but I remained focused, stalking every shadow and whisper of wind to perfect my stealth.', FLOOR(1 + RAND() * 3)),
('Catnip Dreams and Nighttime Schemes', 'I dreamed of fields full of catnip and endless laser dots. Reality isn’t so bad, but dreams are sweeter and filled with endless adventure, a world of endless fun.', FLOOR(1 + RAND() * 3)),
('The Great Sofa Siege', 'The humans took over my favorite spot, so I strategized a way to reclaim it. Stealth and patience won the day, and I now reign supreme upon the throne of cushions.', FLOOR(1 + RAND() * 3)),
('Mouse Hunt: Success!', 'At dawn, I caught a mouse toy. Victory tastes sweet. I left it as a gift by the door as a symbol of my prowess and generosity.', FLOOR(1 + RAND() * 3)),
('Shadows and Paws', 'I chased my shadow for 10 minutes. It kept running away. Maybe one day I’ll catch it, but for now, the endless pursuit keeps me entertained.', FLOOR(1 + RAND() * 3)),
('The Window Watcher', 'Sitting by the window is the best. Birds, squirrels, and the occasional suspicious neighbor come by. Each day brings a new spectacle, a never-ending show.', FLOOR(1 + RAND() * 3)),
('Laundry Day Adventures', 'I jumped into the laundry basket and got buried under soft clothes. A cozy trap! I could have napped there for hours, surrounded by the scents of my humans.', FLOOR(1 + RAND() * 3)),
('The Untold Story of the Lost Feather', 'I found a feather today. It is now my prized possession, until the humans find it and it mysteriously disappears again.', FLOOR(1 + RAND() * 3)),
('Nighttime Symphony', 'The hum of the fridge, the ticking clock, and my soft purring compose a perfect melody. Nights are full of quiet wonders.', FLOOR(1 + RAND() * 3)),
('Curtain Climbing Techniques', 'I refined my curtain climbing skills. The humans don’t appreciate it, but I do. Every ascent is a challenge, every descent a victory.', FLOOR(1 + RAND() * 3)),
('Breakfast Negotiations', 'I meowed insistently until the humans served an extra helping. Persistence pays off when the prize is warm food and loving pats.', FLOOR(1 + RAND() * 3)),
('The Lost Toy Mystery', 'One toy is missing. I have no idea where it went. Suspicious circumstances surround this case, but I remain vigilant.', FLOOR(1 + RAND() * 3)),
('The Great Escape Plan', 'I almost escaped through the slightly open door. Next time, I’ll be faster and more cunning to taste freedom.', FLOOR(1 + RAND() * 3)),
('Sunbeam Lounging Level: Expert', 'Perfected the art of stretching in the warm sunbeams. Ultimate relaxation achieved after long days of playful antics.', FLOOR(1 + RAND() * 3)),
('The Case of the Invisible Bug', 'I stalked a bug that vanished in thin air. Ghost bugs exist in this house, and I am their relentless hunter.', FLOOR(1 + RAND() * 3)),
('Pawprints on the Keyboard', 'Left my mark on the humans’ important documents. They were not amused.', FLOOR(1 + RAND() * 3)),
('Chasing the Red Dot Redux', 'That dot returned! The battle continues. I am ready.', FLOOR(1 + RAND() * 3)),
('The Pillow Fortress', 'Built a fortress out of pillows. Invincible!', FLOOR(1 + RAND() * 3)),
('Night Vision Trials', 'Tested my night vision under the bed. Results: excellent.', FLOOR(1 + RAND() * 3)),
('The Yarn Ball Conquest', 'Rolled the yarn ball all over the house. Total chaos and fun.', FLOOR(1 + RAND() * 3));
