document.addEventListener("DOMContentLoaded", () => {
    productstore = new productStore()
    displayImgPreview()
    displayProducts(productstore.list())
    for (let i = 0; i < productstore.list().length; i++) {
        document.getElementById(`update-${i + 1}`).addEventListener("click", updateHandler)
    }
    document.getElementById('sort_by').addEventListener("change", handleSort)
    document.getElementById('reverse_check').addEventListener("change", handleSort)
    document.getElementById('product_image').addEventListener("change",updateImageDisplay)
})
function handleSort(event) {
    let sort_key = document.getElementById('sort_by').value
    let reverse = document.getElementById('reverse_check').checked
    console.log(sort_key, reverse)
    sort_products(productstore.list(), sort_key, reverse)
    displayProducts(productstore.list())
}
// update button click handler 
function updateHandler(event) {
    console.log(event.target.id)
    // open update form 
    // submit new data to product.update() method 
}
// form submission handling 
const product_input = document.getElementById("product_input")
product_input.addEventListener("submit", async function (event) {
    event.preventDefault()
    const file = document.getElementById("product_image").files[0]
    if (!file) {
        alert("please select product image")
        return;
    }
    let product = {}
    product.Name = event.target.Name.value
    product.Price = parseInt(event.target.Price.value)
    product.Description = event.target.Description.value
    product.Image = await fileToBase64(file)
    productstore.add(product)
    displayProducts(productstore.list())
})

// displaying products in web page 
function displayProducts(product_list) {
    let html = "";
    for (let i = 0; i < product_list.length; i++) {
        html += `<div class="card" style="width: 18rem;">
                    <img src="${product_list[i].Image}" class="card-img-top" alt="product-image">
                    <div class="card-body">
                        <h5 class="card-title">${product_list[i].Name}(ID : ${product_list[i].Id})</h5>
                        <p class="card-text">${product_list[i].Description}</p>
                        <p class="card-text">Price : &#8377;${product_list[i].Price}</p>
                        <a href="#" class="btn btn-primary" id="update-${product_list[i].Id}">Update</a>
                    </div>
                </div>`
    }
    document.getElementById("product_store").innerHTML = html
}

// img - preview related js 
function displayImgPreview() {
    const pre_img = document.getElementById("imagePreview")
    const img_input = document.getElementById("product_image")
    if(img_input.files){
        const curFile = img_input.files[0];
        const img = document.createElement('img')
        img.src = URL.createObjectURL(curFile);
        img.alt = curFile.name
        img.style.width = "300px"
        img.style.height = "300px"
        pre_img.appendChild(img)
    }
   
}

function updateImageDisplay() {
    const pre_img = document.getElementById("imagePreview")
    const img_input = document.getElementById("product_image")
    console.log("Updating img for preview")
    while (pre_img.firstChild) {
        pre_img.removeChild(pre_img.firstChild)
    }
    const curFile = img_input.files[0];
    const img = document.createElement('img')
    img.src = URL.createObjectURL(curFile);
    img.alt = curFile.name
    img.style.width = "300px"
    img.style.height = "300px"
    pre_img.appendChild(img)
}

img_input.addEventListener("change", updateImageDisplay)