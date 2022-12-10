const space = document.querySelector('.space_life');
function getData() {
axios.get(`${BASE_URL}/spaces`)
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
`
})
space.innerHTML = str
}