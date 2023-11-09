import React from 'react';
import ReactDOM from 'react-dom';
import { DostawcaZakupow } from './App';
import ListaZakupow from './App2';

const Aplikacja: React.FC = () => {
  return (
    <DostawcaZakupow>
      <h1>Aplikacja Lista Zakupów</h1>
      <ListaZakupow />
    </DostawcaZakupow>
  );
};

ReactDOM.render(<Aplikacja />, document.getElementById('root'));
