import './styles/global.css';
import {Router} from './Router';

import {Provider} from 'react-redux';
import {store} from 'src/shared/model';
import {useEffect} from 'react';

function App() {
  useEffect(() => {
    if (window.localStorage.getItem('version') !== import.meta.env.VITE_STORAGE_VERSION) {
      window.localStorage.clear();
      window.localStorage.setItem('version', import.meta.env.VITE_STORAGE_VERSION);
    }
  }, []);
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
