  // const BASE_URL = 'http://localhost:3000';
    // const LOGIN_URL = `${BASE_URL}/login`;
    const LOGIN_URL = '/login';
    const btnLogin = document.querySelector('.js-btn-login');
    const formLogin = document.querySelector('.js-form-login');
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
      const data = {
        email: formLogin.email.value.trim(),
        password: formLogin.password.value.trim(),
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
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '登入成功',
                showConfirmButton: false,
                timer: 1500
              });
              window.location.replace('/admin');
            } else if(response.status === 200 && role === "user") {
              saveUserToLocal(response.data);
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '登入成功',
                showConfirmButton: false,
                timer: 1500
              });
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


     // const BASE_URL = 'http://localhost:3000';
      // const BASE_SIGNUP_URL = `${BASE_URL}/signup`;
      const SIGNUP_URL = "/signup";

      const domMsg = document.querySelector(".js-msg");
      const btnSignup = document.querySelector(".js-btn-signup");
      const formSignup = document.querySelector(".js-form-signup");
      /* end of definition */

      function saveUserToLocal({ accessToken, user }) {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("userId", user.id);
      }
      /* end of saveUserToLocal() */


      function signup() {
        console.log("Signup!");
        const url = `${SIGNUP_URL}`;

        const data = {
          email: formSignup.email.value.trim(),
          password: formSignup.password.value.trim(),
        };

        const hasInput = data.email && data.password;
        if (hasInput) {
          return axios
            .post(url, data)
            .then(function (response) {
              console.log("signup:::", JSON.stringify(response, null, 2));

              domMsg.innerHTML = response.statusText;

              if (response.status === 201) {
                saveUserToLocal(response.data);
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: '註冊成功',
                  showConfirmButton: false,
                  timer: 1500
                });
                window.location.replace("/admin/login.html");
              }
            })
            .catch(function (error) {
              console.log("error:::", JSON.stringify(error, null, 2));

              domMsg.innerHTML = error?.response?.data || error;
            });
          /*  end of axios */
        }
      }
      /* end of signup() */
