import React from 'react'

export default class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            cart: [], // local
            user: "", // session
            total: 0  // dapat dari hasil perhitungan
        }
    }
    getUser = () => {
        let userName = sessionStorage.getItem("user")
        this.setState({
            user: userName
        })
    }
    getCart = () => {
        let tempCart = []
        let totalHarga = 0
        if (localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        tempCart.map(item => {
            return totalHarga += (item.harga * item.jumlahBeli)
        })
        this.setState({
            cart: tempCart,
            total: totalHarga
        })
    }
    onDrop = (item) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini ?")) {
            let tempCart = this.state.cart
            let updateHarga = 0
            let total = this.state.total
            let index = tempCart.indexOf(item)
            
            updateHarga = total - (item.harga * item.jumlahBeli)

            tempCart.splice(index, 1)

            this.setState({
                cart: tempCart,
                total: updateHarga
            })

            localStorage.setItem("cart", JSON.stringify(tempCart))
        }
    }
    componentDidMount = () => {
        this.getUser()
        this.getCart()
    }
    render() {
        return (
            <div className='container'>
                <div className='card col-12 mt-3'>
                    <div className='card-header bg-info text-white'>
                        <h3>Keranjang Belanja</h3>
                    </div>
                    <div className='card-body'>
                        <h5 className='text-primary'>
                            Nama Pengguna : {this.state.user}
                        </h5>
                        <hr />
                        <table className='table table-bordererd'>
                            <thead>
                                <th>Judul Buku</th>
                                <th>Harga</th>
                                <th>Jumlah</th>
                                <th>Total Harga</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                                {this.state.cart.map((item, index) => {
                                    return(
                                    <tr key={index}>
                                        <td>{item.judul}</td>
                                        <td>{item.harga}</td>
                                        <td>{item.jumlahBeli}</td>
                                        <td>{item.harga * item.jumlahBeli}</td>
                                        <td>
                                            <button className="btn btn-sm btn-danger m-1" onClick={() => this.onDrop(item)}>
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <h5 className='text-info'>
                            Total Harga : {this.state.total}
                        </h5>
                        {/* <button className="btn btn-sm btn-danger m-1" onClick={this.onDrop}>
                            Hapus Keranjang
                        </button> */}
                    </div>
                </div>
            </div>
        )
    }
}

// constructor() {
//     super()
//     this.state = {
//         cart: [], // local
//         user: "", // session
//         total: 0,  // dapat dari hasil perhitungan
//         jumlah: 0 
//     }
// }

// editCart () = {
//     let tempCart = []
//     if (localStorage.getItem("cart") !== null){
//         tempCart = JSON.parse(localStorage.getItem("cart"))
//     }
//     tempCart.map(item => {
//         return item.jumlahBeli = 
//         tempBuku[index].harga = this.state.harga
//     })
//     
//     this.setState({
//         cart: tempCart,
//         total: totalHarga
//     })
// }
// local storage - remove item