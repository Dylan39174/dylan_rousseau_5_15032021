// Récupération des produits stockés sur l'API fourni par le backend

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
            prix.innerHTML = (data[i].price / 100).toLocaleString() + ' €';
            nom.innerHTML = data[i].name;
            li.setAttribute('id', data[i]._id);
            li.setAttribute('onclick', 'select_product("' + data[i]._id + '")');
            img.setAttribute('src', data[i].imageUrl);
            picture.appendChild(img);
            li.appendChild(picture);
            li.appendChild(nom);
            li.appendChild(prix);
            mon_element.appendChild(li);

        }
    })
    .catch(function(err){
        console.log('erreur');
    })
