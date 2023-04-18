import os
import dotenv
import pymysql

dotenv.load_dotenv('config.env')

# Подключение к БД
try:
    connection = pymysql.connect(
        host = os.environ['host'],
        user = os.environ['user'],
        password = os.environ['password'],
        db = os.environ['db'],
        port = int(os.environ['port']), 
        cursorclass = pymysql.cursors.DictCursor
    )
    print("Succesfull")
except:
    print("Сonnection is not established")

with connection.cursor() as cursor: 
    # SQLзапросы 
    idFromCart = "SELECT productid FROM AddedToCartProduct" 
    idFromFavorite = "SELECT productid FROM FavoriteProduct"
    idFromRecent = "SELECT productid FROM RecentProduct"
    idFromPurchased = "SELECT productid FROM PurchasedProduct"
    
    # Выполнение запроса и присвоение результа спискам.
    cursor.execute(idFromCart) 
    list_cart = cursor.fetchall()

    cursor.execute(idFromFavorite)
    list_favorite = cursor.fetchall()
    
    cursor.execute(idFromRecent)
    list_recent = cursor.fetchall()
    
    cursor.execute(idFromPurchased)
    list_purchased = cursor.fetchall()

    cursor.close()

# Тестовые списки для создания матрицы алгоритма подбора рекомендаций
list_cart = [1,3,4,8090,45]
list_favorite = [3,6,8090,2,6,56,222]
list_recent = [4,8090,2,67,5,666]
list_purchased = [45,777,666]
matr = []

# Метод проверки вхождения id в matr
def checkInMatr(id):
    check = False
    for i in matr:
        if i[0] == id:
            check = True
    return check

# Метод получения индекса id в matr
def getIndex(id):
    index = -1
    j = 0
    while index == -1:
        if matr[j][0] == id:
            index = j
        j += 1
    return index

# Метод для обработки входящих списков
def insertIntoMatr(list, weight):
    # Идём по списку
    for i in list:
        # Если товар с текущим id уже есть в matr,
        # находим индекс id в matr, добавляем id необходимый вес
        if checkInMatr(i) == True:
            index = getIndex(i)
            matr[index][1] += weight
        # иначе добавляем элемент в matr, устанавливаем вес
        else:
            matr.append([i,weight])

# Формируем matr
if len(list_cart) != 0:
    insertIntoMatr(list_cart, 1)
if len(list_favorite) != 0:
    insertIntoMatr(list_favorite, 1)
if len(list_recent) != 0:
    insertIntoMatr(list_recent, 1)
if len(list_purchased) != 0:
    insertIntoMatr(list_purchased, 1)

# Вывод полученой матрицы
print(matr)

# Закрываем соединение с БД
connection.close()