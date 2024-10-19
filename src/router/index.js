import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Body/Home.vue";
import MovieDetailsPage from "@/components/MovieDetailsPage.vue";
import SearchResult from "@/components/Dialogs/SearchResult.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/details/:title/:id",
      name: "Details",
      component: MovieDetailsPage,
    },
    {
      path: "/search/:page",
      name: "Search",
      component: SearchResult,
    },
  ],
});

export default router;
