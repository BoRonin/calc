document.addEventListener('DOMContentLoaded', function(){
    clearCart()
    const calc = document.querySelector('.calc')
    const lineStepOne = document.querySelector('.statusLineStepOne')
    const lineStepTwo = document.querySelector('.statusLineStepTwo')
    const lineStepThree = document.querySelector('.statusLineStepThree')
    const lineStepFour = document.querySelector('.statusLineStepFour')

    const collectionSelect = document.querySelector('.secondPick')
    const carSelect = document.querySelector('.firstPick')
    const colorSelect = document.querySelector('.colorBox')
    const lengthSelect = document.querySelector('.length')
    const profileSelect = document.querySelector('.profileDivs')
    const kronshSelect = document.querySelector('.kronshDivs')
    const endSelect = document.querySelector('.endDivs')
    const ringSelect = document.querySelector('.ringDivs')

    const calcButton = document.querySelector('.toCarType')
    calcButton.addEventListener('click', e => {
        next(e, collectionSelect, carSelect)
        setTimeout(function () {
            appearPick(calcButton2)
        }, 300)
        disappearPick(calcButton)
    })

    const calcButton2 = document.querySelector('.toOther')
    calcButton2.addEventListener('click', e => {
        disappearPick(calcButton2)
        next(e, document.querySelector('.other'), collectionSelect)

        setTimeout(function(){
            appearPick(document.querySelector('.thirdPick'))
        }, 300)
    })


    const toKronsh = document.querySelector('.toKronsh')
    toKronsh.addEventListener('click', e => {
        next(e, document.querySelector('.thirdAndAHalfPick'), document.querySelector('.thirdPick'))
    })
    const toLast = document.querySelector('.toLast')
    toLast.addEventListener('click', e => {
        next(e, document.querySelector('.fourthPick'), document.querySelector('.thirdAndAHalfPick'))
    })
    const toTrashButton = document.querySelector('.toTrash')
    toTrashButton.addEventListener('click', () => {
        allProds[0].name = `Профиль ${profileActiveDiv.getAttribute('data-value')}`
        allProds[1].name = `Кронштейн ${kronshActiveDiv.getAttribute('data-value')}`
        allProds[2].name = `Наконечник ${endActiveDiv.getAttribute('data-value')}`
        allProds[3].name = `Кольца ${ringActiveDiv.getAttribute('data-value')}`
        const typeCircle = document.querySelector('.statusLineStepFour')
        typeCircle.classList.remove('statusLineStepNext')
        typeCircle.classList.add('statusLineStepActive')
        typeCircle.innerHTML = `&#10004; <span>Готово!</span>`
        setTimeout(function(){
            clearCart()
            prod(allProds)
        }, 300)

    })

    //activeDivs
    let colorActiveDiv = colorSelect.getElementsByTagName('div')[0]
    let profileActiveDiv = profileSelect.getElementsByTagName('div')[0]
    let kronshActiveDiv = kronshSelect.getElementsByTagName('div')[0]
    let endActiveDiv = endSelect.getElementsByTagName('div')[0]
    let ringActiveDiv = ringSelect.getElementsByTagName('div')[0]

    collectionSelect.addEventListener('click', e => {
        const elem = e.target.closest('.carType2')
        if (!elem) return
        if (elem.classList.contains('activeDiv')) return
        let dValue = elem.getAttribute('data-value')
        console.log(elem.parentElement)
        activateNode(elem.parentElement, elem)
    })
    carSelect.addEventListener('click', e => {
        const elem = e.target.closest('.carType')
        if (!elem) return
        if (elem.classList.contains('activeDiv')) return
        let dValue = elem.getAttribute('data-value')
        activateNode(elem.parentElement, elem)
    })
    lengthSelect.addEventListener('change', () => {
        const temp = [...profileActiveDiv.getAttribute('data-value')]
        const finalTemp = `${temp[0]}${temp[1]}${temp[2]}${lengthSelect.value}${temp[6]}${temp[7]}${temp[8]}`
        profileActiveDiv.setAttribute('data-value', finalTemp)
        console.log(profileActiveDiv.getAttribute('data-value'))

        allProds[0].ts = Number(profileActiveDiv.getAttribute('data-value'))
        if (lengthSelect.value == 240 || lengthSelect.value == 300) {
            allProds[1].quantity = 3
            allProds[1].amount = allProds[1].quantity*allProds[1].price
        } else {
            allProds[1].quantity = 2
            allProds[1].amount = allProds[1].quantity*allProds[1].price
        }
        adjustRingQuantity(lengthSelect)

    })
    profileSelect.addEventListener('click', e => {
        const elem = e.target.closest('.profileDiv')
        if (!elem) return
        if (elem.classList.contains('activeDiv')) return
        let dValue = elem.getAttribute('data-value')
        activateNode(profileSelect, elem)
        profileActiveDiv = elem

        if (dValue.startsWith('440')) {
            if (lengthSelect[0].value = 150) {
                lengthSelect.selectedIndex = 0
                lengthSelect[0].value = 200
                lengthSelect[0].innerHTML = "200 см."
                lengthSelect[1].value = 240
                lengthSelect[1].innerHTML = "240 см."
                lengthSelect[2].value = 300
                lengthSelect[2].innerHTML = "300 см."

                let childDivs = profileSelect.getElementsByTagName('div')
                let text = null
                for (let child in childDivs){
                    if (typeof childDivs[child] === "object") {
                        text = [...childDivs[child].getAttribute('data-value')]
                        text[3] = "2"
                        text[4] = "0"
                        text[5] = "0"
                        childDivs[child].setAttribute('data-value', text.join(''))
                        if (childDivs[child].classList.contains('activeDiv')) {
                            profileActiveDiv = childDivs[child]
                        }
                    }
                }

            }

        } else {
            if (lengthSelect[0].value = 200) {
                lengthSelect.selectedIndex = 0
                lengthSelect[0].value = 150
                lengthSelect[0].innerHTML = "150 см."
                lengthSelect[1].value = 200
                lengthSelect[1].innerHTML = "200 см."
                lengthSelect[2].value = 240
                lengthSelect[2].innerHTML = "240 см."
                let childDivs = profileSelect.getElementsByTagName('div')
                let text = null
                for (let child in childDivs){
                    if (typeof childDivs[child] === "object") {
                        text = [...childDivs[child].getAttribute('data-value')]
                        text[3] = "1"
                        text[4] = "5"
                        text[5] = "0"
                        childDivs[child].setAttribute('data-value', text.join(''))
                        if (childDivs[child].classList.contains('activeDiv')) {
                            profileActiveDiv = childDivs[child]
                        }
                    }
                }
            }
        }
        allProds[0].ts = Number(profileActiveDiv.getAttribute('data-value'))
        allProds[0].img = elem.children[0].getAttribute('src')
        adjustRingQuantity(lengthSelect)
    })
    colorSelect.addEventListener('click', e => {
        const elem = e.target.closest('.colorDiv')
        if (!elem) return
        if (elem.classList.contains('activeDiv')) return
        colorActiveDiv = elem
        activateNode(colorSelect, elem)

        let dValue = elem.getAttribute('data-value')
        const lastLetters = [...dValue]
        colorCorrection(profileSelect, lastLetters, 0)
        colorCorrection(kronshSelect, lastLetters, 1)
        colorCorrection(endSelect, lastLetters, 2)
        colorCorrection(ringSelect, lastLetters, 3)




        if (allProds[4]) {
            allProds[4].ts = Number(`435605${elem.getAttribute('data-value')}`)
        }

    })
    kronshSelect.addEventListener('click', e => {
        const elem = e.target.closest('.kronshDiv')
        if (!elem) return
        if (elem.classList.contains('activeDiv')) return
        kronshActiveDiv = elem
        console.log(kronshActiveDiv)
        activateNode(kronshSelect, elem)
        adjustKrone(elem, colorActiveDiv, lengthSelect)
    })
    endSelect.addEventListener('click', e => {
        const elem = e.target.closest('.endDiv')
        if (!elem) return
        if (elem.classList.contains('activeDiv')) return
        activateNode(endSelect, elem)
        endActiveDiv = elem
        allProds[2].ts = Number(elem.getAttribute('data-value'))
        allProds[2].img = elem.children[0].getAttribute('src')
    })
    ringSelect.addEventListener('click', e => {
        const elem = e.target.closest('.ringDiv')
        if (!elem) return
        if (elem.classList.contains('activeDiv')) return
        activateNode(ringSelect, elem)
        ringActiveDiv = elem
        allProds[3].ts = Number(elem.getAttribute('data-value'))
        allProds[3].img = elem.children[0].getAttribute('src')
    })
})
function colorCorrection(paps, lastLetters, index){
    if (paps === document.querySelector('.endDivs')) {
        let childDivs = paps.getElementsByTagName('div')
        for (let child in childDivs){
            if (typeof childDivs[child] === 'object') {
                if (childDivs[child].classList.contains('fourthDiv')){
                    text = [...childDivs[child].getAttribute('data-value')]
                        text[6] = lastLetters[0]
                        text[7] = lastLetters[1]
                        text[8] = lastLetters[2]
                    childDivs[child].setAttribute('data-value', text.join(''))
                    if (childDivs[child].classList.contains('activeDiv')) {
                        allProds[index].ts = Number(childDivs[child].getAttribute('data-value'))
                    }
                }
            }
        }
        return
    }
    let childDivs = paps.getElementsByTagName('div')
    let text = null
    for (let child in childDivs) {
        if (typeof childDivs[child] === "object"){
            text = [...childDivs[child].getAttribute('data-value')]
                text[6] = lastLetters[0]
                text[7] = lastLetters[1]
                text[8] = lastLetters[2]
            childDivs[child].setAttribute('data-value', text.join(''))
            if (childDivs[child].classList.contains('activeDiv')) {
                allProds[index].ts = Number(childDivs[child].getAttribute('data-value'))
            }
        }
    }
}
function activateNode(paps, elem){
    let childDivs = paps.getElementsByTagName('div')
    for (let child in childDivs) {
        if (typeof childDivs[child] === "object"){
            if (childDivs[child].classList.contains('activeDiv')) {
                childDivs[child].classList.remove('activeDiv')
            }
        }
    }
    elem.classList.add('activeDiv')
}

function adjustKrone(elem, colorActiveDiv, lengthSelect){
    allProds[1].ts = Number(elem.getAttribute('data-value'))
    allProds[1].img = elem.children[0].getAttribute('src')
    const kronshValue = [...elem.getAttribute('data-value')]
    const kronshType = Number(`${kronshValue[3]}${kronshValue[4]}${kronshValue[5]}`)
    if (kronshType === 119 && !allProds[4]) {
        allProds[0].quantity = 2
        allProds[0].amount = allProds[0].price*allProds[0].quantity
        const TS = `435605${colorActiveDiv.getAttribute('data-value')}`
        allProds.push({
                amount : 2,
                img:"https://static.tildacdn.com/tild3965-6432-4863-b734-613531306333/435-605.jpg",
                name:"Наконечник 605",
                price:1,
                quantity:2,
                ts:Number(TS)
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
function next(e, toAppear, toDissapear){
    disappearPick(toDissapear)
    setTimeout(function () {
        appearPick(toAppear)
    }, 300)

}
function activePick2(e, toAppear){
    const elem = e.target.closest('.thirdDiv');
    if (! elem ) return
}
function activatePick(e, toAppear){
    const elem = e.target.closest('.carType');
    console.log(elem);
    if (! elem ) return
    console.log("hey")
    const elemparent = elem.parentElement;


    elem.classList.add("activePick")
    disappearPick(elemparent)
    setTimeout(function () {
        appearPick(toAppear)
    }, 300);
    function sayHi(){
        console.log('HI');
    }

}

function disappearPick(pick){
    pick.style.opacity = "0";
    setTimeout(function () {
        pick.style.display = "none";
    }, 300)
}
function appearPick(pick){
    if (pick.classList.contains('calcBut')) {
        pick.style.display = "flex";
        setTimeout(()=> pick.style.opacity = "1", 200 )
        return
    }
    pick.style.display = "block";
    setTimeout(()=> pick.style.opacity = "1", 200 )

}

const allProds = [{
        amount : 1,
        img:"https://static.tildacdn.com/tild3166-3038-4363-b137-316663393566/440-200.jpg",
        name:"Профиль",
        price:1,
        quantity:1,
        ts:440200105,
    }, {
        amount : 2,
        img:"https://static.tildacdn.com/tild3736-3861-4263-a661-616236333766/435-110.jpg",
        name:"Кронштейн",
        price:1,
        quantity:2,
        ts:435110105,
    }, {
        amount : 1,
        img:"https://static.tildacdn.com/tild3032-6262-4064-a237-396265373763/435-601.jpg",
        name:"Наконечник",
        price:1,
        quantity:1,
        ts:435601105,
    }, {
        amount : 20,
        img:"https://static.tildacdn.com/tild6663-6462-4662-a430-316563616430/435-035.jpg",
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
