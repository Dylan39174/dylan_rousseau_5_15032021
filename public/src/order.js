var order_id = '';
const objet = localStorage.getItem('objet');
localStorage.clear();

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
  console.log(response);
  document.querySelector('.num_commande').innerHTML = response.orderId;
  document.querySelector('.nom_client').innerHTML = response.contact.lastName + ' ' + response.contact.firstName;
  document.querySelector('.nb_produit').innerHTML = response.products.length;
  document.querySelector('.montant_facture').innerHTML = calcul_total(response.products) + ' €';
  document.querySelector('.adresse').innerHTML = response.contact.address;
})
.catch((err) => {
  console.log(err);
})

document.querySelector('.active').className = '';

