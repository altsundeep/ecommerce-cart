import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import { StateProvider } from './Store/store'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    // const { category, description, id, image, price, title } = state;

    return (
        <Router>
            <div className="App">
                <StateProvider>
                    <Layout />
                </StateProvider>
            </div>
        </Router>
    )
}

export default App
