document.addEventListener('DOMContentLoaded', function(){
    console.log("hi");
    const CalcButton = document.querySelector('.calcButton');
    CalcButton.addEventListener("click", () => prod(allProds));

    const Calc2Button = document.querySelector('.deleteAllInCart');
    Calc2Button.addEventListener("click", () => {
        clearCart();
        tcart__openCart();
    });

})


const allProds = [{
    amount : 1000,
    img:"https://pp.userapi.com/c9266/v9266282/2fa/oy2a54KWUoQ.jpg",
    name:"Четкий посон &quot;Пустоныч&quot;",
    options:{
        0:{option: "Ширина", variant: "100 см", price: 1190},
        1:{option: "Управление", variant: "да", price: 250},
    },
    price:500,
    quantity:2,
    ts:15210247,
}, {
    amount : 200,
    img:"https://pp.userapi.com/c830209/v830209609/2d598/XovK7FVpYCM.jpg",
    name:"Четкий посон &quot;Пэстоныч&quot;",
    options:{
        0:{option: "Ширина", variant: "100 см", price: 1190},
        1:{option: "Санина", variant: "да", price: 250},
    },
    price:200,
    quantity:1,
    ts:152102,
}, {
    amount : 1440,
    img:"https://pp.userapi.com/c310830/v310830469/59d5/gF-598GyC5g.jpg",
    name:"Четкий посон &quot;Пастоныч&quot;",
    options:{
        0:{option: "Говно", variant: "100 см", price: 1190},
        1:{option: "Управление", variant: "да", price: 250},
    },
    price:1440,
    quantity:1,
    ts:152102475,
}, {
    amount : 1440,
    img:"https://pp.userapi.com/c623321/v623321725/8805/3Zo4UJu8-Mw.jpg",
    name:"Четкий посон &quot;Пыстоныч&quot;",
    price:1440,
    quantity:1,
    ts:15,
}]
//
function clearCart(){
    const len = tcart.products.length;
    for(let i = 0; i<len; i++){
        tcart.products.pop();
    }
    tcart.amount = 0;
    tcart.prodamount = 0;
    tcart.total = 0;
//
}
//
function prod(array){
    clearCart();
    const newArr = JSON.parse(JSON.stringify(array));
//
    for(const pro of newArr){
//
        tcart.products.push(pro);
        tcart.amount += pro.price*pro.quantity;
        tcart.prodamount += pro.price*pro.quantity;
        tcart.total += pro.quantity;
    }
    document.querySelector('.t706__carticon-counter').innerHTML = tcart.total;
    tcart__openCart();
}
