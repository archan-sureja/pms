class productStore {
    constructor() {
        const res = localStorage.getItem("productStore")
        if (res) {
            this.product_list = JSON.parse(res)
            return
        }
        this.product_list = []
        localStorage.setItem("productStore", JSON.stringify(this.product_list))

    }
    add(product) {
        product.Id = this.product_list.length + 1
        this.product_list.push(product)
        localStorage.setItem("productStore", JSON.stringify(this.product_list))
    }
    update(product_id, update) {
        let isUpdated = false
        for (let i = 0; i < this.product_list.length; i++) {
            if (this.product_list[i].Id== product_id) {
                let originalProduct = this.product_list[i]
                this.product_list[i] = {...originalProduct , ...update}
                localStorage.setItem("productStore", JSON.stringify(this.product_list))
                isUpdated = true 
                return isUpdated
            }
        }
        return isUpdated
    }
    list() {
        return JSON.parse(localStorage.getItem("productStore"))
    }
}


