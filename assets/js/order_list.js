const orderList = document.querySelector(".order_list");
const cancelBtn = document.querySelector(".btn-danger");
const editBtn = document.querySelector(".btn-primary");

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
  <div class="order_list">
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
          <button type="button" class="btn btn-danger" data-cancel="${item.id}">取消預約</button>
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

orderList.addEventListener("click", function (e) {
  const id = e.target.getAttribute("data-cancel");
  if (id) {
    cancelOrder(id);
    return
  } 
});

function cancelOrder(id) {
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
