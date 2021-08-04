displayBasket();
if(localStorage.length != 0){
  document.querySelector('.bouton').addEventListener('click', function(){
    if(validateForm()){
      return 0;
    }
    createObject();
    document.location.href = 'commande.html';
  })
  document.querySelector('select').addEventListener('click', function() {
    document.querySelector('select').className = 'ville C_black';
  })
}
AOS.init();




