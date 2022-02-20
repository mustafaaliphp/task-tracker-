import React from 'react';

import Header from './components/Header';
import ListTask from './components/ListTask';
import AddTask from './components/AddTask';

function App() {
  return (
    <div className="App">
      <Header />
      <AddTask />
      <ListTask />
    </div>
  );
}

export default App;
