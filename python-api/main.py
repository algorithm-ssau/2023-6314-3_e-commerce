list_cart = [1,3,4,8090,45]
list_favorites = [3,6,8090,2,6,56,222]
list_recently = [4,8090,2,67,5,666]
list_bought = [45,777,666]
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
# Метод для обработки входящих списков "избранное", "корзина", т.д.
def insertIntoMatr(list, weight):
    # идём по списку
    for i in list:
        # если товар с текущим id уже есть в matr
        # находим индекс id в matr, добавляем id необходимый вес
        if checkInMatr(i) == True:
            index = getIndex(i)
            matr[index][1] += weight
        # иначе добавляем элемент в matr,устанавливаем вес
        else:
            matr.append([i,weight])
# Формируем matr
if len(list_cart) != 0:
    insertIntoMatr(list_cart, 1)
if len(list_favorites) != 0:
    insertIntoMatr(list_favorites, 1)
if len(list_recently) != 0:
    insertIntoMatr(list_recently, 1)
if len(list_bought) != 0:
    insertIntoMatr(list_bought, 1)

print(matr)