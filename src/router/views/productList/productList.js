import axios from 'axios';
import HeaderCompnent from '../header/headerComponent.vue'
import CardComponent from '../../../components/cardComponent.vue'
import Toast from '@/components/toasterComponent.vue';
import Popup from '@/components/popupComponent.vue';


export const ProductList = {
    name: 'ProductList',
    components: {
        HeaderCompnent,
        CardComponent,
        Toast,
        Popup
        
    },
    data() {
        return {
          products: [],
          popupMessage:'',
          showDeletePopup:false,
          showEditPopup:false,
          toastHeadline:'',
          toastMessage:'',
          selectedCardId:Number,
          editProductData:{}
        };
      },
      methods:{
        async fetchProducts() {
            try {
              const response = await axios.get('http://localhost:3000/products');
              this.products = response.data;
            } catch (error) {
              console.error('Error fetching product data:', error);
            }
        },
        async handleConfirmDelete(productId) {
            axios.delete(`http://localhost:3000/products/${productId}`)
            .then(() => {
              console.log(`Product with id ${productId} deleted successfully.`);
              this.fetchProducts();
              this.closePopup();
            })
            .catch((error) => {
              console.error(`Error deleting product with id ${productId}`, error);
            });
        },
        async handleConfirmEdit(data) {
            try {
                if(data.url==''){
                    data.url='https://fastly.picsum.photos/id/658/200/200.jpg?hmac=f24wxXCkgtH72eZ6mY95KRxTyvEG-_3ysR9z-R0a1QM';
                }
                await axios.put(`http://localhost:3000/products/${data.id}`, data);
                this.fetchProducts()
                this.closePopup();
                this.toastHeadline='Updating'
                this.toastMessage = `Updating product`;
                this.$refs.toastComponent.showToast(); 
            } catch (error) {
                console.error('Error updating product:', error);
                this.toastMessage = `Updating failed, ${error}`;
                this.$refs.toastComponent.showToast(); 
            }
        },
        cardHandler(productId ,option){
            this.selectedCardId=productId;
            if(option==='delete'){
                // this.popupMessage=`Are you sure to delete ${this.products[productId-1].name}`;
                this.popupMessage=`Are you sure to delete `;
                this.showDeletePopup=true
            }
            if(option==='confirm-delete'){  
                // this.toastMessage = `Deleting ${this.products[productId-1].name}`;
                this.toastHeadline='Delete'
                this.toastMessage = `Deleting`;
                this.$refs.toastComponent.showToast(); 
                this.handleConfirmDelete(productId) 
                this.closePopup()            
            }
            if(option==='edit'){
                // this.$router.push({ name: 'editProduct', params: { id: productId } });
                const productToEdit = this.products.find(product => product.id === productId);
                if (productToEdit) {
                    this.editProductData = { ...productToEdit };
                    this.showEditPopup = true;
                  }
            }
        },
        closePopup() {
            this.showDeletePopup=false
            this.showEditPopup=false
            console.log('popup closed');
        },

        async addDummyData() {
            const dummyProduct = {
                name: 'Dummy Product',
                price: Math.random(),
                details: 'This is a dummy product for testing purposes.',
                url: 'https://fastly.picsum.photos/id/439/200/200.jpg?hmac=Aig4UrUSSGah1WrKUdIlJOecKTpPZDiUFpnllH4YPOY',
            };
        
            try {
                const response = await axios.post('http://localhost:3000/products', dummyProduct);     
                this.products.push(response.data);
                console.log('Dummy product added successfully.');
            } catch (error) {
                console.error('Error adding dummy product:', error);
            }
        },
        handleSearch(query){
            if(query==''){
                this.fetchProducts()
            }
            else{
                const lcquery = query.toLowerCase();
                const searchResults = this.products.filter(product =>
                    product.name.toLowerCase().includes(lcquery)
                );
                this.products=searchResults;
            }
        }
          
      },
      mounted() {
        this.fetchProducts();
      },
   
}
export default ProductList