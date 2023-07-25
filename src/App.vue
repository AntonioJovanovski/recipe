<template>
  <the-nav @search-recepie="searchRecepie" @search-ingredient="searchByIngredient"></the-nav>

  <main>
    <router-view 
    @meal="mealProp"
    @meal-name="searchRecepie" 
    @nameby-ingredient="searchRecepie" 
    @category="mealProp"
    @region="sendRegion"
    :meal=mealCategory
    :recepie="recepie" 
    :ingredient="ingredient"
    :region="region"></router-view>
  </main>
</template>

<script>
import TheNav from './components/TheNav.vue';

export default {
  components: {
    TheNav
  },
  data() {
    return {
      mealCategory: '',
      recepie: '',
      ingredient: '',
      region: '',
    }
  },
  methods: {
    mealProp(meal) {
      this.mealCategory = meal
      this.$router.push('/meal')
    },
    searchRecepie(recepie) {
      this.recepie = recepie
      this.$router.push('/recepie')

    },
    searchByIngredient(ingredient) {
      this.ingredient = ingredient
      this.$router.push('/ingredient')
    },
    sendRegion(value) {
      this.region = value
      this.$router.push('/region')

    },
  },

}
</script>

<style>

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  background-color: rgb(9, 9, 90);

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
    
    
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
    margin: 20px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: orangered;
   width: 5px;
    
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
    width: 5px;
  }

}

</style>