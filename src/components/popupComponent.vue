<template>
    <div :class="`modal z-2 overlay pointer-events-none ${showPopup ? 'show' :''}`" >
        <div class="modal-dialog bg-light p-3 rounded-3">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" >{{ headline }}</h1>
                <button type="button" @click="showPopupHandler('close-Popup')" class="btn-close" ></button>
            </div>
            <div class="modal-body" v-if="type==='delete'">
                {{ message }}
            </div>
            <div class="modal-footer" v-if="type==='delete'">
                <button type="button" @click="showPopupHandler('close-Popup')" class="btn btn-secondary">Cancel</button>
                <button type="button" @click="showPopupHandler('confirm-Delete')" class="btn btn-primary">Delete</button>
            </div>
            </div>
            <div class="edit-form" v-if="type==='edit'">
                
                <form @submit.prevent="showPopupHandler('confirm-Edit')">
                    <label>Product name and Price</label>
                    <div class="d-flex">
                        <input v-model="currProduct.name" class="form-control m-1" type="text" placeholder="Product Name">
                        <input v-model.number="currProduct.price" class="form-control m-1" type="text" placeholder="Product Price">
                    </div>
                    <label>Image Details</label>
                    <input v-model="currProduct.url" class="form-control" type="text" placeholder="Product Image url">
                    <div class="form-group">
                        <label>Product Details</label>
                        <textarea v-model="currProduct.details" class="form-control " rows="3"></textarea>
                    </div>
                    <button class="btn btn-primary mt-3">Confirm</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            currProduct: { ...this.editProduct }
        };
    },
    props: {
        headline: String, 
        message: String ,
        type:String,
        showPopup: {
            type: Boolean,
            default: false 
        },
        editProduct:{
            type:Object,
            default:()=>({})
        }
    },
    methods:{
        showPopupHandler(confirm) {
            // this.showPopupClass = !this.$props.showPopup ;
            if(confirm==='confirm-Delete'){
                this.$emit('confirm-delete');
            }
            if(confirm==='confirm-Edit'){
                this.$emit('confirm-edit',this.currProduct);
            }
            else{
                this.$emit('close-popup');
            }
        },
    },
    // mounted(){
    //     this.currProduct=this.$props.editProduct
    // }
}
</script>


<style>
.show{
    display: block !important;
}
.edit-form{
    pointer-events: auto;
}
.overlay{
    background-color: #37343473;
}
</style>