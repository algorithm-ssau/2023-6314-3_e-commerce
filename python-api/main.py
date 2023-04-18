import os
import dotenv
import pymysql

dotenv.load_dotenv('config.env')

# Инициализация переменных
    #лист со всеми id из matrPaW
listIdFromMatrPaW = []
    # лист категорий, расположенных в порядке уменьшения популярности у пользователя
listFavoriteCategories = []

# Тестовые списки для создания матрицы алгоритма подбора рекомендаций
listCart = [1,3,4,8090,45]
listFavorite = [3,6,8090,2,6,56,222]
listRecent = [4,8090,2,67,5,666]
listPurchased = [45,777,666]
# matrix of ProductId and Weights - матрица id продуктов и весов
matrPaW = []

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

# Предполагаем, что fetchall & fetchone при запросе единственного значения возвращает строку, а при запросе одинаковых значений
# например только id - возвращает массив  
''' with connection.cursor() as cursor: 
    # SQLзапросы 
    idFromCart = "SELECT productid FROM AddedToCartProduct" 
    idFromFavorite = "SELECT productid FROM FavoriteProduct"
    idFromRecent = "SELECT productid FROM RecentProduct"
    idFromPurchased = "SELECT productid FROM PurchasedProduct"
    
    # Выполнение запроса и присвоение результа спискам.
    cursor.execute(idFromCart) 
    listCart = cursor.fetchall() ########## Может не работать

    cursor.execute(idFromFavorite)
    listFavorite = cursor.fetchall() ########## Может не работать
    
    cursor.execute(idFromRecent)
    listRecent = cursor.fetchall() ########## Может не работать
    
    cursor.execute(idFromPurchased)
    listPurchased = cursor.fetchall() ########## Может не работать

    cursor.close() '''

# Метод проверки вхождения id в matr
def checkInMatr(matr, id):
    check = False
    for i in matr:
        if i[0] == id:
            check = True
    return check

# Метод получения индекса id в matr
def getIndexInMatr(matr, id):
    index = -1
    j = 0
    while index == -1:
        if matr[j][0] == id:
            index = j
        j += 1
    return index

# Метод для обработки входящих списков
def insertIntoMatr(matr, list, weight):
    # Идём по списку
    for i in list:
        # Если товар с текущим id уже есть в matr,
        # находим индекс id в matr, добавляем id необходимый вес
        if checkInMatr(matr,i) == True:
            index = getIndexInMatr(matr,i)
            matr[index][1] += weight
        # иначе добавляем элемент в matr, устанавливаем вес
        else:
            matr.append([i,weight])

# Получение списка id из матрицы
def getIdFromMatr(matr):
    for i in matr:
        listIdFromMatrPaW.append(i[0])

# Получение наиболее часто встречаемых категорий
def GetFavoriteCategories():
    # Получаем категорию каждого id, встречающиеся в MatrPaW, формируем из них список всех категорий
    catInMatrPaW = []
    with connection.cursor() as cursor: 
        for id in listIdFromMatrPaW:
            sqlProductCatId = "SELECT productCategoryId FROM Product WHERE id=" + str(id)
            cursor.execute(sqlProductCatId) 
            productCatId = cursor.fetchone() ########## Может не работать
            catInMatrPaW.append(productCatId)
    # Составляем матрицу весов каждой категории
        # matrix of Categories and Weights - матрица категорий и весов
    matrCaW = []
    insertIntoMatr(matrCaW, catInMatrPaW,1)
    # Сортируем матрицу весов категорий
    matrCaW.sort(key=lambda x: x[1], reverse=True)  # Возможно (sorted(matrCaW, key=lambda x:x[1]), reverse=True)          
    # Записываем отсортированные категории в список избранных в порядке уменьшения популярности
    for category in matrCaW:
        listFavoriteCategories.append(category[0])
    cursor.close()

#region Формируем matr
if len(listCart) != 0:
    insertIntoMatr(matrPaW,listCart, 1)
if len(listFavorite) != 0:
    insertIntoMatr(matrPaW,listFavorite, 1)
if len(listRecent) != 0:
    insertIntoMatr(matrPaW,listRecent, 1)
if len(listPurchased) != 0:
    insertIntoMatr(matrPaW,listPurchased, 1)
#endregion

# Вывод полученой матрицы
print(matrPaW)

getIdFromMatr(matrPaW)

print(listIdFromMatrPaW)

# Закрываем соединение с БД
connection.close()