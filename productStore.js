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
        this.product_list.push(product)
        localStorage.setItem("productStore", JSON.stringify(this.product_list))
    }
    update(product_id, update) {
        let isUpdated = false
        for (let i = 0; i < this.product_list.length; i++) {
            if (i+1 == product_id) {
                originalProduct = this.product_list[i]
                this.product_list[i] = { ...originalProduct, ...update }
                localStorage.setItem("productStore", JSON.stringify(this.product_list))
                return isUpdated
            }
        }
        return isUpdated
    }
    list() {
        return this.product_list
    }
}


