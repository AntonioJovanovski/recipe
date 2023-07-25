<template>
    <div>
        <span v-if="loading" class="loader"></span>
        <div v-else>
            <h3>Suggested</h3>
            <ul 
            v-for="items in data[0].meals" 
            @click="findRecepie(items.strMeal)">
                <li class="title">{{ items.strMeal }}</li>
                <img :src="`${items.strMealThumb}`" alt="">


            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: ['region'],
    data() {
        return {
            data: [],
            loading: false
        }
    },
    methods: {
        async callApi(call) {
            if (this.region !== '') {
                localStorage.setItem('region', this.region)
            }
            this.loading = true
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${call}`)
            try {
                if (!response.ok) {
                    return;
                } else {
                    const data = await response.json();
                    this.data.push(data)
                    this.loading = false
                }

            } catch (error) {
                alert(error);
            }
        },
        findRecepie(name) {
            this.$emit('meal-name', name)
        },
    },
    created() {
        const mealLS = localStorage.getItem('region')
        if (this.region) {
            this.callApi(this.region)
        } else {
            this.callApi(mealLS)
        }
    },
}
</script>

<style scoped>
span {
    position: absolute;
    left: 50%;
    top: 50%;
}

div {
    margin-top: 40px;
    padding: 20px;
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
}

li {
    text-align: center;
    list-style: none;
    max-width: 280px;
}

img {
    width: 300px;
    height: 300px;
    border-radius: 15px;
}

ul {
    padding: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    transition: 1s;
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
</style>