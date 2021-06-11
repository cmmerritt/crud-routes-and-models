import pool from '../utils/pool';

export default class Cat {
  id;
  name;
  type;
  weight;
  age;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.weight = row.weight;
    this.age = row.age;
  }

  static async insert({ name, type, weight, age }) {
    const { rows } = await pool.query(
      'INSERT INTO cats (name, type, weight, age) VALUES ($1, $2, $3, $4) RETURNING *', [name, type, weight, age]
    );

    return new Cat(rows[0]);
  }
}
