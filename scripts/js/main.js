
function get_config_interface(){
    var data = {
        requete : "config_dashboard"
    };
    requete_server(data, "scripts/php/interface.php", traitement_config_interface)
}

function traitement_config_interface(arg){
    var html = '<h1><center>' + arg.titre_dashboard + '</center></h1>'
    html = html + "<ul>";
    html = html + '<li><a href="#general">Global</a></li>';
    arg.liste_bots.forEach((item, index) => {
        var nom_bot = item.nom_bot;
        var nom_bot_no_space = nom_bot.replace(/\s+/g, '_');
        var wallet_db = item.wallet_db;
        var orderbook_db = item.orderbook_db;
        var type = item.type;
        var initale_wallet = item.initale_wallet;
        var evolution_wallet = item.evolution_wallet;
        var liste_trade = item.liste_trade;

        html = html + '<li><a href="#' + nom_bot_no_space + '">' + nom_bot + '</a></li>';
    })

    html = html + '<li><a href="#tradingview_dashboard">TradingView Dashboard</a></li>';

    html = html + '<div id="general">';
    html = html + '<h2><center>Global</center></h2>';
    
    html = html + '<div class="graph">';
        html = html + '<h3>Graphique</h3>';
        html = html + '<div id="container_general"></div>';
    html = html + '</div>';

            
            
        html = html + '</div>';
    arg.liste_bots.forEach((item, index) => {
        var nom_bot = item.nom_bot;
        var nom_bot_no_space = nom_bot.replace(/\s+/g, '_');
        var wallet_db = item.wallet_db;
        var orderbook_db = item.orderbook_db;
        var type = item.type;
        var initale_wallet = item.initale_wallet;
        var evolution_wallet = item.evolution_wallet;
        var liste_trade = item.liste_trade;

        html = html + '<div id="' + nom_bot_no_space + '">';
            html = html + '<h2><center>' + nom_bot + '</center></h2>';
            
            html = html + '<div class="graph">';
                html = html + '<h3>Graphique</h3>';
                html = html + "<table width='100%'>"
                    html = html + "<tr>"
                        html = html + "<td>"
                        html = html + '<h4>Wallet Initial : <span id="initial_wallet_'+nom_bot_no_space+'">' + initale_wallet + '</span></h4>';
                        html = html + "</td>"
                        html = html + "<td>"
                        html = html + '<h4>Wallet Actuel : <span id="wallet_actual_'+nom_bot_no_space+'"></span></h4>';
                        html = html + "</td>"
                        html = html + "<td>"
                        html = html + '<h4>evolution : <span id="evolution_'+nom_bot_no_space+'"></span></h4>';
                        html = html + "</td>"
                    html = html + "</tr>"
                html = html + "</table>"
                html = html + '<div id="container_' + nom_bot_no_space + '"></div>';
            html = html + '</div>';

            html = html + '<div class="orderBook" >';
                html = html + '<h3>Liste des trades</h3>';
                html = html + '<div class="orderBook_content" id="contenu_orderBook_' + nom_bot_no_space + '">';
                
                html = html + '</div>';
            html = html + '</div>';
            
        html = html + '</div>';
    })



    html = html + '<div id="tradingview_dashboard">';
        html = html + '<h2><center>tradingview_dashboard</center></h2>';
        
        html = html + '<div id="tv-chart-container-1" class="tv-chart-container"></div>';
        html = html + '<div id="tv-chart-container-2" class="tv-chart-container"></div>';
        html = html + '<div id="tv-chart-container-3" class="tv-chart-container"></div>';
        html = html + '<div id="tv-chart-container-4" class="tv-chart-container"></div>';
        html = html + '<div id="tv-chart-container-5" class="tv-chart-container"></div>';
        html = html + '<div id="tv-chart-container-6" class="tv-chart-container"></div>';
        html = html + '<div id="tv-chart-container-7" class="tv-chart-container"></div>';
        html = html + '<div id="tv-chart-container-8" class="tv-chart-container"></div>';
        
        
    html = html + '</div>';








    html = html + "</ul>";
    $("#tabs").html(html);
    $( "#tabs" ).tabs();

    affiche_graph(arg);
    affiche_trades(arg);
    affiche_trading_view()

}


function affiche_trading_view(){
    new TradingView.widget(
        {
          "autosize": true,
          "symbol": "BINANCE:BTCUSDT",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "fr",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "container_id": "tv-chart-container-1",
          
        }
      );
      new TradingView.widget(
        {
          "autosize": true,
          "symbol": "BINANCE:ETHUSDT",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "fr",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "container_id": "tv-chart-container-2"
        }
      );
      new TradingView.widget(
        {
          "autosize": true,
          "symbol": "BINANCE:MATICUSDT",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "fr",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "container_id": "tv-chart-container-3"
        }
      );
      new TradingView.widget(
        {
          "autosize": true,
          "symbol": "BINANCE:AVAXUSDT",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "fr",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "container_id": "tv-chart-container-4"
        }
      );

      new TradingView.widget(
        {
          "autosize": true,
          "symbol": "BINANCE:XRPUSDT",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "fr",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "container_id": "tv-chart-container-5"
        }
      );

      new TradingView.widget(
        {
          "autosize": true,
          "symbol": "BINANCE:DOGEUSDT",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "fr",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "container_id": "tv-chart-container-6"
        }
      );

      new TradingView.widget(
        {
          "autosize": true,
          "symbol": "FX_IDC:USD",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "fr",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "container_id": "tv-chart-container-7"
        }
      ); 
      
      new TradingView.widget(
        {
          "autosize": true,
          "symbol": "AAPL",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "fr",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "container_id": "tv-chart-container-8"
        }
      );

}


function affiche_trades(arg){
    var liste_bots = arg.liste_bots;
    arg.liste_bots.forEach((item, index) => {
        var nom_bot = item.nom_bot;
        var nom_bot_no_space = nom_bot.replace(/\s+/g, '_');
        var wallet_db = item.wallet_db;
        var orderbook_db = item.orderbook_db;
        var type = item.type;
        var initale_wallet = item.initale_wallet;
        var evolution_wallet = item.evolution_wallet;
        var liste_trade = item.liste_trade;

        var html = "<table width='100%'>"

        html = html + '<tr>';
        html = html + '<th>Type Trade  </th>';
        html = html + '<th>Symbole</th>';
        html = html + '<th>Montant</th>';
        html = html + '<th>Price</th>';
        
        html = html + '</tr>';
    
        //console.dir(liste_trade)

        if(type == "spots"){

            liste_trade.forEach((item, index) => {
                //console.log(item)
                var type_trade = "";
                if(item.type == 1){
                    type_trade = "VENTE"
                    html = html + "<tr style='color:red'>"
                }

                if(item.type == 2){
                    type_trade = "ACHAT"
                    html = html + "<tr style='color:green'>"
                }
                
                    html = html + "<td style='text-align: center'>"
                    html = html + type_trade;
                    html = html + "</td>"
                    html = html + "<td style='text-align: center'>"
                    html = html + item.symbol;
                    html = html + "</td>"
                    html = html + "<td style='text-align: center'>"
                    html = html + item.amount;
                    html = html + "</td>"
                    html = html + "<td style='text-align: center'>"
                    html = html + item.price;
                    html = html + "</td>"
                html = html + "</tr>"
            })

        }
        if(type == "futures"){
            liste_trade.forEach((item, index) => {
                //console.log(item)
                var type_trade = "";
                if(item.type == 1){
                    type_trade = "OPEN SHORT"
                    html = html + "<tr style='color:red'>"
                }

                if(item.type == 2){
                    type_trade = "OPEN LONG"
                    html = html + "<tr style='color:#ADFF2F'>"
                }

                if(item.type == 3){
                    type_trade = "CLOSE LONG"
                    html = html + "<tr style='color:green'>"
                }

                if(item.type == 4){
                    type_trade = "CLOSE SHORT"
                    html = html + "<tr style='color:#800000'>"
                }

                
                    html = html + "<td style='text-align: center'>"
                    html = html + type_trade;
                    html = html + "</td>"
                    html = html + "<td style='text-align: center'>"
                    html = html + item.symbol;
                    html = html + "</td>"
                    html = html + "<td style='text-align: center'>"
                    html = html + item.amount;
                    html = html + "</td>"
                    html = html + "<td style='text-align: center'>"
                    html = html + item.price;
                    html = html + "</td>"
                html = html + "</tr>"
            })
        }





        
        html = html + "</table>"
        $("#contenu_orderBook_"+nom_bot_no_space).html(html);
    })
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
        
        
         let data_chart = [];
        let data_chart_2 = [];
        let nb_data = 1
        let value_x_txt = [];
        
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
                
           let val_txt = formatDate(new Date(annee, mois - 1 , jour))
            
           value_x_txt.push(val_txt);
           
           data2={
                x: nb_data,
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
        })
        
        var lastItem = wallet_value.pop();
        $("#wallet_actual_"+nom_bot_no_space).text(lastItem)
       // '"wallet_actual_'+nom_bot_no_space+'"'

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
        Highcharts.chart('container_' + nom_bot_no_space, {
            chart: {
                type: 'line',
                
            },
            title: {
                text: 'Evolution wallet ' + nom_bot
            },
  
            yAxis: {
                title: {
                    text: 'Valeur du wallet (en USD)'
                }
            },
  
            xAxis: {
                title: {
                    text: 'Date'
                },
                type: "datetime",
                /*labels: {
                    formatter: function() {
                      return Highcharts.dateFormat('%e/%m/%Y', this.value);
                    }
                  },*/
                categories: value_x_txt
              } ,
  
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
  
           plotOptions: {
                
                series: {
                    label: {
                        connectorAllowed: true
                    },
                    pointStart: 2010
                }
            },
  
            series: [{
                name: 'Wallet ' + nom_bot,
                data: data_chart_2
              }],
  
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
        

        series_general.push(series_general_infos)  
    })
    
    
    Highcharts.chart('container_general', {
        chart: {
            type: 'line',
            
        },
        title: {
            text: 'Evolution wallet Global'
        },

        yAxis: {
            title: {
                text: 'Valeur du wallet (en USD)'
            }
        },

        xAxis: {
            title: {
                text: 'Date'
            },
            type: "datetime",
            /*labels: {
                formatter: function() {
                  return Highcharts.dateFormat('%e/%m/%Y', this.value);
                }
              },*/
            //categories: value_x_txt
          } ,

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

       plotOptions: {
            
            series: {
                label: {
                    connectorAllowed: true
                },
                pointStart: 2010
            }
        },

        series: series_general,

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
function  requete_server(data, url, callback){
    $.ajax({
        url: url,
        data: data,
        dataType: 'JSON',
        success: function(reponse) {
          if(reponse.status === "false"){
            //$('.loader-bg').fadeOut('slow');
            alert("Erreur");
          }
          else{
            callback(reponse)
            
          }
        },
        error: function(xhr) {
          alert("Error look in console");
          console.log(xhr);
        }
      });
  }
  


  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }
  
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  const getLastArrItem = (arr) => { 
    let lastItem=arr[arr.length-1];  
    //console.log(`Last element is ${lastItem}`); 
  } 


  // Crée une fonction pour ouvrir le widget en plein écran
function openFullscreen() {
    if (div.requestFullscreen) {
      div.requestFullscreen();
    } else if (div.mozRequestFullScreen) {
      div.mozRequestFullScreen();
    } else if (div.webkitRequestFullscreen) {
      div.webkitRequestFullscreen();
    } else if (div.msRequestFullscreen) {
      div.msRequestFullscreen();
    }
  }