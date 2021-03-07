import axios from 'axios';

const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 1000,
});

export async function searchUsers(name) {
  const res = await githubAPI.get('/search/users', {
    params: {
      q: name,
      per_page: 5,
    },
  });

  return res.data;
}

export async function getUser(user) {
  const res = await githubAPI.get(`/users/${user}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  return res.data;
}

export async function getRepos(user) {
  const res = await githubAPI.get(`/users/${user}/repos`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  return res.data;
}

//https://github.com/isaacs/github/issues/330
export async function getToken(code) {
  const res = await axios.post(
    'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token',
    {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SEC,
      code,
    },
    {
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );

  sessionStorage.setItem('githubtoken', res.data.access_token);
  return res.data;
}

export async function starRepo(owner, repo) {
  try {
    await githubAPI.put(
      `/user/starred/${owner}/${repo}`,
      {},
      {
        headers: {
          Authorization: `token ${sessionStorage.getItem('githubtoken')}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
}
