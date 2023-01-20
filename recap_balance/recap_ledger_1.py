import requests
import json
from utilities.mysql_recap import MysqlRecap
import datetime

import configparser
config = configparser.ConfigParser()
config.read('config-bot.cfg')
import time

time.sleep(5)

apikey_etherscan = ""
apikey_matic = ""


addresses = [
    {
        "name" : "BTC", 
        "address" : [ 
            "addresse_wallet" , 
            "addresse_wallet"
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

EXCHANGE_NAME = "ledger_1"

#Infos Mysql
host = str(config['MYSQL']['host'])
user = str(config['MYSQL']['user'])
password_mysql = str(config['MYSQL']['password'])
database = str(config['MYSQL']['database'])

MysqlRecap  = MysqlRecap(host, user, password_mysql, database	)

tableau_crypto=[]
usd_total=0.0
balance_usdt_trc20 = 0.0
# Boucle sur chaque crypto-monnaie
for crypto in addresses:
    name = crypto["name"]
    balance_total = 0.0
    # Boucle sur chaque adresse pour la crypto en cours
    for address in crypto["address"]:
        if name == "BTC":
            try:
                # Utilisez l'API de blocstream.info pour récupérer les informations sur le solde de l'adresse bitcoin bech32
                url = f"https://blockchain.info/balance?active={address}"
                response = requests.get(url)
                data = json.loads(response.text)
                balance = data[address]['final_balance'] / 10**8
                balance_total += balance
            except BaseException as err:
                raise Exception(err)
        elif name == "ETH":
            try:
                # Utilisez l'API de Etherscan pour récupérer les informations sur le solde de l'adresse Ethereum
                url = f"https://api.etherscan.io/api?module=account&action=balance&address={address}&tag=latest&apikey={apikey_etherscan}"
                response = requests.get(url)
                data = json.loads(response.text)
                balance = int(data['result']) / 10**18
                balance_total += balance
            except BaseException as err:
                raise Exception(err)
        elif name == "XRP":
            try:
                # Utilisez l'API de XRP Ledger pour récupérer les informations sur le solde de l'adresse XRP
                url = f"https://data.ripple.com/v2/accounts/{address}/balances"
                response = requests.get(url)
                data = json.loads(response.text)
                balance = [balance for balance in data['balances'] if balance["currency"] == "XRP"]
                balance = float(balance[0]['value'])
                balance_total += balance
            except BaseException as err:
                raise Exception(err)
        elif name == "MATIC":
            try:
                # Utilisez l'API de polygonscan.com pour récupérer les informations sur le solde de l'adresse Matic
                url = f"https://api.polygonscan.com/api?module=account&action=balance&address={address}&apikey={apikey_matic}"
                response = requests.get(url)
                data = json.loads(response.text)
                balance = int(data['result']) / 10**18
                balance_total += balance
            except BaseException as err:
                raise Exception(err)
        elif name == "DOGE":
            try:
                # Utilisez l'API de dogechain.info pour récupérer les informations sur le solde de l'adresse DOGE
                url = f"https://dogechain.info/api/v1/address/balance/{address}"
                response = requests.get(url)
                data = json.loads(response.text)
                balance = float(data['balance'])
                balance_total += balance
            except BaseException as err:
                raise Exception(err)
        elif name == "TRX":
            try:
                # Utilisez l'API de tronscan.org pour récupérer les informations sur le solde de l'adresse TRX
                url = f"https://api.tronscan.org/api/account?address={address}"
                response = requests.get(url)
                data = json.loads(response.text)
                for token in data['tokens']:
                    token_name = token["tokenName"]
                    #print(token_name)
                    if(token_name == 'Tether USD'):
                        balance = float(token["balance"]) / 1000000
                        print(f"{token_name} : {balance}")
                        balance_total += balance
                        balance_usdt_trc20 += balance
                        
                    else:
                        #print(float(token["balance"]))
                        balance = (float(token["balance"]) / 100000000) * 100 
                        balance = "{:.2f}".format(round(balance, 2))
                        print(f"{token_name} : {balance}")
                        balance_total += float(balance)
                
            except BaseException as err:
                raise Exception(err)
           
    # Utilisez l'API de CryptoCompare pour récupérer le taux de change pour la crypto en question
    url = f"https://min-api.cryptocompare.com/data/price?fsym={name}&tsyms=USD"
    response = requests.get(url)
    data = json.loads(response.text)
    rate = data["USD"]
    # Calculez le montant en USD en multipliant le taux de change par le solde en crypto
    balance_usd = balance_total * rate
    print(f"{name} : {balance_total} : {balance_usd} usd")
    tableau_crypto.append({
        "coin":name,
        "balance":balance_total,
        "balance_usd" : balance_usd
    })
    usd_total += balance_usd
    

tableau_crypto.append({
    "coin":"usd",
    "balance":balance_usdt_trc20,
    "balance_usd" : balance_usdt_trc20
})
usd_total += balance_usdt_trc20  

print(usd_total)
MysqlRecap.update_solde(usd_total, EXCHANGE_NAME)
for info in tableau_crypto:
    nom=EXCHANGE_NAME+"_"+info["coin"].lower().replace(" ", "_")
    wallet=info["balance_usd"]
    MysqlRecap.update_solde(wallet, nom)
