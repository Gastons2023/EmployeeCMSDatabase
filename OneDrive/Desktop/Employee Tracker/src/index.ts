import inquirer from 'inquirer';
import Db from './db/index.js';

const db = new Db();

// TODO: This function starts the application. It displays the title and then loads the main menu options.
init();

// TODO: Start the menu prompt.
function init() {
  loadMainPrompts();
}

// TODO: Show a list of options to the user and let them choose what to do next.
function loadMainPrompts() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        { name: 'View All Departments', value: 'VIEW_DEPARTMENTS' },
        { name: 'View All Roles', value: 'VIEW_ROLES' },
        { name: 'View All Employees', value: 'VIEW_EMPLOYEES' },
        { name: 'Add Department', value: 'ADD_DEPARTMENT' }, 
        { name: 'Add Role', value: 'ADD_ROLE' },
        { name: 'Add Employee', value: 'ADD_EMPLOYEE' },
        { name: 'Update Employee Role', value: 'UPDATE_EMPLOYEE_ROLE' },
        { name: 'Quit', value: 'QUIT' },
      ],
    },
  ]).then((res) => {
    const choice = res.choice;
    
    // TODO: Based on the user's choice, call the corresponding function.
    switch (choice) {
      case 'VIEW_EMPLOYEES':
        viewEmployees();
        break;
      case 'VIEW_DEPARTMENTS':
        viewDepartments();
        break;  
      case 'VIEW_ROLES':
        viewRoles();
        break;
      case 'ADD_DEPARTMENT':
        addDepartment();
        break;
      case 'ADD_ROLE':
        addRole();
        break;
      case 'ADD_EMPLOYEE':
        addEmployee();
        break;
      case 'UPDATE_EMPLOYEE_ROLE':
        updateEmployeeRole();
        break;
      default:
        quit();
    }
  });
}

// TODO: Fetch all employees from the database and display them in a table format.
function viewEmployees() {
  db.findAllEmployees()
    .then(({ rows }) => {
      console.log('\n');
      console.table(rows);
    })
    .then(() => loadMainPrompts());
}

function viewDepartments() {
  db.findAllDepartments()
    .then(({ rows }) => {
      console.log('\n');
      console.table(rows);
    })
    .then(() => loadMainPrompts());
}

function viewRoles() {
  db.findAllRoles()
    .then(({ rows }) => {
      console.log('\n');
      console.table(rows);
    })
    .then(() => loadMainPrompts());
}

function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?',
    },
  ]).then((res) => {
    db.createDepartment(res)
      .then(() => console.log('Department added!'))
      .then(() => loadMainPrompts());
  });
}

async function addRole() {
const departments = await db.findAllDepartments();
const departmentChoices = departments.rows.map(department => ({
  name: department.name,
  value: department.id,
}));

  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the role?',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the role?',
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select Department?',
      choices: departmentChoices,
    },
  ]).then((res) => {
    db.createRole(res)
      .then(() => console.log('Role added!'))
      .then(() => loadMainPrompts());
  });
}

async function addEmployee() {
  const roles = await db.findAllRoles();
  const roleChoices = roles.rows.map(role => ({
    name: role.title,
    value: role.id,
  }));

  const employees = await db.findAllEmployees();
  const employeeChoices = employees.rows.map(employee => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the employee\'s first name?',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the employee\'s last name?',
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select Role?',
      choices: roleChoices,
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Select Manager?',
      choices: employeeChoices,
    },
  ]).then((res) => {
    db.createEmployee(res)
      .then(() => console.log('Employee added!'))
      .then(() => loadMainPrompts());
  });
}

async function updateEmployeeRole() {
  const employees = await db.findAllEmployees();
  const employeeChoices = employees.rows.map(employee => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

  const roles = await db.findAllRoles();
  const roleChoices = roles.rows.map(role => ({
    name: role.title,
    value: role.id,
  }));

  inquirer.prompt([
    {
      type: 'list',
      name: 'employee_id',
      message: 'Select Employee?',
      choices: employeeChoices,
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select Role?',
      choices: roleChoices,
    },
  ]).then((res) => {
    db.updateEmployeeRole(res.employee_id, res.role_id)
      .then(() => console.log('Employee role updated!'))
      .then(() => loadMainPrompts());
  });
}
// TODO: View employees based on their department. First, get the list of departments, then fetch employees based on the selected department.


// TODO: View employees who report to a specific manager. First, get a list of managers, then fetch their direct reports.


// TODO: Remove an employee. First, show the list of employees and allow the user to select one to remove.


// TODO: Exit the application gracefully when the user selects 'Quit'.
function quit() {
  console.log('Goodbye!');
  process.exit();
}
