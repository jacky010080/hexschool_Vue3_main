import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const url = 'https://vue3-course-api.hexschool.io/v2';
const path = "jacky010080";

const app = createApp({
    data() {
        return {
            products: [],
        };
    },
    methods: {
        getProducts() {
            axios.get(`${url}/api/${path}/products/all`)
                .then(res => {
                    console.log(res);
                })
        }
    },
    mounted() {
        this.getProducts();
    }
});

app.mount("#app");