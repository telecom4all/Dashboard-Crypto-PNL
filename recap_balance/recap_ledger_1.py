import requests
import json
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
#api key pour https://etherscan.io/myaccount
apikey_etherscan = ""
# apikey pour https://polygonscan.com/
apikey_matic = ""

addresses = {
    "BTC": "",
    "ETH": "",
    "XRP": "",
    "MATIC": "",
    "DOGE": "",
    "TRX":""
}

EXCHANGE_NAME = "ledger_1"
######################################
#### FIN de la partie a modifier #####
######################################

#Infos Mysql
host = str(config['MYSQL']['host'])
user = str(config['MYSQL']['user'])
password_mysql = str(config['MYSQL']['password'])
database = str(config['MYSQL']['database'])

MysqlRecap  = MysqlRecap(host, user, password_mysql, database	)

# Définissez les adresses de crypto-monnaies que vous souhaitez suivre
# Remplacez ces adresses par celles de votre portefeuille Ledger



tableau_crypto=[]
usd_total=0.0
# Boucle sur chaque adresse de crypto-monnaie
for coin, address in addresses.items():
    if coin == "BTC":
        try:
            #Utilisez l'API de blocstream.info pour récupérer les informations sur le solde de l'adresse bitcoin bech32
            url = f"https://blockchain.info/balance?active={address}"
            response = requests.get(url)
            data = json.loads(response.text)
            balance = data[address]['final_balance'] / 10**8
            # Utilisez l'API de CryptoCompare pour récupérer le taux de change pour la crypto en question
            url = f"https://min-api.cryptocompare.com/data/price?fsym={coin}&tsyms=USD"
            response = requests.get(url)
            data = json.loads(response.text)
            rate = data["USD"]
            # Calculez le montant en USD en multipliant le taux de change par le solde en crypto
            balance_usd = balance * rate
            print(f"{coin} : {balance} : {balance_usd} usd")
            tableau_crypto.append({
                "coin":coin,
                "balance":balance,
                "balance_usd" : balance_usd
            })
            usd_total = float(usd_total) + float(balance_usd)
        except BaseException as err:
            raise Exception(err)
        
    elif coin == "ETH":
        try:
            # Utilisez l'API de Etherscan pour récupérer les informations sur le solde de l'adresse Ethereum
            url = f"https://api.etherscan.io/api?module=account&action=balance&address={address}&tag=latest&apikey={apikey_etherscan}"
            response = requests.get(url)
            data = json.loads(response.text)
            balance = int(data['result']) / 10**18
            # Utilisez l'API de CryptoCompare pour récupérer le taux de change pour la crypto en question
            url = f"https://min-api.cryptocompare.com/data/price?fsym={coin}&tsyms=USD"
            response = requests.get(url)
            data = json.loads(response.text)
            rate = data["USD"]
            # Calculez le montant en USD en multipliant le taux de change par le solde en crypto
            balance_usd = balance * rate
            print(f"{coin} : {balance} : {balance_usd} usd")
            tableau_crypto.append({
                "coin":coin,
                "balance":balance,
                "balance_usd" : balance_usd
            })
            usd_total = float(usd_total) + float(balance_usd)
        except BaseException as err:
            raise Exception(err)
        
    elif coin == "XRP":
        try:
            # Utilisez l'API de XRP Ledger pour récupérer les informations sur le solde de l'adresse XRP
            url = f"https://data.ripple.com/v2/accounts/{address}/balances"
            response = requests.get(url)
            data = json.loads(response.text)
            xrp_balance = [balance for balance in data['balances'] if balance["currency"] == "XRP"]
            balance = float(xrp_balance[0]['value'])
            # Utilisez l'API de CryptoCompare pour récupérer le taux de change pour la crypto en question
            url = f"https://min-api.cryptocompare.com/data/price?fsym={coin}&tsyms=USD"
            response = requests.get(url)
            data = json.loads(response.text)
            rate = data["USD"]
            # Calculez le montant en USD en multipliant le taux de change par le solde en crypto
            balance_usd = balance * rate
            print(f"{coin} : {balance} : {balance_usd} usd")
            tableau_crypto.append({
                "coin":coin,
                "balance":balance,
                "balance_usd" : balance_usd
            })
            usd_total = float(usd_total) + float(balance_usd)
        except BaseException as err:
            raise Exception(err)
        
    elif coin == "MATIC":
        try:
            # Utilisez l'API de polygonscan.com pour récupérer les informations sur le solde de l'adresse Matic
            url = f"https://api.polygonscan.com/api?module=account&action=balance&address={address}&apikey={apikey_matic}"
            response = requests.get(url)
            data = json.loads(response.text)
            balance = float(data['result']) / 10**18
            # Utilisez l'API de CryptoCompare pour récupérer le taux de change pour la crypto en question
            url = f"https://min-api.cryptocompare.com/data/price?fsym={coin}&tsyms=USD"
            response = requests.get(url)
            data = json.loads(response.text)
            rate = data["USD"]
            # Calculez le montant en USD en multipliant le taux de change par le solde en crypto
            balance_usd = balance * rate
            print(f"{coin} : {balance} : {balance_usd} usd")
            tableau_crypto.append({
                "coin":coin,
                "balance":balance,
                "balance_usd" : balance_usd
            })
            usd_total = float(usd_total) + float(balance_usd)
        except BaseException as err:
            raise Exception(err)
        
    elif coin == "DOGE":
        try:
            # Utilisez l'API de dogechain.info pour récupérer les informations sur le solde de l'adresse DOGE
            url = f"https://dogechain.info/api/v1/address/balance/{address}"
            response = requests.get(url)
            data = json.loads(response.text)
            balance = float(data['balance'])
            # Utilisez l'API de CryptoCompare pour récupérer le taux de change pour la crypto en question
            url = f"https://min-api.cryptocompare.com/data/price?fsym={coin}&tsyms=USD"
            response = requests.get(url)
            data = json.loads(response.text)
            rate = data["USD"]
            # Calculez le montant en USD en multipliant le taux de change par le solde en crypto
            balance_usd = balance * rate
            print(f"{coin} : {balance} : {balance_usd} usd")
            tableau_crypto.append({
                "coin":coin,
                "balance":balance,
                "balance_usd" : balance_usd
            })
            usd_total = float(usd_total) + float(balance_usd)
        except BaseException as err:
            raise Exception(err)
    elif coin == "TRX":
        try:
            # Utilisez l'API de tronscan.org pour récupérer les informations sur le solde de l'adresse TRX
            url = f"https://api.tronscan.org/api/account?address={address}"
            response = requests.get(url)
            data = json.loads(response.text)
            for token in data['tokens']:
                token_name = token["tokenName"]
                if(token["tokenName"] == 'Tether USD'):
                    balance = float(token["balance"]) / 1000000
                    print(f"{token_name} : {balance}")
                    tableau_crypto.append({
                        "coin":token_name,
                        "balance":balance,
                        "balance_usd" : balance
                    })
                    usd_total = float(usd_total) + float(balance)
                else:
                    balance = (float(token["balance"]) / 100000000) * 100 
                    balance = "{:.2f}".format(round(balance, 2))
                    # Utilisez l'API de CryptoCompare pour récupérer le taux de change pour la crypto en question
                    url = f"https://min-api.cryptocompare.com/data/price?fsym={coin}&tsyms=USD"
                    response = requests.get(url)
                    data = json.loads(response.text)
                    rate = data["USD"]
                    # Calculez le montant en USD en multipliant le taux de change par le solde en crypto
                    balance_usd = float(balance) * float(rate)
                    print(f"{coin} : {balance} : {balance_usd} usd")
                    tableau_crypto.append({
                        "coin":coin,
                        "balance":balance,
                        "balance_usd" : balance_usd
                    })
                    usd_total = float(usd_total) + float(balance_usd)
        except BaseException as err:
            raise Exception(err)
        
        
print(tableau_crypto)
print("usd total = " + str(usd_total))
MysqlRecap.update_solde(usd_total, EXCHANGE_NAME)
for info in tableau_crypto:
    nom=EXCHANGE_NAME+"_"+info["coin"].lower().replace(" ", "_")
    wallet=info["balance_usd"]
    MysqlRecap.update_solde(wallet, nom)
