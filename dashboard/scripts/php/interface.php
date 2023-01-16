<?php
$server_json = file_get_contents("jsons/config_server.json");
$parsed_server_json = json_decode($server_json);
$servername = $parsed_server_json->{'servername'};
$username = $parsed_server_json->{'username'};
$password = $parsed_server_json->{'password'};
$dbname = $parsed_server_json->{'dbname'};


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if(isset($_POST['requete']) && !empty($_POST['requete'])){
    if($_POST['requete'] == "get_auth"){
        try {
            $password_recu = htmlspecialchars($_POST['password'], ENT_QUOTES);
            $json = file_get_contents("jsons/authentification.json");
            $parsed_json = json_decode($json);
            $password_fichier = $parsed_json->{'password'};

        if (password_verify($password_recu, $password_fichier)) {
                $retour_json = array(
                    "status" => "True",
                    "auth" => "True"
                );

                $jsonobject = json_encode($retour_json);
                echo $jsonobject;  
            } else {
                $retour_json = array(
                    "status" => "False",
                    "erreur" => "Mot de passe non valide"
                );
                $jsonobject = json_encode($retour_json);
                echo $jsonobject;
            }
        } catch (Exception $e) {
            // Traitement de l'exception
            ///echo "Une erreur s'est produite: " . $e->getMessage();
            $retour_json = array(
                "status" => "False",
                "erreur" => $e->getMessage()
            );
            $jsonobject = json_encode($retour_json);
            echo $jsonobject; 
        }
    }
}

if(isset($_GET['requete']) && !empty($_GET['requete'])){
    if($_GET['requete'] == "config_dashboard"){
        try {
            $json = file_get_contents("jsons/config_interface.json");
            $parsed_json = json_decode($json);
            $retour_json = array(
                "status" => "True",
                "config_interface" => $parsed_json
            );

            $jsonobject = json_encode($retour_json);
            echo $jsonobject;  

        } catch (Exception $e) {
            // Traitement de l'exception
            ///echo "Une erreur s'est produite: " . $e->getMessage();
            $retour_json = array(
                "status" => "False",
                "erreur" => $e->getMessage()
            );
            $jsonobject = json_encode($retour_json);
            echo $jsonobject; 
        }
    }

    

    if($_GET['requete'] == "data_exchanges"){
        try {
            $db_exchange = htmlspecialchars($_GET['db'], ENT_QUOTES);
            
            $sql = "SELECT * FROM $db_exchange ORDER BY id";
            $result = $conn->query($sql);

            $walletExchange = array();
            while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                $value = htmlspecialchars($row['wallet'], ENT_QUOTES);
                $name = htmlspecialchars($row['exchange'], ENT_QUOTES);
                $timestamp = strtotime($row['date']) * 1000;
                $data[] = [$timestamp, (int)$value];
                $evolution_wallet = array(
                    "value" => $value,
                    "name" => $name,
                    "timestamp" => $timestamp,
                    "date" => htmlspecialchars($row['date'], ENT_QUOTES)
                );
                array_push($walletExchange, $evolution_wallet);
            }
            $retour_json = array(
                "status" => "True",
                "walletExchange" => $walletExchange
            );

            $jsonobject = json_encode($retour_json);
            echo $jsonobject;
            
        } catch (Exception $e) {
            // Traitement de l'exception
            //echo "Une erreur s'est produite: " . $e->getMessage();
            $retour_json = array(
                "status" => "False",
                "erreur" => $e->getMessage()
            );
            $jsonobject = json_encode($retour_json);
            echo $jsonobject; 
        }    
    }

    if($_GET['requete'] == "bot_infos"){
        try {
            $json = file_get_contents("jsons/config_interface.json");
            $parsed_json = json_decode($json);
            $list_bots_infos = $parsed_json->{'liste_bot'};

            $list_bots = array();
            foreach ($list_bots_infos as $value) {
                $nom_bot = htmlspecialchars($value->{'nom_bot'}, ENT_QUOTES);
                $wallet_db = htmlspecialchars($value->{'wallet_db'}, ENT_QUOTES);
                $orderbook_db = htmlspecialchars($value->{'orderbook_db'}, ENT_QUOTES);
                $type = htmlspecialchars($value->{'type'}, ENT_QUOTES);
                $initale_wallet = htmlspecialchars($value->{'initale_wallet'}, ENT_QUOTES);

                //list de l'evolution du wallet
                $sql1 = "SELECT * FROM $wallet_db ORDER BY id";
                $result1 = $conn->query($sql1);

                $wallet = array();
                while($row1 = mysqli_fetch_array($result1, MYSQLI_ASSOC)) {
                    $value = htmlspecialchars($row1['wallet'], ENT_QUOTES);
                    $timestamp = strtotime($row1['date']) * 1000;
                    $data[] = [$timestamp, (int)$value];
                    $evolution_wallet = array(
                        "value" => $value,
                        "timestamp" => $timestamp,
                        "date" => htmlspecialchars($row1['date'], ENT_QUOTES)
                    );
                    array_push($wallet, $evolution_wallet);
                }

                // list trades
                $sql2 = "SELECT * FROM $orderbook_db ORDER BY id DESC LIMIT 10";
                $result2 = $conn->query($sql2);
                $liste_trade = array();
                if ($result2->num_rows > 0) {
                    while($row = $result2->fetch_assoc()) {
                        $liste_trade_bot = array(
                            "type" => htmlspecialchars($row["type"], ENT_QUOTES),
                            "amount" => htmlspecialchars($row["amount"], ENT_QUOTES),
                            "symbol" => htmlspecialchars($row["symbol"], ENT_QUOTES),
                            "price" => htmlspecialchars($row["price"], ENT_QUOTES)
                        );
                        array_push($liste_trade, $liste_trade_bot);
                    }
                }
                //var_dump($data);
                $bot_infos = array(
                    "nom_bot" => $nom_bot,
                    "wallet_db" => $wallet_db,
                    "orderbook_db" => $orderbook_db,
                    "type" => $type,
                    "initale_wallet" => $initale_wallet,
                    "evolution_wallet" => $wallet,
                    "liste_trade" => $liste_trade
                );
                array_push($list_bots, $bot_infos);

            }

            $retour_json = array(
                "status" => "True",
                "liste_bots" => $list_bots
            );
            //$retour_json = $retour_json . "}";
            $jsonobject = json_encode($retour_json);
            echo $jsonobject;
            

        } catch (Exception $e) {
            // Traitement de l'exception
           // echo "Une erreur s'est produite: " . $e->getMessage();
            $retour_json = array(
                "status" => "False",
                "erreur" => $e->getMessage()
            );
            $jsonobject = json_encode($retour_json);
            echo $jsonobject; 
        }
    }
}



?>
