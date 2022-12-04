  const BASE_URL = 'http://localhost:3001';
  const url = `${BASE_URL}/space`

  const spaceTest = document.querySelector('.spaceTest');
  let data = [];
axios.get(url)
          .then(function (response) {
            console.log(response.data)
            data = response.data
            renderData(data)
            })


function renderData(){
  let str = "";
  data.forEach(item => {
    str += `
    <div class="card col-6">
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
      <button class="more_btn">了解更多</button>
    </div>
  </div>
    `
    console.log(item)
  })
  spaceTest.innerHTML = str;
}