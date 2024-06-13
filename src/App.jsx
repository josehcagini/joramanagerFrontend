import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import store, { persistor } from './store';
import history from './services/history';

import MyLayout from './components/MyLayout';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <MyLayout />
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
