const elem = document.querySelector('input[name="foo"]');
const datepicker = new Datepicker(elem, {
  format: "yyyy-mm-dd",
});

const add = document.querySelector(".add");
const remove = document.querySelector(".remove");
const counterNumberDisplay = document.querySelector("[data-key='num']");

let counterNumber = 0;
let counterMultiplier = 1;

add.addEventListener("click", function (e) {
  counterNumber += 1 * counterMultiplier;
  renderCounter(counterNumber);
});
remove.addEventListener("click", function (e) {
  counterNumber -= 1 * counterMultiplier;
  renderCounter(counterNumber);
});

function renderCounter(renderValue) {
  counterNumberDisplay.value = renderValue;
}

const imgSrc = document.querySelector(".img").src;
const time = document.querySelector("#time");
const seat = document.querySelector("#seat");
const paid = document.querySelector("#paid");
const price = document.querySelector("#price");
const btn = document.querySelector(".js-btn");

function init() {
  axios.get(`${BASE_URL}/orders`).then((res) => {
    renderData(res.data);
  });
}
init();

function renderData(data) {
  let str = "";
  data.forEach((date) => {
    date.AppointmentTime.forEach((item) => {
      str += `<option value="${item}">${item}</option>`;
    });
  });
  time.innerHTML = str;
}

let data = [];
btn.addEventListener("click", addData);

function addData() {
  const form = document.querySelector(".formControls");
  data.push({
    id: Date.now(),
    time: time.value,
    seat: seat.value,
    paid: paid.value,
    date: date.value,
    number: counterNumberDisplay.value,
    price: price.value,
    images: imgSrc,
  });
  form.reset();
  //   console.log(data)
  getData(data);
}

function getData(data) {
  data.forEach((item) => {
    axios
      .post(`${BASE_URL}/myOrders`, item)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '你已經預約成功，請到會員專區查看',
            showConfirmButton: false,
            timer: 3000
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

//   function renderAddData(data) {
//     const list = document.querySelector('.list')
//     let str = "";
//    data.forEach(item=>{
//     str +=`
//     <li>以下為您的預約資訊:</li>
//     <li>預計日期：${item.date}</li>
//     <li>預計時間：${item.time}</li>
//     <li>人數：${item.number}</li>
//     <li>座席：${item.seat}</li>
//     <li>消費方式：${item.paid}</li>
//     `
//    })
//    list.innerHTML = str;
//   }
