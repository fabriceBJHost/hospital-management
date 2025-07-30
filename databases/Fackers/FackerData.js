const mysql = require('mysql2/promise')
const bcryptjs = require('bcryptjs')

async function insertDoctors() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hospital'
  })

  const doctors = [
    ['Alice', 'Dupont', 'Cardiologie', '0321234567', 'alice.dupont1@hopital.mg'],
    ['Marc', 'Bertrand', 'Cardiologie', '0321234568', 'marc.bertrand2@hopital.mg'],
    ['Lucie', 'Ramiandrisoa', 'Pédiatrie', '0321234569', 'lucie.rami@hopital.mg'],
    ['Hery', 'Randrianarisoa', 'Pédiatrie', '0321234570', 'hery.randria@hopital.mg'],
    ['Sofia', 'Rakotomalala', 'Gynécologie', '0321234571', 'sofia.rakoto@hopital.mg'],
    ['Jean', 'Andrianina', 'Gynécologie', '0321234572', 'jean.andria@hopital.mg'],
    ['Emma', 'Andriamasinoro', 'Dermatologie', '0321234573', 'emma.andria@hopital.mg'],
    ['Paul', 'Rakotozafy', 'Dermatologie', '0321234574', 'paul.rakoto@hopital.mg'],
    ['Tiana', 'Ratsimba', 'Orthopédie', '0321234575', 'tiana.rats@hopital.mg'],
    ['David', 'Randriamanga', 'Orthopédie', '0321234576', 'david.randria@hopital.mg'],
    ['Niry', 'Rasoa', 'Neurologie', '0321234577', 'niry.rasoa@hopital.mg'],
    ['Arnaud', 'Razafimahefa', 'Neurologie', '0321234578', 'arnaud.razafi@hopital.mg'],
    ['Sarah', 'Rakotomavo', 'Oncologie', '0321234579', 'sarah.rakoto@hopital.mg'],
    ['Lova', 'Andriambelo', 'Oncologie', '0321234580', 'lova.andria@hopital.mg'],
    ['Eric', 'Rakotobe', 'Urologie', '0321234581', 'eric.rakoto@hopital.mg'],
    ['Miora', 'Ramanantsoa', 'Urologie', '0321234582', 'miora.rama@hopital.mg'],
    ['Rija', 'Randriamasimanana', 'Radiologie', '0321234583', 'rija.randria@hopital.mg'],
    ['Elena', 'Razafiarison', 'Radiologie', '0321234584', 'elena.raza@hopital.mg'],
    ['Lina', 'Rakotomanga', 'Ophtalmologie', '0321234585', 'lina.rakoto@hopital.mg'],
    ['Patrick', 'Rasolo', 'Ophtalmologie', '0321234586', 'patrick.rasolo@hopital.mg'],
    ['Yann', 'Andriamanana', 'Gastro-entérologie', '0321234587', 'yann.andria@hopital.mg'],
    ['Zo', 'Rakotondrabe', 'Gastro-entérologie', '0321234588', 'zo.rakoto@hopital.mg'],
    ['Manoa', 'Rakotomisy', 'Médecine générale', '0321234589', 'manoa.rakoto@hopital.mg'],
    ['Ketaka', 'Ravelomanana', 'Médecine générale', '0321234590', 'ketaka.ravelo@hopital.mg'],
    ['Dina', 'Ramiandrasoa', 'ORL', '0321234591', 'dina.ramia@hopital.mg'],
    ['Joel', 'Andrianjafy', 'ORL', '0321234592', 'joel.andria@hopital.mg'],
    ['Mahefa', 'Rakotobe', 'Psychiatrie', '0321234593', 'mahefa.rakoto@hopital.mg'],
    ['Fara', 'Randrianarivelo', 'Psychiatrie', '0321234594', 'fara.randria@hopital.mg'],
    ['Yanis', 'Rasolonjatovo', 'Endocrinologie', '0321234595', 'yanis.rasolo@hopital.mg'],
    ['Miangaly', 'Ramanampisoa', 'Endocrinologie', '0321234596', 'miangaly.rama@hopital.mg']
  ]

  const hashedPassword = await bcryptjs.hash('1234567890', 10)

  try {
    for (const [firstName, lastName, specialization, phone, email] of doctors) {
      await connection.execute(
        `INSERT INTO doctor (first_name, last_name, images, password, specialization, phone, email)
         VALUES (?, ?, NULL, ?, ?, ?, ?)`,
        [firstName, lastName, hashedPassword, specialization, phone, email]
      )
    }

    console.log('✅ Insertion des docteurs réussie.')
  } catch (error) {
    console.error('❌ Erreur lors de l’insertion :', error)
    console.error('Vous avez peut-être déjà inséré ces données.')
  } finally {
    await connection.end()
  }
}

insertDoctors()
