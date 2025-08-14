const mysql = require('mysql2/promise')
const bcrypt = require('bcryptjs')

// Create a connection pool
const database = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'hospital',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

async function setupDatabase() {
  // Table: patients
  await database.query(`
    CREATE TABLE IF NOT EXISTS patients (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      gender VARCHAR(10) NOT NULL,
      birth_date DATE NOT NULL,
      phone VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(255),
      address TEXT NOT NULL,
      is_hospitalized BOOLEAN DEFAULT FALSE,
      images TEXT DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `)

  // Table: doctor
  await database.query(`
    CREATE TABLE IF NOT EXISTS doctor (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      images TEXT DEFAULT NULL,
      password TEXT NOT NULL,
      specialization VARCHAR(255),
      phone VARCHAR(50),
      email VARCHAR(300) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `)

  // Table: appointments
  await database.query(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      patient_id INT NOT NULL,
      doctor_id INT NOT NULL,
      appointment_date DATETIME NOT NULL,
      reason TEXT,
      status VARCHAR(50) DEFAULT 'Scheduled',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
      FOREIGN KEY (doctor_id) REFERENCES doctor(id) ON DELETE RESTRICT
    );
  `)

  // Table: medical_records
  await database.query(`
    CREATE TABLE IF NOT EXISTS medical_records (
      id INT AUTO_INCREMENT PRIMARY KEY,
      patient_id INT NOT NULL,
      doctor_id INT,
      diagnosis TEXT,
      treatment TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
      FOREIGN KEY (doctor_id) REFERENCES doctor(id) ON DELETE RESTRICT
    );
  `)

  // Table: users
  await database.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role VARCHAR(50) DEFAULT 'staff',
      images TEXT DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `)

  // Table: prescriptions
  await database.query(`
    CREATE TABLE IF NOT EXISTS prescriptions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      medical_record_id INT NOT NULL,
      medication_name VARCHAR(255) NOT NULL,
      dosage VARCHAR(255),
      duration VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (medical_record_id) REFERENCES medical_records(id) ON DELETE CASCADE
    );
  `)

  // Table: working_day
  await database.query(`
    CREATE TABLE IF NOT EXISTS working_day (
      id INT AUTO_INCREMENT PRIMARY KEY,
      working_date DATE NOT NULL,
      doctor_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (doctor_id) REFERENCES doctor(id) ON DELETE CASCADE,
      UNIQUE KEY unique_doctor_date (doctor_id, working_date)
    );
  `)

  // Table: rooms
  await database.query(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(100) NOT NULL,
      floor INT NOT NULL,
      building VARCHAR(100),
      status VARCHAR(50) DEFAULT 'available',
      features TEXT DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_name_floor_building (name, floor, building)
    );
  `)

  // Table: bedrooms
  await database.query(`
    CREATE TABLE IF NOT EXISTS bedrooms (
      id INT AUTO_INCREMENT PRIMARY KEY,
      room_id INT NOT NULL,
      bed_number VARCHAR(50) NOT NULL,
      status VARCHAR(50) DEFAULT 'vacant',
      assigned_patient_id INT DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
      FOREIGN KEY (assigned_patient_id) REFERENCES patients(id) ON DELETE RESTRICT,
      UNIQUE KEY unique_room_id_bed_number (room_id, bed_number)
    );
  `)

  // Insert default admin user if users table is empty
  const sql = `SELECT COUNT(*) AS count FROM users`
  const [rows] = await database.query(sql)
  if (rows[0].count === 0) {
    const hashedPassword = bcrypt.hashSync('1234567890', 10)
    await database.query(
      `INSERT INTO users (username, password, role, images) VALUES (?, ?, ?, ?)`,
      ['admin', hashedPassword, 'admin', '/assets/images/admin.png']
    )
  }

  console.log('✅ MySQL table setup complete.')
}

module.exports = {
  database,
  setupDatabase
}
