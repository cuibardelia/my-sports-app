import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from "./Component/Navbar/Navbar";
import Home from './Page/Home';
import About from './Page/About';
import Exercises from './Page/Exercises';
import Trainers from './Page/Trainers';
import NotFound from './Page/NotFound';

// TODO: add reset

const App: React.FC = () => (
    <Router>
      <div className="App">
          <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/about" element={<About />} />
           <Route element = {<NotFound/>}/>
        </Routes>
      </div>
    </Router>
  );

export default App;
