var order_id = '';
const objet = localStorage.getItem('objet');
localStorage.clear();

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
  document.querySelector('.date_commande').innerHTML = dateLocale;
  document.querySelector('.nom_client').innerHTML = 'Mr/Mme ' + response.contact.lastName + ' ' + response.contact.firstName;
  document.querySelector('.nb_produit').innerHTML = response.products.length;
  document.querySelector('.montant_facture').innerHTML = calcul_total(response.products) + ' €';
  document.querySelector('.adresse').innerHTML = response.contact.address;
})
.catch((err) => {
  console.log(err);
})

document.querySelector('.active').className = '';

