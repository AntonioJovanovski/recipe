<template>
   
    <div>        
        <span v-if="loading" class="loader"></span>
        <div v-else>
            <h3>Suggested</h3>
            <ul 
            v-for="meals in data[0].meals" 
            @click="searchRecepie(meals.strMeal)">
                <li class="title">{{ meals.strMeal }}</li>
                <img :src="meals.strMealThumb" alt="">
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: ['ingredient'],
    data() {
        return {
            data: [],
            loading: false
        }
    },
    methods: {
        async callApi() {
            
            this.loading = true
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.ingredient}`);
                if (!response.ok) {
                    return
                } else {

                    const data = await response.json();
                    this.data.push(data)
                    this.loading = false
                    if (data.meals === null) {
                        this.$router.push('/home')
                        alert("Ingredient not found, please search again")
                    }
                    
                }
            } catch (error) {
                alert(error)
                this.$router.push('/home')
            }


        },
        searchRecepie(name) {
            this.$emit('nameby-ingredient', name)
        },

    },
    watch: {
        ingredient(ingredient) {
            if (ingredient) {
                this.data = []
                this.callApi()
            }
        }
    },
    created() {
        this.callApi()
    }
}
</script>

<style scoped>
span {
    position: absolute;
    left: 50%;
    top: 50%;
}

h3 {
    position: absolute;
    top: 80px;
    padding: 20px 40px;
    background-color: orange;
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
}
.title {
    background-color: orange;
    text-align: center;
    padding: 10px 0;
    margin: 2px 6px;
    width: 100%;
    border-bottom-right-radius: 50px;
    position: absolute;
    border-top-left-radius: 15px;
    z-index: 1;
}
li {
    text-align: center;
    list-style: none;
    max-width: 280px;
}

img {
    position: relative;
    width: 300px;
    height: 300px;
    border-radius: 15px;
}

ul {
    padding: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    transition: 1s;
    margin: 10px;
}
ul:hover {
    transition: 1s;
    scale: 1.05;
    cursor: pointer;
}

div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 60px;
    padding: 20px;
}

/* LOADING */
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

</style>