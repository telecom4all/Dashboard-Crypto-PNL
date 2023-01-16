import mysql.connector
import datetime

class MysqlRecap():
    def __init__(self, host, user, password, database ):
        try:
            mydb = mysql.connector.connect(
                host=host,
                user=user,
                password=password,
                database=database
            )
        except mysql.connector.Error as err:
            print("Erreur de connexion à la base de données: {}".format(err))
            self._auth = False
        else:
            mycursor = mydb.cursor(prepared=True)
            self._auth = True
            self.mydb = mydb
            self.mycursor = mycursor
    
    def update_solde(self, usdAmount, exchange):
        if self._auth:
            now_recap = datetime.datetime.now()
            #date_recap = now_recap.strftime("%Y-%m-%d")
            sql_query = "INSERT INTO exchanges_wallets  (exchange , date, wallet) VALUES (%s, %s, %s)"
            self.mycursor.execute(sql_query, (exchange , now_recap, usdAmount))
            self.mydb.commit()
 
    

    def __del__(self):
        if self._auth:
            self.mydb.close()
            
