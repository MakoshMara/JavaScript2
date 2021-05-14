const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];



const renderGoodsItem = (title = "No good", price = 0) => {
    return `<div class="goods-item"><img src = "good.jpg"><h3>${title}</h3><p>${price}</p></div> <br>`;
};

const renderGoodsList = (list = []) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

renderGoodsList(goods);