import ccxt
from utilities.mysql_recap import MysqlRecap
import datetime
import time

import configparser
config = configparser.ConfigParser()
config.read('config-bot.cfg')


############################
#### Partie a modifier #####
############################
#choix du compte dans le fichhier de config
apiKey = str(config['BITGET.SPOT.1']['apiKey'])
secret = str(config['BITGET.SPOT.1']['secret'])
password = str(config['BITGET.SPOT.1']['password'])
EXCHANGE_NAME = str(config['BITGET.SPOT.1']['exchange_name'])
STABLECOIN = str(config['BITGET.SPOT.1']['STABLECOIN'])
######################################
#### FIN de la partie a modifier #####
######################################

#Infos Mysql
host = str(config['MYSQL']['host'])
user = str(config['MYSQL']['user'])
password_mysql = str(config['MYSQL']['password'])
database = str(config['MYSQL']['database'])

#creation du client
client = ccxt.bitget(
   {
            "apiKey": apiKey,
            "secret": secret,
            "password": password,
            'options': {
                'defaultType': 'spot',
                'createMarketBuyOrderRequiresPrice': 'false'
            },
            'nonce': lambda: int(time.time() * 1000)
            #"EnableRateLimit": True,
       }
   )


MysqlRecap  = MysqlRecap(host, user, password_mysql, database	)


#recuperation de l'historique
hist = client.fetch_balance()
wallet = 0.0
for key, value in hist["total"].items():
    if float(value) > 0.0:
        if key == 'USDT' or key == 'USDC':
            wallet = float(wallet) + float(value)
        else:
            ticker = client.fetchTicker(key+'/'+STABLECOIN)
            price = ticker['last']
            wallet = float(price) * float(value)
            

#affichage de l'equite en dollar
print('BITGET.SPOT.1 équité en dollar est:', wallet)
MysqlRecap.update_solde(wallet, EXCHANGE_NAME)