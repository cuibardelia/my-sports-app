import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Page/Home';
import About from './Page/About';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" exact element={<About />} />
          {/* <Route component = {NotFound}/> */}
        </Routes>
      </div>
    </Router>
  );
}
