
import  {createRoot} from 'react-dom/client'
import './index.css'
// import {BrowserRouter} from 'react-router-dom'

const App = () => {
    return (
        <h1 className={'text-8xl text-blue'}>
            yc22
        </h1>
    )
}
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />)

