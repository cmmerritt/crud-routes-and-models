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
}
