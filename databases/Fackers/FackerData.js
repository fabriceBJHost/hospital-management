const mysql = require('mysql2/promise')
const bcryptjs = require('bcryptjs')

/**
 * function to insert fake doctors
 */
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
    console.error('❌ Erreur lors de l’insertion des docteurs :', error)
    console.error('Vous avez peut-être déjà inséré ces données.')
  } finally {
    await connection.end()
  }
}

/**
 * function to insert fake patients
 */
const insertPatients = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hospital'
  })

  const patients = [
    [
      'Olivie',
      'Fouquet',
      'F',
      '1965-10-08',
      '0341633802',
      'olivie.fouquet@example.com',
      '7, avenue Daniel, 36123 Riou-la-Forêt',
      false,
      'laura.jpg'
    ],
    [
      'Bernadette',
      'Parent',
      'F',
      '1979-08-21',
      '0341786767',
      'bernadette.parent@example.com',
      '378, rue Lemonnier, 39023 Pichon-la-Forêt',
      false,
      'claire.jpg'
    ],
    [
      'Isabelle',
      'Maillet',
      'F',
      '1984-10-06',
      '0341595576',
      'isabelle.maillet@example.com',
      '15, chemin Jeannine Coste, 84266 Voisin',
      false,
      'laura.jpg'
    ],
    [
      'Henri',
      'Lucas',
      'M',
      '1970-03-15',
      '0341547890',
      'henri.lucas@example.com',
      '23, rue des Lilas, 72000 Le Mans',
      true,
      'henri.jpg'
    ],
    [
      'Marie',
      'Dupont',
      'F',
      '1990-07-22',
      '0341654321',
      'marie.dupont@example.com',
      '45, avenue Victor Hugo, 75016 Paris',
      false,
      'marie.jpg'
    ],
    [
      'Jacques',
      'Morel',
      'M',
      '1955-11-02',
      '0341778899',
      'jacques.morel@example.com',
      '12, rue de Bretagne, 67000 Strasbourg',
      true,
      'jacques.jpg'
    ],
    [
      'Claire',
      'Renard',
      'F',
      '1982-04-18',
      '0341335577',
      'claire.renard@example.com',
      '89, boulevard Haussmann, 75008 Paris',
      false,
      'claire.jpg'
    ],
    [
      'Antoine',
      'Giraud',
      'M',
      '1978-12-09',
      '0341223344',
      'antoine.giraud@example.com',
      '33, rue des Rosiers, 75004 Paris',
      true,
      'antoine.jpg'
    ],
    [
      'Julie',
      'Blanc',
      'F',
      '1995-06-30',
      '0341556677',
      'julie.blanc@example.com',
      '17, chemin des Vignes, 92130 Issy-les-Moulineaux',
      false,
      'julie.jpg'
    ],
    [
      'Luc',
      'Marchand',
      'M',
      '1968-01-11',
      '0341667788',
      'luc.marchand@example.com',
      '54, rue Nationale, 37000 Tours',
      true,
      'luc.jpg'
    ],
    [
      'Sophie',
      'Charpentier',
      'F',
      '1992-05-12',
      '0341789012',
      'sophie.charpentier@example.com',
      '12, rue des Tulipes, 31000 Toulouse',
      false,
      'sophie.jpg'
    ],
    [
      'Marc',
      'Benoit',
      'M',
      '1980-09-23',
      '0341324354',
      'marc.benoit@example.com',
      '87, avenue Carnot, 13000 Marseille',
      false,
      'marc.jpg'
    ],
    [
      'Nathalie',
      'Vidal',
      'F',
      '1987-02-17',
      '0341991122',
      'nathalie.vidal@example.com',
      '29, rue Victor Hugo, 33000 Bordeaux',
      true,
      'nathalie.jpg'
    ],
    [
      'Paul',
      'Delorme',
      'M',
      '1974-12-04',
      '0341445566',
      'paul.delorme@example.com',
      '10, chemin de la Gare, 21000 Dijon',
      false,
      'paul.jpg'
    ],
    [
      'Camille',
      'Faure',
      'F',
      '1996-08-29',
      '0341557788',
      'camille.faure@example.com',
      '48, rue Sainte-Catherine, 69000 Lyon',
      false,
      'camille.jpg'
    ],
    [
      'Etienne',
      'Roux',
      'M',
      '1983-10-10',
      '0341668899',
      'etienne.roux@example.com',
      '65, avenue de la République, 75011 Paris',
      true,
      'etienne.jpg'
    ],
    [
      'Julie',
      'Noël',
      'F',
      '1976-07-05',
      '0341234567',
      'julie.noel@example.com',
      '77, rue des Fleurs, 67000 Strasbourg',
      false,
      'julien.jpg'
    ],
    [
      'Thierry',
      'Gomez',
      'M',
      '1969-11-13',
      '0341765432',
      'thierry.gomez@example.com',
      '33, rue Pasteur, 86000 Poitiers',
      true,
      'thierry.jpg'
    ],
    [
      'Emma',
      'Bertrand',
      'F',
      '1993-03-03',
      '0341543210',
      'emma.bertrand@example.com',
      '22, rue de la Liberté, 80000 Amiens',
      false,
      'emma.jpg'
    ],
    [
      'Benoit',
      'Leclerc',
      'M',
      '1981-01-22',
      '0341432109',
      'benoit.leclerc@example.com',
      '90, rue Emile Zola, 14000 Caen',
      false,
      'benoit.jpg'
    ],
    [
      'Anaïs',
      'Marty',
      'F',
      '1985-11-20',
      '0341998765',
      'anais.marty@example.com',
      '25, rue du Faubourg, 57000 Metz',
      false,
      'anais.jpg'
    ],
    [
      'Bruno',
      'Lemoine',
      'M',
      '1973-06-17',
      '0341227890',
      'bruno.lemoine@example.com',
      '39, boulevard Voltaire, 75011 Paris',
      true,
      'bruno.jpg'
    ],
    [
      'Celine',
      'Perrot',
      'F',
      '1994-01-09',
      '0341886543',
      'celine.perrot@example.com',
      '11, rue du Canal, 86000 Poitiers',
      false,
      'celine.jpg'
    ],
    [
      'Didier',
      'Forest',
      'M',
      '1988-03-28',
      '0341774433',
      'didier.forest@example.com',
      '8, rue des Pins, 25000 Besançon',
      false,
      'didier.jpg'
    ],
    [
      'Eva',
      'Lopez',
      'F',
      '1991-09-15',
      '0341321234',
      'eva.lopez@example.com',
      '14, allée des Peupliers, 33000 Bordeaux',
      false,
      'eva.jpg'
    ],
    [
      'François',
      'Garnier',
      'M',
      '1962-02-02',
      '0341883322',
      'francois.garnier@example.com',
      '67, rue Principale, 31000 Toulouse',
      true,
      'francois.jpg'
    ],
    [
      'Helene',
      'Barbier',
      'F',
      '1986-05-05',
      '0341433344',
      'helene.barbier@example.com',
      '98, avenue Alsace Lorraine, 38100 Grenoble',
      false,
      'helene.jpg'
    ],
    [
      'Guillaume',
      'Henry',
      'M',
      '1990-10-10',
      '0341767788',
      'guillaume.henry@example.com',
      '5, impasse des Cerisiers, 49000 Angers',
      false,
      'guillaume.jpg'
    ],
    [
      'Isaline',
      'Dubois',
      'F',
      '1989-12-24',
      '0341678990',
      'isaline.dubois@example.com',
      '19, rue des Champs, 45000 Orléans',
      false,
      'isaline.jpg'
    ],
    [
      'Jean',
      'Morin',
      'M',
      '1972-07-07',
      '0341888999',
      'jean.morin@example.com',
      '60, rue Lafayette, 75009 Paris',
      true,
      'jean.jpg'
    ]
  ]

  try {
    for (const patient of patients) {
      await connection.execute(
        'INSERT INTO patients (first_name, last_name, gender, birth_date, phone, email, address, is_hospitalized, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        patient
      )
    }

    console.log('✅ Insertion des patients réussie.')
  } catch (error) {
    console.error('❌ Erreur lors de l’insertion des patients :', error)
    console.error('Vous avez peut-être déjà inséré ces données.')
  } finally {
    await connection.end()
  }
}

insertDoctors()
insertPatients()
