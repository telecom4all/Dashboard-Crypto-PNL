<!DOCTYPE html>
<html>
<head>
    <title>Dashboard Crypto</title>
    
    <link href="scripts/css/jquery-ui.css" rel="stylesheet">
    <link href="scripts/css/style.css" rel="stylesheet">
    <script src="https://code.highcharts.com/stock/highstock.js"></script>
    <script src="https://code.highcharts.com/modules/annotations.js"></script>
    <script src="https://code.highcharts.com/stock/modules/data.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    
</head>

<body>
    <div class="main"> 
        <div style = 'width:100%'>
            
            
            <div id="tabs">
            
            </div>

            <div class='credit'>Auteur : AngelZ<br><span style='font-size: 15px;'></span></div>
        </div>
    </div>
</body>

<script src="scripts/js/jquery.js"></script>
<script src="scripts/js/jquery-ui.js"></script>
<script src="scripts/js/main.js"></script>
<<script>
    $( document ).ready(function() {
        Highcharts.setOptions({
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
});

        get_config_interface();
        
    });
    
</script>

<script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
</html>  