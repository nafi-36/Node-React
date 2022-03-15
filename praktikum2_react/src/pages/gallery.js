import React from 'react'
import Card from '../component/card'
import { Modal, Button, Form } from 'react-bootstrap'

export default class Gallery extends React.Component {
    // berisi data2 buku 
    constructor() {
        super()
        this.state = {
            buku: [
                {
                    isbn: "12345",
                    judul: "Dilan",
                    penulis: "Pidi Baiq",
                    penerbit: "Pastel Books",
                    harga: 92500,
                    cover: "https://drive.google.com/uc?id=1soT317o0KvayVNgBmkKcKUhIwbLqiTXW"
                },
                {
                    isbn: "12346",
                    judul: "Negeri 5 Menara",
                    penulis: "Ahmad Fuadi",
                    penerbit: "Gramedia",
                    harga: 89000,
                    cover: "https://drive.google.com/uc?id=1_b2AonjdgX0krRJcR6tGLz1abzK4iXvX"
                },
                {
                    isbn: "12347",
                    judul: "Rantau 1 Muara",
                    penulis: "Ahmad Fuadi",
                    penerbit: "Gramedia",
                    harga: 99000,
                    cover: "https://drive.google.com/uc?id=1VfkjcL2iA3X3hGNcqMmxsQgWygtCQdQ4"
                }
            ],

            isbn: "",
            judul: "",
            penulis: "",
            penerbit: "",
            harga: 0,
            cover: "",
            action: "",
            selectedItem: null,
            isModalOpen: false,
            search: "",
            filterBuku: [],
            user: ""
        }
        this.state.filterBuku = this.state.buku
    }

    setUser = () => {
        if (sessionStorage.getItem("user") === null) {
            // jika tdk ada, maka ditambahkan data usernya
            let input = window.prompt("Masukkan nama Anda", "")
            if (input === null || input === "") {
                this.setUser()
            }
            else {
                sessionStorage.setItem("user", input)
                this.setState({
                    user: input
                })
            }
        }
        else {
            // jika ada, tinggal ditampilkan data usernya
            let userName = sessionStorage.getItem("user")
            this.setState({
                user : userName
            })
        }
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSave = (e) => {
        e.preventDefault() // agar halaman tdk terefresh setelah disave
        let tempBuku = this.state.buku // menambahkan data baru di akhir array menggunakan PUSH

        if (this.state.action === "insert") {
            tempBuku.push({
                isbn: this.state.isbn,
                judul: this.state.judul,
                penulis: this.state.penulis,
                penerbit: this.state.penerbit,
                harga: this.state.harga,
                cover: this.state.cover
            })
        }
        else if (this.state.action === "update") {
            let index = tempBuku.indexOf(this.state.selectedItem)
            tempBuku[index].isbn = this.state.isbn
            tempBuku[index].judul = this.state.judul
            tempBuku[index].penulis = this.state.penulis
            tempBuku[index].penerbit = this.state.penerbit
            tempBuku[index].harga = this.state.harga
            tempBuku[index].cover = this.state.cover
        }

        this.setState({
            buku: tempBuku,
            isModalOpen: false
        })
    }

    add = () => {
        this.setState({
            isModalOpen: true,
            isbn: "",
            judul: "",
            penulis: "",
            penerbit: "",
            harga: 0,
            cover: "",
            action: "insert"
        })
    }

    edit = (item) => { // item dari perulangan map array buku 
        this.setState({
            isModalOpen: true,
            isbn: item.isbn,
            judul: item.judul,
            penulis: item.penulis,
            penerbit: item.penerbit,
            harga: item.harga,
            cover: item.cover,
            action: "update",
            selectedItem: item // data mana yang akan di edit
        })
    }

    drop = (item) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini ?")) {
            let tempBuku = this.state.buku
            let index = tempBuku.indexOf(item)

            tempBuku.splice(index, 1) // menghapus data di array menngunakan SPLICE, index = data mana, 1 = jumlah data (1 data)
            this.setState({
                buku: tempBuku
            })
        }
    }

    addToCart = (selectedItem) => {
        // console.log('add to cart')
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        let existItem = tempCart.find(item => item.isbn === selectedItem.isbn)
        console.log(existItem)
        if (existItem) {
            window.alert("Anda telah menambahkan produk ini")
        }
        else {
            let jumlah = window.prompt("Masukkan jumlah", "")
            if (jumlah !== null && jumlah !== "") {
                selectedItem.jumlahBeli = jumlah

                tempCart.push(selectedItem)

                localStorage.setItem("cart", JSON.stringify(tempCart))
            }
        }
    }

    search = (e) => {
        if (e.keyCode === 13) {
            // console.log("search")
            let search = this.state.search.toLowerCase()
            let tempBuku = this.state.buku
            let result = tempBuku.filter(item => {
                return item.judul.toLowerCase().includes(search) ||
                    item.penulis.toLowerCase().includes(search) ||
                    item.penerbit.toLowerCase().includes(search) ||
                    item.harga.toString().includes(search)
            })

            this.setState({
                filterBuku: result
            })
        }
    }

    componentDidMount = () => {
        this.setUser()
    }

    render() {
        return (
            <div className="bg-light">
                <div className='container'>
                    <div className="alert alert-dark"><h1 className='text-center'>Gallery</h1></div>
                    <h5 className>
                        Nama pengguna : {this.state.user}
                    </h5>
                    <input type="text" name="search" className="form-control mt-3 mb-3" placeholder="Pencarian data"
                        onChange={this.handleChange} onKeyUp={e => this.search(e)} />
                    <button className='btn btn-success mb-2' onClick={() => this.add()}>
                        Tambah Buku
                    </button>
                    <div className="row">
                        {this.state.filterBuku.map((item, index) => (
                            <Card cover={item.cover}
                                judul={item.judul}
                                penulis={item.penulis}
                                penerbit={item.penerbit}
                                harga={item.harga}
                                onEdit={() => this.edit(item)}
                                onDrop={() => this.drop(item)}
                                onCart={() => this.addToCart(item)}
                            />
                        ))}
                    </div>

                    <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Buku</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>
                                <Form.Group className="mb-3" controlId="isbn">
                                    <Form.Label>ISBN</Form.Label>
                                    <Form.Control type="text" name="isbn" placeholder="Masukkan ISBN buku"
                                        value={this.state.isbn} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="judul">
                                    <Form.Label>Judul Buku</Form.Label>
                                    <Form.Control type="text" name="judul" placeholder="Masukkan judul buku"
                                        value={this.state.judul} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="penulis">
                                    <Form.Label>Penulis Buku</Form.Label>
                                    <Form.Control type="text" name="penulis" placeholder="Masukkan penulis buku"
                                        value={this.state.penulis} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="penerbit">
                                    <Form.Label>Penerbit Buku</Form.Label>
                                    <Form.Control type="text" name="penerbit" placeholder="Masukkan penerbit buku"
                                        value={this.state.penerbit} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="harga">
                                    <Form.Label>Harga Buku</Form.Label>
                                    <Form.Control type="number" name="harga" placeholder="Masukkan harga buku"
                                        value={this.state.harga} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="cover">
                                    <Form.Label>Cover Buku</Form.Label>
                                    <Form.Control type="url" name="cover" placeholder="Masukkan cover buku"
                                        value={this.state.cover} onChange={this.handleChange} />
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
                </div >
            </div>
        )
    }
}

// map = merender semua item yg ada di array
// index = perdatanya (1,2,3 kotak)
// item = persatuan yg ada didalam data
// onEdit/onDrop/handleClose/dll harus dibuatkan function terlebih dahulu karena keduanya juga merupakan function

// this.handleClose di modal tdk perlu diberi () 
// cara penulisan 
// function ---> [ () => this.nama_function() ]
// biasa ---> [ this.nama_function ]
// function parameter ---> [ e => this.nama_function(e) ] 

// Letak Inspect => Application 
// Local storage = tidak perlu login jika sudah login di tab seblumnya   
// Session storage = harus login lagi jika mengakses di tab lain   
// Mounting = birth (diakses diawal / pertama kali sebelum melakukan sesuatu) construstor -> render -> react dom -> component didmounting 
// Updating = growing
// Unmounting = death
// JSON.parse = mengubah array JSON ke array biasa 
// JSON.sringfy = menyimpan array biasa ke array JSON