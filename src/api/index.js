import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 1000,
  // headers: {
  //   Authorization: 'Bearer bb8cd3ef1dfb05aa6cd267338083732719cf53ac',
  // },
});

// composition over inheritance https://en.wikipedia.org/wiki/Composition_over_inheritance
function GithubApi() {
  return {
    async searchUsers(name) {
      const res = await axiosInstance.get('/search/users', {
        params: {
          q: name,
          per_page: 5,
        },
      });

      return res.data;
    },

    async getUser(user) {
      const res = await axiosInstance.get(`/users/${user}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });

      return res.data;
    },

    async getRepos(user, page = 0) {
      const res = await axiosInstance.get(`/users/${user}/repos`, {
        params: {
          page,
          per_page: 25,
        },
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });

      return res.data;
    },

    //https://github.com/isaacs/github/issues/330
    async getToken(code) {
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
    },

    async starRepo(owner, repo) {
      axiosInstance.put(
        `/user/starred/${owner}/${repo}`,
        {},
        {
          headers: {
            Authorization: `token ${sessionStorage.getItem('githubtoken')}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );
    },
  };
}

export default GithubApi();
