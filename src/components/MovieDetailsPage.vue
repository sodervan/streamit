<template>
  <div class="mt-14">
    <div v-if="isLoading" class="px-6">
      <div class="flex flex-col space-y-3">
        <Skeleton class="h-[125px] w-full rounded-xl" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-full" />
        </div>
      </div>
    </div>
    <div v-if="!isLoading">
      <div class="w-full h-[300px]">
        <!-- Use route params correctly -->
        <iframe
          :src="`https://vidsrc.cc/v2/embed/movie/${$route.params.id}?autoPlay=false`"
          class="w-full h-full"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <div class="px-6">
        <div class="mt-4">
          <p class="text-white text-lg font-medium">
            {{ details.original_title }}
          </p>
        </div>
        <div class="my-2">
          <Button
            @click="
              () => {
                watchlist.some((item) => item.id === details.id)
                  ? toast({
                      title: 'Removed from Watchlist',
                      description: `${details.title} has been removed from your watchlist.`,
                    })
                  : toast({
                      title: 'Added to Watchlist',
                      description: `${details.title} has been added to your watchlist.`,
                    });
                addToWatchlist(details);
              }
            "
          >
            <X
              class="mr-1"
              v-if="watchlist.some((item) => item.id === details.id)"
            />
            <Plus class="mr-1" v-else />
            {{
              watchlist.some((item) => item.id === details.id)
                ? "Remove"
                : "Watchlist"
            }}
          </Button>
        </div>
        <div class="flex items-center gap-4 mt-3">
          <p class="text-red-500 font-medium">{{ details.vote_average }}</p>
          <p class="text-white">{{ details.release_date }}</p>
          <div class="px-2 border border-white">
            <p class="text-white">{{ details.original_language }}</p>
          </div>
        </div>
        <div class="mt-3">
          <p class="text-md text-gray-300">{{ details.overview }}</p>
        </div>
        <div class="mt-3">
          <p class="text-red-500">
            Genres:
            <span
              v-for="(item, index) in details.genres"
              class="text-sm text-gray-400"
              >{{ item.name
              }}<span v-if="details.genres.length > 1">, </span></span
            >
          </p>
        </div>
      </div>
      <p class="text-white text-center font-medium mt-10">SIMILAR MOVIES</p>
      <SimilarMovies />
    </div>
  </div>
</template>

<script>
import SimilarMovies from "@/components/SimilarMovies.vue";
import { Skeleton } from "@/components/ui/skeleton/index.js";
import { Plus, X } from "lucide-vue-next";
import { Button } from "@/components/ui/button/index.js";
import { useToast } from "@/components/ui/toast/use-toast";
import { watch } from "vue";

export default {
  components: { Button, Plus, X, SimilarMovies, Skeleton },
  data() {
    return {
      details: [],
      genres: this.$store.state.genres,
      isLoading: true,
      id: "",
      toast: useToast().toast,
      watchlist: [],
    };
  },
  methods: {
    watch,
    getWatchlist() {
      let watchlist = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const item = JSON.parse(localStorage.getItem(key));
        this.watchlist.push(item);
      }
      console.log(this.watchlist);
      return watchlist;
    },
    addToWatchlist(prop) {
      if (this.watchlist.some((item) => item.id === prop.id)) {
        localStorage.removeItem(prop.id);
        this.watchlist = this.watchlist.filter(
            (watchlistItem) => watchlistItem.id !== prop.id,
        );
      } else {
        localStorage.setItem(prop.id, JSON.stringify(prop));
        this.getWatchlist()
        console.log(localStorage.getItem(prop.id));
      }
    },
    async fetchMovieById() {
      this.isLoading = true;
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
          `https://api.themoviedb.org/3/movie/${this.$route.params.id}?language=en-US`,
          options,
        );
        const result = await response.json();
        this.details = result;
        console.log(this.details);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler() {
        this.fetchMovieById();
      },
    },
  },
  mounted() {
    this.fetchMovieById();
    this.getWatchlist()
    this.id = this.$route.params.id;
  },
};
</script>
