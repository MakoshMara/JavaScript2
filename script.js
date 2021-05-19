class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="goods-item"><img src = "good.jpg"><h3>${this.title}</h3><p>${this.price}</p></div> <br>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.total_cost = 0;
    }

    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }

    get_total_cost(){
        this.goods.forEach(good => {this.total_cost += good.price})
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
        document.querySelector('.goods-total').innerHTML = `Общая стоимость: ${this.total_cost}`
    }


}


class Basket {
    constructor(user,basket_items) {
        this.user = user; // корзина у каждого пользователя индивидуальна
        this.basket_items = [];
    }

    add_basket_item(){
    // тут будут создаваться экземпляры класса Basket_item и добавляться в список basket_items
    }

    delete_basket_item(){
    // удаление экземпляра класса Basket_item из списка basket_items
    }

    get_quantity_basket_item(){
    // изменение количества конкретного товара в корзине
    }

    total_quantity(){
    // подсчет общего количества товаров в корзине
    }

    total_cost(){
    // подсчет общей цены товара в корзине
    }

    render_basket(basket_items){
    // для каждого товара в корзине будет вызван метод render_basket_item
    }

}

class Basket_item {
    constructor(good, quantity = 1, date) {
        this.good = good;
        this.quantity = quantity;
        this.date_add = date; // дата добавления товара, может пригодиться для всяческих скидок
    }

    basket_item_cost(quantity, price){
    // подсчет цены каждого конкретного товара в зависимости от количества. Пригодиться для рендера
    }
    render_basket_item(){
    // рендер каждого конкретного товара в корзине
    }

}
const list = new GoodsList();
list.fetchGoods();
list.get_total_cost()
list.render();
