<template>
  這是登入畫面
  <form id="form" class="form-signin" @submit.prevent="login">
    <div class="form-floating mb-3">
      <input
        type="email"
        class="form-control"
        id="username"
        placeholder="name@example.com"
        v-model="user.username"
        required
        autofocus
      />
      <label for="username">Email address</label>
    </div>
    <div class="form-floating">
      <input
        type="password"
        class="form-control"
        id="password"
        placeholder="Password"
        v-model="user.password"
        required
      />
      <label for="password">Password</label>
    </div>
    <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
      登入
    </button>
  </form>
</template>

<script>
const { VITE_API } = import.meta.env

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$http.post(`${VITE_API}/v2/admin/signin`, this.user)
        .then((res) => {
          alert(res.data.message)
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
          this.$router.push('/admin/products')
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  }
}
</script>
