const elem = document.querySelector('input[name="foo"]');
const datepicker = new Datepicker(elem, {
  format: "yyyy-mm-dd",
  buttonClass: 'btn',
  defaultViewDate: 'today',
  orientation: 'auto',
  todayBtn: true
});

//個人資料
const account = document.querySelector('input[type="email"]');
const userName = document.querySelector('#userName');
const phone = document.querySelector('input[type="number"]');
const date = document.querySelector('input[name="foo"]');
const userSubName = document.querySelector('#userSubName');
const profile = document.querySelector('#profile');
const profileImg = document.querySelector('.profileImg');

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
      profile: profileImg.src,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

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


profile.addEventListener('change', function(e){
  const file = e.target.files[0];

// ---
const image = (e) => {
  profileImg.src = e.target.result;
};
  const reader = new FileReader(); //建立FileReader
      reader.addEventListener("load", image); // 監聽load事件
      reader.readAsDataURL(file); //轉base64格式
      // ---
  // profileImg.src = URL.createObjectURL(file);
  // profileImg.onload = () => {
  //   URL.revokeObjectURL(profileImg.src);
  // }

  save.addEventListener('click', function(e){
        //  圖片儲存至server
        // const formData = new FormData();
        // formData.append("profile", file);
        axios.patch(`${BASE_URL}/setting/${userId}`, {
          profile: profileImg.src
        })
         .then((res) => {
           if(res.status === 201) {
             console.log(res.data)
           }
        })
        .catch(error => {
         console.log(error);
        })
  })
  

})

