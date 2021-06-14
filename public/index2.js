

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    
    //document.getElementById("user_div").style.display = "block";
    document.getElementById("firebasetest").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
      //var redirect = getParameterByName(redirect,window.location.href)
      window.location.href = "/dashboard";
      /*if(redirect!="")
      {
        window.location.href = __dirname+"/dashboard";
      }
      else
      {
        window.location.href = __dirname+"/"+redirect;
      }*/

    }

  } else {
    // No user is signed in.

    //document.getElementById("user_div").style.display = "none";
    document.getElementById("firebasetest").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}
function loginUI()
{
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebasetest', {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });
}
function logout(){
  firebase.auth().signOut();
}
