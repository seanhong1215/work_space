const space = document.querySelector('.services');
function getData() {
axios.get(`${BASE_URL}/services`)
.then(res => {
  renderData(res.data);
})
.catch(error => {
  console.log(error)
})
}
getData()

function renderData(data) {
let str = "";
data.forEach(item => {
str += `
<div class="card col-12 col-md-6" data-aos="zoom-in"
data-aos-easing="ease-in-back"
data-aos-delay="300"
data-aos-offset="0">
      <img
        src="${item.images}"
        class="card-img-top"
        alt="生活閱讀"
      />
      <div class="card-wrap">
        <h3 class="card-body text-center">${item.title}</h3>
        <p class="card-txt">
          ${item.body}
        </p>
        <button class="more_btn" onclick="javascript:location.href='./service.html'">了解更多</button>
      </div>
    </div>
`
})
space.innerHTML = str 
}
