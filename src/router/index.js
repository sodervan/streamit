import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Body/Home.vue";
import MovieDetailsPage from "@/components/MovieDetailsPage.vue";
import SearchResult from "@/components/Dialogs/SearchResult.vue";
import SeriesPage from "@/components/Body/SeriesPage.vue";
import SeriesDetails from "@/components/SeriesDetails.vue";
import EpisodeDetails from "@/components/EpisodeDetails.vue";

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
    {
      path: "/series",
      name: "Series",
      component: SeriesPage,
    },
    {
      path: "/details/series/:title/:id",
      name: "SeriesDetails",
      component: SeriesDetails,
    },
    {
      path: "/details/series/:title/:id/:season/:episode",
      name: "EpisodeDetails",
      component: EpisodeDetails,
    }
  ],
});

export default router;
