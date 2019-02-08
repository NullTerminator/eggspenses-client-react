import React, { Component } from 'react';

class WidgetRow extends Component {

  render() {
    return (
      <div className="row">
        { this.props.children }
      </div>
    );
  }

}

export default WidgetRow;
