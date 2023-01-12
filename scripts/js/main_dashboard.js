// liste des widget tradingview et leur config
var symbols_tradingview = [
  { 
    "symbol": "BINANCE:BTCUSDT", 
    "interval": "D", 
    "theme": "light", 
    "timezone" : "Etc/UTC",
    "container_id": "tv-chart-container-1",
    "indicators": [
      { "id": "BB", "params": {"length": 20} }, 
      { "id": "MACD", "params": {"fastPeriod": 12, "slowPeriod": 26, "signalPeriod": 9} }, 
      { "id": "IchimokuCloud", "params": {"tenkanPeriod": 9, "kijunPeriod": 26, "senkouPeriod": 52} }, 
      { "id": "RSI", "params": {"length": 14} }
    ] 
  },
  { 
    "symbol": "BINANCE:ETHUSDT", 
    "interval": "D", 
    "theme": "dark", 
    "timezone" : "Etc/UTC", 
    "container_id": "tv-chart-container-2",
    "indicators": [
      { "id": "BB", "params": {"length": 20} }, 
      { "id": "MACD", "params": {"fastPeriod": 12, "slowPeriod": 26, "signalPeriod": 9} }, 
      { "id": "IchimokuCloud", "params": {"tenkanPeriod": 9, "kijunPeriod": 26, "senkouPeriod": 52} }, 
      { "id": "RSI", "params": {"length": 14} }
    ] 
  },
  { 
    "symbol": "BINANCE:MATICUSDT", 
    "interval": "D", 
    "theme": "dark", 
    "timezone" : "Etc/UTC", 
    "container_id": "tv-chart-container-3",
    "indicators": [
      { "id": "BB", "params": {"length": 20} }, 
      { "id": "MACD", "params": {"fastPeriod": 12, "slowPeriod": 26, "signalPeriod": 9} }, 
      { "id": "IchimokuCloud", "params": {"tenkanPeriod": 9, "kijunPeriod": 26, "senkouPeriod": 52} }, 
      { "id": "RSI", "params": {"length": 14} }
    ] 
  },
  { 
    "symbol": "BINANCE:AVAXUSDT", 
    "interval": "D", 
    "theme": "light", 
    "timezone" : "Etc/UTC", 
    "container_id": "tv-chart-container-4",
    "indicators": [
      { "id": "BB", "params": {"length": 20} }, 
      { "id": "MACD", "params": {"fastPeriod": 12, "slowPeriod": 26, "signalPeriod": 9} }, 
      { "id": "IchimokuCloud", "params": {"tenkanPeriod": 9, "kijunPeriod": 26, "senkouPeriod": 52} }, 
      { "id": "RSI", "params": {"length": 14} }
    ] 
  },
  { 
    "symbol": "BINANCE:XRPUSDT", 
    "interval": "D", 
    "theme": "light", 
    "timezone" : "Etc/UTC", 
    "container_id": "tv-chart-container-5",
    "indicators": [
      { "id": "BB", "params": {"length": 20} }, 
      { "id": "MACD", "params": {"fastPeriod": 12, "slowPeriod": 26, "signalPeriod": 9} }, 
      { "id": "IchimokuCloud", "params": {"tenkanPeriod": 9, "kijunPeriod": 26, "senkouPeriod": 52} }, 
      { "id": "RSI", "params": {"length": 14} }
    ] 
  },
  { 
    "symbol": "BINANCE:DOGEUSDT", 
    "interval": "D", 
    "theme": "dark", 
    "timezone" : "Etc/UTC", 
    "container_id": "tv-chart-container-6",
    "indicators": [
      { "id": "BB", "params": {"length": 20} }, 
      { "id": "MACD", "params": {"fastPeriod": 12, "slowPeriod": 26, "signalPeriod": 9} }, 
      { "id": "IchimokuCloud", "params": {"tenkanPeriod": 9, "kijunPeriod": 26, "senkouPeriod": 52} }, 
      { "id": "RSI", "params": {"length": 14} }
    ] 
  },
  { 
    "symbol": "USDX", 
    "interval": "D", 
    "theme": "dark", 
    "timezone" : "Etc/UTC", 
    "container_id": "tv-chart-container-7",
    "indicators": [
      { "id": "BB", "params": {"length": 20} }, 
      { "id": "MACD", "params": {"fastPeriod": 12, "slowPeriod": 26, "signalPeriod": 9} }, 
      { "id": "IchimokuCloud", "params": {"tenkanPeriod": 9, "kijunPeriod": 26, "senkouPeriod": 52} }, 
      { "id": "RSI", "params": {"length": 14} }
    ] 
  },
  { 
    "symbol": "AAPL", 
    "interval": "D", 
    "theme": "light", 
    "timezone" : "Etc/UTC", 
    "container_id": "tv-chart-container-8",
    "indicators": [
      { "id": "BB", "params": {"length": 20} }, 
      { "id": "MACD", "params": {"fastPeriod": 12, "slowPeriod": 26, "signalPeriod": 9} }, 
      { "id": "IchimokuCloud", "params": {"tenkanPeriod": 9, "kijunPeriod": 26, "senkouPeriod": 52} }, 
      { "id": "RSI", "params": {"length": 14} }
    ] 
  }
];



// les données qui décrivent les actions pour les trades "spot"
const spots = [
  { type: 1, color: "red", action: "VENTE" },
  { type: 2, color: "green", action: "ACHAT" }
];

// les données qui décrivent les actions pour les trades "futures"
const futures = [
  { type: 1, color: "red", action: "OPEN SHORT" },
  { type: 2, color: "#ADFF2F", action: "OPEN LONG" },
  { type: 3, color: "green", action: "CLOSE LONG" },
  { type: 4, color: "#800000", action: "CLOSE SHORT" }
];

// Fonction qui récupère la configuration de l'interface
function getConfigInterface(){
  // Création d'un objet contenant la requête à envoyer
  var data = {
    requete : "config_dashboard"
  };
  // Appel de la fonction requete_server avec en paramètre le data, l'url et la fonction de callback
  requete_server(data, "scripts/php/interface.php", traitement_config_interface);
}

// Fonction qui envoie une requête à un serveur
function requete_server(data, url, callback){
  $.ajax({
    url: url,
    data: data,
    dataType: 'JSON',
    success: function(reponse) {
      if(reponse.status == "false"){
        //$('.loader-bg').fadeOut('slow');
        alert("Erreur");
      }
      else{
        // Appel de la fonction de callback (traitement_config_interface) avec en paramètre la réponse
        callback(reponse);
      }
    },
    error: function(xhr) {
      alert("Error look in console");
      console.log(xhr);
    }
  });
}


function traitement_config_interface(arg) {
  var html = '<h1><center>' + arg.titre_dashboard + '</center></h1>';
  html += "<ul>";
  html += '<li><a href="#general">Global</a></li>';

  arg.liste_bots.forEach(({ nom_bot, wallet_db, orderbook_db, type, initale_wallet, evolution_wallet, liste_trade }) => {
    const nom_bot_no_space = nom_bot.replace(/\s+/g, '_');
    html += `<li><a href="#${nom_bot_no_space}">${nom_bot}</a></li>`;
  });

  html += '<li><a href="#tradingview_dashboard">TradingView Dashboard</a></li>';
  html += '<li><a href="#macro_dashboard">Macro Dashboard</a></li>';
  html += '<div id="general">';
  html += '<h2><center>Global</center></h2>';
  html += '<div class="graph">';
  html += '<h3>Graphique</h3>';
  html += '<div id="container_general"></div>';
  html += '</div>';
  html += '</div>';

  arg.liste_bots.forEach(({ nom_bot, initale_wallet, wallet_db, orderbook_db, type, evolution_wallet, liste_trade }) => {
    const nom_bot_no_space = nom_bot.replace(/\s+/g, '_');
  
    html += `<div id="${nom_bot_no_space}">`;
    html += `<h2><center>${nom_bot}</center></h2>`;
    html += '<div class="graph">';
    html += '<h3>Graphique</h3>';
    html += `<table width='100%'>`;
    html += `<tr>`;
    html += `<td>`;
    html += `<h4>Wallet Initial : <span id="initial_wallet_${nom_bot_no_space}">${initale_wallet}</span></h4>`;
    html += `</td>`;
    html += `<td>`;
    html += `<h4>Wallet Actuel : <span id="wallet_actual_${nom_bot_no_space}"></span></h4>`;
    html += `</td>`;
    html += `<td>`;
    html += `<h4>Evolution : <span id="evolution_${nom_bot_no_space}"></span></h4>`;
    html += `</td>`;
    html += `</tr>`;
    html += `</table>`;
    html += `<div id="container_${nom_bot_no_space}"></div>`;
    html += '</div>';
    html += '<div class="orderBook" >';
    html += '<h3>Liste des trades</h3>';
    html += `<div class="orderBook_content" id="contenu_orderBook_${nom_bot_no_space}">`;
    html += '</div>';
    html += '</div>';
    html += '</div>';
  });

  html += '<div id="tradingview_dashboard">';
  html += '<h2><center>Tradingview Dashboard</center></h2>';

  symbols_tradingview.forEach(symbol => {
      html += `<div id="${symbol.container_id}" class="tv-chart-container"></div>`;
  });

  html += '</div>';
  

  html += '<div id="macro_dashboard">';
  html += '<h2><center>Macro Dashboard</center></h2>';
  html += '<coingecko-coin-price-marquee-widget  coin-ids="bitcoin,ethereum,eos,ripple,litecoin" currency="usd" background-color="#ffffff" locale="en"></coingecko-coin-price-marquee-widget>'
  html += '<div  class="fullsize" >';
  html += '<coingecko-coin-heatmap-widget  id="map_thermique" height="1000" width="100%"  locale="fr"></coingecko-coin-heatmap-widget>'
  html += '</div>';
  html += '</div>';


  html += "</ul>";

  $("#tabs").html(html);
  $( "#tabs" ).tabs({
    activate: function(event, ui) {
      console.dir(ui.newPanel[0].id)
       if (ui.newPanel[0].id == "macro_dashboard") {
          window.dispatchEvent(new Event('resize'));
       }
    }
 });
  affiche_graph(arg);
  affiche_trades(arg);
  affiche_trading_view()
  
}

/**
 * Fonction pour afficher les trades pour chaque bot dans une table HTML
 * @param {Object} arg - l'objet qui contient les données des bots 
 * @param {Array} arg.liste_bots - liste des bots avec leurs données
 */
function affiche_trades(arg) {
  // Récupération de la liste des bots
  const listeBots = arg.liste_bots;

  // Parcours de chaque bot
  listeBots.forEach((bot) => {
    // Récupération des données du bot
    const { nom_bot, wallet_db, orderbook_db, type, initale_wallet, evolution_wallet, liste_trade } = bot;
    
    // Initialisation de la variable HTML
    let html = "<table width='100%'>";

    // Création du header du tableau HTML
    html += '<tr>';
    html += '<th>Action  </th>';
    html += '<th>Symbole</th>';
    html += '<th>Montant</th>';
    html += '<th>Prix</th>';
    html += '</tr>';
    
    // Vérification du type de trading
    if (type == "spots") {
      // Parcours de la liste des trades pour les spots
      
      liste_trade.forEach((trade) => {
        // Initialisation de la variable action
        let action = "";
        
        // Vérification de l'action
        if (trade.type == 1) {
          action = spots.find(x=>x.type==trade.type).action;
          html += `<tr style='color:${spots.find(x=>x.type==trade.type).color}'>`;
        } else if (trade.type == 2) {
          action = spots.find(x=>x.type==2).action;
          html += `<tr style='color:${spots.find(x=>x.type==2).color}'>`;
        }
        
        // Ajout des colonnes du tableau HTML pour les spots
        html += "<td style='text-align: center'>";
        html += action;
        html += "</td>";
        html += "<td style='text-align: center'>";
        html += trade.symbol;
        html += "</td>";
        html += "<td style='text-align: center'>";
        html += trade.amount;
        html += "</td>";
        html += "<td style='text-align: center'>";
        html += trade.price;
        html += "</td>";
        html += "</tr>";
      });
    } 

    else if (type == "futures") {
      // Parcours de la liste des trades pour les futures
      liste_trade.forEach((trade) => {
        // Initialisation de la variable action
        let action = "";

        // Vérification de l'action pour les futures
        if (trade.type == 1) {
          action = futures.find(x=>x.type==1).action;
          html += `<tr style='color:${futures.find(x=>x.type==1).color}'>`;
        } else if (trade.type == 2) {
          action = futures.find(x=>x.type==2).action;
          html += `<tr style='color:${futures.find(x=>x.type==2).color}'>`;
        }else if (trade.type == 3) {
          action = futures.find(x=>x.type==3).action;
          html += `<tr style='color:${futures.find(x=>x.type==3).color}'>`;
        }else if (trade.type == 4) {
          action = futures.find(x=>x.type==4).action;
          html += `<tr style='color:${futures.find(x=>x.type==4).color}'>`;
        }

        // Ajout des colonnes du tableau HTML pour les futures
        html += "<td style='text-align: center'>";
        html += action;
        html += "</td>";
        html += "<td style='text-align: center'>";
        html += trade.symbol;
        html += "</td>";
        html += "<td style='text-align: center'>";
        html += trade.amount;
        html += "</td>";
        html += "<td style='text-align: center'>";
        html += trade.price;
        html += "</td>";
        html += "</tr>";
      });
    }
    // Ajout de la fin de la table HTML
    html += "</table>";
    
    // Remplacement des espaces du nom du bot par des underscores
    const nomBotNoSpace = nom_bot.replace(/\s+/g, '_');
    // Insertion du tableau HTML dans le DOM
    $(`#contenu_orderBook_${nomBotNoSpace}`).html(html);


  });
}

function affiche_graph(arg){
  var liste_bots = arg.liste_bots;
  var series_general = [];

  arg.liste_bots.forEach((item, index) => {
    var nom_bot = item.nom_bot;
    var nom_bot_no_space = nom_bot.replace(/\s+/g, '_');
    var wallet_db = item.wallet_db;
    var orderbook_db = item.orderbook_db;
    var type = item.type;
    var initale_wallet = item.initale_wallet;
    var evolution_wallet = item.evolution_wallet;
    var liste_trade = item.liste_trade;

    let data_chart_2 = [];
    let nb_data = 1

    var series_general_infos ={ 
      "name" : nom_bot,
      "data" : []
    }
    var wallet_value = [];
    evolution_wallet.forEach((item, index) => {
 
      let date_value = item.date.split("-");
      let annee = date_value[0];
      let mois = date_value[1];
      let jour = date_value[2];

      data2={
        x: new Date(annee, mois - 1, jour),
        y: parseInt(item.value),
        name:formatDate(new Date(annee, mois - 1, jour))
      };
      
      data_global={
        x: new Date(annee, mois - 1, jour),
        y: parseInt(item.value),
        name:formatDate(new Date(annee, mois - 1, jour))
      };

      
      series_general_infos.data.push(data_global);
      data_chart_2.push(data2);
      wallet_value.push(item.value)
      nb_data = nb_data + 1;

    });
   
    var lastItem = wallet_value.pop();
    $("#wallet_actual_"+nom_bot_no_space).text(lastItem)

    let wallet_base =  $("#initial_wallet_"+nom_bot_no_space).text();
      
    let evolution = ((lastItem - wallet_base)/wallet_base)*100
    let res = evolution.toFixed(2);

    $("#evolution_"+nom_bot_no_space).text(res + " %")

    if(evolution > 0){
        $("#evolution_"+nom_bot_no_space).css({ 'color': 'green' });
    }
    else if(evolution < 0){
        $("#evolution_"+nom_bot_no_space).css({ 'color': 'red' });
    }
    else{
        $("#evolution_"+nom_bot_no_space).css({ 'color': 'white' });
    }
    series_general.push(series_general_infos);
    createLineChart(data_chart_2, 'container_' + nom_bot_no_space, nom_bot)

  });
  
  createLineChartGlobal(series_general, "container_general")
}











function createLineChart(data, container, nom_bot) {
   // On crée un tableau pour stocker les données pour chaque série de données
  var currentSeries = {
      name: nom_bot,
      data: []
  };

  for (var j = 0; j < data.length; j++) {
      // On ajoute les données pour cette série
      currentSeries.data.push([data[j].x, data[j].y]);
  }

  // On utilise la fonction map pour parcourir les éléments de data, et pour chaque élément,
  // on utilise la fonction Date() pour créer un objet date à partir de la chaîne de caractères ISO8601
  // Puis on utilise `getDate()`, `getMonth()` and `getFullYear()` pour extraire les valeurs pour les jour, mois et année
  // On concatene ces valeurs en utilisant les "/" comme séparateur
  var xCategories = currentSeries.data.map(function(point) {
  var date = new Date(point[0]);
  var day = date.getDate().toString().padStart(2, '0');
  var month = (date.getMonth() + 1).toString().padStart(2, '0');
  var year = date.getFullYear();
  return `${day}/${month}/${year}`;
  });

  // On utilise la fonction map pour parcourir les éléments de data, et pour chaque élément,
  // on utilise l'index pour créer un array avec l'index + 1 et la valeur y
  var dataPoints = currentSeries.data.map(function(point, index) {
  return [index + 1, point[1]];
  });

   // On utilise la méthode Highcharts pour créer le graphique
  Highcharts.chart(container, {
    chart: {
      type: 'line',
      zoomType: 'xy', // permet de zoomer uniquement sur l'axe des x
      panKey: 'shift', // permet de panoramiquer en maintenant la touche shift enfoncée
      panning: true, // permet de panoramiquer en utilisant la souris
      resetZoomButton: {
          position: {
              align: 'right', // positionne le bouton de reset de zoom à droite
              verticalAlign: 'top', // positionne le bouton de reset de zoom en haut
              x: -10,
              y: 10
          },
          relativeTo: 'chart' // le bouton de reset de zoom est relatif au graphique
      }
    },
    title: {
      text: 'Evolution wallet ' + nom_bot
    },
    xAxis: {
      title: {
          text: 'Categories'
      },
      categories: xCategories
    },
    yAxis: {
        title: {
            text: 'Valeur'
        }
    },
    series: [{
      name: nom_bot,
      data: dataPoints
    }]
  });
}


function createLineChartGlobal(data, container) {
  // On crée un tableau pour stocker les données pour chaque série de données
  var seriesData = [];
  // On parcours le tableau data pour remplir les données pour chaque série
  for (var i = 0; i < data.length; i++) {
      var currentSeries = {
          name: data[i].name,
          data: []
      };
      for (var j = 0; j < data[i].data.length; j++) {
          // On ajoute les données pour cette série
          currentSeries.data.push([data[i].data[j].x, data[i].data[j].y]);
      }
      // On ajoute la série avec ses données au tableau des séries
      seriesData.push(currentSeries);
  }

  // On utilise la méthode Highcharts pour créer le graphique
  Highcharts.chart(container, {
    chart: {
      type: 'line',
      zoomType: 'xy', // permet de zoomer uniquement sur l'axe des x
      panKey: 'shift', // permet de panoramiquer en maintenant la touche shift enfoncée
      panning: true, // permet de panoramiquer en utilisant la souris
      resetZoomButton: {
          position: {
              align: 'right', // positionne le bouton de reset de zoom à droite
              verticalAlign: 'top', // positionne le bouton de reset de zoom en haut
              x: -10,
              y: 10
          },
          relativeTo: 'chart' // le bouton de reset de zoom est relatif au graphique
      }
    },
    title: {
        text: 'Evolution des wallets'
    },
    xAxis: {
        type: 'datetime',
        title: {
            text: 'Date'
        }
    },
    yAxis: {
        title: {
            text: 'Valeur'
        }
    },
    series: seriesData
  });
}



function affiche_trading_view(){
  // Boucle pour créer les widgets pour chaque symbole dans symbols_tradingview
  symbols_tradingview.forEach(function(symbol) {
    new TradingView.widget({
      "autosize": true,
      "symbol": symbol.symbol,
      "interval": symbol.interval,
      "timezone": symbol.timezone,
      "theme": symbol.theme,
      "container_id": symbol.container_id,
      "studies": symbol.indicators.map(function(study) { return study.id + "@tv-basicstudies"}),
      "withdateranges": true,
      "hide_side_toolbar": false,
      "allow_symbol_change": true,
      "details": true,
      "hotlist": true,
      "calendar": true,
      "onChartReady": function() {
        var chart = this.chart();
        symbol.indicators.forEach(function(study) {
          chart.createStudy(study.id, false, false, study.params);
        });
      }
    });
  })
}


//Fonction pour formater une date en utilisant un format de type "jj/mm/aaaa"
function formatDate(date) {
  //Utilisation de la fonction padTo2Digits pour ajouter un 0 devant les chiffres < 10
  const day = padTo2Digits(date.getDate());
  const month = padTo2Digits(date.getMonth() + 1);
  const year = date.getFullYear();
  //Retourne la date formatée sous la forme "jj/mm/aaaa"
  return `${day}/${month}/${year}`;
}

//Fonction pour ajouter un 0 devant les nombres < 10
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

//Fonction pour récupérer le dernier élément d'un tableau
const getLastArrItem = (arr) => { 
  //Déclaration de la variable lastItem qui prend la valeur du dernier élément du tableau
  let lastItem=arr[arr.length-1];  
  return lastItem;
} 