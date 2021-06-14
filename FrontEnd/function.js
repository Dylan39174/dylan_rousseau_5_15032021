function select_product(id){
  localStorage.setItem('detail', id);
  document.location.href="produit.html";

}

function affiche_detail_produit(){
  url = url + '/' + localStorage.getItem('detail');

  fetch(url)
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
      document.querySelector('.howmuch').setAttribute('onchange', 'get_price(' + data.price + ')');
      localStorage.removeItem('detail');
      affiche_quant_panier();
  })
}

function get_price(prix){

  var quantitee = document.querySelector('.howmuch').value;
  var tarif_sortie = (prix / 100) * quantitee;  
  document.querySelector('.prix_total').innerHTML = tarif_sortie.toLocaleString() + ' €';

}

function ajout_panier(){
  localStorage.removeItem('contact');
  localStorage.removeItem('products');
  if(document.querySelector('.howmuch').value == 0){
      alert('La quantité doit être supérieur à 0');
      exit();
  }

  var name = document.querySelector('.nom').innerHTML;
  var lense = document.querySelector('.lense').value;
  var quant = parseInt(document.querySelector('.howmuch').value);

  const produit = new Item (name, image_url, tarif, lense, quant);

  if(localStorage.length === 0){
      localStorage.setItem('"' + name + '-' + lense + '"', JSON.stringify(produit));
  }else{
      if(localStorage.getItem('"' + name + '-' + lense + '"') == null){
          localStorage.setItem('"' + name + '-' + lense + '"', JSON.stringify(produit));
      }else{
          
          var mon_tableau = JSON.parse(localStorage.getItem('"' + name + '-' + lense + '"'));
          quant = mon_tableau.quant += parseInt(document.querySelector('.howmuch').value);
          const produit = new Item (name, image_url, tarif, lense, quant);
          localStorage.setItem('"' + name + '-' + lense + '"', JSON.stringify(produit));
          
      }
  }

  document.location.href="index.html"; 
}

function affiche_quant_panier(){
  if(localStorage.length >= 1 && localStorage.getItem('detail') == null && localStorage.getItem('contact') == null){
      var li = document.createElement('li');
      li.setAttribute('class', 'nb_panier');
      li.innerHTML = localStorage.length;
      document.querySelector('.nav').appendChild(li);
  }
}

function suppr_panier(num){
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