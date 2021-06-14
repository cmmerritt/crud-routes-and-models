import pool from '../utils/pool';

export default class Game {
  id;
  title;
  studio;
  rating;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.studio = row.studio;
    this.rating = row.rating;
  }

  static async insert({ title, studio, rating }) {
    const { rows } = await pool.query('INSERT INTO games (title, studio, rating) VALUES ($1, $2, $3) RETURNING *', [title, studio, rating]);

    return new Game(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM games WHERE id = $1', [id]);
    return new Game(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM games');
    return rows.map(row => new Game(row));
  }

  static async update(game, id) {
    const { rows } = await pool.query('UPDATE games SET title = $1, studio = $2, rating = $3 WHERE id = $4 RETURNING *', [game.title, game.studio, game.rating, id]);
    return new Game(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM games WHERE id = $1 RETURNING *', [id]);
    return new Game(rows[0]);
  }
}
