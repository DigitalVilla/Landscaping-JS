let shape = document.querySelector(".myShapes").children;
let total = document.getElementById("total-price");
let rdBtn = document.querySelectorAll(".rdBtn");
let itemList = document.querySelector(".side-nav_order_list");
rdBtn[0].checked = "checked";
let selection = 1;
let itemName = "";
let prices = [];
let itemId = 0;

function proCheck() {
    for (let i = 0; i < rdBtn.length; i++) {
        if (rdBtn[i].checked) {
            shape[0].style.backgroundImage = "url(../img/shape-" + (i + 1) + ".png)";
            selection = i + 1;
            measures(selection);
        }
    }
}

function measures(num) {
    showAll();
    if (num == 3) {
        shape[3].classList.add('hide');
        shape[2].classList.add('hide');
        shape[1].placeholder = "Radius"
    } else if (num == 2) {
        shape[3].classList.add('hide');
        shape[2].placeholder = "Heihgt"
        shape[1].placeholder = "Radius"
    } else if (num == 1) {
        shape[1].placeholder = "Length"
        shape[2].placeholder = "Width"
        shape[3].placeholder = "Heihgt"
    } else if (num == 4) {
        shape[1].placeholder = "Top Radius"
        shape[2].placeholder = "Base Radius"
        shape[3].placeholder = "Heihgt"
    }
};

function addItem() {
    if (selection != 0) {
        valid = false;
        shape = document.querySelector(".myShapes").children;
        switch (selection) {
            case 1:
                valid = testValues(3);
                if (valid) {
                    prices.push((shape[1].value * shape[2].value * shape[3].value) * .10);
                    itemName = "Square " + shape[1].value + "x" + shape[2].value + "x" + shape[3].value;
                }
                break;
            case 2:
                valid = testValues(2);
                if (valid) {
                    prices.push(Math.PI * shape[1].value * shape[1].value * shape[2].value * .12);
                    itemName = "Cylinder " + shape[1].value + "x" + shape[2].value;
                }
                break;
            case 3:
                valid = testValues(2);
                if (valid) {
                    prices.push((1 / 2 * (4 / 3 * Math.PI * shape[1].value  * shape[1].value  * shape[1].value )) * .15);
                    itemName = "1/2  Sphere " +"x"+ shape[1].value;
                }
                break;
            case 4:
                valid = testValues(3);
                if (valid) {
                    prices.push((1 / 3 * Math.PI * (shape[1].value * shape[1].value + shape[1].value * shape[2].value + shape[2].value * shape[2].value) * shape[3].value) * .20);
                    itemName = "Cone " + shape[1].value + "x" + shape[2].value + "x" + shape[3].value;
                }
                break;
        }
        if (valid) {
            addCurrency();
            updateTotal();
        }
    }
}

function testValues(values) {
    for (let i = 1; i < values; i++) {
        if (shape[i].value.length == 0)
            return false;
    }
    return true;
}

document.addEventListener("click", function (e) {
    if (e.target.className == "QTY") {
        let newPrice = e.target.nextSibling;
        let thisPrice = prices[parseFloat(e.target.id)];
        newPrice.innerHTML = (thisPrice * e.target.value).toFixed(2);
        updateTotal();
    }
});

function addCurrency() {
    let li = document.createElement('li');
    li.setAttribute('class', "side-nav_order_list_item");
    let html = ['<span class="bullet"></span>',
        '<span class="item">' + itemName + '</span>',
        '<input id="' + (itemId) + '" class="QTY" type="number" placeholder="1" min="0">',
        '<span class="cost">' + prices[itemId++].toFixed(2) + '</span>'
    ].join('');
    li.innerHTML = html;
    itemList.appendChild(li);
}

function showAll() {
    forEach(shape, function (el, i) {
        el.classList.remove("hide");
        el.value = null;
    });
}

function forEach(array, callback) {
    for (var i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

function updateTotal() {
    let newTotal = 0;
    let cost = document.querySelectorAll('.cost');
    forEach(cost, function (el, i) {
        newTotal += parseFloat(el.innerHTML);
    })
    total.innerText = "$"+newTotal.toFixed(2);
}