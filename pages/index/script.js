import { _Init } from '../main/script.js'

const Name = document.getElementById('Name');
const Email = document.getElementById('Email');
const Password = document.getElementById('Password');
const btnEntrar = document.getElementById('btnEntrar');

_Init();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
      // User is signed in.
      window.location.href='/dashboard.html';
      //return currentUser;
  } else {
      // User is signed out.
  }
});

function createLogin(){
  var vName, vEmail, vPassword;
  
  if(Name){
    vName = Name.value;
  }

  if(Email){
    vEmail = Email.value;
  }

  if(Password){
    vPassword = Password.value;
  }
  
    

 firebase.firestore().collection('Data').doc(vEmail).get().then((doc) => {
      if (doc.exists) {
          localStorage.setItem('Name',doc.data().Name);
          localStorage.setItem('Email',doc.data().Email);
          
          firebase.auth().signInWithEmailAndPassword(vEmail, vPassword)
          .then(function (user) {
            window.location.href='/dashboard.html';
          })
          .catch(function (error) {
      
          });
      }
  }).catch((error) => {
  console.log("Error getting document:", error);
  });

}

btnEntrar.addEventListener('click',createLogin);