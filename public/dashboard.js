firebase.auth().onAuthStateChanged(function(user) {//must include this on every page. 
    if (user) {
      // User is signed in.
  
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
  
      }
  
    } 
    else {
      // No user is signed in.
      window.location.href = "/?redirect=dashboard";//lets you know where I'm redirecting from. 
      document.getElementById("user_div").style.display = "none";
      //document.getElementById("login_div").style.display = "block";
  
    }
  });
  
  function logout(){
    firebase.auth().signOut();
  }
  
  function addTest()
  {
    try 
    {
      var db = firebase.firestore();
    } catch (error) 
    {
      document.getElementById("hmm").innerHTML = error;
      return;
    }
    try
    {
      db.collection("passwords").add(
        {
          owner_uid: firebase.auth().currentUser.uid,
          password: "passtest"
        }
      )
      .then((docRef)=>
      {
        document.getElementById("hmm").innerHTML = "Nice.";
      })
      .catch((error)=>
      {
        document.getElementById("hmm").innerHTML = error;
      })
    }
    catch(error)
    {
      document.getElementById("hmm").innerHTML = error;
    }
    
  }