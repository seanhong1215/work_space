
function init() {
  getDataTopicsLife();
  getDataTopicsCreator();
  getDataTopicsCoffee();
}
init()

function getDataTopicsLife() {
const space = document.querySelector(".space_life");
  axios
    .get(`${BASE_URL}/topics?title=生活閱讀`)
    .then((res) => {
      renderProduct(res.data, space);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getDataTopicsCreator() {
  const space = document.querySelector(".space_creator");
  axios
    .get(`${BASE_URL}/topics?title=共享辦公`)
    .then((res) => {
      renderProduct(res.data, space);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getDataTopicsCoffee() {
  const space = document.querySelector(".space_coffee");
  axios
    .get(`${BASE_URL}/topics?title=主題餐廳`)
    .then((res) => {
      renderProduct(res.data, space);
    })
    .catch((error) => {
      console.log(error);
    });
}

// 顯示畫面
function renderProduct(data, space) {
  let str = "";
    data.forEach((item)=>{
    str += combineProductString(item)
  })
  space.innerHTML = str;
}

// 組字串
function combineProductString(item) {
  return (`
  <div class="col-sm-12 col-md-6 col-lg-3" data-aos="zoom-in">
  <div class="item">
    <img
      src="${item.images}"
      class="card-img-top"
    />
       <div class="card-wrap">
      <h3 class="card-body text-center">${item.title}</h3>
      <p class="card-txt">
        ${item.body}
      </p>
      <button class="more_btn" onclick="javascript:location.href='./service.html'">了解更多</button>
  </div>
  </div>
</div>
  `);
}

