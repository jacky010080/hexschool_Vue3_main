import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
let productModal = "";
let delProductModal = "";

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
          alert(err.data.message);
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
        productModal.show(); //開啟新增||編輯Modal
      } else if (isNew === "edit") {
        this.tempProduct = { ...product };
        this.isNew = false;
        productModal.show(); //開啟新增||編輯Modal
      } else if (isNew === "delete") {
        this.tempProduct = { ...product };
        delProductModal.show(); //開啟刪除商品Modal
      }
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
    updateProduct() {
      //預設串接新增商品api
      let http = "post";
      let apiUrl = `${this.url}/api/${this.path}/admin/product`;
      //如果不是新商品的話，改為串接編輯商品api
      if (!this.isNew) {
        http = "put";
        apiUrl = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`;
      }
      //根據商品是否為新商品，分別串接對應api
      axios[http](apiUrl, {
        data: this.tempProduct,
      })
        .then((res) => {
          alert(res.data.message);
          productModal.hide(); //關閉Modal互動視窗
          this.getData(); //重新取得商品資料
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    // 刪除單筆商品
    deleteProduct() {
      axios
        .delete(
          `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`
        )
        .then((res) => {
          alert(res.data.message);
          delProductModal.hide();
          this.getData(); //重新取得商品資料
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  mounted() {
    // 綁定新增||編輯Modal的DOM
    productModal = new bootstrap.Modal(document.querySelector("#productModal"));
    // 綁定刪除商品Modal的DOM
    delProductModal = new bootstrap.Modal(
      document.querySelector("#delProductModal")
    );

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
