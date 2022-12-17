
const loginAdmin = document.querySelector(".js-admin-login");
const token = localStorage.getItem("token");

function init() {
  if (token) {
    loginAdmin.innerHTML = "登出";
  } else {
    document.querySelector("main").style.display = "none";
    loginAdmin.innerHTML = "管理者登入";
  }
  loginAdmin.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.innerHTML === "登出") {
      localStorage.clear();
      Swal.fire({
        icon: "success",
        title: "登出成功",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.replace("../index.html");
        }
      });
    }
  });
}
init();

// c3.js
function renderC3(data) {
  // 轉物件格式
  let total = {};
  data.forEach((item) => {
    if (total[item.price] == undefined) {
      total[item.price] = 1;
    } else {
      total[item.price] += 1;
    }
  });

  // 做資料關聯
  let categoryAry = Object.keys(total);
  let newData = [];
  categoryAry.forEach((item) => {
    let ary = [];
    ary.push(item);
    ary.push(total[item]);
    newData.push(ary);
  });

  c3.generate({
    bindto: "#chart2",
    data: {
      columns: newData,
      type: "pie",
    },
    color: {
      pattern: ["#301E5F", "#5434A7", "#9D7FEA"],
    },
  });
}

function renderD3(data) {
  // 轉物件格式
  let total = {};
  data.forEach((item) => {
    if (total[item.paid] == undefined) {
      total[item.paid] = 1;
    } else {
      total[item.paid] += 1;
    }
  });

  // 做資料關聯
  let categoryAry = Object.keys(total);
  let newData = [];
  categoryAry.forEach((item) => {
    let ary = [];
    ary.push(item);
    ary.push(total[item]);
    newData.push(ary);
  });

  c3.generate({
    bindto: "#chart1",
    data: {
      columns: newData,
      type: "pie",
    },
    // color: {
    //   pattern: ["#301E5F", "#5434A7", "#9D7FEA"],
    // },
  });
}

const orderList = document.querySelector(".my-order");
function inits() {
  getData();
}
inits();

function getData() {
  axios.get(`${BASE_URL}/myOrders?_expand=user`).then((res) => {
    renderData(res.data);
  });
}

const result = document.querySelector('.result')

function sum(data) {
  let num = 0;
  data.forEach((item) => {
    num += item.number * 1;
  });
  result.textContent = `預約總人數：${num}人`;
}

function renderData(data) {
  let str = "";
  data.forEach((item) => {
    str += `
          <div class="item">${item.id}</div>
          <div class="item">${item.user.email}</div>
          <div class="item">${item.number}</div>
          <div class="item">${item.seat}</div>
          <div class="item">${item.paid}</div>
          <div class="item">${item.price}</div>
          <div class="item">${item.date}</div>
          <div class="item">${item.time}</div>
          <div class="item">
            <button type="button" class="btn btn-danger" data-id="${item.id}">刪除</button>
          </div>
          `;
  });
  orderList.innerHTML = str;
  renderC3(data);
  renderD3(data);
  sum(data)

}

orderList.addEventListener("click", function (e) {
  const id = e.target.getAttribute("data-id");
  if (id) {
    deleteOrder(id);
    return;
  }
});

function deleteOrder(id) {
  Swal.fire({
    title: "確定要刪除?",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`${BASE_URL}/myOrders/${id}`)
        .then((res) => {
          Swal.fire("你已經刪除!", "success");
          getData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
}



