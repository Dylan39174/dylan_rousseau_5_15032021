// Récupération et affichage des détails du produit séléctionné sur la page d'accueil
var id = localStorage.getItem('selection_product');
fetch(url + '/' + localStorage.getItem('selection_product'))
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