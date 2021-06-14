firebase.auth().onAuthStateChanged(function(user) {//must include this on every page. 
    if (user) {
      // User is signed in.
  
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        readTest();
  
      }
  
    } 
    else {
      // No user is signed in.
      window.location.href = "/?redirect=dashboard";//lets you know where I'm redirecting from. 
      document.getElementById("user_div").style.display = "none";
      //document.getElementById("login_div").style.display = "block";
  
    }
  });
  function readTest()
  {
    try 
    {
      var db = firebase.firestore();
    }
    catch (error) 
    {
      document.getElementById("hmm").innerHTML = error;
      return;
    }
    try
    {
      var passRef = db.collection("passwords");
      var query = passRef.where("owner_uid","==",firebase.auth().currentUser.uid); 
      const table = document.getElementById("passTable");
      var counter= 0;
      /*var tableRows = table.getElementsByTagName('tr');
      var rowCount = tableRows.length;
      for (var x=rowCount-1; x>0; x--) {
        table.removeChild(tableRows[x]);
      }*/
      query.get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots

              let row = table.insertRow(1);
              let label = row.insertCell(0);
              let dateOfExpiry = row.insertCell(1);
              let password = row.insertCell(2);
              label.innerHTML = doc.data().label;
              dateOfExpiry.innerHTML = doc.data().dateOfExpiry;
              password.innerHTML = doc.data().password;
          });
      })
      .catch((error) => {
        document.getElementById("hmm").innerHTML = error;
      });
    }
    catch(error)
    {
      
    }
  }
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
      var inputPass = Math.floor(Math.random*10);
      db.collection("passwords").add(
        {
          owner_uid: firebase.auth().currentUser.uid,
          label: "None",
          dateOfExpiry: 0,
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
  function addPasscode()
  {
    /*const table = document.getElementById("passTable");
    var counter= 0;
    var tableRows = table.getElementsByTagName('tr');
    var rowCount = tableRows.length;
    for (var x=rowCount-1; x>0; x--) {
      table.removeChild(tableRows[x]);
    }*/
    window.location.href = "/add_passcode";
  }