import ccxt
from utilities.mysql_recap import MysqlRecap
import datetime

import configparser
config = configparser.ConfigParser()
config.read('config-bot.cfg')
import time

time.sleep(5)

############################
#### Partie a modifier #####
############################
#choix du compte dans le fichhier de config
apiKey = str(config['BITGET.FUTURES.2']['apiKey'])
secret = str(config['BITGET.FUTURES.2']['secret'])
password = str(config['BITGET.FUTURES.2']['password'])
EXCHANGE_NAME = str(config['BITGET.FUTURES.2']['exchange_name'])
######################################
#### FIN de la partie a modifier #####
######################################
######################################

#Infos Mysql
host = str(config['MYSQL']['host'])
user = str(config['MYSQL']['user'])
password_mysql = str(config['MYSQL']['password'])
database = str(config['MYSQL']['database'])


#creation du client
client = ccxt.bitget({
            "apiKey": apiKey,
            "secret": secret,
            "password": password,
            'options': {
            'defaultType': 'swap'
            }
        })



MysqlRecap  = MysqlRecap(host, user, password_mysql, database	)


#recuperation de l'historique
wallet =  client.fetchBalance()["info"][0]["usdtEquity"]


#affichage de l'equite en dollar
print('BITGET.FUTURES.2 équité en dollar est:', wallet)
MysqlRecap.update_solde(wallet, EXCHANGE_NAME)