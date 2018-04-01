document.addEventListener('DOMContentLoaded', function(){
    clearCart()
    const calc = document.querySelector('.calc')

    const calcButton = document.querySelector('.firstPick')
    calcButton.addEventListener('click', e => activateFirstPick(e))

    const calcButton2 = document.querySelector('.secondPick')
    calcButton2.addEventListener('click', e => activateSecondPick(e))

    const toTrashButton = document.querySelector('.toTrash')
    toTrashButton.addEventListener('click', () => {
        allProds[0].name = `Профиль ${profileSelect.value}`
        allProds[1].name = `Кронштейн ${kronshSelect.value}`
        allProds[2].name = `Наконечник ${endSelect.value}`
        allProds[3].name = `Кольца ${ringSelect.value}`
        const typeCircle = document.querySelector('.statusLineStepThree')
        typeCircle.classList.remove('statusLineStepNext')
        typeCircle.classList.add('statusLineStepActive')
        typeCircle.innerHTML = `&#10004; <span>Готово!</span>`
        setTimeout(function(){
            clearCart()
            prod(allProds)
        }, 300)

    })

    const colorSelect = document.querySelector('.color');
    const lengthSelect = document.querySelector('.length');
    const profileSelect = document.querySelector('.profile');
    const kronshSelect = document.querySelector('.kronsh');
    const endSelect = document.querySelector('.end');
    const ringSelect = document.querySelector('.ring');
    lengthSelect.addEventListener('change', () => {
        const temp = [...profileSelect[profileSelect.selectedIndex].value]
        const finalTemp = `${temp[0]}${temp[1]}${temp[2]}${lengthSelect.value}${temp[6]}${temp[7]}${temp[8]}`
        profileSelect[profileSelect.selectedIndex].value = finalTemp
        profileSelect[profileSelect.selectedIndex].innerHTML = finalTemp
        allProds[0].ts = Number(profileSelect.value)
        if (lengthSelect.value == 240 || lengthSelect.value == 300) {
            allProds[1].quantity = 3
            allProds[1].amount = allProds[1].quantity*allProds[1].price
        } else {
            allProds[1].quantity = 2
            allProds[1].amount = allProds[1].quantity*allProds[1].price
        }
        adjustRingQuantity(lengthSelect)

    })
    profileSelect.addEventListener('change', () => {
        if (profileSelect.value.startsWith('440')) {
            if (lengthSelect[0].value = 150) {
                lengthSelect.selectedIndex = 0
                lengthSelect[0].value = 200
                lengthSelect[0].innerHTML = 200
                lengthSelect[1].value = 240
                lengthSelect[1].innerHTML = 240
                lengthSelect[2].value = 300
                lengthSelect[2].innerHTML = 300
                allProds[0].ts = profileSelect.value
            }

        } else {
            if (lengthSelect[0].value = 200) {
                lengthSelect.selectedIndex = 0
                lengthSelect[0].value = 150
                lengthSelect[0].innerHTML = 150
                lengthSelect[1].value = 200
                lengthSelect[1].innerHTML = 200
                lengthSelect[2].value = 240
                lengthSelect[2].innerHTML = 240
            }
        }
        allProds[0].ts = Number(profileSelect.value)
        adjustRingQuantity(lengthSelect)
    })
    colorSelect.addEventListener('change', () => {
        const lastLetters = [...colorSelect.value]

        for(let i = 0; i < profileSelect.length; i++) {
            const prof = profileSelect[i];
            const text = [...prof.value];
            text[6] = lastLetters[0];
            text[7] = lastLetters[1];
            text[8] = lastLetters[2];
            const finalText = text.join('');
            profileSelect[i].value = finalText
            profileSelect[i].innerHTML = finalText
        }
        for (let i = 0; i < kronshSelect.length; i++) {
            const kron = kronshSelect[i];
            const text = [...kron.value];
            text[6] = lastLetters[0];
            text[7] = lastLetters[1];
            text[8] = lastLetters[2];
            const finalText = text.join('');
            kronshSelect[i].value = finalText;
            kronshSelect[i].innerHTML = finalText;
        }
        for (let i = 0; i < endSelect.length; i++) {
            const end = endSelect[i];
            const text = [...end.value];
            text[6] = lastLetters[0];
            text[7] = lastLetters[1];
            text[8] = lastLetters[2];
            const finalText = text.join('');
            endSelect[i].value = finalText;
            endSelect[i].innerHTML = finalText;
        }
        for (let i = 0; i < ringSelect.length; i++) {
            const ring = ringSelect[i];
            const text = [...ring.value];
            text[6] = lastLetters[0];
            text[7] = lastLetters[1];
            text[8] = lastLetters[2];
            const finalText = text.join('');
            ringSelect[i].value = finalText;
            ringSelect[i].innerHTML = finalText;
        }

        allProds[0].ts = Number(profileSelect.value)
        allProds[1].ts = Number(kronshSelect.value)
        allProds[2].ts = Number(endSelect.value)
        allProds[3].ts = Number(ringSelect.value)
        if (allProds[4]) {
            allProds[4].ts = Number(`435605${colorSelect.value}`)

        }

    })
    kronshSelect.addEventListener('change', () => {
        adjustKrone(kronshSelect, colorSelect, lengthSelect)
    })
})

function adjustKrone(kronshSelect, colorSelect, lengthSelect){
    allProds[1].ts = Number(kronshSelect.value)
    const kronshValue = [...kronshSelect.value]
    const kronshType = Number(`${kronshValue[3]}${kronshValue[4]}${kronshValue[5]}`)
    if (kronshType === 119 && !allProds[4]) {
        allProds[0].quantity = 2
        allProds[0].amount = allProds[0].price*allProds[0].quantity
        allProds.push({
                amount : 2,
                img:"https://pp.userapi.com/c9266/v9266282/2fa/oy2a54KWUoQ.jpg",
                name:"Наконечник 605",
                price:1,
                quantity:2,
                ts:Number(`435605${colorSelect.value}`),
            })

    } else if (allProds[4]) {
        allProds[0].quantity = 1
        allProds[0].amount = allProds[0].price*allProds[0].quantity
        allProds.splice(-1, 1)
    }
    adjustRingQuantity(lengthSelect)
}


function adjustRingQuantity(lengthSelect){
    allProds[3].quantity = lengthSelect.value/10*allProds[0].quantity
    allProds[3].amount = allProds[3].quantity*allProds[3].price
}
function adjustQuantity(e, num){
    e.quantity = num
    e.amount = e.quantity*e.price
}
function activateFirstPick(e){

    const elem = e.target.closest('.carType');
    if (! elem ) return

    const elemparent = e.parentElement;
    const typeText = elem.children[1].innerHTML;

    const hasClass = (elem.classList.contains("activeFirstPick"));
    if (hasClass) {
        console.log("has activeFirstPick class");
    } else {
        elem.classList.add("activeFirstPick")
        const typeCircle = document.querySelector('.statusLineStepOne');
        const typeCircle2 = document.querySelector('.statusLineStepTwo');
        typeCircle.classList.remove('statusLineStepNext');
        typeCircle.classList.add('statusLineStepActive');
        typeCircle2.classList.add('statusLineStepNext');
        typeCircle.innerHTML = `&#10004; <span>Тип<br> ${typeText}</span>`;
    }
        document.querySelector('.firstPick').style.opacity = "0";
        setTimeout(function () {
            document.querySelector('.firstPick').style.display = "none";
        }, 300)
        setTimeout(function () {
            appearSecondPick()
        }, 300);

}
function activateSecondPick(e){

    const elem = e.target.closest('.carType2');
    if (! elem ) return

    const elemparent = e.parentElement;
    const typeText = elem.children[1].innerHTML;

    const hasClass = (elem.classList.contains("activeSecondPick"));
    if (hasClass) {
        console.log("has activeSecondPick class");
    } else {
        elem.classList.add("activeSecondPick")
        const typeCircle = document.querySelector('.statusLineStepTwo');
        const typeCircle2 = document.querySelector('.statusLineStepThree');
        typeCircle.classList.remove('statusLineStepNext');
        typeCircle.classList.add('statusLineStepActive');
        typeCircle2.classList.add('statusLineStepNext');
        typeCircle.innerHTML = `&#10004; <span>Серия<br> ${typeText}</span>`;
    }
        document.querySelector('.secondPick').style.opacity = "0";
        setTimeout(function () {
            document.querySelector('.secondPick').style.display = "none";
        }, 300)
        setTimeout(function () {
            appearThirdPick()
        }, 300);

}
function activathirdPick(e){

    const elem = e.target.closest('.carType2');
    if (! elem ) return

    const elemparent = e.parentElement;
    const typeText = elem.children[1].innerHTML;

    const hasClass = (elem.classList.contains("activeSecondPick"));
    if (hasClass) {
        console.log("has activeSecondPick class");
    } else {
        elem.classList.add("activeSecondPick")
        const typeCircle = document.querySelector('.statusLineStepThree');
        const typeCircle2 = document.querySelector('.statusLineStepThree');
        typeCircle.classList.remove('statusLineStepNext');
        typeCircle.classList.add('statusLineStepActive');
        typeCircle2.classList.add('statusLineStepNext');
        typeCircle.innerHTML = `&#10004; <span>Серия<br> ${typeText}</span>`;
    }
        document.querySelector('.secondPick').style.opacity = "0";
        setTimeout(function () {
            document.querySelector('.secondPick').style.display = "none";
        }, 300)
        setTimeout(function () {
            appearThirdPick()
        }, 300);

}
function appearSecondPick() {
    document.querySelector('.secondPick').style.display = "block";
    setTimeout(()=> document.querySelector('.secondPick').style.opacity = "1", 200 )
}
function appearThirdPick() {
    document.querySelector('.thirdPick').style.display = "block";
    setTimeout(()=> document.querySelector('.thirdPick').style.opacity = "1", 200 )
}

const allProds = [{
        amount : 1,
        img:"https://pp.userapi.com/c9266/v9266282/2fa/oy2a54KWUoQ.jpg",
        name:"Профиль",
        price:1,
        quantity:1,
        ts:440200105,
    }, {
        amount : 2,
        img:"https://pp.userapi.com/c830209/v830209609/2d598/XovK7FVpYCM.jpg",
        name:"Кронштейн",
        price:1,
        quantity:2,
        ts:435110105,
    }, {
        amount : 1,
        img:"https://pp.userapi.com/c310830/v310830469/59d5/gF-598GyC5g.jpg",
        name:"Наконечник",
        price:1,
        quantity:1,
        ts:435601105,
    }, {
        amount : 20,
        img:"https://pp.userapi.com/c623321/v623321725/8805/3Zo4UJu8-Mw.jpg",
        name:"Кольца",
        price:1,
        quantity:20,
        ts:435035105,
}]
function clearCart(){
    const len = tcart.products.length;
    for(let i = 0; i<len; i++){
        tcart.products.pop();
    }
    tcart.amount = 0;
    tcart.prodamount = 0;
    tcart.total = 0;
    document.querySelector('.t706__carticon-counter').innerHTML = tcart.total
}
function prod(array){
    clearCart();
    const newArr = JSON.parse(JSON.stringify(array));

    for(const pro of newArr){

        tcart.products.push(pro);
        tcart.amount += pro.price*pro.quantity;
        tcart.prodamount += pro.price*pro.quantity;
        tcart.total += pro.quantity;
    }
    document.querySelector('.t706__carticon-counter').innerHTML = tcart.total;
    tcart__openCart();
}
