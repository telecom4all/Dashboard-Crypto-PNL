# Dashboard-Crypto-PNL
 Dashboard Crypto PNL


1. Installation de Apache2

• Ouvrez un terminal et connectez-vous en tant qu'utilisateur root.
• Mettez à jour votre système en exécutant la commande suivante :

# apt-get update

• Installez le serveur Apache2 en exécutant la commande suivante :

# apt-get install apache2

• Vérifiez que le serveur Apache2 a été correctement installé en exécutant la commande suivante :

# apache2 -v

2. Installation de PHP

• Installez PHP et les modules nécessaires en exécutant la commande suivante :

# apt-get install php libapache2-mod-php php-mcrypt php-mysql

• Vérifiez que PHP a été correctement installé en exécutant la commande suivante :

# php -v

3. Installation de MySQL

• Installez MySQL en exécutant la commande suivante :

# apt-get install mysql-server

• Configurez le serveur MySQL en exécutant la commande suivante :

# mysql_secure_installation

• Vérifiez que MySQL a été correctement installé en exécutant la commande suivante :

# mysql -V

4. Installation de phpMyAdmin

• Installez phpMyAdmin en exécutant la commande suivante :

# apt-get install phpmyadmin

• Configurez phpMyAdmin en exécutant la commande suivante :

# dpkg-reconfigure phpmyadmin

• Vérifiez que phpMyAdmin a été correctement installé en exécutant la commande suivante :

# phpmyadmin -V

5. Configuration du VirtualHost

• Créez un fichier de configuration pour votre VirtualHost en exécutant la commande suivante :

# nano /etc/apache2/sites-available/dashboard.domain.com.conf

• Ajoutez le contenu suivant à votre fichier de configuration :

<VirtualHost *:80>
    ServerName dashboard.domain.com
    ServerAdmin webmaster@example.com
    DocumentRoot /var/www/dashboard.domain.com/public_html
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>

• Activez votre VirtualHost en exécutant la commande suivante :

# a2ensite dashboard.domain.com.conf

• Redémarrez le serveur Apache2 en exécutant la commande suivante :

# service apache2 restart

Vous avez maintenant installé et configuré un serveur Apache2, PHP, MySQL et phpMyAdmin avec un VirtualHost sur Debian.


