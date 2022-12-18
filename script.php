<?php
// DEBUT DE LA ZONE DE CONFIG


$servername = "localhost"; // IP DE VOTRE BASE DE DONNÉE (peut être localhost, si vous hébergé sur votre serveur)
$username = ""; // Par défaut, root sur wamp
$password = ''; // Par défaut, vide sur wamp
$dbname = ""; //Nom de la base de donnée
$nb_bot = 3; // Nombre de bot dont vous voulez suivre l'évolution. Evidemment, il faut qu'ils aient chacun leur DB et le morceaux de code python qui permet d'ajouter les infos dans la DB
$bot_name = array("", "Big_Will", "Aligator", "Grid_1"); // IMPORTANT DE LAISSER LE PREMIER ESPACE LIBRE !!!  REMPLIR AVEC LES NOMS QUE VOUS VOULEZ


// FIN DE LA ZONE DE CONFIG
// Ne pas toucher en dessous sauf si vous savez ce que vous faites


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Fonction qui affiche le menu des onglets en haut de la page
function affiche_menu_onglet($nb_bot, $bot_name)
  {
    $x=1;
    while($nb_bot >= $x) {
          echo '<span class="onglet_0 onglet" id="onglet_bot'. $x .'" onclick="javascript:change_onglet(\'bot'. $x .'\');">';
          if (isset($bot_name[$x])) { echo $bot_name[$x].'</span>';} else { echo 'Bot '. $x .'</span>';}
          $x++;
        }
  }


// Fonction qui affiche la partie supérieur du dashboard
function affiche_contenu_onglet_top($nb_bot, $conn, $bot_name)
  {
    print($nb_bot + " " + $bot_name);
    $x=1;
    while($nb_bot >= $x) {
      echo '<div class="contenu_onglet" id="contenu_onglet_top_bot_'.$bot_name.'">';
      affiche_historical_wallet($x, $conn, 'big_will');
      echo '</div>';
      $x++;
    }
  }

  

?>

