const BASE_URL = "http://localhost:3002";
// const url = `${BASE_URL}/space`;

// const spaceTest = document.querySelector(".spaceTest");
// let data = [];
// axios.get(url).then(function (response) {
//   console.log(response.data);
//   data = response.data;
//   renderData(data);
// });

// function renderData() {
//   let str = "";
//   data.forEach((item) => {
//     str += `
//     <div class="card col-6">
//     <img
//       src="${item.images}"
//       class="card-img-top"
//       alt="生活閱讀"
//     />
//     <div class="card-wrap">
//       <h3 class="card-body text-center">${item.title}</h3>
//       <p class="card-txt">
//       ${item.body}
//       </p>
//       <button class="more_btn">了解更多</button>
//     </div>
//   </div>
//     `;
//     console.log(item);
//   });
//   spaceTest.innerHTML = str;
// }

const elem = document.querySelector('input[name="foo"]');
const datepicker = new Datepicker(elem, {
  format: "yyyy-mm-dd",
});

// const add = document.querySelector(".add");
// const remove = document.querySelector(".remove");
// let num = document.querySelector(".num");
// add.addEventListener("click", function (e) {
//   e.preventDefault();
//   num++;
// });
// remove.addEventListener("click", function (e) {
//   e.preventDefault();
//   num--;
// });


//個人資料

const account = document.querySelector('input[type="email"]');
const userName = document.querySelector('input[type="text"]');
const phone = document.querySelector('input[type="number"]');
const date = document.querySelector('input[name="foo"]');
const save = document.querySelector('.save');

// const token = localStorage.getItem('token');

let id ='';
console.log(id)

save.addEventListener('click', function(e){
  axios.post(`${BASE_URL}/settings`, {
    data: {
      "email": account.value,
      "name": userName.value,
      "phone": phone.value,
      "birthday": date.value,
    },
    headers: {
      "Authorization": `Bearer ${token}`
    }
})
  .then(function (response) {
      console.log(response.data);
      // id = response.data.id;
      // render(id)
    })
    .catch(function(error){
      console.log(error)
    })
})


function render(id) {
  id = 4;
  axios.get(`${BASE_URL}/settings/${id}`)
    .then(function (response){
      // id = response.data.id;
      // console.log(id)
      // console.log(response.data.data);
      const data = response.data.data
      
        account.value = data.email;
        userName.value = data.name;
        phone.value = data.phone;
        date.value = data.birthday;
      
     
    })
    .catch(function(error){
      console.log(error)
    })
}

render();