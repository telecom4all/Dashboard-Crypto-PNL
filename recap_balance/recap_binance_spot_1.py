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
apiKey = str(config['BINANCE.SPOT.1']['apiKey'])
secret = str(config['BINANCE.SPOT.1']['secret'])
EXCHANGE_NAME = str(config['BINANCE.SPOT.1']['exchange_name'])
STABLECOIN = str(config['BINANCE.SPOT.1']['STABLECOIN'])
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
            'defaultType': 'spot',
        }
    })


MysqlRecap  = MysqlRecap(host, user, password, database	)


#recuperation de l'historique
hist = client.fetch_balance()
wallet = 0.0
for key, value in hist["total"].items():
    if float(value) > 0.0:
        if key == 'USDT':
            wallet = float(wallet) + float(value)
        else:
            tokenData = client.fetchTicker(key+"/"+STABLECOIN)
            price = tokenData["last"]
            priceInUsd = float(price) * float(value)
            wallet = float(wallet) + float(priceInUsd)


#affichage de l'equite en dollar
print('BINANCE.SPOT.1 équité en dollar est:', wallet)
MysqlRecap.update_solde(wallet, EXCHANGE_NAME)