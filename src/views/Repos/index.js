import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import GithubApi from '../../api';
import List from '../../components/List';
import useFetchData from '../../hooks/useFetchData';
import { requestError } from '../../utils/functions';
import './index.css';

export default function Repos() {
  const params = useParams();
  const history = useHistory();
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState({
    login: '...',
    avatar_url: 'https://via.placeholder.com/120',
    bio: '',
    public_repos: 0,
    followers: 0,
  });

  // useful hook for fetching data in a component
  const [reposData, isErrorRepos] = useFetchData(
    GithubApi.getRepos,
    params.user,
    page
  );

  //fetch user
  const [userData, isErrorUser] = useFetchData(GithubApi.getUser, params.user);

  useEffect(() => {
    if (reposData) setRepos(repos.concat(reposData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reposData]);

  useEffect(() => {
    if (userData) setUser(userData);
  }, [userData]);

  useEffect(() => {
    if (isErrorRepos || isErrorUser) requestError('');
  }, [isErrorRepos, isErrorUser]);

  const verifyAuthUserForStar = useCallback(
    (item) => {
      function handleStarRepo(item) {
        item.request = 'loading';

        GithubApi.starRepo(item.owner.login, item.name)
          .then(() => {
            item.request = 'success';
            setRepos([...repos]);
          })
          .catch(requestError);
      }

      function handleUserNotAuth() {
        sessionStorage.setItem(
          'routeBeforeLogin',
          `${history.location.pathname}`
        );

        alert('Você ainda não está logado, redirecionando para github');

        window.location = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=http://localhost:3000/auth&scope=repo`;
      }

      const token = sessionStorage.getItem('githubtoken');

      if (token) handleStarRepo(item);
      else handleUserNotAuth();
    },
    [history, repos]
  );

  const addMoreToRepos = useCallback(() => {
    setPage(page + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    console.log({ repos, user, page, isErrorRepos, isErrorUser });
  });

  return (
    <div className="repos-container">
      <div className="repos-header">
        <div>
          <img src={user.avatar_url} height="120px" />
        </div>
        <div className="repos-header-middle">
          <h3>{user.login}</h3>
          <span>{user.bio}</span>
        </div>
        <div className="repos-header-right">
          <span>Repositórios públicos: {user.public_repos}</span>
          <span>Seguidores: {user.followers}</span>
        </div>
      </div>
      <List
        items={repos}
        onClick={verifyAuthUserForStar}
        endListCallback={addMoreToRepos}
      />
      <div className="repos-footer" onClick={() => history.replace('/')}>
        INICIO
      </div>
    </div>
  );
}
