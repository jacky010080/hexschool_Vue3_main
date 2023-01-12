import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
let productModal = null;

const app = {
  data() {
    return {
      url: "https://vue3-course-api.hexschool.io/v2",
      path: "jacky010080",
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
    };
  },
  methods: {
    // 驗證是否登入
    checkLogin() {
      axios
        .post(`${this.url}/api/user/check`)
        .then((res) => {
          alert(`狀態是否登入：${res.data.success}`);
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
    openModal(isNew, product) {
      if (isNew === "new") {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        productModal.show();
      } else if (isNew === "edit") {
        this.tempProduct = { ...product };
        this.isNew = false;
        productModal.show();
      }
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
    updateProduct() {
      let http = "post";
      let apiUrl = `${this.url}/api/${this.path}/admin/product`;

      if (!this.isNew) {
        http = "put";
        apiUrl = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`;
      }
      axios[http](apiUrl, {
        data: this.tempProduct,
      })
        .then((res) => {
          alert(res.data.message);
          productModal.hide();
          this.getData();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  mounted() {
    productModal = new bootstrap.Modal(document.querySelector("#productModal"));

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
