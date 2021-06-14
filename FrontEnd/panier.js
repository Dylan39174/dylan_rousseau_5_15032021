if (localStorage.length === 0 || localStorage.getItem('contact') != null){
  document.getElementById('liste_produit_panier').remove();
  document.querySelector('h1').innerHTML = 'Votre panier est vide !';
}

if (localStorage.getItem('contact') == null){
  for(i = localStorage.length -= 1 ; i >= 0 ; i--){
    var item = localStorage.key(i);
    item = JSON.parse(localStorage.getItem(item));
  
    var li = document.createElement('li');
    var picture = document.createElement('picture');
    var img = document.createElement('img');
    img.setAttribute('src', item.url);
  
    var div_critere = document.createElement('div');
    div_critere.setAttribute('class', 'critere');
  
    var div_total = document.createElement('div');
    div_total.setAttribute('class', 'zone_total');
  
    var div_croix = document.createElement('div');
    div_croix.setAttribute('class', 'croix');
    div_croix.setAttribute('onclick', 'suppr_panier(' + i + ')');
  
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
  affiche_quant_panier();
}

document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();

  if (localStorage.length == 0 || localStorage.getItem('contact') != null){
    alert('Votre panier est vide !');
    document.location.href = "index.html";
  }

  var inputs = document.getElementById('form').getElementsByTagName('input');
  var firstName = inputs['firstname'].value;
  var lastName = inputs['lastname'].value;
  var adress = inputs['adress'].value;
  var city = inputs['city'].value;
  var email = inputs['email'].value;
  
  const contact = new contacts (firstName, lastName, adress, city, email);

  var products = [];

  for (i = 0 ; i < localStorage.length ; i++){
    var product = localStorage.key(i);
    product = localStorage.getItem(product);
    products[i] = product;

  }

  localStorage.clear();

  localStorage.setItem('contact', contact);
  localStorage.setItem('products', products);

  document.location.href = 'index.html';
  
})