const inquirer = require('inquirer')
const mysql = require('mysql2');


const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'sqlroot',
        database: 'employees_db'
    },
    console.log("\n"),
    console.log('WELCOME TO THE EMPLOYEE DATABASE'),
    console.log("\n")
);

connection.connect(err => {
    if (err) throw err;
    prompt();
})

const promptChoices = {
    viewDepartments: 'View all departments',
    viewTitles: 'View all titles',
    viewEmployees: 'View employee master list',
    addDepartment: 'Add a department',
    addTitle: 'Add a role',
    addEmployee: 'Add an employee',
    updateTitle: 'Update an employee title',
    exitApp: 'Exit'
}

function prompt() {
    inquirer
        .prompt({
            name: 'choice',
            type: 'list',
            message: 'Please select one of the following options:',
            choices: [
                promptChoices.viewDepartments,
                promptChoices.viewTitles,
                promptChoices.viewEmployees,
                promptChoices.addDepartment,
                promptChoices.addTitle,
                promptChoices.addEmployee,
                promptChoices.updateTitle,
                promptChoices.exitApp,
            ]
        })
        .then(answer => {
            console.log('answer', answer);

            switch (answer.choice) {
                case promptChoices.viewDepartments:
                    viewDepartments();
                    break;

                case promptChoices.viewTitles:
                    viewTitles();
                    break;

                case promptChoices.viewEmployees:
                    viewEmployees();
                    break;

                case promptChoices.addDepartment:
                    addDepartment();
                    break;

                case promptChoices.addTitle:
                    addTitle();
                    break;

                case promptChoices.addEmployee:
                    addEmployee();
                    break;

                case promptChoices.updateTitle:
                    updateTitle();
                    break;

                case promptChoices.exitApp:
                    connection.end();
                    break;
            }

        })
}

function viewDepartments() {
    const query = `
    SELECT departments.id, departments.department AS Department
    FROM departments 
    ORDER BY departments.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("\n");
        console.log('VIEW LIST OF DEPARTMENTS');
        console.log("\n");
        console.table(res);
        prompt();
    })
}

function viewTitles() {
    const query = `
    SELECT title.employee_title AS Title, title.id, title.salary AS Salary, departments.department AS Department
    FROM title 
    RIGHT JOIN departments ON (departments.id = title.department_id)
    ORDER BY title.salary;`;
    connection.query(query, (err, res) => {
        if (err) throw (err);
        console.log("\n");
        console.log('VIEW LIST OF JOB TITLES');
        console.log("\n");
        console.table(res);
        prompt();
    })
}

function viewEmployees() {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, title.employee_title, departments.department AS department, title.salary, employee.manager_id AS manager
    FROM employee
    INNER JOIN title ON (title.id = employee.title_id)
    INNER JOIN departments ON (departments.id = title.department_id)
    ORDER BY employee.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("\n");
        console.log('VIEW EMPLOYEE MASTER LIST');
        console.log("\n");
        console.table(res);
        prompt();
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department you would like to add?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a valid department name.');
                    return false
                }
            }
        }
    ])
        .then(({ department }) => {
            const query = connection.query(
                `INSERT INTO departments SET ?`,
                {
                    department: department
                },
                function (err, res) {
                    if (err) throw err;
                }
            )
        })
        .then(() => viewDepartments())
}

function addTitle() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the job title you would like to add?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a valid title.');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for the role you are adding?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a valid salary.');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'department',
            message: 'What is the department ID for this job title?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a valid department ID.');
                    return false
                }
            }
        }
    ])
        .then(({ title, salary, department }) => {
            const query = connection.query(
                `INSERT INTO title SET ?`,
                {
                    employee_title: title,
                    salary: salary,
                    department_id: department
                },
                function (err, res) {
                    if (err) throw err;
                }
            )
        })
        .then(() => viewTitles())
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a valid first name.');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a valid name.');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'title',
            message: "What is the title ID for this employee?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a valid ID.');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'manager',
            message: "Is this employee a manager? 0 = no 1 = yes",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a valid answer');
                    return false
                }
            }
        }
    ])
        .then(({ firstName, lastName, manager, title }) => {
            const query = connection.query(
                `INSERT INTO employee SET ?`,
                {
                    first_name: firstName,
                    last_name: lastName,
                    title_id: title,
                    manager_id: manager
                },
                function (err, res) {
                    if (err) throw err;
                }
            )
        })
        .then(() => viewEmployees())
}







