<template>
    <div>
        <span v-if="loading" class="loader"></span>

        <ul v-for="meal in mealData[0].meals" v-else>

            <div class="top">
                <li>{{ meal.strMeal }}</li>
                <li @click="sendRegion(meal.strArea)" class="click">{{ meal.strArea }}</li>
                <li @click="sendCategory(meal.strCategory)" class="click">{{ meal.strCategory }}</li>
            </div>


            <div class="head">
                <ul class="measeure-ingredients">
                    <div>
                        <h4>Ingredients</h4>
                        <li v-for="ingredients in filteredIngredients">{{ ingredients }}</li>
                    </div>
                    <div>
                        <h4>Measure</h4>
                        <li v-for="measure in filteredMeasure">{{ measure }}</li>
                    </div>
                </ul>
                <div class="main">
                    <li class="instructions">
                        <h4>Instructions</h4>{{ meal.strInstructions }}
                    </li>

                </div>
                <li class="link">
                    <a class="youtube" :href="`${meal.strYoutube}}`" target="_blank">Video Link</a>
                    <img :src="`${meal.strMealThumb}`" alt="">
                </li>
            </div>

        </ul>
    </div>
</template>

<script>
export default {
    props: ['recepie'],
    data() {
        return {
            mealData: [],
            ingredients: [],
            measure: [],
            filteredIngredients: [],
            filteredMeasure: [],
            loading: false,
        }
    },
    methods: {
        async searchApi() {
            this.loading = true

            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.recepie}`);

                if (!response.ok) {
                    return
                } else {

                    const data = await response.json();
                    this.mealData.push(data)
                    this.ingredients.push(
                        data.meals[0].strIngredient1,
                        data.meals[0].strIngredient2,
                        data.meals[0].strIngredient3,
                        data.meals[0].strIngredient4,
                        data.meals[0].strIngredient5,
                        data.meals[0].strIngredient6,
                        data.meals[0].strIngredient7,
                        data.meals[0].strIngredient8,
                        data.meals[0].strIngredient9,
                        data.meals[0].strIngredient10,
                        data.meals[0].strIngredient11,
                        data.meals[0].strIngredient12,
                        data.meals[0].strIngredient13,
                        data.meals[0].strIngredient14,
                        data.meals[0].strIngredient15,
                        data.meals[0].strIngredient16,
                        data.meals[0].strIngredient17,
                        data.meals[0].strIngredient18,
                        data.meals[0].strIngredient19,
                        data.meals[0].strIngredient20,
                    )
                    this.measure.push(
                        data.meals[0].strMeasure1,
                        data.meals[0].strMeasure2,
                        data.meals[0].strMeasure3,
                        data.meals[0].strMeasure4,
                        data.meals[0].strMeasure5,
                        data.meals[0].strMeasure6,
                        data.meals[0].strMeasure7,
                        data.meals[0].strMeasure8,
                        data.meals[0].strMeasure9,
                        data.meals[0].strMeasure10,
                        data.meals[0].strMeasure11,
                        data.meals[0].strMeasure12,
                        data.meals[0].strMeasure13,
                        data.meals[0].strMeasure14,
                        data.meals[0].strMeasure15,
                        data.meals[0].strMeasure16,
                        data.meals[0].strMeasure17,
                        data.meals[0].strMeasure18,
                        data.meals[0].strMeasure19,
                        data.meals[0].strMeasure20,
                    )
                    this.filteredIngredients = this.ingredients.filter(value => value !== '' && value !== null);
                    this.filteredMeasure = this.measure.filter(value => value !== '' && value !== null && value !== ' ')
                    this.loading = false

                    if (data.meals === null) {
                        this.$router.push('/home')
                        alert("Recepie not found, please search again")
                    }
                }
            } catch (error) {
                alert(error)
                this.$router.push('/home')
            }
        },
        sendCategory(category) {
            this.$emit('category', category)
        },
        sendRegion(region) {
            this.$emit('region', region)
        }
    },
    created() {
        this.searchApi()
    },
    watch: {
        recepie(value) {
            if (value) {
                this.mealData = []
                this.ingredients = []
                this.measure = []
                this.filteredIngredients = []
                this.filteredMeasure = []
                this.searchApi()
            }
        }
    }
}
</script>

<style scoped>
.click:hover {
    cursor: pointer;
}

span {
    position: absolute;
    left: 50%;
    top: 50%;
}

.head {
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 80px;
    border-bottom: 1px solid orange;
}

.top {
    display: flex;
    margin-bottom: 100px;
}

.top li {
    background-color: orange;
    text-align: center;
    padding: 10px 20px;
    margin: 2px 6px;
    border-bottom-right-radius: 50px;
    border-top-left-radius: 15px;
}

.main {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin: 20px;
}

.main li:first-child {
    width: 400px;
    background-color: orange;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    padding: 20px;
}

img {
    position: relative;
    width: 400px;
}

.youtube {
    background-color: orange;
    text-align: center;
    padding: 10px 20px;
    border-bottom-right-radius: 50px;
    position: absolute;
    z-index: 1;
    text-decoration: none;
    color: black;
    width: 340px;
}


.instructions {
    white-space: pre-line;
    max-height: 360px;
    overflow-y: scroll;
    width: 400px;
}

li {
    margin: 0 20px;
    list-style: none;

}

.measeure-ingredients {
    max-height: 360px;
    overflow-y: scroll;
    min-width: 400px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    padding: 20px;
    background-color: orange;
}

.measeure-ingredients div {
    display: flex;
    flex-direction: column;
    align-items: baseline;
}

.measeure-ingredients div li {
    list-style: circle;
}

ul {
    padding: 20px;
}

.loader {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 32px 0 #fff, -32px 0 #fff;
    animation: flash 0.5s ease-out infinite alternate;
}

@keyframes flash {
    0% {
        background-color: #FFF2;
        box-shadow: 32px 0 #FFF2, -32px 0 #FFF;
    }

    50% {
        background-color: #FFF;
        box-shadow: 32px 0 #FFF2, -32px 0 #FFF2;
    }

    100% {
        background-color: #FFF2;
        box-shadow: 32px 0 #FFF, -32px 0 #FFF2;
    }
}

@media only screen and (max-width: 600px) {
        .measeure-ingredients,
        .main,
        .link
         {
            min-width: 200px;
            width: auto;
        }
        .youtube {
            width: 150px;
        }

        img {
            width: 200px;
        }
}
</style>