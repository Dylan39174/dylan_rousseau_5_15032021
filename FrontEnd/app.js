
var url = 'http://localhost:3000/api/cameras';

fetch(url)
    .then((response) => {
        if (response.ok){
            return response.json();
        }
    })
    .then((data) => {

        for(var i = 0 ; i < data.length ; i++){
            
            var li = document.createElement('li');
            var picture = document.createElement('picture');
            var img = document.createElement('img');
            var prix = document.createElement('span');
            var nom = document.createElement('h3');
            var mon_element = document.getElementById('items');
            prix.innerHTML = (data[i].price / 100) + ' €';
            nom.innerHTML = data[i].name;
            li.setAttribute('id', data[i]._id);
            li.setAttribute('onclick', 'ma_fonction("' + data[i]._id + '")');
            img.setAttribute('src', data[i].imageUrl);
            picture.appendChild(img);
            li.appendChild(picture);
            li.appendChild(nom);
            li.appendChild(prix);
            mon_element.appendChild(li);

        }
        
    })
    .catch(function(err){
        console.log('une Erreur est survenue');
    })

    function ma_fonction(num){

        url = url + '/' + num;

        fetch(url)
        .then((response) => {
            if (response.ok){
                return response.json();
            }
        })
        .then((data) => {
            
            document.querySelector('.produits').className = ('element');
            document.querySelector('#items').remove();
            var picture = document.createElement('picture');
            var img = document.createElement('img');
            img.setAttribute('src', data.imageUrl);
            img.setAttribute('alt', 'Photographie de l\'appareil ' + data.name);
            var div_description = document.createElement('div');
            div_description.setAttribute('class', 'description');
            var titre_nom = document.createElement('h4');
            titre_nom.innerHTML = 'Nom de l\'appareil:'
            var nom = document.createElement('span');
            nom.innerHTML = data.name;
            var titre_desc = document.createElement('h4');
            titre_desc.innerHTML = 'Description:';
            var desc = document.createElement('p');
            desc.innerHTML = data.description;
            var titre_prix = document.createElement('h4');
            titre_prix.innerHTML = 'Prix:';
            var prix = document.createElement('span');
            prix.setAttribute('class', 'tarif_depart');
            prix.innerHTML = (data.price / 100) + ' €';
            var titre_quantite = document.createElement('h4');
            titre_quantite.innerHTML = 'Quantitée:';
            var quantite = document.createElement('input');
            quantite.setAttribute('type', 'number');
            quantite.setAttribute('name', 'howmuch');
            quantite.setAttribute('min', 0);
            quantite.setAttribute('class', 'howmuch');
            var div_zone_tarif = document.createElement('div');
            div_zone_tarif.setAttribute('class', 'zone-tarif');
            var div_tarif_t = document.createElement('div');
            div_tarif_t.setAttribute('class', 'tarif-total');
            var titre_total = document.createElement('h4');
            titre_total.innerHTML = 'Total:';
            var tarif_total = document.createElement('span');
            tarif_total.setAttribute('class', 'prix_total');
            tarif_total.innerHTML = '0€';
            var div_bouton = document.createElement('div');
            div_bouton.setAttribute('class', 'bouton');
            var bouton = document.createElement('span');
            bouton.innerHTML = 'Ajouter au panier';
            
            picture.appendChild(img);
            div_bouton.appendChild(bouton);
            div_tarif_t.appendChild(titre_total);
            div_tarif_t.appendChild(tarif_total);
            div_zone_tarif.appendChild(div_tarif_t);
            div_zone_tarif.appendChild(div_bouton);
            div_description.appendChild(titre_nom);
            div_description.appendChild(nom);
            div_description.appendChild(titre_desc);
            div_description.appendChild(desc);
            div_description.appendChild(titre_prix);
            div_description.appendChild(prix);
            div_description.appendChild(titre_quantite);
            div_description.appendChild(quantite);
            div_description.appendChild(div_zone_tarif);
            document.querySelector('.element').appendChild(picture);
            document.querySelector('.element').appendChild(div_description);

            var script = document.createElement('script');
            script.innerHTML = 'document.querySelector(".howmuch").addEventListener("change", function(){\nvar tarif_entree = ' + data.price / 100 + ';\nvar nombre = document.querySelector(".howmuch").value;\nvar tarif_sortie = tarif_entree * nombre;\ndocument.querySelector(".prix_total").innerHTML = tarif_sortie + " €";\n});';
            
            document.querySelector('body').appendChild(script);

;
            
        })
        .catch(function(err){
            console.log('une Erreur est survenue');
        })
    }


    







