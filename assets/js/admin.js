const LOGIN_URL = `${BASE_URL}/login`;
const SIGNUP_URL = `${BASE_URL}/signup`;

// Login
const btnLogin = document.querySelector(".js-btn-login");
const formLogin = document.querySelector(".js-form-login");

//Signup
const btnSignup = document.querySelector(".js-btn-signup");
const formSignup = document.querySelector(".js-form-signup");

const loginPages = document.querySelector(".js-login-pages");

function saveUserToLocal({ accessToken, user }) {
  localStorage.setItem("token", accessToken);
  localStorage.setItem("userId", user.id);
}





function login() {
  const url = `${LOGIN_URL}`;
  const data = {
    email: formLogin.email.value.trim(),
    password: formLogin.password.value.trim(),
    role: "user",
  };

  const hasInput = data.email && data.password;
  if (hasInput) {
    return axios
      .post(url, data)
      .then(function (response) {
        // console.log("login:::", JSON.stringify(response, null, 2));
        const role = response.data.user.role;
        if (response.status === 200 && role === "admin") {
          saveUserToLocal(response.data);
          Swal.fire({
            icon: "success",
            title: "登入成功",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.replace("./admin/index.html");
            }
          });
        } else if (response.status === 200 && role === "user") {
          saveUserToLocal(response.data);
          Swal.fire({
            icon: "success",
            title: "登入成功",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.replace("./index.html");
            }
          });
        }
      })
      .catch(function (error) {
        // console.log("error:::", JSON.stringify(error, null, 2));
        Swal.fire({
          icon: "error",
          title: "此帳號不存在或帳號密碼錯誤",
        });
      });
  } else {
    Swal.fire({
      icon: "error",
      title: "此帳號不存在或帳號密碼錯誤",
    });
  }
  formLogin.reset();
}

function signup() {
  const url = `${SIGNUP_URL}`;
  const data = {
    email: formSignup.email.value.trim(),
    password: formSignup.password.value.trim(),
    role: "user",
  };
  const hasInput = data.email && data.password;
  if (hasInput) {
    return axios
      .post(url, data)
      .then(function (response) {
        // console.log("signup:::", JSON.stringify(response, null, 2));
        if (response.status === 201) {
          saveUserToLocal(response.data);
          Swal.fire({
            icon: "success",
            title: "註冊成功",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.replace("./login.html");
            }
          });
        }
      })
      .catch(function (error) {
        // console.log("error:::", JSON.stringify(error, null, 2));
        Swal.fire({
          title: "帳號註冊失敗！",
          icon: "error",
        });
      });
    /*  end of axios */
  } else {
    Swal.fire({
      title: "帳號註冊失敗！",
      icon: "error",
    });
  }
  formSignup.reset();
}

const constraints = {
  信箱: {
    presence: {
      message: "必填欄位",
    },
    format: {
      pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      message: "格式輸入錯誤，需有@ 、.等符號",
    },
  },
  密碼: {
    presence: {
      message: "必填欄位",
    },
  },
};

const inputs = document.querySelectorAll("input[name]");

inputs.forEach((item) => {
  item.addEventListener("change", function () {
    item.nextElementSibling.textContent = "";
    let errors = validate(formLogin, constraints) || "";
    if (errors) {
      Object.keys(errors).forEach(function (keys) {
        // console.log(document.querySelector(`[data-message=${keys}]`))
        document.querySelector(`[data-message="${keys}"]`).textContent =
          errors[keys];
      });
    }
  });
});
