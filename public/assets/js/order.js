const elem = document.querySelector('input[name="foo"]');
const datepicker = new Datepicker(elem, {
  format: "yyyy-mm-dd",
});

// 新增資料DOM
const time = document.querySelector("#time");
const add = document.querySelector(".add");
const remove = document.querySelector(".remove");
const counterNumberDisplay = document.querySelector("[data-key='num']");
const myOrder = document.querySelector(".myOrder");
const seat = document.querySelector("#seat");
const paid = document.querySelector("#paid");
const price = document.querySelector("#price");
const btn = document.querySelector(".js-btn");


function init() {
  axios.get(`${BASE_URL}/orders`).then((res) => {
    renderData(res.data);
  });
  axios.get(`${BASE_URL}/products`).then((res) => {
    renderProduct(res.data);
  });
}
init();

// 預約數量加減
let counterNumber = 0;
let counterMultiplier = 1;

add.addEventListener("click", function () {
  counterNumber += 1 * counterMultiplier;
  renderCounter(counterNumber);
});
remove.addEventListener("click", function () {
  counterNumber -= 1 * counterMultiplier;
  renderCounter(counterNumber);
});

function renderCounter(renderValue) {
  counterNumberDisplay.value = renderValue;
}


function renderData(data) {
  let str = "";
  data.forEach((date) => {
    date.AppointmentTime.forEach((item) => {
      str += `
        <option value="${item}">${item}</option>
        `;
    });
  });
  time.innerHTML = str;
}
function renderProduct(data) {
  let str = "";
  data.forEach((item) => {
    str += `
    <div class="col-sm-12 col-md-6 col-lg-4">
    <div class="item">
      <img class="img" src="${item.images}" alt="">
      <div class="card-body text-center">
        <h5 class="card-title">${item.price}</h5>
        <small class="subTitle">${item.title}</small>
        <p class="card-text">${item.body}</p>
      </div>
    </div>
  </div>
    `;
  });
  myOrder.innerHTML = str;
}

let data = [];
let imgSrc = "";
btn.addEventListener("click", addData);
price.addEventListener('change', function(e){
  if(e.target.value === "體驗方案") {
    imgSrc = "https://seanhong1215.github.io/workspace/images/card_01.png"
  } else if (e.target.value === "一般方案") {
    imgSrc = "https://seanhong1215.github.io/workspace/images/card_02.png"
  } else {
    imgSrc = "https://seanhong1215.github.io/workspace/images/card_04.png"
  }
})


function addData() {
  const form = document.querySelector(".formControls");
  data.push({
    userId: userId,
    time: time.value,
    seat: seat.value,
    paid: paid.value,
    date: date.value,
    number: counterNumberDisplay.value,
    price: price.value,
    images: imgSrc,
  });

  form.reset();
  getData(data);
}

function getData(data) {
  data.forEach((item) => {
    axios
      .post(`${BASE_URL}/myOrders`, item)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "你已經預約成功，請到會員專區查看",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

