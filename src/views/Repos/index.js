import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getRepos, getUser, starRepo } from '../../api';
import List from '../../components/List';
import './index.css';

export default function Repos() {
  const params = useParams();
  const history = useHistory();
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState({
    login: '...',
    avatar_url: 'https://via.placeholder.com/120',
    bio: '',
    public_repos: 0,
    followers: 0,
  });

  useEffect(() => {
    getUser(params.user).then((res) => {
      setUser(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getRepos(params.user).then((data) => {
      setRepos(data);
    });
  }, [params]);

  const handleClick = useCallback(
    (item) => {
      const token = sessionStorage.getItem('githubtoken');

      if (token) {
        item.request = 'loading';
        setRepos([...repos]);

        starRepo(item.owner.login, item.name).then(() => {
          item.request = 'success';
          item.starred = true;
          setRepos([...repos]);
        });
      } else {
        sessionStorage.setItem(
          'routeBeforeLogin',
          `${history.location.pathname}?id=${item.id}`
        );

        window.location = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=http://localhost:3000/auth&scope=repo`;
      }
    },
    [history, repos]
  );

  useEffect(() => {
    const qs = window.location.search;
    const params = new URLSearchParams(qs);

    if (params.has('id')) {
      const btnId = params.get('id');
      if (repos.length > 0) handleClick(repos.find((el) => el.id === +btnId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repos.length]);

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
      <List items={repos} onClick={handleClick} />
      <div className="repos-footer" onClick={() => history.replace('/')}>
        INICIO
      </div>
    </div>
  );
}
