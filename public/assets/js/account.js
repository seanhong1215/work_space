const loginPages = document.querySelector('.js-login-pages');
const member = document.querySelector('#members');

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

function init () {
  if(token) {
    loginPages.innerHTML = '登出';
    member.style.display = 'block';
  }
  loginPages.addEventListener('click', function(e){
    e.preventDefault();
    if(e.target.innerHTML === '登出'){
      localStorage.clear();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '登出成功',
        showConfirmButton: false,
        timer: 1500
      });
      window.location.replace('/');
    }else {
      window.location.replace('../../admin/login.html');
    }
  })
}
init();
