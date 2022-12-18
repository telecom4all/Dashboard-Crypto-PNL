<!DOCTYPE html>
<html>

<?php require 'script.php'; ?>
<head>
<title>Bot Crypto Status</title>
<script src="https://code.highcharts.com/stock/highstock.js"></script>
<script src="https://code.highcharts.com/modules/annotations.js"></script>
<script src="https://code.highcharts.com/stock/modules/data.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<link rel="stylesheet" href="style.css">


</head>
<body>
  
<script type="text/javascript">
  var list_bot=["big_will"];

  var anc_onglet = 'Big_Will'; 

  function change_onglet(name) {
    //console.log(name)
    let db = "";
    if(name == "Big_Will"){
      db = 'big_will';
      db_order = 'big_will_orderBook';
      document.getElementById('onglet_bot_Big_Will').className = 'onglet_1 onglet';
      //document.getElementById('onglet_bot_Aligator').className = 'onglet_0 onglet';
      //document.getElementById('onglet_bot_Grid_1').className = 'onglet_0 onglet';





      
    }
    if(name == "Aligator"){
      db = 'aligator';
      db_order = 'aligator_orderBook';
      document.getElementById('onglet_bot_Big_Will').className = 'onglet_0 onglet';
      document.getElementById('onglet_bot_Aligator').className = 'onglet_1 onglet';
      document.getElementById('onglet_bot_Grid_1').className = 'onglet_0 onglet';
    }

    if(name == "Grid_1"){
      db = 'grid_1';
      db_order = 'grid_1_orderBook';
      document.getElementById('onglet_bot_Big_Will').className = 'onglet_0 onglet';
      document.getElementById('onglet_bot_Aligator').className = 'onglet_0 onglet';
      document.getElementById('onglet_bot_Grid_1').className = 'onglet_1 onglet';
    }

    var data = {
      requete : "affiche_contenu_onglet_top", 
      db : db
    };

    $.ajax({
      url: "request.php",
      data: data,
      success: function(reponse) {
        if(reponse.status === "false"){
          //$('.loader-bg').fadeOut('slow');
          alert("Erreur");
        }
        else{
          $("#contenu_onglet_top").html(reponse)
          if(db == "aligator" || db == "big_will"){
            affiche_orderBook(db_order);  
          }
         
          if(db == "grid_1" ){
            affiche_orderBook_grid_1(db);  
          }
          
        }
      },
      error: function(xhr) {
        alert("Error look in console");
        console.log(xhr);
      }
    });
     
  }

  function  affiche_orderBook_grid_1(db){
  var data = {
      requete : "affiche_orderBook_grid_1", 
      db : db
    };
    $.ajax({
      url: "request.php",
      data: data,
      success: function(reponse) {
        if(reponse.status === "false"){
          //$('.loader-bg').fadeOut('slow');
          alert("Erreur");
        }
        else{
          let html = "<h2>Carnet d'ordres</h2>";
          html = html + "<table>";
            html = html + "<tr>";
              html = html + "<td>TYPE</td>";
              html = html + "<td>QUANTITÉ</td>";
              html = html + "<td>SYMBOL</td>";
              html = html + "<td>PRIX</td>";
              html = html + "</tr>";
          
          var jsonData = JSON.parse(reponse);
          var sortedData= jsonData.sort((function (a, b) { return new Date(b.datetime) - new Date(a.datetime) }));
          for (let index = 0; index < sortedData.length; index++) {
            html = html + '<tr>';
            const element = sortedData[index];
            //const element = JSON.parse(myArray[index]);
            console.log(element);
            html = html + '<td>';
              if(element.side == "sell"){
                html = html + '<span class="HighlightRed">Vente</span>';
              }
              if(element.side == "buy"){
                html = html + '<span class="HighlightGreen">Achat</span>';
              }
            html = html + '</td>';
            html = html + '<td>';
              html = html + element.amount;
            html = html + '</td>';
            html = html + '<td>';
              html = html + element.symbol;
            html = html + '</td>';
            html = html + '<td>';
              html = html + element.price;
            html = html + '</td>';
            
            html = html + '</tr>';
          }
          //console.dir(sortedData);
          $("#contenu_onglet_bottom").html(html)
          
        }
      },
      error: function(xhr) {
        alert("Error look in console");
        console.log(xhr);
      }
    });
}


function  affiche_orderBook(db_order){
  var data = {
      requete : "affiche_orderBook", 
      db : db_order
    };
    $.ajax({
      url: "request.php",
      data: data,
      success: function(reponse) {
        if(reponse.status === "false"){
          //$('.loader-bg').fadeOut('slow');
          alert("Erreur");
        }
        else{
          $("#contenu_onglet_bottom").html(reponse)
          
        }
      },
      error: function(xhr) {
        alert("Error look in console");
        console.log(xhr);
      }
    });
}



function  affiche_graph(){
  var data = {
      requete : "data_graph", 
      db : list_bot
    };
    $.ajax({
      url: "request.php",
      data: data,
      success: function(reponse) {
        if(reponse.status === "false"){
          //$('.loader-bg').fadeOut('slow');
          alert("Erreur");
        }
        else{
          var myArray = JSON.parse(reponse);
          //console.dir(reponse);
          let data_chart = [];
          for (let index = 0; index < myArray.length; index++) {
            const element = JSON.parse(myArray[index]);
            console.log(element);
            data_chart.push(element);
          }
          Highcharts.chart('container', {

          title: {
              text: 'Evolution des différents wallets'
          },

          yAxis: {
              title: {
                  text: 'Valeur du wallet (en $)'
              }
          },

          xAxis: {
              type: 'datetime'
          },

          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
          },

          plotOptions: {
              series: {
                  label: {
                      connectorAllowed: false
                  },
                  pointStart: 2010
              }
          },

          series: data_chart,

          responsive: {
              rules: [{
                  condition: {
                      maxWidth: 500
                  },
                  chartOptions: {
                      legend: {
                          layout: 'horizontal',
                          align: 'center',
                          verticalAlign: 'bottom'
                      }
                  }
              }]
          }

          }); 
          
        }
      },
      error: function(xhr) {
        alert("Error look in console");
        console.log(xhr);
      }
    });
}



</script>
<div class="main"> 
<div style = 'display:flex;justify-content: space-between;'>
<div style ='margin-left:3%;'><h1>Dashboard : </h1>
</div>

<!-- Affichage du menu des onglets -->
  <div class="onglets">
    <span class="onglet_0 onglet" id="onglet_bot_Big_Will" onclick="change_onglet('Big_Will')">Big_Will </span>
  <!--  <span class="onglet_1 onglet" id="onglet_bot_Aligator" onclick="change_onglet('Aligator')">Aligator </span> -->
  <!--  <span class="onglet_1 onglet" id="onglet_bot_Grid_1" onclick="change_onglet('Grid_1')">Grid_1 </span> -->
    
  </div>
</div>

<!-- Affichage du contenu des onglets supérieur -->
  <div class="contenu_onglet" id="contenu_onglet_top" style="display:block">
    
  </div>


<!-- Affichage du graph -->
  <div class="graph">
    <h2>Graphique</h2>
    <div id="container"></div>
  </div>

<!-- Affichage du contenu des onglets inférieur -->
<div class="orderBook contenu_onglet" id="contenu_onglet_bottom">

</div>

  
    <div class='credit'>Auteur : AngelZ<br><span style='font-size: 15px;'></span></div>
</div>


<script type="text/javascript">
 // var anc_onglet = 'bot1';
 // change_onglet(anc_onglet);
 

 
</script>

<!-- Script affichage du graph  -->
<script>
$(document).ready(function() {
    



    affiche_graph();
    change_onglet(anc_onglet);




    
  });

</script>

</body>
</html>