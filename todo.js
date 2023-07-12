function update() {
    let tit = document.getElementById('Title').value;
    let des = document.getElementById('Description').value;
    document.getElementById('Title').value = null;
    document.getElementById('Description').value = null;
    if (localStorage.getItem('itemJson') == null && (tit != '' || des != '')) {
        let itemJSONArray = [];
        itemJSONArray.push([tit, des]);
        localStorage.setItem('itemJson', JSON.stringify(itemJSONArray));
    }
    else if (tit != '' || des != '') {
        let itemJsonstr = localStorage.getItem('itemJson');
        itemJSONArray = JSON.parse(itemJsonstr);
        itemJSONArray.push([tit, des]);
        localStorage.setItem('itemJson', JSON.stringify(itemJSONArray));
    }
    let tableBody = document.getElementById('tableBody');
    let str = "";
    let itemJsonstr = localStorage.getItem('itemJson');
    itemJSONArray = JSON.parse(itemJsonstr);
    if (itemJSONArray != null) {
        itemJSONArray.forEach((element, index) => {
            str += `
        <tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-sm btn-primary" onclick = "deleted(${index})">Delete</button></td>
        </tr>
        `
        });
    }
    tableBody.innerHTML = str;
};
let add = document.getElementById('add');
add.addEventListener('click', update);
function deleted(itemIndex) {
    let itemJsonstr = localStorage.getItem('itemJson');
    itemJSONArray = JSON.parse(itemJsonstr);
    // Need to delete element with the given index.
    itemJSONArray.splice(itemIndex, 1);
    localStorage.setItem('itemJson', JSON.stringify(itemJSONArray));
    update();
};
function clearStorage(){
    if(confirm("Do you really what to clear?")){
        localStorage.clear();
        update();
    }
}
update();
