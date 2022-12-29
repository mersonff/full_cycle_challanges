const express = require('express')
const faker = require('faker')
const app = express()
const port = process.env.APP_PORT || 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql')

const connection = mysql.createConnection(config)
const name = faker.name.findName()

app.get('/', (req, res) => {
  connection.query(`INSERT INTO people (name) VALUES ('${name}')`)

  connection.query(`SELECT * FROM people`, (error, results, fields) => {
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ol>
        ${results.map(result => `<li>${result.name}</li>`).join('')}
      </ol>
    `)
  })
})

app.listen(port, () => {
  console.log('Up on:', port);
})