import React, { Component } from 'react';

class Chart extends Component {
  render() {
    const style = { height: '400px' };

    return (
      <div id={ this.props.chart_id } style={ style }>
      </div>
    );
  }
}

export default Chart;
