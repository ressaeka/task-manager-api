-- Auto-Cleanup Soft Deleted Records
-- Jalankan script ini secara berkala (cron job) untuk menghapus
-- data yang sudah expired (lebih dari 30 hari sejak soft delete)
--
-- Contoh cron job (jalankan setiap hari jam 3 pagi):
-- 0 3 * * * psql -U postgres -d task_manager_db -f src/config/cleanup.sql

-- Hapus task yang sudah expired (deleted_expires_at)
DELETE FROM task
WHERE deleted_at IS NOT NULL
  AND deleted_expires_at IS NOT NULL
  AND deleted_expires_at < NOW();

-- Hapus user yang sudah expired (expires_at)
DELETE FROM users
WHERE deleted_at IS NOT NULL
  AND expires_at IS NOT NULL
  AND expires_at < NOW();

-- Log cleanup (opsional)
SELECT 'Cleanup completed: ' || 
  (SELECT COUNT(*) FROM task WHERE deleted_at IS NOT NULL AND deleted_expires_at < NOW()) || 
  ' expired tasks, ' ||
  (SELECT COUNT(*) FROM users WHERE deleted_at IS NOT NULL AND expires_at < NOW()) || 
  ' expired users remaining' AS cleanup_status;
