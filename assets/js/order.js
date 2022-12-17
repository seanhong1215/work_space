const elem = document.querySelector('input[name="預約日期"]');
const datepicker = new Datepicker(elem, {
  format: "yyyy-mm-dd",
  buttonClass: 'btn',
  defaultViewDate: 'today',
  orientation: 'auto',
  todayBtn: true
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


function renderProduct(data) {
  let str = "";
  data.forEach((item) => {
    str += `
    <div class="col-md-12 col-lg-4" data-aos="zoom-in">
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
  let errors = validate(form, constraints) || "";
  if (errors) {
    Object.keys(errors).forEach(function (keys) {
      document.querySelector(`[data-message="${keys}"]`).textContent =
        errors[keys];
    });
  } else {
    if(token){
      data.push({
        userId: userId,
        time: time.value,
        seat: seat.value,
        paid: paid.value,
        date: date.value,
        number: counterNumberDisplay.value,
        price: price.value,
        images: imgSrc,
        id: Date.now(),
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: '請先登入會員在進行預約',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.replace("./login.html");
        }
      });
    }
  }
  form.reset();
  getData(data);
}

function getData(data) {
  data.forEach((item) => {
    axios
      .post(`${BASE_URL}/myOrders`, item)
      .then((res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '您已經成功預約，請到我的預約查看確認!',
            showConfirmButton: false,
            timer: 2000
          })
      })
      .catch((err) => {
        console.log(err);
      });
  });
}


//驗證
const constraints = {
  預約日期: {
    presence: {
      message: "必填欄位"
    }
  },
  預約時段: {
    presence: {
      message: "必填欄位"
    },
  },
  座位大小: {
    presence: {
      message: "必填欄位"
    },
  },
  消費方式: {
    presence: {
      message: "必填欄位"
    }
  },
  價格方案: {
    presence: {
      message: "必填欄位"
    }
  },
  預約人數: {
    presence: {
      message: "必填欄位"
    }
  }
};


const inputs = document.querySelectorAll("input[name],select[name]");
inputs.forEach((item) => {
  item.addEventListener("change", function () {
    item.nextElementSibling.textContent = "";
    let errors = validate(form, constraints) || "";
    if (errors) {
      Object.keys(errors).forEach(function (keys) {
        // console.log(document.querySelector(`[data-message=${keys}]`))
        document.querySelector(`[data-message="${keys}"]`).textContent =
          errors[keys];
      });
    }
  });
});