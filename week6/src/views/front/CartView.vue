<template>
  這是購物車頁面
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
        <template v-if="cart.carts">
          <tr v-for="item in cart.carts" :key="item.id">
              <td>
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteProduct(item)" :disabled="item.id === loadingItem">
                      <i class="fas fa-spinner fa-pulse"></i>
                      x
                  </button>
              </td>
              <td>
                  {{ item.product.title }}
              </td>
              <td>
                  <div class="input-group input-group-sm">
                    <select name="" id="" class="form-control" v-model="item.qty" @change="updateProductQty(item)" :disabled="item.id === loadingItem">
                      <option :value="i" v-for="i in 20" :key="'cart' + i">{{ i }}</option>
                    </select>
                  </div>
              </td>
              <td class="text-end">
                  <!-- <small class="text-success">折扣價：</small> -->
                  {{ item.total }}
              </td>
          </tr>
        </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cart.total }}</td>
      </tr>
      <tr>
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cart.final_total }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
const { VITE_API, VITE_APIPATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      productId: '',
      cart: {},
      loadingItem: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getCart () {
      this.$http.get(`${VITE_API}/v2/api/${VITE_APIPATH}/cart`)
        .then(res => {
          this.cart = res.data.data
        })
    },
    updateProductQty (item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }
      this.loadingItem = item.id
      this.$http.put(`${VITE_API}/v2/api/${VITE_APIPATH}/cart/${item.id}`, { data })
        .then(res => {
          alert(res.data.message)
          this.getCart()
          this.loadingItem = ''
        })
        .catch(err => {
          alert(err.response.data.message)
          this.loadingItem = ''
        })
    },
    deleteProduct (item) {
      this.loadingItem = item.id
      this.$http.delete(`${VITE_API}/v2/api/${VITE_APIPATH}/cart/${item.id}`)
        .then(res => {
          alert(res.data.message)
          this.getCart()
          this.loadingItem = ''
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    deleteAllProduct () {
      this.$http.delete(`${VITE_API}/v2/api/${VITE_APIPATH}/carts`)
        .then(res => {
          alert(res.data.message)
          this.getCart()
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
