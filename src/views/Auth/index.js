import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from '../../assets/loading.gif';
import { getToken } from '../../api';

export default function Auth() {
  const history = useHistory();

  useEffect(() => {
    const qs = window.location.search;
    const params = new URLSearchParams(qs);

    if (params.has('code')) {
      getToken(params.get('code'))
        .then(() => {
          const cache = `${sessionStorage.getItem('routeBeforeLogin')}`;
          sessionStorage.removeItem('routeBeforeLogin');
          history.replace(cache);
        })
        .catch(() => {
          alert(
            'Favor, permitir cors proxy em https://cors-anywhere.herokuapp.com'
          );
        });
    }
  }, [history]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <img height="128px" src={Loading} />
    </div>
  );
}
