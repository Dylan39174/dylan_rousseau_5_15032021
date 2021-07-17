var url = 'http://localhost:3000/api/cameras';

function select_product(id) {
  localStorage.setItem('selection_product', id);
  document.location.href="product.html";
}

function calculations_price(prix){

  var quantitee = document.querySelector('.howmuch').value;
  var tarif_sortie = (prix / 100) * quantitee;  
  document.querySelector('.prix_total').innerHTML = tarif_sortie.toLocaleString() + ' €';

}

function add_product(){

  if(document.querySelector('.howmuch').value == 0){
      alert('La quantité doit être supérieur à 0');
      return 0;
  }

  var name = document.querySelector('.nom').innerHTML;
  var lense = document.querySelector('.lense').value;
  var quant = parseInt(document.querySelector('.howmuch').value);

  const produit = new Item (id, name, image_url, tarif, lense, quant);

  if(localStorage.length === 0){
      localStorage.setItem(id, JSON.stringify(produit));
  }else{
      if(localStorage.getItem(id) == null){
          localStorage.setItem(id, JSON.stringify(produit));
      }else{

          var mon_tableau = JSON.parse(localStorage.getItem(id));
          if (mon_tableau.lense = produit.lense){
            quant = mon_tableau.quant += parseInt(document.querySelector('.howmuch').value);
            const produit = new Item (id, name, image_url, tarif, lense, quant);
            localStorage.setItem(id, JSON.stringify(produit));
          }
          
      }
    }
  document.location.href="index.html"; 
  
  }

function display_quant_product(){
  
  if(localStorage.length >= 1 && localStorage.getItem('contact') == null){
      var li = document.createElement('li');
      li.setAttribute('class', 'nb_panier');
      if (localStorage.getItem('selection_product') == null){
        li.innerHTML = localStorage.length;
      }else{
        if(localStorage.length == 1){
          return 0;
        }
        li.innerHTML = localStorage.length -= 1;
      }
      document.querySelector('.nav').appendChild(li);
  }
}

function delete_product(num){
  var item_suppr = localStorage.key(num);
  localStorage.removeItem(item_suppr);
  document.location.href = "panier.html";
}

function remplir(){
  var inputs = document.getElementById('form').getElementsByTagName('input');
  inputs['firstname'].value = 'dylan';
  inputs['lastname'].value = 'rousseau';
  inputs['adress'].value = '1 rue henri prost';
  inputs['city'].value = 'champagnole';
  inputs['email'].value = 'dylan.rousseau77@orange.fr';
}

function verifierCaracteres(event) {
	 		
	var keyCode = event.which ? event.which : event.keyCode;
	var touche = String.fromCharCode(keyCode);
			
	var champ = document.getElementById('mon_input');	
	var caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ -';
			
	if(caracteres.indexOf(touche) >= 0) {
		champ.value += touche;
	}
			
}

function calcul_total(products){
  let somme = 0;
  for(i = 0 ; i < products.length ; i++){
    somme += products[i].price / 100 ;
  }
  return somme;
}

function nombre_itteration(){
  let x = 0;
  for (i = 0; i < localStorage.length ; i++){

    var product = localStorage.getItem(localStorage.key(i));
    product = JSON.parse(product);

    if (product.quant > 1){
      x += product.quant;
    } else{
      x++;
    }

  }
  return x;
}

