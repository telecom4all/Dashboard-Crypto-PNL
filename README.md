# Dashboard Crypto pour avoir les résultats de bot de trading et quelque infos
vous pouvez trouver ici les bots de trading associé
```
https://github.com/telecom4all/Bot_Bitget_Multi
```

## Prérequis avoir un serveur web avec php et mysql s'installé

Avant de commencer, vous aurez besoin des éléments suivants :

- Une machine virtuelle ou physique avec Debian.

- Un nom de domaine pointant vers votre serveur.

- Une connexion Internet.

### Installation et configuration d'Apache

1. Commencez par mettre à jour votre système :

    ```
    sudo apt-get update
    ```

2. Installez Apache :

    ```
    sudo apt-get install apache2
    ```

3. Vérifiez que le service Apache est bien lancé :

    ```
    sudo service apache2 status
    ```

4. Vous devriez voir un message indiquant que le service Apache est en cours d'exécution. Si ce n'est pas le cas, lancez le service :

    ```
    sudo service apache2 start
    ```

5. Vérifiez que le serveur Apache est accessible en ouvrant votre navigateur et en vous rendant à l'adresse `http://localhost`. Vous devriez voir la page par défaut d'Apache.  

### Installation et configuration de PHP

1. Installez PHP et les modules nécessaires :

    ```
    sudo apt-get install php libapache2-mod-php php-mysql
    ```

2. Vérifiez que le module PHP est chargé en exécutant la commande suivante :

    ```
    sudo apache2ctl -M | grep php
    ```

3. Vous devriez voir le module `php7.0` dans la liste des modules chargés. Si ce n'est pas le cas, chargez le module manuellement :

    ```
    sudo a2enmod php7.0

    ou 

    sudo a2enmod php8.1

    suivant votre version
    ```

4. Redémarrez le serveur Apache pour prendre en compte les modifications :

    ```
    sudo service apache2 restart
    ```

5. Vérifiez que PHP fonctionne correctement en créant un fichier `info.php` à la racine de votre serveur Apache (`/var/www/html`) avec le code suivant :

    ```php
    <?php
    phpinfo();
    ?>
    ```

6. Ouvrez votre navigateur et rendez-vous à l'adresse `http://localhost/info.php`. Vous devriez voir la page PHP Info.

### Installation et configuration de MySQL

1. Installez MySQL :

    ```
    sudo apt-get install mysql-server
    ```

2. Configurez MySQL en exécutant la commande `mysql_secure_installation` :

    ```
    sudo mysql_secure_installation
    ```

3. Suivez les instructions à l'écran pour configurer les paramètres de sécurité de MySQL.

4. Vérifiez que MySQL est en cours d'exécution :

    ```
    sudo service mysql status
    ```

5. Vous devriez voir un message indiquant que le service MySQL est en cours d'exécution. Si ce n'est pas le cas, lancez le service :

    ```
    sudo service mysql start
    ```

### Installation et configuration de PhpMyAdmin

1. Installez PhpMyAdmin :

    ```
    sudo apt-get install phpmyadmin
    ```

2. Sélectionnez `Apache2` lorsqu'on vous demande quel serveur web utiliser.

3. Saisissez le mot de passe de l'utilisateur `root` de MySQL lorsqu'on vous le demande.

4. Sélectionnez `Yes` lorsqu'on vous demande si vous souhaitez configurer la base de données PhpMyAdmin avec `dbconfig-common`.

5. Saisissez le mot de passe de l'utilisateur `phpmyadmin` de MySQL lorsqu'on vous le demande.

6. Redémarrez le serveur Apache pour prendre en compte les modifications :

    ```
    sudo service apache2 restart
    ```

7. Vérifiez que PhpMyAdmin est accessible en ouvrant votre navigateur et en vous rendant à l'adresse `http://localhost/phpmyadmin`. Vous devriez voir la page d'accueil de PhpMyAdmin.

### Configuration d'un VirtualHost

1. Créez un fichier de configuration pour votre VirtualHost :

    ```
    sudo nano /etc/apache2/sites-available/example.com.conf
    ```

2. Ajoutez le code suivant au fichier :

    ```
    <VirtualHost *:80>
        ServerName example.com
        ServerAdmin webmaster@example.com
        DocumentRoot /var/www/example.com/public_html
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
    </VirtualHost>
    ```

3. Créez un dossier pour votre VirtualHost :

    ```
    sudo mkdir -p /var/www/example.com/public_html
    ```

4. Créez un fichier `index.html` pour votre VirtualHost :

    ```
    sudo nano /var/www/example.com/public_html/index.html
    ```

5. Ajoutez le code suivant au fichier :

    ```
    <html>
    <head>
        <title>Welcome to Example.com!</title>
    </head>
    <body>
        <h1>Success! The example.com virtual host is working!</h1>
    </body>
    </html>
    ```

6. Activez le VirtualHost :

    ```
    sudo a2ensite example.com.conf
    ```

7. Redémarrez le serveur Apache pour prendre en compte les modifications :

    ```
    sudo service apache2 restart
    ```

8. Vérifiez que votre VirtualHost fonctionne correctement en ouvrant votre navigateur et en vous rendant à l'adresse `http://example.com`. Vous devriez voir la page `index.html` que vous avez créée.

### Configuration du fichier README.md

1. Créez un fichier `README.md` à la racine de votre serveur Apache (`/var/www/html`) :

    ```
    sudo nano /var/www/html/README.md
    ```

2. Ajoutez le code suivant au fichier :

    ```
    # Bienvenue sur votre serveur Apache !
    ```

3. Redémarrez le serveur Apache pour prendre en compte les modifications :

    ```
    sudo service apache2 restart
    ```

4. Vérifiez que le fichier `README.md` est accessible en ouvrant votre navigateur et en vous rendant à l'adresse `http://localhost/README.md`. Vous devriez voir le contenu du fichier `README.md`.

## Installation du dashboard
git clone https://github.com/telecom4all/Dashboard-Crypto-PNL.git

Copiez le contenu du dossier Dashboard-Crypto-PNL/dashboard à la racine de votre virtualhost (dans l'exemple ci dessus : /var/www/example.com/public_html)

Tout se passe dans ces 3 fichiers, scripts/php/jsons/config_interface.json pour gérer l'interface et les bots a afficher 
et scripts/php/jsons/config_server.json qui contient le infos de la connexion a la base de donnée et scripts/php/jsons/authentification.json ou se trouve votre mot de passe hashé par cette ligne de commande sous linux : 


```
php -r "echo password_hash('password1234', PASSWORD_DEFAULT);"

```

par defaut le mot de passe est : password1234 changé le avec la ligne ci dessus puis remplacer le dans le fichier scripts/php/jsons/authentification.json!! 

par souci de sécurité il est conseiller de mettre le fichier authentification.json  en dehors du repertoire du virtualhost dans /home/user par ex pour evité que des infos sensibles soit visible sur le net
il faudra alors modifier le path du fichier à la ligne 22 du fichier scripts/php/interface.php  

```
changer cette ligne :

$json = file_get_contents("jsons/authentification.json");

par : 

$json = file_get_contents("path/authentification.json");
```



par souci de sécurité il est conseiller aussi de mettre le fichier config_server.json  en dehors du repertoire du virtualhost dans /home/user par ex pour evité que des infos sensibles soit visible sur le net
il faudra alors modifier le path du fichier à la ligne 2 du fichier scripts/php/interface.php  

```
changer cette ligne :

$server_json = file_get_contents("jsons/config_server.json");

par : 

$server_json = file_get_contents("path/jsons/config_server.json");
```

## Configuration du dashboard
### configuration mysql 

1. Création de l'utilisateur mysql et la base de donnée dashboard
   ```
   mysql -u root -p
   ```

   ```
   GRANT ALL PRIVILEGES ON dashboard.* TO 'nouvel_utilisateur'@'localhost' IDENTIFIED BY 'mot_de_passe';
   ```

   ```
    FLUSH PRIVILEGES;
   ```

2. Importez le fichier db.sql dans le serveur mysql
   
   Modifiez le fichier db.sql pour qu'il s'adapte a vos bots

    ```

    changer dans cette partie qui gère l'évolution du wallet : 

    CREATE TABLE `boll_strat` (
    `id` int NOT NULL,
    `date` date NOT NULL,
    `wallet` float NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

    changez boll_strat par le nom que vous vouler mais il faudra un nom par bot de trading

    ```
    ```

    changer dans cette partie qui gère l'historique de l'orderbook: 

    CREATE TABLE `boll_strat_orderBook` (
    `id` int NOT NULL,
    `type` int DEFAULT NULL,
    `amount` float DEFAULT NULL,
    `symbol` varchar(45) DEFAULT NULL,
    `price` float DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

    changez boll_strat_orderBook  par le nom que vous vouler mais il faudra un nom par bot de trading


    ```


   Connectez vous a mysql avec l'utilisateur que l'on viens de créer :
   ```
   mysql -u [nom d'utilisateur] -p
   ```

   on selectionne la base de donnée dashboard
   ```
   USE dashboard;
   ```

   on importe le fichier db.sql
   ```
   source <path>/dashboard/db.sql
   ```




### Fichier : scripts/php/jsons/config_server.json
c'est ici qu'il faut renseigner les infos de connexion au serveur mysql 

```
{
    "servername" : "",
    "username" : "",
    "password" : "",
    "dbname" : ""
    
}
```
### Fichier : scripts/php/jsons/config_interface.json
```
{
    "titre" : "Dashboard Crypto",               --> nom du dashbord
    "exchanges_infos" : {
        "isExchangeRecap" : "True",             --> True si on veut rajouter l'option de visualisation de l'evolution du wallet sur différent exchange voir plus bas pour la configuration du "module python a installer" sinon on met a false

        "nom_db" : "exchanges_wallets",         --> Nom de la table de la db qui dois etre le meme que dans le fichier config-bot.cfg du module recap_balance
        "exchanges" : [
            { 
                "nom_exchange" : "binance_futures_1",  --> meme nom que dans le fichier config-bot.cfg du module recap_balance
                "nom_dashboard" : "Binance Futures 1", --> le nom que l'on veut voir afficher sur le dashboard
                "initial_wallet" : "50.0"              --> le montant initial mis
            },
            { 
                "nom_exchange" : "binance_spot_1",
                "nom_dashboard" : "Binance Spot 1",
                "initial_wallet" : "50.0"
            },
            { 
                "nom_exchange" : "bitget_futures_1",
                "nom_dashboard" : "Bitget Futures 1 Bot Perso",
                "initial_wallet" : "16.0"
            },
            { 
                "nom_exchange" : "bitget_spot_1",
                "nom_dashboard" : "Bitget Spot 1 Bot Perso",
                "initial_wallet" : "16.0"
            },
            { 
                "nom_exchange" : "bitget_futures_2",
                "nom_dashboard" : "Bitget Future 2 CopyTrading CryptoRobot",
                "initial_wallet" : "20.0"
            }
        ]
    },
    "liste_bot" : [
        {
            "nom_bot" : "Big Will Spot",               -->  Nom du bot
            "wallet_db" : "big_will",                  -->  nom de la table pour l'evolution du wallet
            "orderbook_db" : "big_will_orderBook",     -->  nom de la table pour l'historique de l'orderbook     
            "type" : "spots",                          --> type de bot (spot ou futures)
            "initale_wallet" : 20                      --> Montant initial los du lancement du bot 
        },
        {
            "nom_bot" : "Bollinger Futures",
            "wallet_db" : "boll_strat",
            "orderbook_db" : "boll_strat_orderBook",
            "type" : "futures",
            "initale_wallet" : 16
        }
    ]
}


{
    "titre" : "Dashboard Crypto",  
    
}
```


### Fichier : scripts\js\main_dashboard.js
dans la première partie vous pouvez modifier la liste des coins que vous voulez surveiller ainsi que leur indicateur avec leur paramètres

```
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

```



# Installation du module recap_balance
installation des scripts python qui vont interroger toutes X heure les exchanges pour avoir le solde et les enregistrer dans un db pour pouvoir avoir un apercu des gains/pertes

copiez le repertoire Dashboard-Crypto-PNL/recap_balance a l'emplacement de votre choix par ex /home/user

1. configuration mysql

    Modifiez le fichier recap_balance/db.sql pour qu'il s'adapte a vos besoins vous pouvez changer le nom de la table par exemple exchanges_wallets mais vous devre modifier 
   
   ```
   CREATE TABLE `exchanges_wallets` (
    `id` int NOT NULL,
    `exchange` text NOT NULL,
    `date` datetime NOT NULL,
    `wallet` float NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

    ```

    modifier le fichier  dashboard\scripts\php\jsons\config_interface.json a ce niveau la


        ```
    "exchanges_infos" : {
        "isExchangeRecap" : "True",
        "nom_db" : "exchanges_wallets",  -> changer le nom 

        ```

    sinon vous pouvez ne touché a rien :-)

    Connectez vous a mysql avec l'utilisateur que l'on viens de créer :

    ```
    mysql -u [nom d'utilisateur] -p
    ```
    
    on selectionne la base de donnée dashboard

    ```
    USE dashboard;
    ```

    on importe le fichier db.sql

    ```
    source <path>/recap_balance/db.sql
    ```


2. Configuration du fichier recap_balance/config-bot.cfg
    c'est dans ce fichier que la configuration ce fait 
    
    ```
    [BINANCE.FUTURES.1]                               --> nom unique qui sert a pourvoir selectionner le bon compte et sa configuration dans le fichier recap associé 
    exchange_name = binance_futures_1                 --> nom unique pour le dashboard lie au fichier scripts/php/jsons/config_interface.json  
    apiKey =                                          --> Api key de l'exchange
    secret =                                          --> Secret de l'exchange 

    [BINANCE.SPOT.1]
    exchange_name = binance_spot_1
    STABLECOIN = USDT                                  --> pour les compte spot il fau spécifié le stablecoin
    apiKey = 
    secret = 

    [BITGET.FUTURES.1]
    exchange_name = bitget_futures_1
    apiKey = 
    secret = 
    password = 

    [BITGET.FUTURES.2]
    exchange_name = bitget_futures_2
    apiKey = 
    secret = 
    password = 

    [BITGET.SPOT.1]
    exchange_name = bitget_spot_1
    STABLECOIN = USDT
    apiKey = 
    secret = 
    password = 


    [MYSQL]
    #hote Mysql
    host=localhost              --> adresse du server mysql localhost si sur le meme serveur
    #user Mysql
    user=                       --> utilisateur de la db
    #password Mysql
    password=                   --> mot de passe de la db
    #base de donnée Mysql
    database=dashboard          --> nom de la db ici dashboard
    
    ```


3. configuration des fichier python
   
    il faut un fichier python par exchange et par type de compte. 1 fichier pour le compte spot de bitget par exemple et 1 fichier pour le compte futures par ex :

    recap_bitget_futures_1.py
    recap_bitget_spot_1.py

    modifier les fichiers a ce niveau 

    
    ```
    ############################
    #### Partie a modifier #####
    ############################
    #choix du compte dans le fichhier de config
    apiKey = str(config['BINANCE.FUTURES.1']['apiKey'])                 --> modifier BINANCE.FUTURES.1 pour selectioner le bon compte dans le fichier config-bot.cfg
    secret = str(config['BINANCE.FUTURES.1']['secret'])                 --> modifier BINANCE.FUTURES.1 pour selectioner le bon compte dans le fichier config-bot.cfg
    EXCHANGE_NAME = str(config['BINANCE.FUTURES.1']['exchange_name'])   --> modifier BINANCE.FUTURES.1 pour selectioner le bon compte dans le fichier config-bot.cfg
    ######################################
    #### FIN de la partie a modifier #####
    ######################################
    
    ```


    pour le fichier recap_ledger_1.py

    voici les infos a modifier dans le fichier 

    ```
    ############################
    #### Partie a modifier #####
    ############################
    #api key pour https://etherscan.io/myaccount
    apikey_etherscan = ""                                --> Votre apikey pour https://etherscan.io/myaccount
    # apikey pour https://polygonscan.com/
    apikey_matic = ""                                   --> Votre apikey pour https://polygonscan.com/

    addresses = [
    {
        "name" : "BTC", 
        "address" : [ 
            "addresse_wallet" ,                 --> vos adresse de wallet sur votre ledger je n'ai pas trouvé comment avoir l'adresse 
            "addresse_wallet"                   --> général du wallet donc il faut mettre toute les adresse ou on a recu la crypto
        ]
    },
    {
        "name" : "ETH", 
        "address" : [ 
            "addresse_wallet" 
        ]
    },
    {
        "name" : "XRP", 
        "address" : [ 
            "addresse_wallet" 
        ]
    },
    {
        "name" : "MATIC", 
        "address" : [ 
            "addresse_wallet" 
        ]
    },
    {
        "name" : "DOGE", 
        "address" : [ 
            "addresse_wallet" ,
            "addresse_wallet"
        ]
    },
    {
        "name" : "TRX", 
        "address" : [ 
            "addresse_wallet" 
        ]
    }
]

    EXCHANGE_NAME = "ledger_1"                     --> le nom de la ledger mettre le meme nom dans le fichier config_interface.json
    ######################################
    #### FIN de la partie a modifier #####
    ######################################

    ```

    pour le moment il n'y a que ces tokens mais il est facile d'en rajouter :-)


4. modification du script de bash recap_balance\start_recap.sh
   
    ```
    #!/bin/bash
    echo "Passage dans l'environement virtuel"

    now=$(date +"%d/%m/%Y %T")
    echo $now

    PATH=/home/angelz/recap_balance     -> Modifier <path> par le paht complet du repertoire ou se trouve le répertoire 
    cd $PATH
    source $PATH/.venv/bin/activate

    echo "Execution du recap"


    for file in ./*.py; do
        if [ -f "$file" ]; then
            python $file
        fi
    done

    ```

5. execution toutes les 2 heures
   
   Ajouter une tache cron toutes les 1 heures et 20 min (si je ne me suis pas trompé ^^) en modifiant le <path> avec le votre comme ceci :  

```
    20 * * * * bash /<path>/recap_balance/start_recap.sh >> /<path>/recap_balance/recap_balance.log
```



voila je crois ne rien avoir oublié :-) 

la sécurité est moyenne et peut être amélioré mais je m'en contente pour le moment :-) les infos sensibles peuvent etre "caché" en dehors du répertoire accessible depuis internet et suivant la complexité du mot de passe choisi cela limite les souci 

# Soutien
Ce code est disponible pour tous si vous voulez me "soutenir :-)" voici un lien d'affiliation Bitget : https://partner.bitget.com/bg/85MZE2

ou en cryptos :
- BTC --> 1CetuWt9PuppZ338MzBzQZSvtMW3NnpjMr
- ETH (Réseau ERC20) --> 0x18f71abd7c2ee05eab7292d8f34177e7a1b62236
- MATIC (Réseau Polygon) --> 0x18f71abd7c2ee05eab7292d8f34177e7a1b62236
- BNB (Réseau BSC BEP20) --> 0x18f71abd7c2ee05eab7292d8f34177e7a1b62236
- SOL --> AsLvBCG1fpmpaueTYBmU5JN5QKVkt9a1dLR44BAGUZbV

# Remerciements
Merci à titouannwtt pour son code duquel je me suis grandement inspiré !! si vous voulez le soutenir c'est par là -->

https://github.com/titouannwtt/bot-trading-advanced