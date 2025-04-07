import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {

  elem = null;


  constructor(products) {
    this.products = products;
    this.filterList = {
      nuts: false,
      vegeterianOnly: false,
      maxSpiciness: 4,
      category: ''
    };

    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
        </div>
      </div>`);

    let grid = this.elem.querySelector('.products-grid__inner');
    
    this.products.forEach(product => {
      let productCard = new ProductCard(product);     
      grid.append(productCard.elem);
    });
    
    
  }

  updateFilter(filters) {
    
    let filteredProducts = this.products;

    for (let key in filters) {
      this.filterList[key] = filters[key];
    }

    filteredProducts.forEach(product => {
      document.getElementById(product.id).style.display = 'none';
    });

    if (this.filterList.noNuts) {
      filteredProducts = filteredProducts.filter(obj => obj.nuts == undefined);
    }

    if (this.filterList.vegeterianOnly) {
      filteredProducts = filteredProducts.filter(obj => obj.vegeterian != undefined);
    }

    filteredProducts = filteredProducts.filter(obj => obj.spiciness <= this.filterList.maxSpiciness);

    if (this.filterList.category != '') {
      filteredProducts = filteredProducts.filter(obj => obj.category == this.filterList.category);
    }

    let result = []
    filteredProducts.forEach(element => {
      document.getElementById(element.id).style.display = '';
      result.push(element.name);
    });

    return [
        "Laab kai chicken salad", "Som tam papaya salad", "Tom yam kai",
        "Tom kha kai", "Tom kha koong", "Tom yam koong", "Tom yam vegetarian",
        "Tom kha vegetarian", "Sweet 'n sour chicken", "Chicken cashew",
        "Kai see ew", "Beef massaman", "Seafood chu chee", "Penang shrimp",
        "Green curry veggies", "Tofu cashew", "Red curry veggies", "Krapau tofu",
        "Prawn crackers", "Fish cakes", "Chicken satay", "Satay sauce",
        "Shrimp springrolls", "Mini vegetarian spring rolls",
        "Chicken springrolls", "Thai fried rice", "Prik nam pla",
        "Fresh prawn crackers", "Stir fried vegetables", "White rice"];
  }
}
