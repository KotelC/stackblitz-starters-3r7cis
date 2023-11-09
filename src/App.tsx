import React, { createContext, useContext, useReducer, useEffect } from 'react';

type PrzedmiotZakupowy = {
  id: number;
  nazwa: string;
  kategoria: string;
};

type StanZakupow = {
  listaZakupow: PrzedmiotZakupowy[];
};

type AkcjaZakupow =
  | { typ: 'DODAJ_PRZEDMIOT'; payload: PrzedmiotZakupowy }
  | { typ: 'USUN_PRZEDMIOT'; payload: number }
  | { typ: 'EDYTUJ_PRZEDMIOT'; payload: { id: number; nowaNazwa: string } };

const poczatkowyStan: StanZakupow = {
  listaZakupow: [],
};

const KontekstZakupow = createContext<
  | {
      stan: StanZakupow;
      dyspozytor: React.Dispatch<AkcjaZakupow>;
    }
  | undefined
>(undefined);

const reducerZakupow = (
  stan: StanZakupow,
  akcja: AkcjaZakupow
): StanZakupow => {
  switch (akcja.typ) {
    case 'DODAJ_PRZEDMIOT':
      return { listaZakupow: [...stan.listaZakupow, akcja.payload] };
    case 'USUN_PRZEDMIOT':
      return {
        listaZakupow: stan.listaZakupow.filter(
          (przedmiot) => przedmiot.id !== akcja.payload
        ),
      };
    case 'EDYTUJ_PRZEDMIOT':
      return {
        listaZakupow: stan.listaZakupow.map((przedmiot) =>
          przedmiot.id === akcja.payload.id
            ? { ...przedmiot, nazwa: akcja.payload.nowaNazwa }
            : przedmiot
        ),
      };
    default:
      return stan;
  }
};

const DostawcaZakupow: React.FC = ({ children }) => {
  const [stan, dyspozytor] = useReducer(reducerZakupow, poczatkowyStan);

  useEffect(() => {
    const zapisanaListaZakupow = localStorage.getItem('listaZakupow');
    if (zapisanaListaZakupow) {
      dyspozytor({
        typ: 'USTAW_LISTE',
        payload: JSON.parse(zapisanaListaZakupow),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('listaZakupow', JSON.stringify(stan.listaZakupow));
  }, [stan.listaZakupow]);

  return (
    <KontekstZakupow.Provider value={{ stan, dyspozytor }}>
      {children}
    </KontekstZakupow.Provider>
  );
};

const uzyjZakupow = () => {
  const kontekst = useContext(KontekstZakupow);
  if (!kontekst) {
    throw new Error('uzyjZakupow musi być używane w ramach DostawcyZakupow');
  }
  return kontekst;
};

export { DostawcaZakupow, uzyjZakupow };
