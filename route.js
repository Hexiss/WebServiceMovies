const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const router = express.Router();
router.use(bodyParser.json());

// Route pour récupérer tous les films
router.get('/films', (req, res) => {
  connection.query('SELECT * FROM films', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des films :', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des films' });
      return;
    }
    res.status(200).format({
      json: () => res.json(results), // Format JSON
      xml: () => res.send(convertToXml(results)) // Format XML
    });
  });
});

// Route pour récupérer un film par son ID
router.get('/films/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM films WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération du film :', err);
      res.status(500).json({ error: 'Erreur lors de la récupération du film' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Film non trouvé' });
    } else {
      res.status(200).format({
        json: () => res.json(results[0]), // Format JSON
        xml: () => res.send(convertToXml(results[0])) // Format XML
      });
    }
  });
});

// Route pour créer un nouveau film
router.post('/films', (req, res) => {
  const { name, description, releaseDate, rating } = req.body;
  if (!name || !description || !releaseDate) {
    res.status(422).json({ error: 'Validation échouée' });
    return;
  }
  connection.query('INSERT INTO films (name, description, release_date, rating) VALUES (?, ?, ?, ?)',
    [name, description, releaseDate, rating],
    (err, results) => {
      if (err) {
        console.error('Erreur lors de la création du film :', err);
        res.status(500).json({ error: 'Erreur lors de la création du film' });
        return;
      }
      res.status(201).json({ id: results.insertId, name, description, releaseDate, rating });
    }
  );
});

// Route pour mettre à jour un film
router.put('/films/:id', (req, res) => {
  const id = req.params.id;
  const { name, description, releaseDate, rating } = req.body;
  if (!name || !description || !releaseDate) {
    res.status(422).json({ error: 'Validation échouée' });
    return;
  }
  connection.query('UPDATE films SET name = ?, description = ?, release_date = ?, rating = ? WHERE id = ?',
    [name, description, releaseDate, rating, id],
    (err, results) => {
      if (err) {
        console.error('Erreur lors de la mise à jour du film :', err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du film' });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Film non trouvé' });
      } else {
        res.status(200).json({ id, name, description, releaseDate, rating });
      }
    }
  );
});

// Route pour supprimer un film
router.delete('/films/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM films WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la suppression du film :', err);
      res.status(500).json({ error: 'Erreur lors de la suppression du film' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Film non trouvé' });
    } else {
      res.status(200).json({ message: 'Film supprimé avec succès' });
    }
  });
});

// Fonction fictive pour convertir des données JSON en XML
function convertToXml(data) {
  // Implémentez votre logique de conversion JSON en XML ici
  return '<xml>' + JSON.stringify(data) + '</xml>';
}

module.exports = router;