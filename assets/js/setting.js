const elem = document.querySelector('input[name="foo"]');
const datepicker = new Datepicker(elem, {
  format: "yyyy-mm-dd",
  buttonClass: "btn",
  defaultViewDate: "today",
  orientation: "auto",
  todayBtn: true,
});

//個人資料
const account = document.querySelector('input[type="email"]');
const userName = document.querySelector("#userName");
const phone = document.querySelector('input[type="number"]');
const date = document.querySelector('input[name="foo"]');
const userSubName = document.querySelector("#userSubName");
const profile = document.querySelector("#profile");
const profileImg = document.querySelector(".profileImg");
const userPassword = document.querySelector('input[type="password"]');
const save = document.querySelector(".save");

function init() {
  getData(userId);
}
init();

save.addEventListener("click", function () {
  axios
    .patch(`${BASE_URL}/settings/${userId}`, {
      email: account.value,
      userName: userName.value,
      phone: phone.value,
      birthday: date.value,
      userSubName: userSubName.value,
    })
    .then(function (response) {
      Swal.fire({
        icon: "success",
        title: "儲存成功",
        time: 3000
      })
      updatePassword()
    })
    .catch(function (error) {
      console.log(error);
    });
});

function updatePassword(){
  axios.patch(`${BASE_URL}/users/${userId}`, {
    password: userPassword.value
  })
  .then(function(res){
    console.log(res.data)
  })
  .catcg(function(err){
    console.log(err)
  })
}


function getData(id) {
  axios
    .get(`${BASE_URL}/settings/${id}`)
    .then(function (response) {
      const data = response.data;
      account.value = data.email;
      userName.value = data.userName;
      phone.value = data.phone;
      userSubName.value = data.userSubName;
      profileImg.src = data.profile;
      date.value = data.birthday;
    })
    .catch(function (error) {
      console.log(error);
    });
}



profile.addEventListener("change", handlerFile);
function handlerFile(e) {
  readUrl(e.target); // this
}
function readUrl(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImg.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]); // 讀取檔案
  }
}

