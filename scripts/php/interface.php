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


if(isset($_GET['requete'])){
    if($_GET['requete'] == "config_dashboard"){
        $json = file_get_contents("jsons/config_interface.json");
        $parsed_json = json_decode($json);
       
        $titre_dashboard = $parsed_json->{'titre'};
       
        $list_bots_infos = $parsed_json->{'liste_bot'};
        $list_bots = array();
        foreach ($list_bots_infos as $value) {
            $nom_bot = $value->{'nom_bot'} ;
            $wallet_db = $value->{'wallet_db'} ;
            $orderbook_db = $value->{'orderbook_db'} ;
            $type = $value->{'type'} ;
            $initale_wallet = $value->{'initale_wallet'} ;
            

            //list de l'evolution du wallet
            $sql1 = "SELECT * FROM $wallet_db ORDER BY id";
            $result1 = $conn->query($sql1);
            
            $wallet = array();

            while($row1 = mysqli_fetch_array($result1, MYSQLI_ASSOC)) {
                $value = $row1['wallet'];
                $timestamp = strtotime($row1['date']) * 1000;
                $data[] = [$timestamp, (int)$value];
                $evolution_wallet = array( 
                    "value" => $value, 
                    "timestamp" => $timestamp,
                    "date" => $row1['date']
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
                        "type" => $row["type"], 
                        "amount" =>$row["amount"],
                        "symbol" =>$row["symbol"],
                        "price" =>$row["price"]
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
        //$retour_json = $retour_json . ']';
        
        $retour_json = array( 
            "titre_dashboard" => $titre_dashboard, 
            "liste_bots" => $list_bots 
        );

        //$retour_json = $retour_json . "}";
        $jsonobject = json_encode($retour_json);    
        echo $jsonobject;
        //var_dump(json_decode($json));
    

    }
}


?>