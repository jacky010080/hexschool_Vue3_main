const url = 'https://vue3-course-api.hexschool.io/v2';
const path = "jacky010080";

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { email, required, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('email', email);
defineRule('required', required);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');
configure({
  generateMessage: localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});


const productModal = {
	props: ['id', 'addToCart', 'openModal'],
	data() {
		return {
			modal: {},
			tempProduct: {},
			qty: 1,
		}
	},
	template: '#userProductModal',
	methods: {
		hide() {
			this.modal.hide();
		}
	},
	watch: {
		id() {
			if (this.id) {
				axios.get(`${url}/api/${path}/product/${this.id}`)
					.then(res => {
						this.tempProduct = res.data.product;
						this.modal.show();
					});
			}
		}
	},
	mounted() {
		this.modal = new bootstrap.Modal(this.$refs.modal);
		this.$refs.modal.addEventListener('hidden.bs.modal', event => {
			this.openModal(''); //改id
		});
	},
};

const app = Vue.createApp({
	data() {
		return {
			products: [],
			productId: "",
			cart: {},
			loadingItem: "",
			form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
		};
	},
	components: {
		productModal,
		VForm: Form,
		VField: Field,
		ErrorMessage: ErrorMessage,
	},
	methods: {
		getProducts() {
			axios.get(`${url}/api/${path}/products/all`)
				.then(res => {
					this.products = res.data.products;
				})
				.catch(err => {
					alert(err.response.data.message);
				});
		},
		openModal(id) {
			this.productId = id;
		},
		getCart() {
			axios.get(`${url}/api/${path}/cart`)
				.then(res => {
					this.cart = res.data.data;
				});
		},
		addToCart(product_id, qty = 1) {
			this.loadingItem = product_id;
			const data = {
				product_id,
				qty,
			};
			axios.post(`${url}/api/${path}/cart`, { data })
				.then(res => {
					alert(res.data.message);
					this.$refs.productModal.hide();
					this.getCart();
					this.loadingItem = "";
				})
				.catch(err => {
					alert(err.response.data.message);
				});
		},
		updateProductQty(item) {
			const data = {
				product_id: item.product.id,
				qty: item.qty,
			};
			this.loadingItem = item.id;
			axios.put(`${url}/api/${path}/cart/${item.id}`, { data })
				.then(res => {
					alert(res.data.message);
					this.getCart();
					this.loadingItem = "";
				})
				.catch(err => {
					alert(err.response.data.message);
					this.loadingItem = "";
				});
		},
		deleteProduct(item) {
			this.loadingItem = item.id;
			axios.delete(`${url}/api/${path}/cart/${item.id}`)
				.then(res => {
					alert(res.data.message);
					this.getCart();
					this.loadingItem = "";
				})
				.catch(err => {
					alert(err.response.data.message);
				});
		},
		deleteAllProduct() {
			axios.delete(`${url}/api/${path}/carts`)
				.then(res => {
					alert(res.data.message);
					this.getCart();
				})
				.catch(err => {
					alert(err.response.data.message);
				});
		},
		createOrder() {
			const data = this.form;
			axios.post(`${url}/api/${path}/order`, { data })
				.then(res => {
					alert(res.data.message);
					this.$refs.form.resetForm();
					this.getCart();
				})
				.catch(err => {
					alert(err.response.data.message);
				});
		},
	},
	mounted() {
		this.getProducts();
		this.getCart();
	}
});

app.mount("#app");