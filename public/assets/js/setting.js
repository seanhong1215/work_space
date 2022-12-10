const elem = document.querySelector('input[name="foo"]');
const datepicker = new Datepicker(elem, {
  format: "yyyy-mm-dd",
});

//個人資料
const account = document.querySelector('input[type="email"]');
const userName = document.querySelector('input[type="text"]');
const phone = document.querySelector('input[type="number"]');
const date = document.querySelector('input[name="foo"]');
const save = document.querySelector('.save');


function init(){
    getData(userId);
}
init();

save.addEventListener('click', function(){
  axios.patch(`${BASE_URL}/settings/${userId}`, {
      "email": account.value,
      "name": userName.value,
      "phone": phone.value,
      "birthday": date.value,
})
  .then(function (response) {
      console.log(response.data);
    })
    .catch(function(error){
      console.log(error)
    })
})

function getData(id) {
  axios.get(`${BASE_URL}/settings/${id}`)
    .then(function (response){
        console.log(response.data)
      const data = response.data;
        account.value = data.email;
        userName.value = data.name;
        phone.value = data.phone;
        date.value = data.birthday;
    })
    .catch(function(error){
      console.log(error)
    })
}

// axios.get(`${BASE_URL}/settings/${id}?_expand=user`)
