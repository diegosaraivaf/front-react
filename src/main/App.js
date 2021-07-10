import React from "react";
import Rotas from "./rotas";
import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import Navbar from "../components/navbar";
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'


/* function App() { */
class App extends React.Component {
  render(){
    return(
      <div>
        <Navbar/>
        <Rotas/>
      </div>
    )
  }
}

export default App;
