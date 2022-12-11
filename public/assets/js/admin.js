    const LOGIN_URL = '/login';
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
          })
          .catch(function (error) {
            console.log('error:::', JSON.stringify(error, null, 2));
          });
      }
    }


      const SIGNUP_URL = "/signup";
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
                window.location.replace("/admin/login.html");
              }
            })
            .catch(function (error) {
              console.log("error:::", JSON.stringify(error, null, 2));
            });
          /*  end of axios */
        }
      }
      /* end of signup() */


const orderList = document.querySelector('.my-order');
      function init() {
        getData()
      }
      init();

      function getData() {
        axios.get(`${BASE_URL}/myOrders`).then((res) => {
          renderData(res.data);
        });
      }

      function renderData(data) {
        let str="";
        data.forEach(item=>{
          str += `
          <div class="item">${item.id}</div>
          <div class="item">${item.number}</div>
          <div class="item">${item.seat}</div>
          <div class="item">${item.paid}</div>
          <div class="item">${item.price}</div>
          <div class="item">${item.date}</div>
          <div class="item">${item.time}</div>
          <div class="item">
            <button type="button" class="btn btn-danger" data-id="${item.id}">刪除</button>
          </div>
          `
        })
        orderList.innerHTML = str;
      }

      orderList.addEventListener('click', function(e){
        const id = e.target.getAttribute("data-id");
        if(id) {
          deleteOrder(id)
          return
        }
    })
  
        
    function deleteOrder(id) {
      Swal.fire({
        title: '確定要刪除?',
        icon: 'error',
        showCancelButton: true, 
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
          .delete(`${BASE_URL}/myOrders/${id}`)
          .then((res) => {
            Swal.fire(
              '你已經刪除!',
              'success'
            );
            getData();
          })
          .catch((error) => {
            console.log(error);
          });
        }
      })
    }
    