const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'bv2rebwf6zzsv341.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      // MySQL username,
      user: 'ql9cb34zgc0xl5lf',
      password: 'glq2nc9nrz06jp0c',
      database: 'yy1ok18iv6ly6v83'
    },
    console.log(`Connected to the database.`)
  );


  // VIEW ALL SECTION
  //............................................

  // view all Employees
const viewEmployee = () => {
  app.get('/api/employee', (req, res) => {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err,rows) => {
        if (err) {
            res.status(500).json({error: err.message });
            return;
        }
        res.json({
            message: 'sucess',
            data: rows
        });
    });
  });
};
  // view all departments
const viewDepartment = () => {
  app.get('/api/department', (req, res) => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err,rows) => {
        if (err) {
            res.status(500).json({error: err.message });
            return;
        }
        res.json({
            message: 'sucess',
            data: rows
        });
    });
  });
};
  // view all roles
const viewRole = () => {
  app.get('/api/role', (req, res) => {
    const sql = `SELECT * FROM role`;

    db.query(sql, (err,rows) => {
        if (err) {
            res.status(500).json({error: err.message });
            return;
        }
        res.json({
            message: 'sucess',
            data: rows
        });
    });
  });
};
  //.........................................................

  // data adding section 

  //...........................................................

  // add Employees
const addEmployee = () => {
  app.post('/api/new-employee', ({ body }, res) => {
    const sql = `INSERT INTO employee 
    VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
    
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
  });
};
  // add department

const addDepartment = () => {
app.post('/api/new-department', ({ body }, res) => {
    const sql = `INSERT INTO department 
    VALUES (?)`;
    const params = [body.name];
    
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
  });
};
  // add roles
const addRole = () => {
  app.post('/api/new-roles', ({ body }, res) => {
    const sql = `INSERT INTO role 
    VALUES (?,?,?)`;
    const params = [body.title, body.salary, body.department_id];
    
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
  });
};

  //.....................................................

  // update role
const updateRole = () => {
  app.put('/api/role/:id', (req, res) => {
    const sql = `UPDATE role SET title = ? WHERE id = ?`;
    const params = [req.body.title, req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });
};
const addData = (table) => {
    switch(table) {
        case 'add employee':
        return [
            {
                type: 'input',
                name: 'fist_name',
                message: `Enter employee's first name`
            },
            {
                type: 'input',
                name: 'last_name',
                message: `Enter employee's last name`
            },
            {
                type: 'input',
                name: 'role_id',
                message: `Enter employee's role id`
            },
            {
                type: 'input',
                name: 'manager_name',
                message: `Enter employee's manager id if applicable`
            },
            addEmployee()
        ];
        case 'add role':
            return [
                {
                    type: 'input',
                    name: 'title',
                    message: `Enter the role`
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: `Enter the starting salary for the role`
                },
                {
                    type: 'input',
                    name: 'department_id',
                    message: `Enter the id of the corresponding department`
                },
                addRole()
            ];
        case 'add department':
            return [
                {
                    type: 'input',
                    name: 'name',
                    message: `Enter department name`
                },
                addDepartment()
            ];

    }
};

const mainMenu =(action) => {
    switch(action) {
        case 'add data':
            addData();
            break;
        case 'view data':
            viewData();
            break;
        case 'update role':
          updateRole();
          break;
            default:
            console.log('Invalid choice');
    }     
};

const viewData = (table) => {
    switch(table) {
        case 'view employees':
            viewEmployee();
            break;
        
        case 'view roles':
            viewRole();
            break;
        
        case 'view departments':
          viewDepartment();
          break;
          default:    
    }
};