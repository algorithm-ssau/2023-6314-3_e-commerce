import os
import dotenv
import pymysql

dotenv.load_dotenv('config.env')

#region Инициализация переменных
    #id пользователя
user_id = str(2)
    # Лист со всеми id из matrPaW
list_id_from_matr_PaW = []
    # Лист категорий, расположенных в порядке уменьшения популярности у пользователя
list_favorite_categories = []
    # Лист id товаров в прошлых покупках, корзине, избранном
list_of_id_for_AVG_price = []
     # Матрица id рекомендованных товаров с их свойствами из БД
matr_rec_products = []
    # Лист id рекомендованных товаров
list_rec_products = []
    # Средня цена товаров в прошлых покупках, корзине, избранном
average_price = float()
    # matrix of ProductId and Weights - матрица id продуктов и весов
matr_PaW = []

#endregion

# Подключение к БД
try:
    connection = pymysql.connect(
        host = os.environ['HOST'],
        port = int(os.environ['DATABASE_PORT']), 
        user = os.environ['DATABASE_USERNAME'],
        password = os.environ['DATABASE_PASSWORD'],
        db = os.environ['DATABASE_NAME'],
        cursorclass = pymysql.cursors.DictCursor
    )
    print("Succesfull")
except:
    print("Сonnection is not established")
    
def get_productId_from_list(list):
    new_list = []
    for elem in list:
        new_list.append(elem['productId'])
    return new_list

# Предполагаем, что fetchall & fetchone при запросе единственного значения возвращает строку, а при запросе одинаковых значений
# например только id - возвращает массив  
#region SQLзапросы 
with connection.cursor() as cursor: 
    id_from_cart = "SELECT productId FROM added_to_cart_product WHERE userId=" + user_id 
    id_from_favorite = "SELECT productId FROM favorite_product WHERE userId=" + user_id 
    id_from_recent = "SELECT productId FROM recent_product WHERE userId=" + user_id 
    id_from_purchased = "SELECT productId FROM purchased_product WHERE userId=" + user_id 
    all_id_from_purchased = "SELECT productId FROM purchased_product" 

    # Выполнение запроса и присвоение результа спискам.
    cursor.execute(id_from_cart) 
    temp_list_cart = cursor.fetchall()
    list_cart = get_productId_from_list(temp_list_cart)

    cursor.execute(id_from_favorite)
    temp_list_favorite = cursor.fetchall()
    list_favorite = get_productId_from_list(temp_list_favorite)

    cursor.execute(id_from_recent)
    temp_list_recent = cursor.fetchall()
    list_recent = get_productId_from_list(temp_list_recent)

    cursor.execute(id_from_purchased)
    temp_list_purchased = cursor.fetchall()
    list_purchased = get_productId_from_list(temp_list_purchased)

    cursor.execute(all_id_from_purchased) 
    tempp_list_all_purchased = cursor.fetchall()
    list_all_purchased = get_productId_from_list(tempp_list_all_purchased)
cursor.close()
#endregion

# Метод проверки вхождения id в matr
def check_in_matr(matr, id):
    check = False
    for i in matr:
        if i[0] == id:
            check = True
    return check

# Метод получения индекса id в matr
def get_index_in_matr(matr, id):
    index = -1
    j = 0
    while index == -1:
        if matr[j][0] == id:
            index = j
        j += 1
    return index

# Метод для обработки входящих списков
def insert_into_matr(matr, list, weight):
    # Идём по списку
    for i in list:
        # Если товар с текущим id уже есть в matr,
        # находим индекс id в matr, добавляем id необходимый вес
        if check_in_matr(matr,i) == True:
            index = get_index_in_matr(matr,i)
            matr[index][1] += weight
        # иначе добавляем элемент в matr, устанавливаем вес
        else:
            matr.append([i,weight])

# Получение списка id из матрицы
def get_id_from_matr(matr):
    new_list = []
    for i in matr:
        new_list.append(i[0])
    return new_list

# Получение наиболее часто встречаемых категорий
def get_favorite_categories():
    # Получили список всех id из MatrPaW
    list_id_from_matr_PaW = get_id_from_matr(matr_PaW)
    # Получаем категорию каждого id, встречающиеся в MatrPaW, формируем из них список всех категорий
    category_in_matr_PaW = []
    with connection.cursor() as cursor: 
        for id in list_id_from_matr_PaW:
            sql_product_categoryid = "SELECT categoryId FROM product WHERE id=" + str(id)
            cursor.execute(sql_product_categoryid) 
            product_categoryid = cursor.fetchone()['categoryId']
            category_in_matr_PaW.append(product_categoryid)
    cursor.close()
    # Составляем матрицу весов каждой категории
        # matrix of Categories and Weights - матрица категорий и весов
    matr_CaW = []
    insert_into_matr(matr_CaW,category_in_matr_PaW,1)
    # Сортируем матрицу весов категорий
    matr_CaW.sort(key=lambda x: x[1], reverse=True)  # Возможно (sorted(matrCaW, key=lambda x:x[1]), reverse=True)          
    # Записываем отсортированные категории в список избранных в порядке уменьшения популярности
    for category in matr_CaW:
        list_favorite_categories.append(category[0])

# Получение средней цены товара, на основе прошлых покупок, корзины и избранного.
def get_average_price():
    list_of_id_for_AVG_price = []
    temp = list_cart + list_favorite + list_purchased
    for id in temp:
        if id not in list_of_id_for_AVG_price:
            list_of_id_for_AVG_price.append(id)
    price_in_list_of_id_for_AVG_price = float(0)
    with connection.cursor() as cursor: 
        for id in list_of_id_for_AVG_price:
            sqlPrice = "SELECT price FROM product WHERE id=" + str(id)
            cursor.execute(sqlPrice)
            price_in_list_of_id_for_AVG_price += float(cursor.fetchone()['price'])
    cursor.close()
    average_price = price_in_list_of_id_for_AVG_price/len(list_of_id_for_AVG_price)
    return average_price

# Оценка товара по стоимости
def analysis_by_price(matr):
    for product in matr:

        if  (product[1] >= average_price*1.5) or (product[1] <= average_price*0.5):
            product[len(product)-1] += 0

        elif (product[1] >= average_price*1.25) or (product[1] <= average_price*0.9):
            product[len(product)-1] += 1
        
        elif  product[1] >= average_price*1.1:
            product[len(product)-1] += 3 

        elif  (product[1] >= average_price) or (product[1] < average_price):
            product[len(product)-1] += 2

# Оценка товара по скидке
def analysis_by_discount(matr):
    for product in matr:

        if  0 < product[2] <= 5:
            product[len(product)-1] += 1

        elif 5 < product[2] <= 10:
            product[len(product)-1] += 2
        
        elif 10 < product[2] <= 20:
            product[len(product)-1] += 4
        
        elif 20 < product[2] <= 35:
            product[len(product)-1] += 3 

        elif 35 < product[2] <= 50:
            product[len(product)-1] += 1

# Оценка товаров по категории
def analysis_by_categories(matr):
    for product in matr:
        i = 0
        while list_favorite_categories[i] != product[3]:
            i += 1
        product[len(product)-1] += len(list_favorite_categories) - i

# Формирование итогового листа рекомендованных товаров для нового пользователя
def counter_of_id(list):
    for product in list:
        if product[0] in (list_cart or list_purchased):
            list.remove(product)
        else:
            product.append(0)

# Формирование matrRecProducts
def get_matr_rec_products():
    #Формирование matr_rec_products - списка всех товаров, которые можно будет рекомендовать
    with connection.cursor() as cursor: 
        id_from_product = "SELECT id,price,discount,categoryId FROM product WHERE ("
        for category in list_favorite_categories:
            id_from_product += "categoryId=" + str(category) + " OR "
        id_from_product = id_from_product[:(len(id_from_product)-4)] + ")"
        cursor.execute(id_from_product)
        temp_matr_rec_products = cursor.fetchall()
        # Достаём id,price,discount,categoryId из temp_matr_rec_products и вместе с weight=0 помещаем в matr_rec_products в виде списков
        for product in temp_matr_rec_products:
            matr_rec_products.append([product['id'], product['price'], product['discount'], product['categoryId'], 0])
    cursor.close()
    print(matr_rec_products)
    # Если товар лежит у пользователя в корзине или уже был куплен -> удаляем его из списка
    for product in matr_rec_products:
        if product[0] in (list_cart or list_purchased):
            matr_rec_products.remove(product)
    print(matr_rec_products)

# Формирование итогового листа рекомендованных товаров из матрицы 
def get_list_rec_products(matr):
    matr.sort(key=lambda x: x[len(x)-1], reverse=True)
    list_rec_products = get_id_from_matr(matr)
    return list_rec_products

#region MAIN

if (len(list_purchased) == 0) and (len(list_cart) == 0) and (len(list_favorite) == 0) and (len(list_recent) == 0):
    insert_into_matr(matr_rec_products, list_all_purchased, 1)
    get_list_rec_products(matr_rec_products)
    
    test = get_list_rec_products(matr_rec_products)
    res = test[:4]
    print(res) 

else:
#Формируем MatrPaW
    if len(list_purchased) != 0:
        insert_into_matr(matr_PaW,list_purchased, 4)
    if len(list_cart) != 0:
        insert_into_matr(matr_PaW,list_cart, 3)
    if len(list_favorite) != 0:
        insert_into_matr(matr_PaW,list_favorite, 2)
    if len(list_recent) != 0:
        insert_into_matr(matr_PaW,list_recent, 1)

    get_favorite_categories() # Получаем любимые категории пользователя
    get_average_price() # Получаем средний ценник пользователя
    get_matr_rec_products() # Формируем матрицу всех товаров
    analysis_by_categories(matr_rec_products) # Оценили категории
    analysis_by_price(matr_rec_products) # Оценка стоимости товара
    analysis_by_discount(matr_rec_products) # Оценка скидки товара
    get_list_rec_products(matr_rec_products) # Формируем итоговый список


    test = get_list_rec_products(matr_rec_products)
    print(test) 
    res = test[:4]
    print(res)

#endregion
# Закрываем соединение с БД
connection.close()