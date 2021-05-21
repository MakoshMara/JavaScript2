const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const makeGETRequest = (url) => {
    let xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    const promise = new Promise((res, rej) => {
        setTimeout(() => {
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    return xhr.responseText
                }
            }
            res(xhr.onreadystatechange());
            rej('ERROR')
        }, 1000)
    })

    promise // pending
        .then((data) => {
                list.goods = JSON.parse(data);
                list.get_total_cost();
                list.render()
            }
        )

        .catch((err) => {
            console.log(err)
        })

    xhr.open('GET', url, true);
    xhr.send();
}
class GoodsItem {
    constructor(title, price, id_product) {
        this.title = title;
        this.price = price;
        this.id_product = id_product
    }

    render() {
        let data = {
            price: this.price,
            product_name: this.title,
            id_product: this.id_product,
        };
        data = JSON.stringify(data);
        return `<div class="goods-item"><img src = "good.jpg"><h3>${this.title}</h3><p>${this.price}</p><br>
<button class="goodButton" data-product='${data}' id = "${this.id_product}">Купить</button>
        </div> <br>`;
    }
}

class GoodsList {
    _basket = new Basket()
    constructor() {
        this.goods = [];
        this.total_cost = 0;
    }

    fetchGoods() {
        makeGETRequest(`${API_URL}/catalogData.json`)

    }

    get_total_cost(){
        return this.goods.forEach(good => {this.total_cost += good.price})
    }

    render() {
        let listHtml = '';
        console.log(this.goods)
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
        document.querySelector('.goods-total').innerHTML = `Общая стоимость: ${this.total_cost}`
        this._basket.setAddListeners(this.goods);
    }

}


class Basket {
    constructor(user=undefined,basket_items) {
        this.user = user; // корзина у каждого пользователя индивидуальна
        this.basket_items = [];
    }

    add_basket_item(event){
        const { target } = event;
        const { product = {} } = target.dataset;
        this.basket_items.push(JSON.parse(product));
        this.render();
    }

    delete_basket_item({ target }){
        const { id } = target.dataset;
        console.log({id})
        this.basket_items = this.basket_items.filter((item) => String(item.id_product) !== String(id));
        console.log(this.basket_items)
        this.render();
    }
    setAddListeners(list = [{ id_product: 123 }, { id_product: 456 }]) {
        list.forEach((item) => {
            document.getElementById(`${item.id_product}`).addEventListener('click', (e) => this.add_basket_item(e));
        })
    }

    setDeleteListeners() {
        this.basket_items.forEach((item) => {
            document.getElementById(`${item.id_product}`).addEventListener('click', (e) => this.delete_basket_item(e));
        })
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

    render() {
        let listHtml = '';
        this.basket_items.forEach(good => {
            const goodItem = new BasketItem(good.product_name, good.price, good.id_product);
            listHtml += goodItem.render();
        });
        document.querySelector('.basket').innerHTML = listHtml;
        this.setDeleteListeners();
    }
}
class BasketItem extends GoodsItem {
    constructor(...args) {
        super(...args);
        this.quantity = 0;
        this.date_add = 0;
    }

    basket_item_cost(quantity, price){
    // подсчет цены каждого конкретного товара в зависимости от количества. Пригодиться для рендера
    }
    render() {
        return `<div class='goods-item'>
              <h3>${this.title}</h3>
              <p>${this.price}</p>
              <button data-id='${this.id_product}' id='${this.id_product}'>Удалить</button>
            </div>`;
    }

}


const list = new GoodsList();
list.fetchGoods()

