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
    <div class="w-full h-[300px]" v-if="!isLoading">
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
</template>

<script>
import SimilarMovies from "@/components/SimilarMovies.vue";
import { Skeleton } from "@/components/ui/skeleton/index.js";

export default {
  components: {
    SimilarMovies,
    Skeleton,
  },
  data() {
    return {
      details: [],
      genres: this.$store.state.genres,
      isLoading: false,
      id: "",
    };
  },
  methods: {
    async fetchMovieById() {
      this.isLoading = !this.isLoading;
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
        this.isLoading = !this.isLoading;
      }
    },
  },
  mounted() {
    this.fetchMovieById();
    this.id = this.$route.params.id;
  },
};
</script>
