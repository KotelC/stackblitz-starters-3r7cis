import React, { useState } from 'react';
import { uzyjZakupow } from './App';
import './style.css';

const ListaZakupow: React.FC = () => {
  const { stan, dyspozytor } = uzyjZakupow();
  const [nowyPrzedmiotNazwa, ustawNowyPrzedmiotNazwa] = useState('');
  const [nowyPrzedmiotKategoria, ustawNowyPrzedmiotKategoria] =
    useState('Nieokreślona');

  const dodajPrzedmiot = () => {
    if (nowyPrzedmiotNazwa.trim() !== '') {
      dyspozytor({
        typ: 'DODAJ_PRZEDMIOT',
        payload: {
          id: Date.now(),
          nazwa: nowyPrzedmiotNazwa,
          kategoria: nowyPrzedmiotKategoria,
        },
      });
      ustawNowyPrzedmiotNazwa('');
      ustawNowyPrzedmiotKategoria('Nieokreślona');
    }
  };

  const usunPrzedmiot = (id: number) => {
    dyspozytor({ typ: 'USUN_PRZEDMIOT', payload: id });
  };

  const edytujPrzedmiot = (id: number, nowaNazwa: string) => {
    dyspozytor({ typ: 'EDYTUJ_PRZEDMIOT', payload: { id, nowaNazwa } });
  };

  return (
    <div className="lista-zakupow">
      <ul>
        {stan.listaZakupow.map((przedmiot) => (
          <li key={przedmiot.id}>
            <span
              onClick={() => {
                const nowaNazwa = prompt(
                  'Wprowadź nową nazwę:',
                  przedmiot.nazwa
                );
                if (nowaNazwa !== null) {
                  edytujPrzedmiot(przedmiot.id, nowaNazwa);
                }
              }}
            >
              {przedmiot.nazwa} - {przedmiot.kategoria}
            </span>
            <button onClick={() => usunPrzedmiot(przedmiot.id)}>Usuń</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Nazwa Przedmiotu"
          value={nowyPrzedmiotNazwa}
          onChange={(e) => ustawNowyPrzedmiotNazwa(e.target.value)}
        />
        <select
          value={nowyPrzedmiotKategoria}
          onChange={(e) => ustawNowyPrzedmiotKategoria(e.target.value)}
        >
          <option value="Nieokreślona">Nieokreślona</option>
          <option value="Spożywcze">Spożywcze</option>
          <option value="Picie">Picie</option>
          <option value="Pieczywo">Pieczywo</option>
        </select>
        <button onClick={dodajPrzedmiot}>Dodaj</button>
      </div>
    </div>
  );
};

export default ListaZakupow;
