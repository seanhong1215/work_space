    
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
                icon: 'success',
                title: '登入成功',
                timer: 3000
              });
              window.location.replace('./admin/index.html');
            } else if(response.status === 200 && role === "user") {
              saveUserToLocal(response.data);
              Swal.fire({
                icon: 'success',
                title: '登入成功',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.replace('./index.html');
                }
              });
            }
          })
          .catch(function (error) {
            console.log('error:::', JSON.stringify(error, null, 2));
          });
      }
    }

      const SIGNUP_URL = "https://json-server-vercel-moal5wmvq-seanhong1215.vercel.app/signup";
      const btnSignup = document.querySelector(".js-btn-signup");
      const formSignup = document.querySelector(".js-form-signup");


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
                  icon: 'success',
                  title: '註冊成功',
                  confirmButtonText: 'OK',
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.replace("./login.html");
                  }
                });
              }
            })
            .catch(function (error) {
              console.log("error:::", JSON.stringify(error, null, 2));
            });
          /*  end of axios */
        }
      }

      const constraints = {
        信箱: {
          presence: {
            message: "必填欄位"
          },
          format: {
            pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
            message: "格式輸入錯誤，需有@ 、.等符號"
          }
        },
        密碼: {
          presence: {
            message: "必填欄位"
          },
          length: {
            minimum: 6,
            message: "需超過 6 位數"
          }
        },
        確認密碼: {
          presence: {
            message: "請檢查您的密碼輸入是否正確"
          },
          length: {
            minimum: 6,
            message: "需超過 6 位數"
          }
        },
      };

      // const inputs = document.querySelectorAll("input[name]");

      // inputs.forEach((item) => {
      //   item.addEventListener("change", function () {
      //     item.nextElementSibling.innerHTML = "";
      //     let errors = validate(formLogin, constraints) || validate(formSignup, constraints) || "";
      //     if (errors) {
      //       Object.keys(errors).forEach(function (keys) {
      //         // console.log(document.querySelector(`[data-message=${keys}]`))
      //         document.querySelector(`[data-message="${keys}"]`).innerHTML =
      //           errors[keys];
      //       });
      //     }
      //   });
      // });