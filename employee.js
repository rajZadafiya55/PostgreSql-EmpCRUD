const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.USER,
    host: 'localhost',
    database: 'postgres-api',
    password: process.env.PASSWORD,
    port: 5432
})

const createEmployee = (req, res) => {
    const { name, email } = req.body
    pool.query('INSERT INTO employees (name,email) VALUES($1,$2) RETURNING *', [name, email], (err, result) => {
        if (err) {
            console.log(err);
            throw err
        }
        res.status(200).json({
            msg: 'Data Created Successfully..!',
            data: result.rows[0]
        })
    })
}


const getEmployee = (req, res) => {
    pool.query('SELECT * FROM employees', (err, result) => {
        if (err) {
            throw err
        }
        res.json({
            data: result.rows
        })
    })
}

const getEmployeeById = (req, res) => {
    let id = parseInt(req.params.id)
    pool.query('SELECT * FROM employees WHERE id= $1', [id], (err, result) => {
        if (err) {
            throw err
        }
        res.json({
            data: result.rows
        })
    })
}

const updateEmployee = (req, res) => {
    let id = parseInt(req.params.id)
    const { name, email } = req.body

    pool.query('UPDATE employees SET name =$1, email = $2 WHERE  id=$3',[name,email,id],(err,result) => {
        if(err){
            throw err
        }
        res.json({
            data:'Updated Successfully ..!'
        })
    })

}

const deleteEmployee  =(req,res) => {
    let id = parseInt(req.params.id)
    pool.query('DELETE FROM employees WHERE id =$1',[id],(err,result) => {
        if(err){
            throw err
        }
        res.json({
            data:`Employee with ${id} Deleted Successfully`
        })
    })
}
module.exports = {
    createEmployee,
    getEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
}