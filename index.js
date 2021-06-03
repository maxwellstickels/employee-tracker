const inq = require('inquirer');
const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

function addEmployee() {
    inq.prompt([
        {
            type: "input",
            message: "ADDING EMPLOYEE: Enter the employee's first name.",
            name: "first",
            validate: (first) => {
                return (first.length > 0) || "This field is required.";
            }
        },
        {
            type: "input",
            message: "ADDING EMPLOYEE: Enter the employee's last name.",
            name: "last",
            validate: (last) => {
                return (last.length > 0) || "This field is required.";
            }
        },
        {
            type: "input",
            message: "ADDING EMPLOYEE: State the employee's annual salary.",
            name: "salary",
            validate: (salary) => {
                return (salary.length > 0 && !isNaN(Number(salary))) || "Please type the salary as a number.";
            }
        },
        {
            type: "input",
            message: "ADDING EMPLOYEE: Provide the ID of this employee's role.",
            name: "role",
            validate: (role) => {
                return (role.length > 0 && !isNaN(Number(role))) || "This field requires an integer value.";
            }
        },
        {
            type: "input",
            message: "ADDING EMPLOYEE: Provide the ID of this employee's manager (if applicable).",
            name: "manager",
            validate: (manager) => {
                return (manager.length === 0 || !isNaN(Number(manager))) || "Value must be an integer (or empty if employee has no manager).";
            }
        }
    ]).then(async (response) => {
        var manager = (response.manager.length === 0) ? null : response.manager;
        await connection.query('INSERT INTO employee (first_name, last_name, salary, role_id, manager_id) VALUES (?, ?, ?, ?, ?)',
        [response.first, response.last, response.salary, response.role, manager], (err, result) => {
            if (err) throw err;
            console.log('\x1b[33m', "Added employee with ID: " + result.insertId + "\n");
            promptReqType();
        });
    });
}

function addRole() {
    inq.prompt([
        {
            type: "input",
            message: "ADDING ROLE: State the title of the role.",
            name: "title",
            validate: (title) => {
                return (title.length > 0) || "This field is required.";
            }
        },
        {
            type: "input",
            message: "ADDING ROLE: State the annual salary of the role.",
            name: "salary",
            validate: (salary) => {
                return (salary.length > 0 && !isNaN(Number(salary))) || "Please type a number.";
            }
        },
        {
            type: "input",
            message: "ADDING ROLE: Provide the ID of the department this role is under.",
            name: "dep",
            validate: (dep) => {
                return (dep.length > 0 && !isNaN(Number(dep))) || "Please type a number.";
            }
        }
    ]).then(async (response) => {
        await connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
        [response.title, response.salary, response.dep], (err, result) => {
            if (err) throw err;
            console.log('\x1b[33m', "Added role with ID: " + result.insertId);
            promptReqType();
        });
    });
}

function addDepartment() {
    inq.prompt([
        {
            type: "input",
            message: "ADDING DEPARTMENT: State the name of the department.",
            name: "title",
            validate: (title) => {
                return (title.length > 0) || "This field is required.";
            }
        },
    ]).then(async (response) => {
        await connection.query('INSERT INTO department (name) VALUES (?)',
        [response.title], (err, result) => {
            if (err) throw err;
            console.log('\x1b[33m', "Added department with ID: " + result.insertId);
            promptReqType();
        });
    });
}

function findReqType(change, object) {
    const userReq = change + " " + object;
    switch (userReq) {
        case "ADD EMPLOYEE":
            addEmployee();
            break;
        case "ADD ROLE":
            addRole();
            break;
        case "ADD DEPARTMENT":
            addDepartment();
            break;
        case "VIEW EMPLOYEE":
            viewEmployee();
            break;
        case "VIEW ROLE":
            viewRole();
            break;
        case "VIEW DEPARTMENT":
            viewDepartment();
            break;
        case "UPDATE EMPLOYEE":
            updateEmployee();
            break;
        case "UPDATE ROLE":
            updateRole();
            break;
        case "UPDATE DEPARTMENT":
            updateDepartment();
            break;
        default:
            console.log("Invalid request!");
    }
}

function promptReqType() {
    inq.prompt([
        {
            type: "list",
            message: "Welcome to Employee Tracker! Would you like to ADD, VIEW, or UPDATE something?",
            choices: ["ADD", "VIEW", "UPDATE"],
            name: "change"
        },
        {
            type: "list",
            message: "What would you like to view/modify?",
            choices: ["EMPLOYEE", "ROLE", "DEPARTMENT"],
            name: "object"
        }
        ]).then(
            (response) => {
                findReqType(response.change, response.object);
            }
        );
}

promptReqType();