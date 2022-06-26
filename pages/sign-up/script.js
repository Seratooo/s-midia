const vName = document.getElementById('Name');
const vEmail = document.getElementById('Email');
const vPassword = document.getElementById('Password');
const btnInscrever = document.getElementById('btnInscrever');


function createLogin(){
  var Name, Email, Password;

  if(vName){
    Name = vName.value;
  }

  if(vEmail){
    Email = vEmail.value;
  }

  if(vPassword){
    Password = vPassword.value;
  }

  var data = {
    Name,
    Email,
    Password, 
  }

      firebase.auth().createUserWithEmailAndPassword(Email, Password)
      .then(function (user) {
          console.log(user);
          //alert('usuario logado');

          firebase.firestore().collection('Data').doc(Email).set(data).then(()=>{
          
            localStorage.setItem('Name', Name);
            localStorage.setItem('Email',Email);

            window.location.href='/dashboard.html';
            console.log(data);
         });
         
      })
      .catch(function (error) {
  
      });

  
  
     

}

btnInscrever.addEventListener('click',createLogin);