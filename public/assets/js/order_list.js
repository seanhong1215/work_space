const orderList = document.querySelector(".order_list_space");
const cancelBtn = document.querySelector(".btn-danger");
const editBtn = document.querySelector(".btn-primary");

function init() {
    getData();
}
init();

function getData() {
  axios
    .get(`${BASE_URL}/myOrders`)
        .then((res) => {
            console.log(res.data)
            renderData(res.data);
        })
        .catch((error) => {
        console.log(error);
        });
}

function renderData(data) {
  let str = "";
  data.forEach((item) => {
    str += `
<div class="container order_list">
<div class="row">
      <div class="col-4">
        <img src="${item.images}" alt="">
      </div>
      <div class="col-4">
        <ul class="list">
          <li>預計日期：${item.date}</li>
          <li>預計時間：${item.time}</li>
          <li>人數：${item.number}</li>
          <li>座席：${item.seat}</li>
          <li>消費方式：${item.paid}</li>
          <li>價格方案：${item.price}</li>
        </ul>
      </div>
      <div class="col-4 d-flex align-items-end justify-content-end js-btn">
        <button type="button" class="btn btn-danger" data-cancel="${item.id}">取消預約</button>
      </div>
    </div>
    </div>
`;
  });
  orderList.innerHTML = str;
}

orderList.addEventListener('click', function(e){
    const id = e.target.getAttribute("data-cancel");
    const edit = e.target.getAttribute("data-edit");
    console.log(edit);
    if(id){
        cancelOrder(id);
    }  else if(edit===""){
        axios
        .get(`${BASE_URL}/myOrders`)
            .then((res) => {
                console.log(res.data)
                renderEditData(res.data);;
            })
            .catch((error) => {
            console.log(error);
            });
    } 

})

function cancelOrder(id) {
  axios
    .delete(`${BASE_URL}/myOrders/${id}`)
        .then((res) => {
        console.log(res.data);
        getData();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '取消成功',
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch((error) => {
        console.log(error);
        });
}



