import ccxt
from utilities.mysql_recap import MysqlRecap
import datetime
import configparser
config = configparser.ConfigParser()
config.read('config-bot.cfg')


############################
#### Partie a modifier #####
############################
#choix du compte dans le fichhier de config
apiKey = str(config['BINANCE.FUTURES.1']['apiKey'])
secret = str(config['BINANCE.FUTURES.1']['secret'])
EXCHANGE_NAME = str(config['BINANCE.FUTURES.1']['exchange_name'])
######################################
#### FIN de la partie a modifier #####
######################################

#Infos Mysql
host = str(config['MYSQL']['host'])
user = str(config['MYSQL']['user'])
password = str(config['MYSQL']['password'])
database = str(config['MYSQL']['database'])


#creation du client
client = ccxt.binance(
   {
        "apiKey": apiKey,
        "secret": secret,
        'options': {
            'defaultType': 'future',
        }
    })



MysqlRecap  = MysqlRecap(host, user, password, database	)


#recuperation de l'historique
hist = client.fetch_balance()

wallet = hist['info']['totalWalletBalance']
#affichage de l'equite en dollar
print('BINANCE.FUTURES.1 équité en dollar est:', wallet)
MysqlRecap.update_solde(wallet, EXCHANGE_NAME)