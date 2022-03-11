const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const db = require('./config')

// end-point GET ALL pegawai
app.get('/', (req, res) => {
    let sql = "select * from pegawai"
    db.query(sql, (err, result) => {
        if (err) {
            res.json({
                message: err.message
            })       
        }
        else {
            res.json({
                count : result.length,
                pegawai : result
            })
        }
    })
})

// end-point search pegawai, jika keyword primary key pakai get, jika keyword banyak pakai post, (') memisahkan teks biasa dengan simbol
app.post('/', (req, res) => {
    let keyword = req.body.keyword
    let sql = "select * from pegawai where nip like '%"+keyword+"%' or nama like '%"+keyword+"%' or alamat like '%"+keyword+"%'"
    db.query(sql, (err, result) => {
        if (err) {
            res.json({
                message: err.message
            })       
        }
        else {
            res.json({
                count : result.length,
                pegawai : result
            })
        }
    })
})

// end-point save pegawai
app.post('/save', (req, res) => {
    let data = {
        nip: req.body.nip,
        nama: req.body.nama,
        alamat: req.body.alamat
    }
    let sql = "insert into pegawai set ?"
    db.query(sql, data, (err, result) => {
        if (err) {
            res.json({
                message: err.message
            })       
        }
        else {
            res.json({
                message : result.affectedRows + " row inserted"
            })
        }
    })
})

// end-point update pegawai
app.post('/update', (req, res) => {
    let data = [
        {
            nama: req.body.nama,
            alamat: req.body.alamat
        },
            req.body.nip
    ]
    let sql = "update pegawai set? where nip = ?"
    db.query(sql, data, (err, result) => {
        if (err) {
            res.json({
                message: err.message
            })       
        }
        else {
            res.json({
                message : result.affectedRows + " row updated"
            })
        }
    })
})

// end-point delete pegawai
app.delete('/:nip', (req, res) => {
    let data = {
        nip: req.params.nip
    }
    let sql = "delete from pegawai where ?"
    db.query(sql, data, (err, result) => {
        if (err) {
            res.json({
                message: err.message
            })       
        }
        else {
            res.json({
                message : result.affectedRows + " row deleted"
            })
        }
    })
})

module.exports = app