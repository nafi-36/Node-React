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
            action: "",
            keyword: ""
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

    handleEdit = (selectedItem) => {
        // console.log('edit')
        // console.log(selectedItem)
        this.setState({
            isModalOpen: true,
            nip: selectedItem.nip,
            nama: selectedItem.nama,
            alamat: selectedItem.alamat,
            action: "update"
        })
    }

    handleDelete = (nip) => {
        let url = "http://localhost:4000/pegawai/" + nip
        if (window.confirm("Apakah anda yakin ingin menghapus data ini ?")) {
            axios.delete(url)
            .then(res => {
                console.log(res.data.message)
                this.getPegawai() // mereload data pegawai 
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }

    handleSearch = (e) => {
        let url = "http://localhost:4000/pegawai"
        if (e.keyCode === 13) {
            // console.log("search")
            let data = {
                keyword: this.state.keyword
            }
            axios.post(url, data)
            .then(res => {
                this.setState({
                    pegawai: res.data.pegawai
                })
            })
            .catch(err => {
                console.log(err.message)
            })
        }
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
        } else if (this.state.action === "update") {
            url = "http://localhost:4000/pegawai/update"
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
                        <input className="form-control mb-3" type="text" name="keyword" 
                            value={this.state.keyword} 
                            onChange={this.handleChange} 
                            onKeyUp={this.handleSearch} 
                            placeholder="Masukkan nip / nama / alamat"
                        />
                        {/* <button className='btn btn-success mb-3' onClick={() => this.handleAdd()}>Tambah Data</button> */}
                        <table className='table'>
                            <thead>
                                <th>NIP</th>
                                <th>Nama</th>
                                <th>Alamat</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                                {this.state.pegawai.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.nip}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.alamat}</td>
                                            <td>
                                                <button className="btn btn-primary m-1" onClick={() => this.handleEdit(item)}>Edit</button>
                                                <button className="btn btn-danger m-1" onClick={() => this.handleDelete(item.nip)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <button className='btn btn-success' onClick={() => this.handleAdd()}>Tambah Data</button>
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