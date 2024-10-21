<template>
  <div class="mt-10 px-6">
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
      <div class="grid grid-cols-2 gap-3">
        <router-link
          v-for="(item, index) in filteredSearchResults"
          :to="'/details/series/' + item.name + '/' + item.id"
          class="mb-6 flex flex-col items-center cursor-pointer shadow-lg"
        >
          <!-- Image container with relative height -->
          <div class="relative w-full h-52">
            <img
              :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"
              alt="#"
              class="absolute top-0 left-0 w-full h-full object-cover rounded-t-[30px]"
            />
          </div>

          <!-- Movie title with conditional marquee effect -->
          <div
            class="bg-[#151414] flex flex-col w-full h-24 px-3 py-2 items-start overflow-hidden relative"
          >
            <marquee-text class="text-white text-md">
              {{ item.name }}
            </marquee-text>
            <div class="flex items-center mt-1">
              <i class="fi fi-rr-calendar mr-2 text-red-500"></i>
              <p class="text-gray-500 text-sm">{{ item.first_air_date }}</p>
            </div>
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-2 mt-1">
                <i class="fi fi-rr-feedback-review text-yellow-500"></i>
                <p class="text-gray-500 text-sm">{{ item.vote_average }}</p>
              </div>
              <div>
                <p class="text-gray-500">{{item.original_language}}</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import MarqueeText from "vue-marquee-text-component";
import { Skeleton } from "@/components/ui/skeleton/index.js";

export default {
  components: { MarqueeText, Skeleton },
  data() {
    return {
      similarMoviesData: [],
      details: this.$store.state.selectedMovieDetails,
      isLoading: false,
    };
  },
  computed: {
    filteredSearchResults() {
      return this.similarMoviesData.filter(item => item.poster_path);
    },
  },
  methods: {
    async fetchSimilarSeries() {
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
          `https://api.themoviedb.org/3/tv/${this.$route.params.id}/similar?language=en-US&page=1`,
          options,
        );
        const result = await response.json();
        this.similarMoviesData = result.results;
        console.log(this.similarMoviesData);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = !this.isLoading;
      }
    },
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler() {
        this.fetchSimilarSeries();
      },
    },
  },
  mounted() {
    setTimeout(() => {
      this.fetchSimilarSeries();
    }, 1000);
  },
};
</script>
