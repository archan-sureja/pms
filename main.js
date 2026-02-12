document.addEventListener("DOMContentLoaded",()=>{
        productstore = new productStore()
        displayProducts(productstore.list())
        for(let i=0;i<productstore.list().length;i++){
            document.getElementById(`update-${i+1}`).addEventListener("clcik",)
        }
})
// update button click handler 
function updateHandler(event){
    
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
function displayProducts(product_list){
    let html = "";
    for(let i=0;i<product_list.length;i++){
        html+=`<div class="card" style="width: 18rem; height:18rem;">
                    <img src="${product_list[i].Image}" class="card-img-top" alt="product-image">
                    <div class="card-body">
                        <h5 class="card-title">${product_list[i].Name}(ID : ${i+1})</h5>
                        <p class="card-text">${product_list[i].Description}</p>
                        <p class="card-text">Price : &#8377;${product_list[i].Price}</p>
                        <a href="#" class="btn btn-primary" id="update-${i+1}">Update</a>
                    </div>
                </div>`
    }
    document.getElementById("product_store").innerHTML = html
}

// img - preview related js 
const pre_img = document.getElementById("imagePreview")
const img_input = document.getElementById("product_image")
function updateImageDisplay() {
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