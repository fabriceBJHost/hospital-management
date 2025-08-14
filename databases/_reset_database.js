const { setupDatabase, database } = require('./database')

/**
 * function to drop all table
 * @returns {Promise<Boolean>}
 */
const resetDatabase = async () => {
  const _dropUsers = 'DROP TABLE users'
  const _dropAppointments = 'DROP TABLE appointments'
  const _dropPatients = 'DROP TABLE patients'
  const _dropDoctors = 'DROP TABLE doctor'
  const _dropMedical_records = 'DROP TABLE medical_records'
  const _dropPrescriptions = 'DROP TABLE prescriptions'
  const _dropWorking_day = 'DROP TABLE working_day'
  const _dropRooms = 'DROP TABLE rooms'
  const _dropBedRooms = 'DROP TABLE bedrooms'
  try {
    // do not change the order of dropping tables
    await database.query(_dropUsers)
    await database.query(_dropAppointments)
    await database.query(_dropPrescriptions)
    await database.query(_dropMedical_records)
    await database.query(_dropWorking_day)
    await database.query(_dropBedRooms)
    await database.query(_dropRooms)
    await database.query(_dropPatients)
    await database.query(_dropDoctors)

    console.log('✅ MySQL all table drop complete.')
    return true
  } catch (error) {
    console.error('❌ Error dropping tables:', error)
    return false
  }
}

/**
 * after dropping, create all table
 */
;(async () => {
  if (await resetDatabase()) {
    await setupDatabase()

    // close the database script after setup
    await database.end()
  } else {
    console.log('❌ MySQL all table drop incomplete.')
  }
})()
