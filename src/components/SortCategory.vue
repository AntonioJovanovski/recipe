<template>
    <div>
        <span v-if="loading" class="loader"></span>
        <div class="container" v-else>
            <h3>FOOD CATEGORIES</h3>
            <ul 
            v-for="items in data[0].categories" 
            @click="selectMealCategory(items.strCategory)">
                <li class="title">{{ items.strCategory }}</li>
                <img :src="`${items.strCategoryThumb}`" alt="">
                <li class="description">{{ items.strCategoryDescription }}</li>


            </ul>
        </div>
    </div>
</template>

<script>
export default {
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
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
                if (!response.ok) {
                    return
                } else {

                    const data = await response.json();
                    this.data.push(data)
                    this.loading = false
                }
            } catch (error) {
                alert(error)
            }
        },
        selectMealCategory(meal) {
            this.$emit('meal', meal)
        }

    },
    created() {
        this.callApi()
    }
}

</script>

<style>
h3 {
    position: absolute;
    top: 60px;
    padding: 20px 40px;
    background-color: orange;
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
}

@media only screen and (max-width: 600px) {
    h3 {
        top: 100px;
    }
}
</style>


<style scoped>
span {
    position: absolute;
    left: 50%;
    top: 50%;
}

div {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
}

.description {
    white-space: pre-line;
    text-align: start;
    color: white;
    font-size: 14px;

}

.title {
    background-color: orange;
    text-align: center;
    padding: 10px 0;
    margin: 0;
    width: 100%;
    border-bottom-right-radius: 50px;

}

li {
    max-width: 220px;
    list-style: none;
}

img {
    margin: 20px 0;
    margin-bottom: 30px;
    width: 220px;
    height: 120px;
}

ul {
    padding: 20px;
    border-radius: 15px;
    max-height: 300px;
    margin: 10px;
    overflow: scroll;
    text-align: center;
    overflow-x: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    transition: 1s;

}

ul:hover {
    background-color: orange;
    transition: 1s;
    scale: 1.05;
    cursor: pointer;
}

.container {
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