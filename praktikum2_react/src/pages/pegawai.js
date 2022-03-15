import React from 'react'
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap'

export default class Pegawai extends React.Component {
    constructor() {
        super()
        this.state = {
            jumlah_pegawai: 0,
            pegawai: [],
            isModalOpen: false,
            nip: "",
            nama: "",
            alamat: "",
            action: ""
        }
    }

    handleAdd = () => {
        // console.log('add')
        this.setState({
            isModalOpen: true,
            nip: "",
            nama: "",
            alamat: "",
            action: "insert"
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSave = (e) => {
        e.preventDefault()
        // setting data
        let data = {
            nip: this.state.nip,
            nama: this.state.nama,
            alamat: this.state.alamat
        } 

        // setting url
        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:4000/pegawai/save"
        }

        // panggil api backend
        axios.post(url, data)
            .then(res => {
                console.log(res.data.message)
                this.getPegawai()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }

    getPegawai = () => {
        let url = "http://localhost:4000/pegawai"
        axios.get(url)
            .then(res => {
                // console.log(res.data)
                // console.log(res.data.count)
                // console.log(res.data.pegawai)

                this.setState({
                    jumlah_pegawai: res.data.count,
                    pegawai: res.data.pegawai
                })
            })
    }

    componentDidMount = () => {
        this.getPegawai()
    }

    render() {
        return (
            <div className='container'>
                <div className='m-3 card'>
                    <div className='card-header bg-secondary text-white'>
                        <h3>Data Pegawai</h3>
                    </div>
                    <div className='card-body'>
                        <button className='btn btn-success mb-3' onClick={() => this.handleAdd()}>Tambah Data</button>
                        <table className='table'>
                            <thead>
                                <th>NIP</th>
                                <th>Nama</th>
                                <th>Alamat</th>
                            </thead>
                            <tbody>
                                {this.state.pegawai.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.nip}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.alamat}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {/* <button className='btn btn-primary' onClick={() => this.handleAdd()}>Tambah Data</button> */}
                    </div>
                </div>
                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Pegawai</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="nip">
                                <Form.Label>NIP</Form.Label>
                                <Form.Control type="text" name="nip" placeholder="Masukkan NIP pegawai"
                                    value={this.state.nip} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="nama">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" name="nama" placeholder="Masukkan nama pegawai"
                                    value={this.state.nama} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="alamat">
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control type="text" name="alamat" placeholder="Masukkan alamat pegawai"
                                    value={this.state.alamat} onChange={this.handleChange} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="success" type="submit">
                                Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}