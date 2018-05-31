import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import reduxStore from './store/reduxStore';


import Main from './containers/Main.jsx'
import Example from './AnimationExample.jsx'

render(
  <Provider store={reduxStore}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('contents')
)
if (module.hot) {
  module.hot.accept();
}
