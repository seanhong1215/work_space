const space = document.querySelector(".space_life");
function getData() {
  axios
    .get(`${BASE_URL}/spaces`)
    .then((res) => {
      renderData(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(`${BASE_URL}/products`)
    .then((res) => {
      renderProduct(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
getData();

function renderData(data) {
  let str = "";
  data.forEach((item) => {
    str += `
<div class="col-sm-12 col-md-6 col-lg-3 ">
          <div class="item">
        <img
          src="${item.images}"
          class="card-img-top"
          alt="workspace_01"
        />
           <div class="card-wrap">
          <h3 class="card-body text-center">${item.title}</h3>
          <p class="card-txt">
            ${item.body}
          </p>
      </div>
      </div>
        </div>
`;
  });
  space.innerHTML = str;
}

// 產品
const myOrder = document.querySelector(".myOrder");
function renderProduct(data) {
  let str = "";
  data.forEach((item) => {
    str += `
    <div class="col-md-12 col-lg-4">
    <div class="item">
      <div class="card-body text-center">
        <h5 class="card-title">${item.price}</h5>
        <small class="subTitle">${item.title}</small>
        <p class="card-text">${item.body}</p>
        <a href="./order.html" class="more_btn cart">立刻預約</a>
      </div>
    </div>
  </div>
    `
  });
  myOrder.innerHTML = str;
}