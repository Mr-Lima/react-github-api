import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import GithubApi from '../../api';
import InputAutoComplete from '../../components/InputAutoComplete';
import useDebouncedEffect from '../../hooks/useDebouncedEffect';
import { requestError } from '../../utils/functions';
import './index.css';

export default function Home() {
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState([]);
  const history = useHistory();

  /**
   * get the value in input and request from api
   * a list of users
   */
  function listUsers() {
    if (search !== '')
      GithubApi.searchUsers(search)
        .then((value) => setSearchList(value.items))
        .catch(requestError);
    else setSearchList([]);
  }

  // if after 500ms search dont change it will call {listUsers}
  useDebouncedEffect(listUsers, 500, [search]);

  // useEffect(() => {
  //   if (location.state && location.state.finalDemo) {
  //     alert('Repositório estrelado com sucesso, obrigado por testar!');
  //     sessionStorage.clear();
  //     history.push('/');
  //   }
  // }, [history, location.state, searchList]);

  /**
   * erase all cache of user's info
   */
  function cleanupCredentials() {
    sessionStorage.clear();
    alert('deslogado');
  }

  /**
   * change the input value with de selectede user in the list and
   * send to the repos page
   */
  function selectUser(value) {
    setSearch(value);
    history.push(`/${value.toLowerCase()}`);
  }

  return (
    <div className="container">
      <div />
      <div>
        <InputAutoComplete
          placeholder="Nome de Usuário"
          value={search}
          onChange={(evt) => {
            setSearch(evt.target.value);
          }}
          style={{ margin: '0 auto' }}
          objArr={searchList}
          onSubmit={selectUser}
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
