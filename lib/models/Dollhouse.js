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
}
