var app = {
init: function () {
    console.log('init !');
  
    // on branche nos écouteurs d'événements sur le body
    document.getElementById('logoList').addEventListener('click', app.logoAnimation);
},

logoAnimation : function (event) {
    const logoNode = event.target;
    logoNode.classList.add('rotationAndScale');
},



};

document.addEventListener('DOMContentLoaded', app.init);