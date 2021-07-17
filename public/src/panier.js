
// Récupération et affichage des produits stockés dans le localstorage
var somme_produit = 0;

if (localStorage.length === 0 ){
  document.getElementById('liste_produit_panier').remove();
  document.querySelector('h1').innerHTML = 'Votre panier est vide !';
}
if (localStorage.length != 0){
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

document.querySelector('.bouton').addEventListener('click', function(){
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
    document.querySelector('.erreur').innerHTML = erreur ;
    return 0;
  }

  const contact = new Contact (inputs["firstname"].value, inputs["lastname"].value, inputs["adress"].value, inputs["city"].value, inputs["email"].value);
  var products = [];
  var x = nombre_itteration(); // Fonction qui retourne le nombre de produits total (x);
  //  Création boucle
  var y = 0; // La variable y représente le nombre de produits stockés dans le localStorage;
  var z = 0; // La variable z représente la taille du tableau products;
  while ( x != 0){ 
    
    var product = localStorage.getItem(localStorage.key(y));
    product = JSON.parse(product);

    for( i = 0 ; i < product.quant ; i++){
      products[z] = product.id;
      z++;
      x--;
    }
    y++;
  }

  //  Fin de la boucle
  
  const objet = new obj (contact, products);
  localStorage.setItem('objet', JSON.stringify(objet));
  document.location.href = 'commande.html';
  
});
