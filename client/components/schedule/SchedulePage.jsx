import React from 'react';

import Schedule from './Schedule.jsx';

class SchedulePage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Schedule history={this.props.history}/>
    );
  }
}
export default SchedulePage;
