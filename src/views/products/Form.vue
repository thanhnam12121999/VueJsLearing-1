<template>
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h3 class="display-5">Product Infomation</h3>
        <router-link to="/products">Back</router-link>
    </div>

    <div class="container">
        <form @submit.prevent="save()">
            <div class="form-group row">
            <label for="inputPassword" class="col-sm-3 col-form-label">Product name</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" 
                    v-model="product.name" 
                    @blur="validate()"
                    :class="{'is-invalid': error.name}"
                />
                <span class="invalid-feedback d-flex text-start" v-if="error.name">{{ error.name }}</span>
            </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-3 col-form-label">Product price</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" 
                        v-model="product.price" 
                        @blur="validate()"
                        :class="{'is-invalid': error.price}"
                    />
                    <span class="invalid-feedback d-flex text-start" v-if="error.price">{{ error.price }}</span>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-3 col-form-label">Product description</label>
                <div class="col-sm-9">
                    <textarea class="form-control" rows="3" 
                        v-model="product.description"
                        @blur="validate()"
                        :class="{'is-invalid': error.description}">
                    </textarea>
                    <span class="invalid-feedback d-flex text-start" v-if="error.description">{{ error.description }}</span>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-3 col-form-label"></label>
                <div class="col-sm-9">
                    <button type="submit" class="btn btn-primary">Save</button> &nbsp;
                    <button type="reset" class="btn btn-danger" @click="cancle()">Cancel</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                error : {
                    name : '',
                    price : '',
                    description : ''
                },
                product : {
                    name : '',
                    price : '',
                    description : ''
                }
            }
        },
        created() {
            let productId = this.$route.params.id
            if (productId) {
                this.getProduct(productId)
            }
        },
        methods: {
            validate() {
                let isValid = true
                this.error = {
                    name : '',
                    price : '',
                    description : ''
                }
                if (!this.product.name) {
                    this.error.name = 'Product name is required'
                    isValid = false
                }
                if (!this.product.price) {
                    this.error.price = 'Price is required'
                    isValid = false
                } else if (!this.isNumber(this.product.price)) {
                    this.error.price = 'Price must be number'
                    isValid = false
                }
                if (!this.product.description) {
                    this.error.description = 'Description is required'
                    isValid = false
                }
                return isValid
            },
            isNumber(value) {
                return /^-?\d+$/.test(value);
            },
            save() {
                if (!this.validate()) {
                    return;
                }
                if (this.product.id) {
                    this.$request.put(`http://localhost:8000/api/products/${this.product.id}`, this.product)
                    .then((res) => {
                        if (res.data.success) {
                            this.$router.push({name: "product.list"})
                        }
                    })  
                    return;
                }
                this.$request.post('http://localhost:8000/api/products', this.product)
                    .then((res) => {
                        if (res.data.success) {
                            this.$router.push({name: "product.list"})
                        }
                    })
                    return;  
            },
            getProduct(productId) {
                this.$request.get(`http://localhost:8000/api/products/${productId}`)
                    .then(res => {
                        this.product = res.data
                    })
            },
            cancle() {
                this.product = {
                    name : '',
                    price : '',
                    description : ''
                }
            }
        }
    }
</script>