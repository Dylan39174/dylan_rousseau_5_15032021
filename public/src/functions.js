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

function verifierCaracteres(event, num){
  var champ = document.activeElement;
  var keyCode = event.which ? event.which : event.keyCode;
  var nb_car = champ.value.length;
  var car_autor = 25;
  if (num){
    var car = '0123456789';
  }else{
    var car = 'azertyuiopmlkjhgfdsqwxcvbnéèàêëâ- ';
  }
  if  (car.indexOf(String.fromCharCode(keyCode)) >= 0 && nb_car < car_autor){
   champ.value = string.fromCharCode(keyCode);
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

function getAllProducts(){
  fetch(url)
    .then((response) => {
      if(response.ok){
        return response.json();
      }
    })
    .then((data) => {
      displayAllProducts(data);
    })
    .catch((err) => {
      console.log(err);
    })
}

function displayAllProducts(data){
  for(var i = 0 ; i < data.length ; i++){
    var li = document.createElement('li');
    var picture = document.createElement('picture');
    var img = document.createElement('img');
    var prix = document.createElement('span');
    var nom = document.createElement('h3');
    var mon_element = document.getElementById('items');
    prix.innerHTML = (data[i].price / 100).toLocaleString() + ' €';
    nom.innerHTML = data[i].name;
    li.setAttribute('id', data[i]._id);
    if(screen.width >= 1000){
        li.setAttribute('class', 'hvr-float-shadow');
    }else{
        li.setAttribute('data-aos', 'fade-up');
    }
    li.setAttribute('onclick', 'select_product("' + data[i]._id + '")');
    img.setAttribute('src', data[i].imageUrl);
    picture.appendChild(img);
    li.appendChild(picture);
    li.appendChild(nom);
    li.appendChild(prix);
    mon_element.appendChild(li);
  }
}

function displayOneProduct(id){
  fetch(url + '/' + id)
  .then((response) => {
      if(response.ok){
          return response.json();
      }
  })
  .then((data) => {
      image_url = data.imageUrl;
      tarif = data.price / 100;
      document.querySelector('.img').setAttribute('src', data.imageUrl);
      document.querySelector('.img').setAttribute('alt', 'Photo du produit ' + data.name );
      document.querySelector('.nom').innerHTML = data.name;
      document.querySelector('.desc').innerHTML = data.description;
      document.querySelector('.tarif_depart').innerHTML = data.price / 100 + ' €';
      for( i = 0 ; i < (data.lenses).length ; i++){
          var option = document.createElement('option');
          option.innerHTML = data.lenses[i];
          document.querySelector('.lense').appendChild(option);
      }
      document.querySelector('.howmuch').setAttribute('onchange', 'calculations_price(' + data.price + ')');
      localStorage.removeItem('selection_product');
  })
  document.querySelector('.active').className = '';
}

function displayBasket(){
  var somme_produit = 0;
  if(localStorage.length === 0 ){
    document.getElementById('liste_produit_panier').remove();
    document.querySelector('h1').innerHTML = 'Votre panier est vide !';
    document.querySelector('.produits_panier').remove();
  }else{
    document.querySelector('.animation').className = 'anim-none';
    if(localStorage.length != 0){
      for(i = localStorage.length -= 1 ; i >= 0 ; i--){
        var item = localStorage.key(i);
        item = JSON.parse(localStorage.getItem(item));
      
        var li = document.createElement('li');
        li.setAttribute('data-aos', 'fade-up');
        var picture = document.createElement('picture');
        var img = document.createElement('img');
        img.setAttribute('src', item.url);
      
        var div_critere = document.createElement('div');
        div_critere.setAttribute('class', 'critere');
      
        var div_total = document.createElement('div');
        div_total.setAttribute('class', 'zone_total');
      
        var div_croix = document.createElement('div');
        div_croix.setAttribute('class', 'croix');
        div_croix.setAttribute('onclick', 'delete_product(' + i + ')'); 
      
        var div_nom = document.createElement('div');
        div_nom.setAttribute('class', 'sous_cat _nom');

        var div_lense = document.createElement('div');
        div_lense.setAttribute('class', 'sous_cat _lenses');
      
        var div_prix = document.createElement('div');
        div_prix.setAttribute('class', 'sous_cat _prix');
      
        var div_quant = document.createElement('div');
        div_quant.setAttribute('class', 'sous_cat _quant');
      
        var titre_nom = document.createElement('h4');
        var titre_lense = document.createElement('h4');
        var titre_prix = document.createElement('h4');
        var titre_quant = document.createElement('h4');
        var titre_total = document.createElement('h4');
      
        var span_nom = document.createElement('span');
        var span_lense = document.createElement('span');
        var span_prix = document.createElement('span');
        var span_quant = document.createElement('span');
        var span_total = document.createElement('span');
        var span_croix = document.createElement('span');
        
      
        titre_nom.innerHTML = 'Produit';
        titre_lense.innerHTML = 'Lense';
        titre_prix.innerHTML = 'Prix';
        titre_quant.innerHTML = 'Quantité';
        titre_total.innerHTML = 'Total';
      
        span_nom.innerHTML = item.name;
        span_lense.innerHTML = item.lense;
        span_prix.innerHTML = item.price.toLocaleString() + ' €';
        
        span_quant.innerHTML = item.quant;
        span_total.innerHTML = (item.price * item.quant).toLocaleString() + ' €';
        somme_produit += (item.price * item.quant);
        span_croix.innerHTML = 'x';
      
        div_total.appendChild(titre_total);
        div_total.appendChild(span_total);
      
        div_quant.appendChild(titre_quant);
        div_quant.appendChild(span_quant);
      
        div_prix.appendChild(titre_prix);
        div_prix.appendChild(span_prix);
      
        div_lense.appendChild(titre_lense);
        div_lense.appendChild(span_lense);
      
        div_nom.appendChild(titre_nom);
        div_nom.appendChild(span_nom);
      
        div_croix.appendChild(span_croix);
      
        div_critere.appendChild(div_nom);
        div_critere.appendChild(div_lense);
        div_critere.appendChild(div_prix);
        div_critere.appendChild(div_quant);
        
        picture.appendChild(img);
        li.appendChild(picture);
        li.appendChild(div_critere);
        li.appendChild(div_total);
        li.appendChild(div_croix);
        
        document.querySelector('#liste_produit_panier').appendChild(li);
      }
      display_quant_product();
      document.querySelector('.prix_total_panier').innerHTML = somme_produit.toLocaleString() + ' €';
    }
  }
}

function validateForm(){
  var inputs = document.getElementsByTagName('input');
  var erreur = '';
  if (!inputs["email"].value.match(/[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+/i)) {
    erreur = 'Attention! l\'addresse mail n\'est pas valide';
  }
  for(var i = 0 ; i < inputs.length ; i ++){
    if(!inputs[i].value){
      erreur = 'Veuillez renseigner tous les champs';
    }
  }
  if(localStorage.length == 0){
    erreur = 'Votre panier est vide!';
  }
  if(erreur){
    document.querySelector('.erreur').innerHTML = erreur;
    return true;
  }
}

function createObject(){
  var ville = document.querySelector('.ville').value;
  var products = [];
  var nb_produit_total = nombre_itteration(); // Fonction qui retourne le nombre de produits total (x);
  var nb_references_LocalStorage = 0; 
  var position_tableau = 0;
  var inputs = document.getElementsByTagName('input');
  const contact = new Contact (inputs["firstname"].value, inputs["lastname"].value, inputs["adress"].value, ville, inputs["email"].value);
  while ( nb_produit_total > 0){ 
    var product = localStorage.getItem(localStorage.key(nb_references_LocalStorage));
    product = JSON.parse(product);
    for( i = 0 ; i < product.quant ; i++){
      products[position_tableau] = product.id;
      position_tableau++;
      nb_produit_total--;
    }
    nb_references_LocalStorage++;
  }
  const objet = new obj (contact, products);
  localStorage.setItem('objet', JSON.stringify(objet));
}

function getDate(){
  let date1 = new Date();
  let dateLocale = date1.toLocaleString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric',
    second: 'numeric' 
  });
  return dateLocale;
}

function postObject(){
  fetch(url += '/order', {
    method: 'POST', 
    headers:{
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: objet
  })
  .then((response) => {
    if (response.ok){
      return response.json();
    }
  })
  .then((response) => {
    document.querySelector('.num_commande').innerHTML = response.orderId;
    document.querySelector('.date_commande').innerHTML = getDate();
    document.querySelector('.nom_client').innerHTML = 'Mr/Mme ' + response.contact.lastName + ' ' + response.contact.firstName;
    document.querySelector('.nb_produit').innerHTML = response.products.length;
    document.querySelector('.montant_facture').innerHTML = calcul_total(response.products) + ' €';
    document.querySelector('.adresse').innerHTML = response.contact.address;
  })
  .catch((err) => {
    console.log(err);
  })
  document.querySelector('.active').className = '';
}