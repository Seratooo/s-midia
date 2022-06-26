export function logout(){
  firebase.auth().signOut()
      .then(function () {
          
      }).catch(function (error) {
          // An error happened.
      });
}


export async function _Init(){

  document.addEventListener("DOMContentLoaded",function(){
     
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.

            //return currentUser;
        } else {
            // User is signed out.

            
            if(!window.location.pathname.includes('/index.html')){
               window.location.href='/index.html';
            }
            return false;
        }
    });
  });

}