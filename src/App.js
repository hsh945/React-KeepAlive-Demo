import './App.css';
import {
  BrowserRouter,
  Link,
  Routes,
  Route
} from 'react-router-dom';
import {
  KeepAlive,
  keepAliveTransfer
} from './KeepAlive';

import HomeView from './views/Home';
import FromView from './views/Form';

const AliveHomeView = keepAliveTransfer(HomeView, 'home');
const AliveFormView = keepAliveTransfer(FromView, 'form');

function App() {
  return (
    <BrowserRouter>
      <KeepAlive>
        <div>
          <ul id="nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/form">Form</Link>
            </li>
          </ul>
        </div>
        <div>
          <Routes>
            <Route path='/' element={<AliveHomeView />}></Route>
            <Route path='/form' element={<AliveFormView />}></Route>
          </Routes>
        </div>
      </KeepAlive>
    </BrowserRouter>
  )
}

export default App;
