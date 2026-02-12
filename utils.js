function filter_products(product_list, start_id, end_id) {
    if (start_id <= 0 || start_id > product_list.length || end_id < start_id || end_id > product_list.length) {
        throw Error("Invalid start and/or end ids")
    }
    return product_list.slice(start_id - 1, end_id)
}
function sort_products(product_list, key, reverse = false) {
    // key can only be Name,Price 
    let result = null
    if (key == "Price" || key=="Id") {
        result = product_list.sort((a, b) => { return a[key] - b[key] })
    }
    else if (key == "Name") {
        result = product_list.sort((a,b)=>{ return a[key].localeCompare(b[key])})
    }
    else{
        throw Error("Invalid key value must be one of [Id, Name, Price]")
    }
    return ((reverse) ? result.reverse() : result)
}

function fileToBase64(file){
        return new Promise((resolve,reject)=>{
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = reject
        })
}