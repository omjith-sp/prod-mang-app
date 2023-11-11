import axios from 'axios';
import Toast from '@/components/toasterComponent.vue';

export default {
  name: 'ProductList',
  components: {
    Toast
  },
  data() {
    return {
      newProduct: {
        name: '',
        price: '',
        details: '',
        url: '',
      },
      toastMessage: '',
    };
  },
  methods: {
    async addData() {
      try {
        if (!this.newProduct.name || ! parseFloat(this.newProduct.price)) {
          this.toastMessage = 'Please enter name and price for the product.';
          this.$refs.toastComponent.showToast();
          return;
        }
        this.newProduct.price = parseFloat(this.newProduct.price); // Ensure price is a number
        if(this.newProduct.url==''){
          this.newProduct.url='https://fastly.picsum.photos/id/379/200/200.jpg?hmac=bhNTvgVJE_n3o0554kDDTfQtblCx2XUUn5oiwwz5ni8';
        }
        const response = await axios.post('http://localhost:3000/products', this.newProduct); 
        if (Array.isArray(this.products)) {
          this.products.push(response.data);
        } else {
          this.products = [response.data];
        }
        this.$refs.toastComponent.showToast();
        this.toastMessage = 'Product added successfully!';
    
        this.newProduct = {
          name: '',
          price: '',
          details: '',
          url: '',
        };
      } catch (error) {
        console.error('Error adding product:', error);
        this.showToast = true;
        this.toastMessage = 'Error adding product. Please try again.';
        this.$refs.toastComponent.showToast();
      }
    },
    
  },
  mounted() {
  },
};
