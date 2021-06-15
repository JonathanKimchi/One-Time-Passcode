firebase.auth().onAuthStateChanged(function(user) {//must include this on every page. 
    if (user) {
      // User is signed in.
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        //document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
        //document.getElementById("pass1").style.display = "block";
  
      }
  
    } 
    else {
      // No user is signed in.
      window.location.href = "/?redirect=add_passcode";//lets you know where I'm redirecting from. 
      document.getElementById("pass1").style.display = "none";
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
      var inputPass = Math.floor(Math.random*10).toString(10);
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
    const table = document.getElementById("passTable");
    var counter= 0;
    var tableRows = table.getElementsByTagName('tr');
    var rowCount = tableRows.length;
    for (var x=rowCount-1; x>0; x--) {
      table.removeChild(tableRows[x]);
    }
    window.location.href = "/add_passcode";
  }

  function nextSlide()
  {
    document.getElementById("pass1").style.display = "none";
    document.getElementById("pass2").style.display = "block";
  }
  function nextSlide1()
  {
    document.getElementById("pass2").style.display = "none";
    document.getElementById("pass3").style.display = "block";
  }
  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  function nextSlide2()//time to collect the form responses and make a database entry. 
  {
    //document.getElementById("pass3").style.display = "none";
    //document.getElementById("pass4").style.display = "block";

    //importing form responses.
    let label = document.getElementById("label").value;
    let dateOfExpiry = document.getElementById("dateOfExpiry").value;
    let hasNumbers= document.getElementById("hasNumbers").checked;
    let hasUppercase = document.getElementById("hasUppercase").checked;
    let hasLowercase = document.getElementById("hasLowercase").checked;
    let hasSpecial = document.getElementById("hasSpecial").checked;
    let passwordLength = document.getElementById("passwordLength").value;
    try 
    {
      var db = firebase.firestore();
    }
    catch (error) 
    {
      document.getElementById("hmm").innerHTML = error;
      return;
    }//connect to db to enter data. 
    var ranString ="";
    if(hasNumbers==true)
    {
        ranString = ranString+"0123456789";
    }
    if(hasUppercase==true)
    {
        ranString = ranString+"ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if(hasLowercase==true)
    {
        ranString = ranString+"abcdefghijklmnopqrstuvwxyz";
    }
    if(hasSpecial==true)
    {
        ranString = ranString+"!@#$%^&*()";
    }
    var inputPass = randomString(passwordLength, ranString);
    //Math.random().toString(36).substring(parseInt(passwordLength));
    var finalObject = 
    {
        owner_uid: firebase.auth().currentUser.uid,
        label: label,
        dateOfExpiry: dateOfExpiry,
        password: inputPass
    }
    db.collection("passwords").add(finalObject)
      .then((docRef)=>
      {
        //window.location.href = "/dashboard";
        document.getElementById("pass3").style.display = "none";
        document.getElementById("pass4").style.display = "block";
        document.getElementById("finalPass").innerText = inputPass;
      })
      .catch((error)=>
      {
        document.getElementById("hmm").innerHTML = error;
      })


  }
  function finalSlide()
  {
    window.location.href = "/dashboard";
  }