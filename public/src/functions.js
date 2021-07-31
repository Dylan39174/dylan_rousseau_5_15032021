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

  var produit = new Item (id, name, image_url, tarif, lense, quant);

  if(localStorage.getItem(id + '-' + produit.lense) == null){ 
      localStorage.setItem(id + '-' + produit.lense, JSON.stringify(produit));
  }else{ 
      var mon_tableau = JSON.parse(localStorage.getItem(id + '-' + produit.lense));
      quant = mon_tableau.quant += produit.quant;
      var produit = new Item (id, name, image_url, tarif, lense, quant);
      localStorage.setItem(id + '-' + produit.lense, JSON.stringify(produit));
  }
  document.location.href="index.html"; 
}

function display_quant_product(){
  var x = nombre_itteration();
  var Lscreen = screen.width;
  if (Lscreen >= 650){
    var element = document.createElement('li');
    var dest = document.querySelector('.nav');
  }else{
    var element = document.createElement('div');
    var dest = document.querySelector('.menu-small');
  }
  if(localStorage.length >= 1){
      element.setAttribute('class', 'nb_panier');
      element.innerHTML = x;
      if (x == 0){
        return 0;
      }
      dest.appendChild(element);
      document.querySelector('.quant_panier').innerHTML = 'Mon Panier (' + x + ')';
  }
}

function delete_product(num){
  var item_suppr = localStorage.key(num);
  localStorage.removeItem(item_suppr);
  document.location.href = "panier.html";
}

function verifierCaracteres(event, num) {
	 		
	var keyCode = event.which ? event.which : event.keyCode;
	var touche = String.fromCharCode(keyCode);
	var champ = document.activeElement;
  if (num){
    var caracteres = '1234567890';
  }else{
    var caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ -';
  }

	if(caracteres.indexOf(touche) >= 0) {
		champ.value += touche;
	}
			
}

function calcul_total(products){
  let somme = 0;
  for(i = 0 ; i < products.length ; i++){
    somme += products[i].price / 100 ;
  }
  return somme.toLocaleString();
}

function nombre_itteration(){ 
  let x = 0;
  localStorage.removeItem('selection_product');
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

function search_city(){

  document.querySelector('.erreur').innerHTML = '';
  var code = document.querySelector('.code_postal').value;
  var select = document.querySelector('select');

  while(select.firstChild){
    select.removeChild(select.firstChild);
  }

  if (code.length != 5){
    document.querySelector('.erreur').innerHTML = 'Le code postal est invalide';
  }

  var url = 'https://geo.api.gouv.fr/communes?codePostal=' + code;
  
  fetch(url)
    .then((response) => {
      if(response.ok){
        return response.json();
      }
    })
    .then((data) => {
      if(data.length == 0){
        document.querySelector('.erreur').innerHTML = 'Aucune commune ne correspond à ce code postal !';
        return 0;
      }
      for(i = 0 ; i < data.length ; i++){
        var option = document.createElement('option');
        option.setAttribute('value', data[i].nom);
        option.innerHTML = data[i].nom;
        select.appendChild(option);
      }
    })
    .catch((err) => {
      console.log('erreur');
    })
}