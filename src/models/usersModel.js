import pool from "../config/db.js";

// CREATE USER
// Membuat user baru dengan role tertentu (user atau admin)
// Parameter: publicId (unik), username, password (sudah di-hash), role
// Return: data user tanpa password
export const createUser = async ({ publicId, username, password, role }) => {
  const result = await pool.query(
    `INSERT INTO users (public_id, username, password, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, public_id, username, role, created_at`,
    [publicId, username, password, role],
  );
  return result.rows[0];
};

// FIND USER BY USERNAME
// Digunakan untuk: login (verifikasi user), register (cek username unik)
// Return: semua data user termasuk password (untuk bcrypt compare)
export const findUserByUsername = async (username) => {
  const result = await pool.query(
    `SELECT id, public_id, username, password, role, created_at 
     FROM users 
     WHERE username = $1`,
    [username]
  );
  return result.rows[0] ?? null;
};

// FIND USER BY ID
// Digunakan untuk: profile user, admin detail user, soft delete, restore
// Return: semua data user termasuk deleted_at dan expires_at
export const findUserById = async (id) => {
  const result = await pool.query(
    `SELECT id, public_id, username, password, role, created_at, deleted_at, expires_at
     FROM users 
     WHERE id = $1`,
    [id]
  );
  return result.rows[0] ?? null;
};

export const updatePassword = async (userId, newPassword) => {
  const result = await pool.query(
    `UPDATE users SET password = $1 WHERE id = $2
     RETURNING id, public_id, username, role, created_at`,
    [newPassword, userId]
  );
  return result.rows[0] ?? null;
};

export const softDeleteOwnAccount = async (userId) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      `UPDATE task SET
         deleted_at = NOW(),
         deleted_expires_at = NOW() + INTERVAL '30 days'
       WHERE user_id = $1 AND deleted_at IS NULL`,
      [userId]
    );
    const result = await client.query(
      `UPDATE users SET
         deleted_at = NOW(),
         expires_at = NOW() + INTERVAL '30 days'
       WHERE id = $1 AND deleted_at IS NULL
       RETURNING id, public_id, username, role, deleted_at, expires_at`,
      [userId]
    );
    await client.query('COMMIT');
    return result.rows[0] ?? null;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};