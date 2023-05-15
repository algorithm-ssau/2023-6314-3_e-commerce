from flask import jsonify
def calculate_recommendations(favorite_product, products):
    # some magic
    
    #it is supposed to be filtered to only 4 products
    return serializeProducts(products)

def serializeProducts(products):
    serializedProducts = []

    for p in products:
        serializedProducts.append({
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "material": p.material,
            "fineness": p.fineness,
            "addedAt": p.addedAt,
            "discount": p.discount,
            "size": p.size,
            "count": p.count,
            "categoryId": p.categoryId
        })
    return jsonify(serializedProducts)