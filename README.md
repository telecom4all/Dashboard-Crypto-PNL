# Installation et configuration d'un serveur Apache2, PHP, MySQL et PhpMyAdmin sur Debian

Ce tutoriel vous guidera pas à pas dans l'installation et la configuration d'un serveur Apache2, PHP, MySQL et PhpMyAdmin sur Debian. Une fois le serveur installé et configuré, nous allons créer un virtualhost et le configurer pour afficher un fichier README.md sur Github.

## Prérequis

Avant de commencer, vous aurez besoin des éléments suivants :

- Une machine virtuelle ou physique avec Debian.

- Un nom de domaine pointant vers votre serveur.

- Une connexion Internet.

## Installation et configuration d'Apache

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

## Installation et configuration de PHP

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

## Installation et configuration de MySQL

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

## Installation et configuration de PhpMyAdmin

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

## Configuration d'un VirtualHost

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

## Configuration du fichier README.md

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

## Conclusion

Vous avez maintenant un serveur Apache, PHP, MySQL et PhpMyAdmin installé et configuré avec un VirtualHost et un fichier README.md affiché sur Github. Vous pouvez maintenant commencer à développer vos applications web 