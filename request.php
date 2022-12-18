<?php 

$servername = ""; // IP DE VOTRE BASE DE DONNÉE (peut être localhost, si vous hébergé sur votre serveur)
$username = ""; // Par défaut, root sur wamp
$password = ''; // Par défaut, vide sur wamp
$dbname = ""; //Nom de la base de donnée
$nb_bot = 2; // Nombre de bot dont vous voulez suivre l'évolution. Evidemment, il faut qu'ils aient chacun leur DB et le morceaux de code python qui permet d'ajouter les infos dans la DB
$bot_name = array("", "Big_Will"); // IMPORTANT DE LAISSER LE PREMIER ESPACE LIBRE !!!  REMPLIR AVEC LES NOMS QUE VOUS VOULEZ


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


if(isset($_GET['requete'])){
   // print_r($_GET['requete']);
   if($_GET['requete'] == "data_graph"){
    $nb = count($_GET['db']);
    $retour = array();
    for ($i = 0; $i <= $nb; $i++) {
        $db =  $_GET['db'][$i];
        $sql3 = "SELECT * FROM $db ORDER BY id";
        $result3 = $conn->query($sql3);
        //print_r($result3);
        $json_wallet = '{"name":"Bot_'.$db.'","data":';
        while($row3 = mysqli_fetch_array($result3, MYSQLI_ASSOC)) {
          $value = $row3['wallet'];
          $timestamp = strtotime($row3['date']) * 1000;
          $data[] = [$timestamp, (int)$value];
        }
       
            $json_wallet = $json_wallet . json_encode($data) . '}';   
          
        
        array_push($retour,$json_wallet);
       
      unset($data);
    }
    echo json_encode($retour);
   }
   

    if($_GET['requete'] == "affiche_orderBook"){
        $db = $_GET['db'];
        $sql = "SELECT * FROM $db ORDER BY id DESC LIMIT 10";
        $result = $conn->query($sql);

        echo '<h2>Carnet d\'ordres</h2>
        <table>
          <tr><td>TYPE</td><td>QUANTITÉ</td><td>SYMBOL</td><td>PRIX</td></tr>';
        if ($result->num_rows > 0) {
            // output data of each row
                while($row = $result->fetch_assoc()) {
                if($row["type"] == 1) {$order='<span class="HighlightRed">Vente</span>';} else {$order='<span class="HighlightGreen">Achat</span>';}
                echo "<tr><td>" . $order. "</td><td>" . $row["amount"] . "</td><td>" . $row["symbol"] . "</td><td>" . $row["price"] . "</td></tr>";
                }
            } else {
                echo "</table>Aucun historique pour le moment";
            }
        echo '</table>';


    }


    if($_GET['requete'] == "affiche_orderBook_grid_1"){
      //  $grid_1_info = file_get_contents('/home/angelz/Web/angelz-bot/Public/data/grid_1.txt');
      //  echo $grid_1_info;
       // $filestring = file_get_contents('/home/angelz/Web/angelz-bot/Public/data/grid_1.txt');
        $lines = file('/home/angelz/Web/angelz-bot/Public/data/grid_1.txt');
        $retour = '[';
        foreach ($lines as $num=>$line)
        {
            $retour = $retour . $line . ',';
//        echo 'Line '.$num.': '.$line.'<br/>';
        }
        $retour = substr($retour, 0, -1);
        $retour = $retour . ']';
        echo $retour;
    }


    if($_GET['requete'] == "affiche_contenu_onglet_top"){
        $db = $_GET['db'];
        $sql2 = "(SELECT * FROM $db
            ORDER BY id DESC LIMIT 2)
        UNION (SELECT  *  FROM $db
            WHERE  DATE(date) = DATE(DATE_SUB(NOW(), INTERVAL 1 MONTH))
                OR DATE(date) = DATE(DATE_SUB(NOW(), INTERVAL 1 WEEK)))";
        $result2 = $conn->query($sql2);
        $i=0;
        while($rowPrice = $result2->fetch_assoc()) {
                    $i++;
                    if ($i == 1) {$todayPrice = $rowPrice['wallet'];}
                    else if ($i == 2) {$yestPrice = $rowPrice['wallet'];}
                    else if ($i == 3) {$weekPrice = $rowPrice['wallet'];}
                    else if ($i == 4) {$monthPrice = $rowPrice['wallet'];}
                }

        // Calcul des % d'evo
        if (isset($yestPrice)) { $evoDay = (($todayPrice - $yestPrice) * 100) / $yestPrice; $evoDay = number_format($evoDay,2);}
        else {$evoDay = 'Manque de données';}

        if (isset($weekPrice)) {$evoWeek = (($todayPrice - $weekPrice) * 100) / $weekPrice;$evoWeek = number_format($evoWeek,2);}
            else {$evoWeek = 'Manque de données';}

        if (isset($monthPrice)) {$evoMonth = (($todayPrice - $monthPrice) * 100) / $monthPrice;$evoMonth = number_format($evoMonth,2);}
            else {$evoMonth = 'Manque de données';}

        echo'
        <h2>Valeur du wallet : <span style="color:#42a37a;">'.$todayPrice.' $</span></h2>
            <div style="display:flex;justify-content:space-evenly;margin-top:50px;" >
            <div class="section"><b>Daily :</b> ';
            if($evoDay > 0) {echo '<span class="HighlightGreen"> '. $evoDay.' %</span></div>';} else {echo '<span class="HighlightRed"> '. $evoDay.' %</span></div>';}
            if($evoWeek > 0) {echo '<div class="section"><b>Weekly :</b><span class="HighlightGreen"> '.$evoWeek.'</span></div>';} else {echo '<div class="section"><b>Weekly :</b><span class="HighlightRed"> '.$evoWeek.'</span></div>';}
            if ($evoMonth > 0) {echo '<div class="section"><b>Monthly :</b><span class="HighlightGreen"> '.$evoMonth.'</span>/div>/div>';} else {echo '<div class="section"><b>Monthly :</b><span class="HighlightRed"> '.$evoMonth.'</span></div></div>';}


            echo "";
    }
}
?>