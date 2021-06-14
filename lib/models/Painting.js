import pool from '../utils/pool';

export default class Painting {
  id;
  title;
  museum;
  artist;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.museum = row.museum;
    this.artist = row.artist;
  }

  static async insert({ title, museum, artist }) {
    const { rows } = await pool.query('INSERT INTO paintings (title, museum, artist) VALUES ($1, $2, $3) RETURNING *', [title, museum, artist]);
    
    return new Painting(rows[0]);
  }
}
