    
    const LOGIN_URL = 'https://json-server-vercel-moal5wmvq-seanhong1215.vercel.app/login';
    const btnLogin = document.querySelector('.js-btn-login');
    const formLogin = document.querySelector('.js-form-login');
    const loginPages = document.querySelector('.js-login-pages');
    

    function saveUserToLocal({ accessToken, user }) {
      localStorage.setItem('token', accessToken);
      localStorage.setItem('userId', user.id);
    }

    function login() {
      const url = `${LOGIN_URL}`;
      const data = {
        email: formLogin.email.value.trim(),
        password: formLogin.password.value.trim(),
        role: "user"
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
                timer: 2000
              });
              window.location.replace('/admin/index.html');
            } else if(response.status === 200 && role === "user") {
              saveUserToLocal(response.data);
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '登入成功',
                showConfirmButton: false,
                timer: 2000
              });
              window.location.replace('/');
            }
          })
          .catch(function (error) {
            console.log('error:::', JSON.stringify(error, null, 2));
          });
      }
    }


      const SIGNUP_URL = "https://json-server-vercel-moal5wmvq-seanhong1215.vercel.app/signup";
      const domMsg = document.querySelector(".js-msg");
      const btnSignup = document.querySelector(".js-btn-signup");
      const formSignup = document.querySelector(".js-form-signup");

      function saveUserToLocal({ accessToken, user }) {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("userId", user.id);
      }

      function signup() {
        const url = `${SIGNUP_URL}`;
        const data = {
          email: formSignup.email.value.trim(),
          password: formSignup.password.value.trim(),
          role: 'user'
        };

        const hasInput = data.email && data.password;
        if (hasInput) {
          return axios
            .post(url, data)
            .then(function (response) {
              console.log("signup:::", JSON.stringify(response, null, 2));
              if (response.status === 201) {
                saveUserToLocal(response.data);
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: '註冊成功',
                  showConfirmButton: false,
                  timer: 1500
                });
                window.location.replace("/login.html");
              }
            })
            .catch(function (error) {
              console.log("error:::", JSON.stringify(error, null, 2));
            });
          /*  end of axios */
        }
      }
      /* end of signup() */

      