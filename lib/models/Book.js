import pool from '../utils/pool';

export default class Book {
  id;
  title;
  author;
  year;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.author = row.author;
    this.year = row.year;
  }

  static async insert({ title, author, year }) {
    const { rows } = await pool.query('INSERT INTO books (title, author, year) VALUES ($1, $2, $3) RETURNING *', [title, author, year]);

    return new Book(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM books WHERE id = $1', [id]
    );
    return new Book(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM books'
    );
    return rows.map(row => new Book(row));
  }
}
