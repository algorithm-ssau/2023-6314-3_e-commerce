import os
import dotenv
import pymysql

dotenv.load_dotenv('config.env')

# Инициализация переменных
listIdFromMatr = []

# Тестовые списки для создания матрицы алгоритма подбора рекомендаций
listCart = [1,3,4,8090,45]
listFavorite = [3,6,8090,2,6,56,222]
listRecent = [4,8090,2,67,5,666]
listPurchased = [45,777,666]
matr = []

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

''' with connection.cursor() as cursor: 
    # SQLзапросы 
    idFromCart = "SELECT productid FROM AddedToCartProduct" 
    idFromFavorite = "SELECT productid FROM FavoriteProduct"
    idFromRecent = "SELECT productid FROM RecentProduct"
    idFromPurchased = "SELECT productid FROM PurchasedProduct"
    
    # Выполнение запроса и присвоение результа спискам.
    cursor.execute(idFromCart) 
    listCart = cursor.fetchall()

    cursor.execute(idFromFavorite)
    listFavorite = cursor.fetchall()
    
    cursor.execute(idFromRecent)
    listRecent = cursor.fetchall()
    
    cursor.execute(idFromPurchased)
    listPurchased = cursor.fetchall()

    cursor.close() '''

# Метод проверки вхождения id в matr
def checkInMatr(id):
    check = False
    for i in matr:
        if i[0] == id:
            check = True
    return check

# Метод получения индекса id в matr
def getIndexInMatr(id):
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
            index = getIndexInMatr(i)
            matr[index][1] += weight
        # иначе добавляем элемент в matr, устанавливаем вес
        else:
            matr.append([i,weight])

# Получение списка id из матрицы
def getIdFromMatr(matr):
    for i in matr:
        listIdFromMatr.append(i[0])

#region Формируем matr
if len(listCart) != 0:
    insertIntoMatr(listCart, 1)
if len(listFavorite) != 0:
    insertIntoMatr(listFavorite, 1)
if len(listRecent) != 0:
    insertIntoMatr(listRecent, 1)
if len(listPurchased) != 0:
    insertIntoMatr(listPurchased, 1)
#endregion

# Вывод полученой матрицы
print(matr)

getIdFromMatr(matr)

print(listIdFromMatr)

# Закрываем соединение с БД
connection.close()