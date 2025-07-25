const sqlite = require('better-sqlite3')
// const path = require('path')
const bcrypt = require('bcryptjs')

const database = new sqlite('./hospital.db')

/**
 * create patient table if not exist in database
 */
const createPatientTableQuery = `

  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    gender TEXT NOT NULL,
    birth_date DATE NOT NULL,
    phone TEXT,
    email TEXT,
    address TEXT,
    is_hospitalized BOOLEAN DEFAULT FALSE,
    images TEXT DEFAULT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

`
database.prepare(createPatientTableQuery).run()

/**
 * create table doctor
 */
const createDoctorTableQuery = `

  CREATE TABLE IF NOT EXISTS doctor (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    images TEXT DEFAULT NULL,
    password TEXT NOT NULL,
    specialization TEXT,
    phone TEXT,
    email VARCHHAR(300) UNIQUE NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

`
database.prepare(createDoctorTableQuery).run()

/**
 * create appointment table
 */
const createAppointmentTableQuery = `

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    patient_id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    appointment_date TEXT NOT NULL,
    reason TEXT,
    status TEXT DEFAULT 'Scheduled',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
  );

`
database.prepare(createAppointmentTableQuery).run()

/**
 * create medical record table
 */
const createMedicalRecordTableQuery = `

  CREATE TABLE IF NOT EXISTS medical_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    patient_id INTEGER NOT NULL,
    doctor_id INTEGER,
    diagnosis TEXT,
    treatment TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
  );

`
database.prepare(createMedicalRecordTableQuery).run()

/**
 * create users table
 */
const createUsersTableQuery = `

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'staff',
    images TEXT DEFAULT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

`
database.prepare(createUsersTableQuery).run()

/**
 * create prescriptions tabme
 */
const createPrescriptionTableQuery = `

  CREATE TABLE IF NOT EXISTS prescriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    medical_record_id INTEGER NOT NULL,
    medication_name TEXT NOT NULL,
    dosage TEXT,
    duration TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (medical_record_id) REFERENCES medical_records(id)
  );

`
database.prepare(createPrescriptionTableQuery).run()

/**
 * create Working day tabme
 */
const createWorkingDaysTableQuery = `

  CREATE TABLE IF NOT EXISTS working_day (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    working_date TEXT NOT NULL,
    doctor_id INTEGER NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctor(id)
  );

`
database.prepare(createWorkingDaysTableQuery).run()

// ------------------------------------------------- execute function --------------------------------------------

// Insert a default admin user only if the users table is empty
const insertIfTableEmptyQuery = `
  INSERT INTO users (username, password, role, images)
  SELECT 'admin', ?, 'admin', '/assets/images/admin.png'
  WHERE (SELECT COUNT(*) FROM users) = 0;
`

// Hash the password '1234567890' before storing
const hashedPassword = bcrypt.hashSync('1234567890', 10)
database.prepare(insertIfTableEmptyQuery).run(hashedPassword)

module.exports = {
  database
}
