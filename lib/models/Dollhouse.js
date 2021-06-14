import pool from '../utils/pool';

export default class Dollhouse {
  id;
  name;
  scale;
  price;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.scale = row.scale;
    this.price = row.price;
  }

  static async insert({ name, scale, price }) {
    const { rows } = await pool.query('INSERT INTO dollhouses (name, scale, price) VALUES ($1, $2, $3) RETURNING *', [name, scale, price]);

    return new Dollhouse(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM dollhouses WHERE id = $1', [id]
    );
    return new Dollhouse(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM dollhouses');
    return rows.map(row => new Dollhouse(row));
  }

  static async update(dollhouse, id) {
    const { rows } = await pool.query('UPDATE dollhouses SET name = $1, scale = $2, price = $3 WHERE id = $4 RETURNING *', [dollhouse.name, dollhouse.scale, dollhouse.price, id]);
    return new Dollhouse(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM dollhouses WHERE id = $1 RETURNING *', [id]);
    return new Dollhouse(rows[0]);
  }
}
