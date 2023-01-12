# Dashboard Crypto pour avoir les résultats de bot de trading et quelque infos

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

Copiez le contenu du dossier Dashboard-Crypto-PNL à la racine de votre virtualhost (dans l'exemple ci dessus : /var/www/example.com/public_html)

Tout se passe dans ces 2 fichiers, scripts/php/jsons/config_interface.json pour gérer l'interface et les bots a afficher 
et scripts/php/jsons/config_server.json qui contient le infos de la connexion a la base de donnée

par souci de sécurité il est conseiller de mettre le fichier config_server.json en dehors du repertoire du virtualhost dans /home/user par ex pour evité que des infos sensibles soit visible sur le net
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

   on importe le fichier db.js
   ```
   source chemin/vers/fichier_de_sauvegarde.sql
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
    "titre" : "Dashboard Crypto",   --> nom du dashbord
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


# Soutien
Ce code est disponible pour tous si vous voulez me "soutenir :-)" voici un lien d'affiliation Bitget : https://partner.bitget.com/bg/85MZE2

ou en cryptos :
- BTC --> 1CetuWt9PuppZ338MzBzQZSvtMW3NnpjMr
- ETH (Réseau ERC20) --> 0x18f71abd7c2ee05eab7292d8f34177e7a1b62236
- MATIC (Réseau Polygon) --> 0x18f71abd7c2ee05eab7292d8f34177e7a1b62236
- BNB (Réseau BSC BEP20) --> 0x18f71abd7c2ee05eab7292d8f34177e7a1b62236
- SOL --> AsLvBCG1fpmpaueTYBmU5JN5QKVkt9a1dLR44BAGUZbV

# Remerciements
Merci à titouannwtt pour son code duquel je me suis grandement inspiré !! : https://github.com/titouannwtt/bot-trading-advanced

Si vous voulez le soutenir :
- lien affiliation Binance : https://www.binance.me/fr/activity/referral/offers/claim?ref=CPA_00C08H2X8E
- dons cryptos :
  - Adresse BTC : 3GYhBgZMfgzqjYhVhc2w53oMcvZb4jfGfL
  - Adresse ETH (Réseau ERC20) : 0x43fC6F9B8b1CfBd83b52a1FD1de510effe0A49a7
  - Adresse SOL : 5QKaHfJWxAZ6sbU5QMb2e14yAAZ45iBH91SBgnheK26v