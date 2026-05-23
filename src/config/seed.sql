-- Task Manager API Database Seed (Development Only)
-- Run AFTER migration.sql

-- Clear existing data
DELETE FROM task;
DELETE FROM users;
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE task_id_seq RESTART WITH 1;

-- Insert admin user (password: Admin123!)
INSERT INTO users (public_id, username, password, role)
VALUES (
  'ADMIN001',
  'admin',
  '$2b$10$WH9Udy1cYD5QxTzIMNq8J.yiHKIEvHCuCKI0LfYGPqrVkmgyHWz6S',
  'admin'
);

-- Insert regular users (password: User1234!)
INSERT INTO users (public_id, username, password, role)
VALUES
  ('USER0001', 'user1', '$2b$10$jJdq6inwoen1hl2xSz0.K.X1ZDnzOzg/X5VmNbY/PEo9LZS2lfUEy', 'user'),
  ('USER0002', 'user2', '$2b$10$jJdq6inwoen1hl2xSz0.K.X1ZDnzOzg/X5VmNbY/PEo9LZS2lfUEy', 'user'),
  ('USER0003', 'user3', '$2b$10$jJdq6inwoen1hl2xSz0.K.X1ZDnzOzg/X5VmNbY/PEo9LZS2lfUEy', 'user');

-- Insert sample tasks
INSERT INTO task (public_id, title, description, status, deadline_at, user_id)
VALUES
  ('TASK0001', 'Belajar Node.js', 'Pelajari dasar-dasar Node.js dan Express', 'pending', NOW() + INTERVAL '7 days', 2),
  ('TASK0002', 'Buat API Task Manager', 'Buat REST API untuk manajemen task', 'in-progress', NOW() + INTERVAL '3 days', 2),
  ('TASK0003', 'Setup Database', 'Setup PostgreSQL dan migration', 'done', NOW() - INTERVAL '1 day', 2),
  ('TASK0004', 'Testing API', 'Buat integration test dengan Jest', 'pending', NOW() + INTERVAL '5 days', 3),
  ('TASK0005', 'Deploy ke Production', 'Deploy aplikasi ke cloud server', 'pending', NOW() + INTERVAL '14 days', 3);
