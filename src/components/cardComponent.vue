<template>
 <div class="card me-3 mb-3" style="width: 12rem;">
      <img :src="imageSrc" style="height: 12rem;" class="card-img-top object-fit-contain img-fluid" alt="">
      <div class="card-body">

          <h5 class="card-title">{{ name }}</h5>
          <p class="card-text"> Rs {{ price }} </p>

      <p class="card-text">{{ details }}</p>
      <div>
        <a @click="this.$emit('edit-card')" class="btn btn-primary me-md-3" data-action="edit">edit</a>
        <a @click="this.$emit('delete-card')" class="btn btn-primary" data-action="delete">delete</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 props: {
    name: String, 
    price: Number, 
    details: String, 
    imageSrc: String 
  },
  methods: {
  },
}
</script>