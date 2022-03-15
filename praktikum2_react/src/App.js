import React from "react"
import Navbar from "./component/navbar"
import Main from "./main"

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Main />
      </div>
    )
  }
}
