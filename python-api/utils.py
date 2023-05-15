
from models import Added_to_cart_product, Favorite_product, Product, Purchased_product

def get_based_product(userId, db):
    favorite_product = db.session.query(Favorite_product).filter_by(userId=userId).first()
    if(favorite_product != None):
        return db.session.query(Product).get(favorite_product.productId)
    
    added_to_cart_product = db.session.query(Added_to_cart_product).filter_by(userId=userId).first()
    if(added_to_cart_product != None):
        return db.session.query(Product).get(added_to_cart_product.productId)
    
    purchased_product = db.session.query(Purchased_product).filter_by(userId=userId).first()
    if(purchased_product != None):
        return db.session.query(Product).get(purchased_product.productId)
    
    return db.session.query(Product).first()

def get_all_products(db):
    return db.session.query(Product).all()