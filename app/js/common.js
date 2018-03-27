document.addEventListener('DOMContentLoaded', function(){
    console.log("hi");
    // const CalcButton = document.querySelector('.calcButton');
    // CalcButton.addEventListener("click", () => prod(allProds));
    //
    // const Calc2Button = document.querySelector('.deleteAllInCart');
    // Calc2Button.addEventListener("click", () => {
    //     clearCart();
    //     tcart__openCart();
    // });
    const calc = document.querySelector('.calc');

    const calcButton = document.querySelector('.firstPick');
    calcButton.addEventListener('click', e => activateFirstPick(e))

    const colorSelect = document.querySelector('.color');
    const profileSelect = document.querySelector('.profile');
    console.log(colorSelect.value);
    colorSelect.addEventListener('change', function(){
        const lastLetters = [...colorSelect.value];
        console.log(colorSelect.value);

        for(let i = 0; i < profileSelect.length; i++) {
            const prof = profileSelect[i];
            let text = [...prof.value];
            console.log(text);
            text[6] = lastLetters[0];
            text[7] = lastLetters[1];
            text[8] = lastLetters[2];
            const finalText = text.join('');
            console.log(finalText);
            profileSelect[i].value = finalText;
            profileSelect[i].innerHTML = finalText;

        }

    })

})


function activateFirstPick(e){

    const elem = e.target.closest('.carType');
    if (! elem ) return

    const elemparent = e.path[2];
    const typeText = elem.children[1].innerHTML;

    const hasClass = (elem.classList.contains("activeFirstPick"));
    elem.classList.add("activeFirstPick");
    if (hasClass) {
        console.log("has activeFirstPick class");
    } else {
        elem.classList.add("activeFirstPick")
        const typeCircle = document.querySelector('.statusLineStepOne');
        typeCircle.classList.add('statusLineStepActive');
        typeCircle.innerHTML = `&#10004; <span>Тип: ${typeText}</span>`;
        console.log(typeCircle);

    }
}


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
