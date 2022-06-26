import { _Init,logout } from '../main/script.js'
const btnlogout = document.getElementById('btnlogout');
const btnSairHeader = document.getElementById('btnSairHeader');

_Init();
firebase.auth().onAuthStateChanged(function (user) {

  var currentUser = firebase.auth().currentUser;
})


btnlogout.addEventListener('click',logout);
btnSairHeader.addEventListener('click',logout);




