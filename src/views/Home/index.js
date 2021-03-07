import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { searchUsers } from '../../api';
import InputAutoComplete from '../../components/InputAutoComplete';
import useDebouncedEffect from '../../hooks/useDebouncedEffect';
import './index.css';

export default function Home() {
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState([]);
  const history = useHistory();
  const location = useLocation();

  useDebouncedEffect(
    () => {
      if (search !== '')
        searchUsers(search).then((value) => setSearchList(value.items));
      else setSearchList([]);
    },
    500,
    [search]
  );

  useEffect(() => {
    if (location.state && location.state.finalDemo) {
      alert('Repositório estrelado com sucesso, obrigado por testar!');
      sessionStorage.clear();
      history.push('/');
    }
  }, [history, location.state, searchList]);

  const cleanupCredentials = () => {
    sessionStorage.clear();
  };

  const handleSubmit = (value) => {
    setSearch(value);
    history.push(`/${value.toLowerCase()}`);
  };

  return (
    <div className="container">
      <div />
      <div>
        <InputAutoComplete
          placeholder="Nome de Usuário"
          value={search}
          handleChange={(evt) => {
            setSearch(evt.target.value);
          }}
          style={{ margin: '0 auto' }}
          objArr={searchList}
          onSubmit={handleSubmit}
        />
        <div className="signout">
          <button className="signoutBtn" onClick={cleanupCredentials}>
            ou deslogue aqui de seu github
          </button>
        </div>
      </div>
    </div>
  );
}
