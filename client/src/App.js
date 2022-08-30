import './App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">

     {/*  <h1 className='landing_page'>Welcome To My Videogames APP</h1> */}

      <span className='span'>Developer Full Stack: Ariakis Blanco García_2022</span>
       
       <Link to = "/home">
       
       <div>
          <button className='landing_button'>Enter</button>
       </div>
       
       </Link>

    </div>
  );
}

export default App;
