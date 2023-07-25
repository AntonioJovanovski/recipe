import { createRouter, createWebHistory } from 'vue-router';

import MealByCategory from './components/MealByCategory.vue';
import SortCategory from './components/SortCategory.vue';
import SearchRecepie from './components/SearchRecepie.vue';
import SearchByIngredient from './components/SearchByIngredient.vue';
import MealByRegion from './components/MealByRegion.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [        
        { path: '/meal', component: MealByCategory, props: true, },
        { path: '/', component: SortCategory },
        { path: '/home', component: SortCategory },
        { path: '/recepie', component: SearchRecepie, props: true },
        { path: '/ingredient', component: SearchByIngredient, props: true },
        { path: '/region', component: MealByRegion, props: true}
        
    ]
})

export default router;
