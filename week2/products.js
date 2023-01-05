import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = {
  data() {
    return {
      url: "https://vue3-course-api.hexschool.io/v2",
      path: "jacky010080",
      detail: {},
      products: [],
    };
  },
  methods: {
    // 驗證是否登入
    checkLogin() {
      axios
        .post(`${this.url}/api/user/check`)
        .then((res) => {
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
        });
    },
    // 將資料庫中的資料丟進data
    getData() {
      axios
        .get(`${this.url}/api/${this.path}/admin/products/all`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 顯示單一產品細節
    productDetail(product) {
      this.detail = product;
    },
  },
  mounted() {
    // 取出token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    this.checkLogin();
  },
};
createApp(app).mount("#app");
