<template>
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div :class="`toast ${showToastClass ? 'show_toast' : ''}`" >
            <div class="toast-header">
            <!-- <img src="..." class="rounded me-2" alt="..."> -->
            <strong class="me-auto">{{ headline }}</strong>
            <small>{{ time }}s ago</small>
            <button type="button" class="btn-close" @click="hideToast"></button>
            </div>
            <div class="toast-body">{{ message }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showToastClass: false
        };
    },
    props: {
        headline: String, 
        time: String, 
        message: String ,
    },
    methods:{
        showToast() {
        this.showToastClass = true;
        setTimeout(() => {
            this.showToastClass = false;
        }, 2000);
        },
        hideToast() {
          this.showToastClass = false;
        },
    }
}
</script>
<style>
.show_toast{
    display: block !important;
}
</style>