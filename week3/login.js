import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
const app = {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post("https://vue3-course-api.hexschool.io/v2/admin/signin", this.user)
        .then((res) => {
          alert(res.data.message);
          //塞進cookie,expired設置有效時間
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
          //跳轉到商品頁面
          window.location = "products.html";
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
};
createApp(app).mount("#app");
