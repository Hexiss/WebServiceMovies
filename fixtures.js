const faker = require('faker');
const connection = require('./db');

// Fonction pour générer des données aléatoires pour un film
function generateFilm() {
  return {
    name: faker.lorem.words(),
    description: faker.lorem.paragraph(),
    releaseDate: faker.date.past().toISOString().slice(0, 10),
    rating: Math.floor(Math.random() * 6) // Génère un entier aléatoire entre 0 et 5
  };
}

// Fonction pour insérer des données de test dans la base de données
function generateFixtures(numFixtures) {
  for (let i = 0; i < numFixtures; i++) {
    const film = generateFilm();
    connection.query('INSERT INTO films (name, description, release_date, rating) VALUES (?, ?, ?, ?)',
      [film.name, film.description, film.releaseDate, film.rating],
      (err, results) => {
        if (err) {
          console.error('Erreur lors de l\'insertion de la fixture :', err);
          return;
        }
        console.log(`Fixture ${i + 1} insérée avec succès`);
      }
    );
  }
}

// Appel de la fonction pour générer des fixtures
const numFixtures = 10; // Nombre de fixtures à générer
generateFixtures(numFixtures);
