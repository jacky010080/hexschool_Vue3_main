<template>
  這是『後台』頁面
  <router-link to="/admin/products">後台產品列表</router-link> |
  <router-link to="/admin/orders">後台訂單列表</router-link> |
  <router-link to="/">回到前台</router-link> |
  <a href="#" @click.prevent="logout">登出</a>
  <hr>
  <RouterView></RouterView>
</template>

<script>
import { RouterView } from 'vue-router'

const { VITE_API } = import.meta.env

export default {
  components: {
    RouterView
  },
  methods: {
    logout () {
      document.cookie = `hexToken=; expires=${new Date()};`
      this.$router.push('/login')
    },
    checkLogin () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = token
      this.$http.post(`${VITE_API}api/user/check`)
        .then((res) => {
          alert(`狀態是否登入：${res.data.success}`)
          if (!res.data.success) {
            this.$router.push('/login')
          }
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
