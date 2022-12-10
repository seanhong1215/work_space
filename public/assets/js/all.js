const btn = document.querySelectorAll(".cart");
btn.forEach(item => {
  item.addEventListener('click', function(e){
    console.log(e.target);
    window.location.href='../../order.html'; 
  })
})