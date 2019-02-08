import React, { Component } from 'react';

class StatWidget extends Component {

  render() {
    return (
      <div className="col-md-6">
        <h3 className="text-center">{ this.props.stat_title }</h3>
        <div className="well">
          { this.props.children }
        </div>
      </div>
    );
  }

}

export default StatWidget;
