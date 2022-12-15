const btn = document.querySelectorAll(".cart");
btn.forEach(item => {
  item.addEventListener('click', function(e){
    window.location.href='./order.html'; 
  })
})

AOS.init();
