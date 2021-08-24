import React from 'react'
import Rotas from './rotas'
import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import Navbar from '../components/navbar'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'


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
