import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isLoading: false,
      trendingMoviesData: [],
    };
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = !state.isLoading;
      console.log("Loading state changed:", state.isLoading);
    },

    setTrendingMoviesData(state, payload) {
      state.trendingMoviesData = payload;
    },
  },
  actions: {
    async fetchTrendingMovies(context, payload) {
      context.commit("setIsLoading");
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmZmN2JkOWMxZmY5MTk4M2U4YmIyMTU4YjY0MzIzNSIsIm5iZiI6MTcyODc3MDY4MS4wMzIxMTgsInN1YiI6IjY2YmI1N2Q1NzAxNjYyMWZiMDczMDIxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UYjZnCFWNuHFaiddoofrRDt_EkLwxwObJeOPLfn0tKE",
        },
      };
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
          options,
        );
        const result = await response.json();
        context.commit("setTrendingMoviesData", result.results);
        console.log(context.state.trendingMoviesData);
      } catch (error) {
        console.log(error);
      } finally {
        context.commit("setIsLoading");
      }
    },
  },
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
