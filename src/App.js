import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Body from './components/Body';
import { store, persistor } from './utils/appStore'; // Adjust the import path

/**
 * The main application component.
 * @component
 * @returns {JSX.Element} The JSX representation of the App component.
 */
function App() {
  /**
   * Renders the App component with Redux Provider and PersistGate for state management.
   * @returns {JSX.Element} The JSX representation of the rendered component.
   */
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Body />      
      </PersistGate>
    </Provider>
  );
}

export default App;
