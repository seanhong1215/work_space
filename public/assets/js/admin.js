  // const BASE_URL = 'http://localhost:3000';
    // const LOGIN_URL = `${BASE_URL}/login`;
    const LOGIN_URL = '/login';
    const btnLogin = document.querySelector('.js-btn-login');
    const form = document.querySelector('.js-form-login');
    const loginPages = document.querySelector('.js-login-pages');
    
    /* end of definition */

    function saveUserToLocal({ accessToken, user }) {
      localStorage.setItem('token', accessToken);
      localStorage.setItem('userId', user.id);
    }
    /* end of saveUserToLocal() */

    /**
     * #Step-1: `POST` data to API
     */
    function login() {
      console.log('Login!');
      const url = `${LOGIN_URL}`;
      // const data = {
      //   email: 'dev@admin.me',
      //   password: '12345678',
      // };
      const data = {
        email: form.email.value.trim(),
        password: form.password.value.trim(),
      };

      const hasInput = data.email && data.password;
      if (hasInput) {
        return axios
          .post(url, data)
          .then(function (response) {
            console.log('login:::', JSON.stringify(response, null, 2));
            const role = response.data.user.role
            if (response.status === 200 && role === "admin") {
              saveUserToLocal(response.data);
              window.location.replace('/admin');
            } else if(response.status === 200 && role === "user") {
              saveUserToLocal(response.data);
              loginPages.innerHTML = "登出"
              window.location.replace('/');
            }
            /* end of response.OK */
          })
          .catch(function (error) {
            console.log('error:::', JSON.stringify(error, null, 2));
          });
        /*  end of axios */
      }
    }
    /* end of login() */

    /**
     * #Step-0: after page refresh
     */
   