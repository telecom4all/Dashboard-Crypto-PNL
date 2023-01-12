<!DOCTYPE html>
<html>
<head>
    <!-- Ajout du charset -->
    <meta charset="utf-8">
    <title>Dashboard Crypto</title>
    <!-- Utilisation de balise link pour intégrer les fichiers css -->
    <link href="scripts/css/jquery-ui.css" rel="stylesheet">
    <link href="scripts/css/style.css" rel="stylesheet">
    <!-- Utilisation de balise script pour intégrer les fichiers js -->
    <script src="https://widgets.coingecko.com/coingecko-coin-heatmap-widget.js"></script>
    <script src="https://widgets.coingecko.com/coingecko-coin-price-marquee-widget.js"></script>
    <script src="https://code.highcharts.com/stock/highstock.js"></script>
    <script src="https://code.highcharts.com/modules/annotations.js"></script>
    <script src="https://code.highcharts.com/stock/modules/data.js"></script>
    <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
    <script type="text/javascript" src="https://s3.tradingview.com/tv-chart-library/charting_library.min.js"></script>
    <script type="text/javascript" src="https://s3.tradingview.com/tv-chart-library/i18n.js"></script>
    


</head>
<body>
    <div class="main">
        <div style="width:100%">
            <div id="tabs"></div>
            <div class="credit">Auteur : AngelZ</div>
        </div>
    </div>
    <!-- Intégration des fichiers js -->
    <script src="scripts/js/jquery.js"></script>
    <script src="scripts/js/jquery-ui.js"></script>
    <script src="scripts/js/main_dashboard.js"></script>
    <!-- Utilisation de $(document).ready pour attendre que le DOM soit chargé avant d'exécuter le code suivant -->
    <script>
        $(document).ready(function() {
            // Définition des couleurs pour Highcharts
            Highcharts.setOptions({
                colors: ["#058DC7","#50B432","#ED561B","#DDDF00","#24CBE5","#64E572","#FF9655","#FFF263","#6AF9C4"]
            });
            // Appel de la fonction getConfigInterface
            getConfigInterface();
        });
    </script>
</body>
</html>