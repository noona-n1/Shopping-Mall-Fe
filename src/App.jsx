import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import AppLayout from './Layout/AppLayout';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
