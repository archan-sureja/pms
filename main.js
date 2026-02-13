document.addEventListener("DOMContentLoaded", () => {
    productstore = new productStore()
    displayProducts(productstore.list())
    document.getElementById("product_input").addEventListener('submit',handleAdd)
    document.getElementById('sort_by').addEventListener("change", handleSort)
    document.getElementById('reverse_check').addEventListener("change", handleSort)
    document.getElementById('start_id').addEventListener("change",onchangeStart)
    document.getElementById('start_id').max = productstore.list().length
    document.getElementById('end_id').max = productstore.list().length
    document.getElementById('start_id').value = 1 
    document.getElementById('end_id').value = productstore.list().length
    document.getElementById('filter_btn').addEventListener("click",handleFilter)
    document.getElementById('product_update').addEventListener("submit",updateProduct)
    document.getElementById('cancel_btn').addEventListener("click",cancelUpdate)
    
})
function handleSort() {
    let sort_key = document.getElementById('sort_by').value
    let reverse = document.getElementById('reverse_check').checked
    console.log(sort_key,reverse)
    res = sort_products(productstore.list(), sort_key, reverse)
    displayProducts(res)
}

function onchangeStart(){
    let start_id = parseInt(document.getElementById('start_id').value)
    let end_id = parseInt(document.getElementById('end_id').value)
    if(end_id<start_id){
        document.getElementById('end_id').value = start_id
    }
    document.getElementById('end_id').min = start_id
}
function handleFilter(){
    console.log("filter")
    let start_id = document.getElementById('start_id').value
    let end_id = document.getElementById('end_id').value
    start_id = parseInt(start_id)
    let res = filter_products(productstore.list(),start_id,end_id)
    console.log(res)
    displayProducts(res)
    
    
}

function updateProduct(event){
    event.preventDefault()
    let product_id = parseInt(event.target.productId.value)
    let update = {
        Name : event.target.updatedName.value,
        Price : parseInt(event.target.updatedPrice.value),
        Description : event.target.updatedDescription.value
    }
    if(productstore.update(product_id,update)){
        alert('update successfull!')
        displayProducts(productstore.list())
        cancelUpdate()
    }
}
function cancelUpdate(){
     document.getElementById('product_input').style.display = "block"
     document.getElementById('product_update').style.display = "none"
}

function updateFormDisplay(event) {
    const idx = parseInt(event.target.id.split('-')[1])
    let p = productstore.list()[idx-1]
    document.getElementById('productId').value = idx
    document.getElementById('productId').readOnly = true
    document.getElementById('product_input').style = "display:none;"
    document.getElementById('updatedName').value = p.Name
    document.getElementById('updatedPrice').value = p.Price
    document.getElementById('updatedDescription').value = p.Description
    document.getElementById('updatedImageLink').value = p.Image
    document.getElementById('product_update').style.display = "block"
}


function handleAdd(event){
    event.preventDefault()
    let product = {}
    product.Name = event.target.Name.value
    product.Price = parseInt(event.target.Price.value)
    product.Description = event.target.Description.value
    product.Image = event.target.ImageLink.value
    productstore.add(product)
    displayProducts(productstore.list())
} 
 
function displayProducts(product_list) {
    let html = "";
    for (let i = 0; i < product_list.length; i++) {
        html += `<div class="card" style="width: 18rem;">
                    <img src="${product_list[i].Image}" class="card-img-top" alt="product-image" style="height:286px; width:286px;">
                    <div class="card-body">
                        <h5 class="card-title">${product_list[i].Name}(ID : ${product_list[i].Id})</h5>
                        <p class="card-text">${product_list[i].Description}</p>
                        <p class="card-text">Price : &#8377;${product_list[i].Price}</p>
                        <button type="button" class="btn btn-primary" id="update-${product_list[i].Id}" onclick="updateFormDisplay(event)">Update</button>
                    </div>
                </div>`
    }
    document.getElementById("product_store").innerHTML = html
}

