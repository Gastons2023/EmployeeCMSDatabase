import { pool } from './connection.js';

export default class Db {
  constructor() {}

  // TODO: Implement a generic query method to execute SQL queries with optional arguments
  // https://node-postgres.com/features/pooling
  // https://node-postgres.com/features/queries
  async query(sql: string, args: any[] = []) {
    const client = await pool.connect();
    try {
      const result = await client.query(sql, args);
      return result;
    } finally {
      client.release();
    }
  }

  // TODO: Get all employees  including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
  async findAllEmployees() {
    return this.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;"
    );
  }

  // TODO: Get all managers
  async findAllManagers() {
    return this.query(
      "SELECT * FROM employee WHERE manager_id IS NULL;"
    );
  }

  // TODO: Get all roles with the job title, role id, the department that role belongs to, and the salary for that role
  async findAllRoles() {
    return this.query(
      "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id;"
    );
  }

  // TODO: Get all departments
  async findAllDepartments() {
    return this.query(
      "SELECT * FROM department;"
    );
  }

  // TODO: Add a new employee
  createEmployee(employee: any) {
    const { first_name, last_name, role_id, manager_id } = employee;
    return this.query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
      [first_name, last_name, role_id, manager_id]
    );
  }
  
  // TODO: Update employee role
  updateEmployeeRole(employeeId: number, roleId: number) {
    return this.query(
      'UPDATE employee SET role_id = $1 WHERE id = $2',
      [roleId, employeeId]
    );
  }

  // TODO: Add a new role
  createRole(role: any) {
    const { title, salary, department_id } = role;
    return this.query(
      'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
      [title, salary, department_id]
    );
  }

  // TODO: Add a new department
  createDepartment(department: any) {
    return this.query(
      'INSERT INTO department (name) VALUES ($1)',
      [department.name]
    );
  }

}