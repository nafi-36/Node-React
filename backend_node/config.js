const mysql = require('mysql2') // import mysql2
// menyambungkan node ke database
const db = mysql.createConnection({
    host: "localhost",
    password: "",
    user: "root",
    database: "praktikum3"
})

db.connect(err => {
    if (err) {
        console.log(err.message)
    }
    else {
        console.log("koneksi berhasil")
    }
})

module.exports = db