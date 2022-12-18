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

let data = [];
save.addEventListener("click", function (e) {
  e.preventDefault();
  data.push({
    email: account.value,
    userName: userName.value,
    phone: phone.value,
    birthday: date.value,
    userSubName: userSubName.value,
    profile: profileImg.src,
    password: userPassword.value,
    id: Number(userId),
  });
  console.log(data);
  data.forEach((item) => {
    console.log(item);
    console.log(userId, item.id);
    if (item.id == userId) {
      axios
        .patch(`${BASE_URL}/users/${userId}?_embed=settings`, item)
        .then(function (response) {
          console.log(response.data);
          Swal.fire({
            icon: "success",
            title: "儲存成功",
            time: 3000,
          });
          getData();
        })
        .catch(function (error) {
          console.log(error);
        });
      return;
    }
  });
});

function getData(id) {
  axios
    .get(`${BASE_URL}/users/${id}`)
    .then(function (response) {
      const data = response.data;
      if (data.userName == undefined) {
        account.value = data.email;
      } else {
        account.value = data.email;
        userName.value = data.userName;
        phone.value = data.phone;
        userSubName.value = data.userSubName;
        profileImg.src = data.profile;
        date.value = data.birthday;
      }
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
      const baseImage = profileImg.src;
      const imageString = window.atob(baseImage);
      console.log(imageString);
    };
    reader.readAsDataURL(input.files[0]); // 讀取檔案
    console.log(input.files[0])
  }
}
