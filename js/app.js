const app = {

init: function () {
    console.log('init !');
    app.getUsersFromApi();
    // je branche mon écouteur d'événement sur la liste des logos
    document.getElementById('logoList').addEventListener('click', app.logoAnimation);
},

// je rajoute la class CSS correspondant à mon animation "rotationAndScale"
// au noeud correspondant au logo sur lequel je clique
logoAnimation : function (event) {
    const logoNode = event.target;
    logoNode.classList.add('rotationAndScale');
},

getUsersFromApi: async function () {
    try {
        const response = await fetch('https://reqres.in/api/users?per_page=8');
        // la réponse récupérée a une méthode json() qui renvoie une promesse
        // à la résolution de cette promesse, on obtient le corps de la requête
        // je stock les données des utilisateurs reçues par l'api
        const usersList = await response.json();

        // je construit ensuite ma liste à l'aide de la méthode makeUsersListInDom
        for (let user of usersList.data) {
            app.makeUsersListInDom(user);
        }
    } catch (error) {
        console.error('error :', error);
    }
},

// je crée ici une méthode pour afficher ma liste d'utilisateurs
// plus exactement je définie un template
makeUsersListInDom: function (user) {
    // je récupère le noeud de template
    const template = document.getElementById('usersList-template');

    // je duplique mon noeud de template
    const newListNode = document.importNode(template.content, true);
    console.log(newListNode);
    // content renvoie tout ce qui est entre les 2 balises template
    // je récupère un "fragement" de document

    // Je modifie le duplicata pour y intégrer mes données
    newListNode.querySelector('img').setAttribute('src', `${user.avatar}`);
    newListNode.querySelector('img').setAttribute('alt', `avatar-de-${user.first_name}`);
    newListNode.querySelector('a').setAttribute('href', `mailto:${user.email}`);
    newListNode.querySelector('span').textContent = `${user.first_name} ${user.last_name}`;

    // J'insère le duplicata dans le DOM
    document.querySelector('.users-list').appendChild(newListNode);

}

};

document.addEventListener('DOMContentLoaded', app.init);