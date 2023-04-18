import os
import dotenv
import pymysql

dotenv.load_dotenv('config.env')

#region Инициализация переменных
    # Лист со всеми id из matrPaW
listIdFromMatrPaW = []
    # Лист категорий, расположенных в порядке уменьшения популярности у пользователя
listFavoriteCategories = []
    # Лист id товаров в прошлых покупках, корзине, избранном
listofIdForAVGPrice = []
     # Матрица id рекомендованных товаров с их свойствами из БД
matrRecProducts = []
    # Лист id рекомендованных товаров
listRecProducts = []
    # Средня цена товаров в прошлых покупках, корзине, избранном
averagePrice = 0

# Тестовые списки для создания матрицы алгоритма подбора рекомендаций
listCart = [1,3,4,8090,45]
listFavorite = [3,6,8090,2,6,56,222]
listRecent = [4,8090,2,67,5,666]
listPurchased = [45,777,666]
# matrix of ProductId and Weights - матрица id продуктов и весов
matrPaW = []
#endregion

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
#region SQLзапросы 
with connection.cursor() as cursor: 
    idFromCart = "SELECT productid FROM AddedToCartProduct" 
    idFromFavorite = "SELECT productid FROM FavoriteProduct"
    idFromRecent = "SELECT productid FROM RecentProduct"
    idFromPurchased = "SELECT productid FROM PurchasedProduct"
    idFromProduct = "SELECT id,price,discount,productCategoryId FROM Product WHERE ("
    for category in listFavoriteCategories:
        idFromProduct += "productCategoryId=" + category + " OR "
    idFromProduct = idFromProduct[:(len(idFromProduct)-4)] + ")"

    # Выполнение запроса и присвоение результа спискам.
    cursor.execute(idFromCart) 
    listCart = cursor.fetchall() ########## Может не работать

    cursor.execute(idFromFavorite)
    listFavorite = cursor.fetchall() ########## Может не работать

    cursor.execute(idFromRecent)
    listRecent = cursor.fetchall() ########## Может не работать

    cursor.execute(idFromPurchased)
    listPurchased = cursor.fetchall() ########## Может не работать

    cursor.execute(idFromProduct)
    listAllProducts = cursor.fetchall() ########## Может не работать
cursor.close()
#endregion

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
    newList = []
    for i in matr:
        newList.append(i[0])
    return newList

# Получение наиболее часто встречаемых категорий
def getFavoriteCategories():
    # Получили список всех id из MatrPaW
    listIdFromMatrPaW = getIdFromMatr(matrPaW)
    # Получаем категорию каждого id, встречающиеся в MatrPaW, формируем из них список всех категорий
    catInMatrPaW = []
    with connection.cursor() as cursor: 
        for id in listIdFromMatrPaW:
            sqlProductCatId = "SELECT productCategoryId FROM Product WHERE id=" + str(id)
            cursor.execute(sqlProductCatId) 
            productCatId = cursor.fetchone() ########## Может не работать
            catInMatrPaW.append(productCatId)
    cursor.close()
    # Составляем матрицу весов каждой категории
        # matrix of Categories and Weights - матрица категорий и весов
    matrCaW = []
    insertIntoMatr(matrCaW, catInMatrPaW,1)
    # Сортируем матрицу весов категорий
    matrCaW.sort(key=lambda x: x[1], reverse=True)  # Возможно (sorted(matrCaW, key=lambda x:x[1]), reverse=True)          
    # Записываем отсортированные категории в список избранных в порядке уменьшения популярности
    for category in matrCaW:
        listFavoriteCategories.append(category[0])

# Получение средней цены товара, на основе прошлых покупок, корзины и избранного.
def getAveragePrice():
    listofIdForAVGPrice = listCart + listFavorite + listPurchased
    with connection.cursor() as cursor: 
        for id in listofIdForAVGPrice:
            sqlPrice = "SELECT price FROM Product WHERE id=" + str(id)
            cursor.execute(sqlPrice) 
            priceInListofIdForAVGPrice += cursor.fetchone()
    cursor.close() 
    averagePrice += sum(priceInListofIdForAVGPrice)/len(priceInListofIdForAVGPrice)

# Формирование matrRecProducts
def getMatrRecProducts():
    for product in listAllProducts:
        if product[0] in (listCart or listPurchased):
            listAllProducts.remove(product)
        else:
            product.append(0)

# Оценка товаров по категории
def analysisByCategories(matr):
    for product in matr:
        i = 0
        while listFavoriteCategories[i] != product[3]:
            i += 1
        product[len(product)-1] += len(listFavoriteCategories) - i

# ДРУГИЕ МЕТОДЫ ОЦЕНКИ

# Формирование итогового листа рекомендованных товаров из матрицы 
def getListRecProducts(matr):
    matr.sort(key=lambda x: x[len(x)-1], reverse=True)
    listRecProducts = getIdFromMatr(matr)

#region MAIN
#Формируем MatrPaW
if len(listCart) != 0:
    insertIntoMatr(matrPaW,listCart, 1)
if len(listFavorite) != 0:
    insertIntoMatr(matrPaW,listFavorite, 1)
if len(listRecent) != 0:
    insertIntoMatr(matrPaW,listRecent, 1)
if len(listPurchased) != 0:
    insertIntoMatr(matrPaW,listPurchased, 1)

getFavoriteCategories() # Получаем любимые категории пользователчя
getAveragePrice() # Получаем средний ценник пользователя
getMatrRecProducts() # Формируем матрицу всех товаров
analysisByCategories(matrRecProducts) # Оценили категории
# ЗДЕСЬ пишем методы оценки
getListRecProducts(matrRecProducts) # Формируем итоговый список
#endregion

# Выводы
print(matrPaW)
print(listIdFromMatrPaW)
print(averagePrice)

# Закрываем соединение с БД
connection.close()