//Variables Glogal
var config_interface;
var liste_bots = [];
var isAuthenticated;
var isFirstLoad = "True";

//chatgpt variable
var api_openai;
var chatOutput;
var chatInput;
var chatSubmit;
var spinner;
var messageHistory = [];


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
 
// les donn??es qui d??crivent les actions pour les trades "spot"
const spots = [
  { type: 1, color: "red", action: "VENTE" },
  { type: 2, color: "green", action: "ACHAT" }
];

// les donn??es qui d??crivent les actions pour les trades "futures"
const futures = [
  { type: 1, color: "red", action: "OPEN SHORT" },
  { type: 2, color: "#ADFF2F", action: "OPEN LONG" },
  { type: 3, color: "green", action: "CLOSE LONG" },
  { type: 4, color: "#800000", action: "CLOSE SHORT" }
];

// Fonction qui r??cup??re la configuration de l'interface
function getConfigInterface(){
  
  if (sessionStorage.getItem("isAuthenticated") !== null && typeof sessionStorage.getItem("isAuthenticated") !== "undefined" && sessionStorage.getItem("isAuthenticated") === "True") {
    // Cr??ation d'un objet contenant la requ??te ?? envoyer
    var data = {
      requete : "config_dashboard"
    };
    // Appel de la fonction requete_server avec en param??tre le data, l'url et la fonction de callback
    requete_server(data, "scripts/php/interface.php", traitement_config_interface);

  } else {
    $("#main").empty();
    var html_login = '<div class="div_login">';
    html_login += '<h2 class="titre_page"><center>Authentification</center></h2>';
    html_login += '<center>';
    html_login += '<div id="password-form">';
    html_login += '<label for="password">Mot de passe:</label>';
    html_login += '<input type="password" id="password" name="password">';
    html_login += '<button type="Connexion" onclick="connexion_dashboard(this)">Se connecter</button>';
    html_login += '</div>';
    html_login += '<center>'; 
    html_login += '</div">';
    
    //insertion du de la div  dans la page 
    $("#main").html(html_login)

  }

}


function connexion_dashboard(arg){
  var password = $("#password").val();
  if (password !== null && typeof password !== "undefined" && password.trim() !== "") {
    var data = {
        requete : "get_auth",
        password : password
    };

    $.post("scripts/php/interface.php", data, function(data) {
      var data_json = JSON.parse(data);

      if (data_json.status === "True") {
        sessionStorage.setItem("isAuthenticated", "True");
        location.reload();
      } else {
        if (data_json.status === "False") {
          alert("Mauvais mot de passe");
        } else {
          alert("Une erreur inattendue s'est produite. Veuillez r??essayer plus tard.");
        }
      }
    }).fail(function() {
      alert("Une erreur de r??seau s'est produite. Veuillez r??essayer plus tard.");
    });


  } else {
    alert("Le mot de passe est vide");
  }
}

function getInfosbots(){
  var data = {
    requete : "bot_infos"
  };
  // Appel de la fonction requete_server avec en param??tre le data, l'url et la fonction de callback
  requete_server(data, "scripts/php/interface.php", traitement_infos_bots);
}

function traitement_infos_bots(arg){
  liste_bots = [];
  var bots = arg.liste_bots
  
  bots.forEach((bot) => {
    initial_wallet = bot.initale_wallet
    nom_bot = bot.nom_bot
    type = bot.type
    wallet_db = bot.wallet_db
    nom_bot_no_space = nom_bot.replace(/\s+/g, '_');
    liste_trade = bot.liste_trade;
    evolution_wallet = bot.evolution_wallet;


    var dataChart = [];
    var wallet_value = [];
    evolution_wallet.forEach((item, index) => {
     
      wallet_value.push(item.value)
      var text = formatDateMin(new Date(item.date))
      data={
        x: new Date(item.date),
        y: parseInt(item.value),
        name:text
      };
      dataChart.push(data);
      
    });

    let data_chart = {
      dataChart : dataChart,
      container : 'graph_exchange_'+nom_bot_no_space,
      nom_dashboard : nom_bot
    }

    var lastItem = wallet_value.pop();

    let data_bot = {
      lastItemWallet : lastItem,
      initial_wallet : initial_wallet,
      nom_bot : nom_bot,
      type : type,
      wallet_db : wallet_db,
      nom_bot_no_space : nom_bot_no_space,
      liste_trade : liste_trade,
      evolution_wallet : evolution_wallet,
      data_chart : data_chart
    }

    liste_bots.push(data_bot);
  });
  
  if(isFirstLoad == "True"){
    isFirstLoad = "False";
    affiche_bots_global();
  }
}

// Fonction qui envoie une requ??te ?? un serveur
function requete_server(data, url, callback){
  $.ajax({
    url: url,
    data: data,
    dataType: 'JSON',
    success: function(reponse) {
      if(reponse.status == "False"){
        alert("Erreur");
      }
      else{
        // Appel de la fonction de callback avec en param??tre la r??ponse
        callback(reponse);
      }
    },
    error: function(xhr) {
      alert("Error look in console");
      console.log(xhr);
    }
  });
}

// fonction onclick_bt_menu
function onclick_bt_menu(id){
  $(".bt_menu").removeClass("menu_selected");
  $("#"+id).addClass("menu_selected");
  $("#"+id).css("background-color", "lightgray");
  if(id == "tradingview_dashboard"){
    affiche_trading_view();
  }
  else if(id == "macro_dashboard"){
    affiche_macro();
  }
  else if(id == "exchange_dashboard"){
    affiche_list_exchange(config_interface);
  }
  else if(id == "general"){
    affiche_bots_global();
  }
  else if(id == "ChatGPT"){
    affiche_chatgpt();
  }
  else if(id == "deconnexion"){
    let result = confirm("Voulez-vous vraiment vous deconnecter ?");
    if (result) {
      sessionStorage.setItem("isAuthenticated", "False");
      location.reload();
    } 
  }
  else{
    affiche_bot(id);
  }
  
}




// Fonction pour configurer l'interface
function traitement_config_interface(arg) {
  config_interface = arg.config_interface;
  let titre_dashboard = '<h1 class="titre_dashboard"><center>' + config_interface.titre + '</center></h1>';
  let is_exchange = config_interface.exchanges_infos.isExchangeRecap;
  api_openai = config_interface.api_openai;

  $("#titre_dashboard").html(titre_dashboard)

  /*******************/
  /* Gestion du menu */
  /*******************/

  // Boutton status global des bots
  let html_menu = '<button class="bt_menu bp_normal" id="general" onclick="onclick_bt_menu(this.id)">Global</button>';

  
  //cr??ation des bouton du menu pour les diff??rent bot
  config_interface.liste_bot.forEach(({ nom_bot }) => {
    const nom_bot_no_space = nom_bot.replace(/\s+/g, '_');
    html_menu += '<button class="bt_menu bp_normal" id="' + nom_bot_no_space + '" onclick="onclick_bt_menu(this.id)">' + nom_bot + '</button>';
  });

  if(is_exchange == "True"){
    // Boutton wallet exchange
    html_menu += '<button class="bt_menu bp_normal" id="exchange_dashboard" onclick="onclick_bt_menu(this.id)">Exchange Dashboard</button>';
  }
  // Boutton Tradingview
  html_menu += '<button class="bt_menu bp_normal" id="tradingview_dashboard" onclick="onclick_bt_menu(this.id)">TradingView Dashboard</button>';
  // Boutton Macro
  html_menu += '<button class="bt_menu bp_normal" id="macro_dashboard" onclick="onclick_bt_menu(this.id)">Macro Dashboard</button>';

  //ChatGPT
  html_menu += '<button class="bt_menu bp_normal" id="ChatGPT" onclick="onclick_bt_menu(this.id)">Chat GPT Perso</button>';


  // Boutton Deconnexion
  html_menu += '<button class="bt_menu bp_deco" id="deconnexion" onclick="onclick_bt_menu(this.id)">Deconexion</button>';


  //insertion du menu dans la page 
  $("#menu").html(html_menu)

  /***********************/
  /* Fin Gestion du menu */
  /***********************/
  getInfosbots();
}

//affichage de chat gpt
function affiche_chatgpt(){
  $("#main").empty();

  var root = document.baseURI;
  var html_chatgpt = '<h2 class="titre_page"><center>Chat GPT Perso</center></h2>';
  html_chatgpt += '<div class="spinner">';
  html_chatgpt += '<img src="'+root+'Book.gif" alt="Loading spinner">';
  html_chatgpt += '</div>';
  html_chatgpt += '<div id="chat-container">';
  html_chatgpt += '<div id="chat-output"></div>';
  html_chatgpt += '<textarea id="chat-input" placeholder="Tapez votre message ici" rows="10"></textarea>';
  html_chatgpt += '<button id="chat-submit">Envoyer</button>';
  html_chatgpt += '';
  
  html_chatgpt += '</div>';
      
  $("#main").html(html_chatgpt);  


  chatOutput = document.getElementById("chat-output");
  chatInput = document.getElementById("chat-input");
  chatSubmit = document.getElementById("chat-submit");
  spinner = document.querySelector(".spinner");
  messageHistory = [];

  chatSubmit.addEventListener("click", function () {
    //R??cup??rer le message entr?? par l'utilisateur
    const message = chatInput.value;
    //Vider la zone de saisie de message
    chatInput.value = "";

    //Ajouter le message ?? l'historique des messages
    messageHistory.push(message);

    // Show the spinner
    //spinner.classList.add("active");
    alert(api_openai)
    showSpinner();

    // Utiliser fetch pour envoyer le message et l'historique ?? GPT et obtenir une r??ponse
    
    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+api_openai
      },
      body: JSON.stringify({
          model: "text-davinci-003",
          prompt: messageHistory.join(' '),
          temperature: 0.7,
          max_tokens: 4000,
          n:1,
      })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const response = data.choices[0].text;
        let responseType = 'text';
        if (/(\{|\}|\(|\)|\[|\])/.test(response)) {
            responseType = 'code';
        }
        chatOutput.innerHTML += `<div class="question">You: ${message}</div>`;
        chatOutput.innerHTML += `<div class="response ${responseType}"><pre>${response}</pre></div>`;

        // Hide the spinner
        hideSpinner();
    })
    .catch(error => {
        console.error('Error:', error);
        alert("il y a eu une erreur relancer la question avec peut etre moins de mot")
        hideSpinner();
    });
});
  
}

//affichage de la partie tradingview
function affiche_trading_view(){
  $("#main").empty();

  let html_tradingview = '<div id="tradingview_dashboard">';
  html_tradingview += '<h2 class="titre_page"><center>Tradingview Dashboard</center></h2>';

  symbols_tradingview.forEach(symbol => {
    html_tradingview += `<div id="${symbol.container_id}" class="tv-chart-container"></div>`;
  });

  html_tradingview += '</div>';
  //insertion du de la div tradingview_dashboard dans la page 
  $("#main").html(html_tradingview)
  
  // Boucle pour cr??er les widgets pour chaque symbole dans symbols_tradingview
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


//affichage de la partie macro 
function affiche_macro(){
  $("#main").empty();
  html_macro = '<div id="macro_dashboard">';
  html_macro += '<h2><center>Macro Dashboard</center></h2>';
  html_macro += '<coingecko-coin-price-marquee-widget  coin-ids="bitcoin,ethereum,eos,ripple,litecoin" currency="usd" background-color="#ffffff" locale="en"></coingecko-coin-price-marquee-widget>'
  html_macro += '<div  class="fullsize" >';
  html_macro += '<coingecko-coin-heatmap-widget  id="map_thermique" height="1000" width="100%"  locale="fr"></coingecko-coin-heatmap-widget>'
  html_macro += '</div>';
  html_macro += '</div>';
  $("#main").html(html_macro)

}

//affichage de la liste des wallet sur les exchanges
function affiche_list_exchange(config_interface){
  $("#main").empty();
  
  let nom_db_exchange = config_interface.exchanges_infos.nom_db;
  var data = {
    requete : "data_exchanges",
    db : nom_db_exchange
  };
  // Appel de la fonction requete_server avec en param??tre le data, l'url et la fonction de callback
  requete_server(data, "scripts/php/interface.php", traitement_liste_exchange);

}

function traitement_liste_exchange(arg){
  let tableau_data_chart = [];

  let html_exchange = '<h2 class="titre_page"><center>Evolution des wallet sur les exchanges</center></h2>';
  
  let exchanges = config_interface.exchanges_infos.exchanges;
  
  let nb_exchange = 0
 
  var liste_nom_exchange_ledger=[];

  exchanges.forEach((exchange) => {
    nb_exchange = nb_exchange + 1;
    initial_wallet = exchange.initial_wallet
    nom_dashboard = exchange.nom_dashboard
    nom_exchange = exchange.nom_exchange
    
    if (nom_exchange.indexOf("ledger") !== -1) {
      liste_nom_exchange_ledger.push({"nom_exchange": nom_exchange, "initial_wallet" : initial_wallet});
  }

    if (nb_exchange % 2 === 0) {
      html_exchange += `<div class="pair div_exchange">`;
    } else {
      html_exchange += `<div class="impair div_exchange">`;
    }
    
    var dataChart = [];
    var wallet_value = [];
    arg.walletExchange.forEach((item, index) => {
      if(item.name == nom_exchange){
        wallet_value.push(item.value)
        var text = formatDateMin(new Date(item.date))
        data={
          x: new Date(item.date),
          y: parseInt(item.value),
          name:text
        };
        dataChart.push(data);
      }
    });

    var lastItem = 0;
    let evolution = 0;
    let res = 0;
    if(nom_exchange.indexOf("ledger") === -1){
      lastItem = wallet_value.pop();
      evolution = ((lastItem - initial_wallet)/initial_wallet)*100
      res = evolution.toFixed(2);
      let data_chart = {
        dataChart : dataChart,
        container : 'graph_exchange_'+nom_exchange,
        nom_dashboard : nom_dashboard
      }
      
      tableau_data_chart.push(data_chart);

    }
    
    

    html_exchange += `<h4><center>${nom_dashboard}</center></h4>`;
    html_exchange += `<table width='100%'>`;
    html_exchange += `<tr>`;
    html_exchange += `<td>`;
    html_exchange += `<h4>Wallet Initial : <span id="initial_wallet_${nom_exchange}">${initial_wallet}</span></h4>`;
    html_exchange += `</td>`;
    html_exchange += `<td>`;
    html_exchange += `<h4>Wallet Actuel : <span id="wallet_actual_${nom_exchange}">${lastItem}</span></h4>`;
    html_exchange += `</td>`;
    html_exchange += `<td>`;
    if(evolution > 0){
      html_exchange += `<h4>Evolution : <span id="evolution_${nom_exchange}" style="color: green">${res} %</span></h4>`;
    }
    else if(evolution < 0){
      html_exchange += `<h4>Evolution : <span id="evolution_${nom_exchange}" style="color: red">${res} %</span></h4>`;
    }
    else{
      html_exchange += `<h4>Evolution : <span id="evolution_${nom_exchange}" style="color: white">${res} %</span></h4>`;
    }
    
    html_exchange += `</td>`;
    html_exchange += `</tr>`;
    html_exchange += `</table>`;
  
    html_exchange += `<div id="graph_exchange_${nom_exchange}"></div>`;
    html_exchange += `</div>`;
    
   
  });
  $(`#main`).html(html_exchange);

  affiche_ledger(arg, liste_nom_exchange_ledger);

  tableau_data_chart.forEach((data_chart) => {
    affichage_graph(data_chart)
  });
}

function affiche_ledger(arg, liste_nom_exchange_ledger){
  liste_nom_exchange_ledger.forEach((item, index) => {
    nom_ledger = item.nom_exchange
    initial_wallet = item.initial_wallet
    var dataFiltrer = [];
    var wallet_value = [];
    arg.walletExchange.forEach((item, index) => {
      if (item.name.indexOf(nom_ledger) !== -1) {
       data = {
        "name":item.name,
        "value":item.value,
        "timestamp":item.timestamp,
        "date":item.date        
       }
       dataFiltrer.push(data)       
      }
    });
    
    var result = {};
    var uniqueNames = [];
    for (var i = 0; i < dataFiltrer.length; i++) {
      var name = dataFiltrer[i].name;
      if (uniqueNames.indexOf(name) === -1) {
        uniqueNames.push(name);
        Object.defineProperty(result, name, { value: [], writable: true, enumerable: true, configurable: true });
      }
      // On ajoute un objet contenant les informations sp??cifi??es ?? la propri??t?? correspondante
      result[name].push({date: dataFiltrer[i].date, value: dataFiltrer[i].value, timestamp: dataFiltrer[i].timestamp});
    }

    var wallet_total_exchange = [];
    var series_general = [];
    for (var prop in result) {
      var data_wallet_ledger = result[prop]
      var nom = prop
      let nom_dashboard = "";
      var serie_var = [];
      data_wallet_ledger.forEach((item, index) => {
        if(nom == nom_ledger){
          nom_dashboard = nom.charAt(0).toUpperCase() + nom.slice(1).replace(/_/g, " ");
          wallet_total_exchange.push(item.value)

        }
        else{
          nom_dashboard = nom.replace(/^.*_/, ""); // remplace tout ce qui pr??c??de "_" par une cha??ne vide
          nom_dashboard = nom_dashboard.slice(0,1).toUpperCase() + nom_dashboard.slice(1);

        } 
        
        var text = formatDateMin(new Date(item.date))
        var data={
          x: new Date(item.date),
          y: parseInt(item.value),
          name:text
        };
        serie_var.push(data)
        
      });

      let data_chart = {
        dataChart : serie_var,
        nom_variable : nom,
        nom_dashboard : nom_dashboard
      }

      series_general.push(data_chart)

    
    }
    
    var lastItem = wallet_total_exchange.pop();
    let evolution = ((lastItem - initial_wallet)/initial_wallet)*100
    let res = evolution.toFixed(2);
    $("#wallet_actual_"+nom_ledger).text(lastItem)
    $("#evolution_"+nom_ledger).text(res + " %")
    if(evolution > 0){
      $("#evolution_"+nom_ledger).css("color", "green"); 
    }
    else if(evolution < 0){
      $("#evolution_"+nom_ledger).css("color", "red"); 
    }
    else{
      $("#evolution_"+nom_ledger).css("color", "white"); 
    }

     
    affiche_graph_ledger(series_general, nom_ledger);
  });
  
}

function affiche_graph_ledger(series, nom_ledger){
  
  var seriesData = [];
  // On parcours le tableau data pour remplir les donn??es pour chaque s??rie
  for (var i = 0; i < series.length; i++) {
    var currentSeries = {
        name: series[i].nom_dashboard,
        data: []
    };
    for (var j = 0; j < series[i].dataChart.length; j++) {
        // On ajoute les donn??es pour cette s??rie
        currentSeries.data.push([series[i].dataChart[j].x, series[i].dataChart[j].y]);
    }
    // On ajoute la s??rie avec ses donn??es au tableau des s??ries
    seriesData.push(currentSeries);
  }

  nom_dashboard = nom_ledger.charAt(0).toUpperCase() + nom_ledger.slice(1).replace(/_/g, " ");
  // On utilise la m??thode Highcharts pour cr??er le graphique
  var chart = new Highcharts.chart('graph_exchange_'+nom_ledger, {
    chart: {
      type: 'line',
      zoomType: 'xy', // permet de zoomer uniquement sur l'axe des x
      panKey: 'shift', // permet de panoramiquer en maintenant la touche shift enfonc??e
      panning: true, // permet de panoramiquer en utilisant la souris
      resetZoomButton: {
          position: {
              align: 'right', // positionne le bouton de reset de zoom ?? droite
              verticalAlign: 'top', // positionne le bouton de reset de zoom en haut
              x: -10,
              y: 10
          },
          relativeTo: 'chart' // le bouton de reset de zoom est relatif au graphique
      }
    },
    title: {
        text: 'Evolution des wallets de ' + nom_dashboard
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

function affiche_bots_global(){
  $("#main").empty(); 
  var series_general = [];
  html_bots_global = '<h2 class="titre_page"><center>Vue g??n??ral de bots</center></h2>'
  liste_bots.forEach((bot) => {
      let nom_bot = bot.nom_bot;
      let initial_wallet = bot.initial_wallet;
      let nom_bot_no_space = bot.nom_bot_no_space;
      let type = bot.type;
      let wallet_db = bot.wallet_db;
      let lastItemWallet = bot.lastItemWallet;
      let evolution = ((lastItemWallet - initial_wallet)/initial_wallet)*100
      let res = evolution.toFixed(2);
      
      series_general.push(bot.data_chart)
  })

  html_bots_global += `<div id="container_general"></div>`;
  $(`#main`).html(html_bots_global);

  affichage_graph_bot_global(series_general)

}

function affiche_bot(id){
  $("#main").empty(); 
  
  liste_bots.forEach((bot) => {
    if(bot.nom_bot_no_space == id){
      let nom_bot = bot.nom_bot;
      let initial_wallet = bot.initial_wallet;
      let nom_bot_no_space = bot.nom_bot_no_space;
      let type = bot.type;
      let wallet_db = bot.wallet_db;
      let lastItemWallet = bot.lastItemWallet;
      let evolution = ((lastItemWallet - initial_wallet)/initial_wallet)*100
      let res = evolution.toFixed(2);

      let html_bot = `<div class="div_bot_affichage">`;
      html_bot += `<h2 class="titre_page"><center>${nom_bot}</center></h2>`;
      html_bot += `<table width='100%'>`;
      html_bot += `<tr>`;
      html_bot += `<td>`;
      html_bot += `<h4>Wallet Initial : <span id="initial_wallet_${nom_bot_no_space}">${initial_wallet}</span></h4>`;
      html_bot += `</td>`;
      html_bot += `<td>`;
      html_bot += `<h4>Wallet Actuel : <span id="wallet_actual_${nom_bot_no_space}">${lastItemWallet}</span></h4>`;
      html_bot += `</td>`;
      html_bot += `<td>`;
      if(evolution > 0){
        html_bot += `<h4>Evolution : <span id="evolution_${nom_bot_no_space}" style="color: green">${res} %</span></h4>`;
      }
      else if(evolution < 0){
        html_bot += `<h4>Evolution : <span id="evolution_${nom_bot_no_space}" style="color: red">${res} %</span></h4>`;
      }
      else{
        html_bot += `<h4>Evolution : <span id="evolution_${nom_bot_no_space}" style="color: white">${res} %</span></h4>`;
      }
      
      html_bot += `</td>`;
      html_bot += `</tr>`;
      html_bot += `</table>`;
    
      html_bot += `<div id="graph_exchange_${nom_bot_no_space}"></div>`;


      html_bot += `<div id="list_trade${nom_bot_no_space}">`;
      html_bot += "<table width='100%'>";
      // Cr??ation du header du tableau HTML
      html_bot += '<tr>';
      html_bot += '<th>Action  </th>';
      html_bot += '<th>Symbole</th>';
      html_bot += '<th>Montant</th>';
      html_bot += '<th>Prix</th>';
      html_bot += '</tr>';

      // V??rification du type de trading
      if (type == "spots") {
        bot.liste_trade.forEach((trade) => {
          // Initialisation de la variable action
          let action = "";
          
          // V??rification de l'action
          if (trade.type == 1) {
            action = spots.find(x=>x.type==trade.type).action;
            html_bot += `<tr style='color:${spots.find(x=>x.type==trade.type).color}'>`;
          } else if (trade.type == 2) {
            action = spots.find(x=>x.type==2).action;
            html_bot += `<tr style='color:${spots.find(x=>x.type==2).color}'>`;
          }

          // Ajout des colonnes du tableau HTML pour les spots
          html_bot += "<td style='text-align: center'>";
          html_bot += action;
          html_bot += "</td>";
          html_bot += "<td style='text-align: center'>";
          html_bot += trade.symbol;
          html_bot += "</td>";
          html_bot += "<td style='text-align: center'>";
          html_bot += trade.amount;
          html_bot += "</td>";
          html_bot += "<td style='text-align: center'>";
          html_bot += trade.price;
          html_bot += "</td>";
          html_bot += "</tr>";
        })
      } 
      else if (type == "futures") {
        bot.liste_trade.forEach((trade) => {
          // Initialisation de la variable action
          let action = "";

          // V??rification de l'action pour les futures
          if (trade.type == 1) {
            action = futures.find(x=>x.type==1).action;
            html_bot += `<tr style='color:${futures.find(x=>x.type==1).color}'>`;
          } else if (trade.type == 2) {
            action = futures.find(x=>x.type==2).action;
            html_bot += `<tr style='color:${futures.find(x=>x.type==2).color}'>`;
          }else if (trade.type == 3) {
            action = futures.find(x=>x.type==3).action;
            html_bot += `<tr style='color:${futures.find(x=>x.type==3).color}'>`;
          }else if (trade.type == 4) {
            action = futures.find(x=>x.type==4).action;
            html_bot += `<tr style='color:${futures.find(x=>x.type==4).color}'>`;
          }

          // Ajout des colonnes du tableau HTML pour les futures
          html_bot += "<td style='text-align: center'>";
          html_bot += action;
          html_bot += "</td>";
          html_bot += "<td style='text-align: center'>";
          html_bot += trade.symbol;
          html_bot += "</td>";
          html_bot += "<td style='text-align: center'>";
          html_bot += trade.amount;
          html_bot += "</td>";
          html_bot += "<td style='text-align: center'>";
          html_bot += trade.price;
          html_bot += "</td>";
          html_bot += "</tr>";
        })
      } 
      // Ajout de la fin de la table HTML
      html_bot += "</table>";


      html_bot += `</div>`;


      html_bot += `</div>`;
      $(`#main`).html(html_bot);
      

      affichage_graph_bot(bot.data_chart)
    }
  
  });

  
  

}


function affichage_graph_bot_global(series_general){
  // On cr??e un tableau pour stocker les donn??es pour chaque s??rie de donn??es
  var seriesData = [];
  // On parcours le tableau data pour remplir les donn??es pour chaque s??rie
  for (var i = 0; i < series_general.length; i++) {
    var currentSeries = {
        name: series_general[i].nom_dashboard,
        data: []
    };
    for (var j = 0; j < series_general[i].dataChart.length; j++) {
        // On ajoute les donn??es pour cette s??rie
        currentSeries.data.push([series_general[i].dataChart[j].x, series_general[i].dataChart[j].y]);
    }
    // On ajoute la s??rie avec ses donn??es au tableau des s??ries
    seriesData.push(currentSeries);
  }
  // On utilise la m??thode Highcharts pour cr??er le graphique
  var chart = new Highcharts.chart('container_general', {
    chart: {
      type: 'line',
      zoomType: 'xy', // permet de zoomer uniquement sur l'axe des x
      panKey: 'shift', // permet de panoramiquer en maintenant la touche shift enfonc??e
      panning: true, // permet de panoramiquer en utilisant la souris
      resetZoomButton: {
          position: {
              align: 'right', // positionne le bouton de reset de zoom ?? droite
              verticalAlign: 'top', // positionne le bouton de reset de zoom en haut
              x: -10,
              y: 10
          },
          relativeTo: 'chart' // le bouton de reset de zoom est relatif au graphique
      }
    },
    title: {
        text: 'Evolution des wallets des Bots'
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

function affichage_graph_bot(data_chart){
  // On cr??e un tableau pour stocker les donn??es pour chaque s??rie de donn??es
  var currentSeries = {
    name: data_chart.nom_dashboard,
    data: []
  };
  for (var j = 0; j < data_chart.dataChart.length; j++) {
    // On ajoute les donn??es pour cette s??rie
      currentSeries.data.push([data_chart.dataChart[j].x, data_chart.dataChart[j].y]);
  }

  // On utilise la fonction map pour parcourir les ??l??ments de data, et pour chaque ??l??ment,
  // on utilise la fonction Date() pour cr??er un objet date ?? partir de la cha??ne de caract??res ISO8601
  // Puis on utilise `getDate()`, `getMonth()` and `getFullYear()` pour extraire les valeurs pour les jour, mois et ann??e
  // On concatene ces valeurs en utilisant les "/" comme s??parateur
  var xCategories = currentSeries.data.map(function(point) {
    var date = new Date(point[0]);
    var day = date.getDate().toString().padStart(2, '0');
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var year = date.getFullYear();
    return `${day}/${month}/${year}`;
  });

  // On utilise la fonction map pour parcourir les ??l??ments de data, et pour chaque ??l??ment,
  // on utilise l'index pour cr??er un array avec l'index + 1 et la valeur y
  var dataPoints = currentSeries.data.map(function(point, index) {
    return [index + 1, point[1]];
  });


  // On utilise la m??thode Highcharts pour cr??er le graphique
  var chart = new Highcharts.chart(data_chart.container, {
    chart: {
      type: 'line',
      zoomType: 'xy', // permet de zoomer uniquement sur l'axe des x
      panKey: 'shift', // permet de panoramiquer en maintenant la touche shift enfonc??e
      panning: true, // permet de panoramiquer en utilisant la souris
      resetZoomButton: {
          position: {
              align: 'right', // positionne le bouton de reset de zoom ?? droite
              verticalAlign: 'top', // positionne le bouton de reset de zoom en haut
              x: -10,
              y: 10
          },
          relativeTo: 'chart' // le bouton de reset de zoom est relatif au graphique
      }
    },
    title: {
      text: 'Evolution wallet ' + data_chart.nom_dashboard
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
      name: data_chart.nom_dashboard,
      data: dataPoints
    }]
  });
}



function affichage_graph(data_chart){
  
    // On utilise la m??thode Highcharts pour cr??er le graphique
    var chart = new Highcharts.chart(data_chart.container, {
      chart: {
        type: 'line',
        zoomType: 'xy', // permet de zoomer uniquement sur l'axe des x
        panKey: 'shift', // permet de panoramiquer en maintenant la touche shift enfonc??e
        panning: true, // permet de panoramiquer en utilisant la souris
        resetZoomButton: {
            position: {
                align: 'right', // positionne le bouton de reset de zoom ?? droite
                verticalAlign: 'top', // positionne le bouton de reset de zoom en haut
                x: -10,
                y: 10
            },
            relativeTo: 'chart' // le bouton de reset de zoom est relatif au graphique
        }
      },
      title: {
        text: 'Evolution wallet ' + data_chart.nom_dashboard
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
      series: [{
        name: data_chart.nom_dashboard,
        data: data_chart.dataChart
      }]
    });
}
















function showSpinner() {
  var div_general = document.getElementById("chat-container");
  spinner.classList.add("active");
  div_general.classList.remove("opa");
  
}

function hideSpinner() {
  var div_general = document.getElementById("chat-container");
  spinner.classList.remove("active");
  div_general.classList.add("opa");
}

//Fonction pour formater une date en utilisant un format de type "jj/mm/aaaa"
function formatDateMin(date) {
  //Utilisation de la fonction padTo2Digits pour ajouter un 0 devant les chiffres < 10
  const day = padTo2Digits(date.getDate());
  const month = padTo2Digits(date.getMonth() + 1);
  const year = date.getFullYear();
  let hour = date.getHours();
  let min = date.getMinutes();
  if (hour < 10) {
    hour = "0" + hour;
  }

  if (min < 10) {
    min = "0" + min;
  }
  //Retourne la date format??e sous la forme "jj/mm/aaaa"
  return `${day}/${month}/${year} ${hour}:${min}`;
} 

//Fonction pour ajouter un 0 devant les nombres < 10
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

//Fonction pour r??cup??rer le dernier ??l??ment d'un tableau
const getLastArrItem = (arr) => { 
  //D??claration de la variable lastItem qui prend la valeur du dernier ??l??ment du tableau
  let lastItem=arr[arr.length-1];  
  return lastItem;
} 