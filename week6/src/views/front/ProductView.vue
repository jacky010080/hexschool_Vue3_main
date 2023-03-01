<template>
  這是單一產品頁面
  <h2>{{ product.title }}</h2>
  <img :src="product.imageUrl" width="300" alt="">
</template>

<script>
const { VITE_API, VITE_APIPATH } = import.meta.env
export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.$http.get(`${VITE_API}/v2/api/${VITE_APIPATH}/product/${id}`)
        .then(res => {
          this.product = res.data.product
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
