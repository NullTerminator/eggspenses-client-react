import React, { Component } from 'react';

import Summary from './components/Summary';

class App extends Component {
  render() {
    return (
      <div>
        <div className="page-header text-center">
          <h1>EGGspenses</h1>
        </div>

        <main>
          <Summary/>
        </main>
      </div>
    );
  }
}

export default App;
