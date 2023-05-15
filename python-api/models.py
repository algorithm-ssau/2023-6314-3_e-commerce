from sqlalchemy.ext.automap import automap_base 

from app import db



Base = automap_base()
Base.prepare(db.engine)

Product = Base.classes.product
Favorite_product = Base.classes.favorite_product
Added_to_cart_product = Base.classes.added_to_cart_product
Purchased_product = Base.classes.purchased_product