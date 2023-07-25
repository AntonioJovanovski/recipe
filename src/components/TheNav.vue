<template>
    <div class="container">
        <router-link to="home">Home</router-link>
        <div>
            <form @submit.prevent="sendInfo">
                <input type="text" placeholder="Search by Recepie" v-model="search">
            </form>
            <form @submit.prevent="searchByIngredient">
                <input type="text" placeholder="Search by one Ingredient" v-model="searchOne">
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            searchOne: ''
        }
    },
    methods: {
        sendInfo() {
            if (this.search === '') {
                return
            } else {
                this.$emit('search-recepie', this.search)
                this.search = ''
            }
        },
        searchByIngredient() {
            if (this.searchOne === '') {
                return
            } else {
                this.$emit('search-ingredient', this.searchOne)
                this.searchOne = ''
                console.log(this.searchOne);
            }
        },
    }
}
</script>

<style scoped>
a {
    color: black;
    background-color: orange;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 100px;
}

a:active {
    scale: .95;
}

.container div {
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
    justify-content: space-between;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

input {
    color: black;
    background-color: orange;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 100px;
    margin: 0 10px;
    outline: none;
    border: none;
}

@media only screen and (max-width: 600px) {
    .container {
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
        justify-content: space-between;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        margin-bottom: 10px;
        
    }
    input {
        width: 100px;
        font-size: 8px;
    }

    a {
        width: 40px;
        margin-bottom: 10px;
        margin-left: 25px;
    }
}
</style>