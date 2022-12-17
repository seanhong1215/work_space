const date = document.querySelector('#editDate');
const datepicker = new Datepicker(date, {
  format: "yyyy-mm-dd",
  buttonClass: 'btn',
  defaultViewDate: 'today',
  orientation: 'auto',
  todayBtn: true
});

const orderList = document.querySelector(".order_list");
const cancelBtn = document.querySelector(".btn-danger");
const editBtn = document.querySelector(".btn-primary");
const add = document.querySelector(".add");
const remove = document.querySelector(".remove");
const counterNumberDisplay = document.querySelector("[data-key='num']");
const time = document.querySelector("#time");
const seat = document.querySelector("#seat");
const paid = document.querySelector("#paid");
const price = document.querySelector("#price");
const editConfirm = document.querySelector("[data-confirm='editBtn']");


function init() {
    getData();
}
init();

function getData() {
  axios
    .get(`${BASE_URL}/myOrders/?userId=${userId}`)
    .then((res) => {
      renderData(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderData(data) {
  let str = "";
  data.forEach(item => {
    str += `
  <div class="order_list" data-aos="zoom-in">
    <div class="row">
        <div class="col-12 col-md-12 col-lg-4">
          <img src="${item.images}" alt="">
        </div>
        <div class="col-12 col-md-12 col-lg-4">
          <ul class="list">
            <li>預計日期：${item.date}</li>
            <li>預計時間：${item.time}</li>
            <li>人數：${item.number}</li>
            <li>座席：${item.seat}</li>
            <li>消費方式：${item.paid}</li>
            <li>價格方案：${item.price}</li>
          </ul>
        </div>
        <div class="col-12 col-md-12 col-lg-4 js-btn">
          <button type="button" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal" class="btn btn-primary me-3" data-edit="${item.id}">編輯</button>
          <button type="button" class="btn btn-danger" data-cancel="${item.id}">取消</button>
        </div>
    </div>
  </div>
`
});
orderList.innerHTML = str;

if(orderList.innerHTML === ""){
  orderList.innerHTML = `<p class="text-center">你還沒有任何訂單，快到預約專區選購吧!!</p>`;
  return
}
}

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

orderList.addEventListener("click", function (e) {
  const editId = e.target.getAttribute("data-edit");
  const id = e.target.getAttribute("data-cancel");
  if (id) {
    cancelOrder(id);
    return
  } else if(editId){
    editOrder(editId);
    return
  }
});

function cancelOrder(id) {
  console.log(id)
  Swal.fire({
    title: '確定要取消預約?',
    icon: 'warning',
    showCancelButton: true, 
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '確定',
    cancelButtonText: '取消',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '你已經取消!',
        'success'
      );
      axios
      .delete(`${BASE_URL}/myOrders/${id}`)
      .then((res) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  })
}

function editOrder(id) {
  console.log(id)
  getEditData(id)
}
function getEditData (id) {
  axios
  .get(`${BASE_URL}/myOrders/${id}`)
  .then((res) => {
    let data = res.data;
    time.value = data.time;
    seat.value = data.seat;
    paid.value = data.paid;
    date.value = data.date;
    counterNumberDisplay.value = data.number;
    price.value = data.price;
  })
  .catch((error) => {
    console.log(error);
  });
  updateOrder(id);
}

function updateOrder(id) {
  editConfirm.addEventListener('click', function(e){
    axios
    .patch(`${BASE_URL}/myOrders/${id}`, {
      time: time.value,
      seat: seat.value,
      paid: paid.value,
      date: date.value,
      number: counterNumberDisplay.value,
      price: price.value,
    })
    .then((res) => {
      console.log(res.data)
      getData();
    })
    .catch((error) => {
      console.log(error);
    });
  })
}
