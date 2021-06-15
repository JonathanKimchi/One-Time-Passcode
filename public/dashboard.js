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

  var docIDs=[];
  var passIDs = [];
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
      var counter = 0;
      /*var tableRows = table.getElementsByTagName('tr');
      var rowCount = tableRows.length;
      for (var x=rowCount-1; x>0; x--) {
        table.removeChild(tableRows[x]);
      }*/
      var today = new Date();
      var dd = String(today.getDate())
      var mm = today.getMonth(); //January is 0!
      var yyyy = today.getFullYear();
      docIDs.push("padding");
      passIDs.push("padding");
      query.get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              counter = counter+1;
              docIDs.push(doc.id);
              let row = table.insertRow();
              let label = row.insertCell(0);
              let dateOfExpiry = row.insertCell(1);
              let password = row.insertCell(2);
              label.innerHTML = doc.data().label;
              var date = doc.data().dateOfExpiry.split("-");
              var tempDate = new Date(parseInt(date[0]),parseInt(date[1])-1,parseInt(date[2]));
              passIDs.push(doc.data().password);
              dateOfExpiry.innerHTML = doc.data().dateOfExpiry;
              if(tempDate.getTime()<=today.getTime())
              {
                password.innerHTML = '<button onclick=\"showPassword('+counter+');\" id = view'+counter+'>View</button>';
              }
              else
              {
                password.innerHTML = "Locked"
              }
              let modifyCol = row.insertCell(3);
              modifyCol.innerHTML = '<button onclick=\"editRow(this.id);\" id = '+counter+' class = \"smallbutton\">Edit</button>';
              document.getElementById("hmm").innerHTML = counter;
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
  function showPassword(id)
  {
    var oTable = document.getElementById('passTable');

  //gets rows of table
    var rowLength = oTable.rows.length;

    //loops through rows    
    for (i = 0; i < rowLength; i++){

      //gets cells of current row
      var oCells = oTable.rows.item(i).cells;
      if(i==id)
      {
        oCells.item(2).innerHTML=passIDs[id];
        let password;//Don't need this.
      }
      //gets amount of cells of current row
    }
  }
  function logout(){
    firebase.auth().signOut();
  }
  function editRow(id)
  {
    try
    {
      document.getElementById("hmm").innerHTML = id;
    }
    catch(error)
    {
      document.getElementById("hmm").innerHTML = error;
    }
    var oTable = document.getElementById('passTable');

  //gets rows of table
    var rowLength = oTable.rows.length;

    //loops through rows    
    for (i = 0; i < rowLength; i++){

      //gets cells of current row
      var oCells = oTable.rows.item(i).cells;
      if(i==id)
      {
        oCells.item(0).innerHTML="<input type=\"text\" id=label"+id+" value ="+oCells.item(0).innerHTML+">";
        oCells.item(1).innerHTML="<input type=\"date\" id=dateOfExpiry"+id+" min ="+oCells.item(1).innerHTML+">";
        oCells.item(3).innerHTML="<button onclick=\"saveRow("+id+");\" id="+id+">Done</button>";
        let password;//Don't need this.
      }
      //gets amount of cells of current row
    }
  }
  function saveRow(id)
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
      document.getElementById("hmm").innerHTML = id;
    }
    catch(error)
    {
      document.getElementById("hmm").innerHTML = error;
    }
    var oTable = document.getElementById('passTable');

    //gets rows of table
    var rowLength = oTable.rows.length;

    //loops through rows    
    for (i = 0; i < rowLength; i++){

      //gets cells of current row
      var oCells = oTable.rows.item(i).cells;
      if(i==id)
      {
        var label1 = document.getElementById("label"+id).value;
        var dateOfExpiry1 = document.getElementById("dateOfExpiry"+id).value;
        oCells.item(0).innerHTML=label1;
        oCells.item(1).innerHTML=dateOfExpiry1;
        oCells.item(3).innerHTML='<button onclick=\"editRow('+id+');\" id = '+i+' class = \"smallbutton\">Edit</button>';
        try
        {
          db.collection("passwords").doc(docIDs[id]).update({owner_uid: "3Qai2RXTZmTysniVAMVanyI0NGB3", password: "AQy8f3dC3e", label: label1, dateOfExpiry:dateOfExpiry1});
          document.getElementById("hmm").innerHTML = docIDs[id];
        }
        catch(error)
        {
          document.getElementById("hmm").innerHTML = error;
        }
      }
      //gets amount of cells of current row
    }
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