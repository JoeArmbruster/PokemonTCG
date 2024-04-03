import { createRouter, createWebHistory } from 'vue-router';
import PokemonCards from '@/components/PokemonCards.vue';
import CardDetails from '@/components/CardDetails.vue';

const routes = [
  {
    path: '/',
    name: 'PokemonCards',
    component: PokemonCards,
  },
  {
    path: '/card/:id',
    name: 'CardDetails',
    component: CardDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
