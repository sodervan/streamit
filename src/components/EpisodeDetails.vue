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
          :src="`https://vidsrc.cc/v2/embed/tv/${$route.params.id}/${$route.params.season}/${$route.params.episode}?autoPlay=false`"
          class="w-full h-full"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <div class="px-6">
        <div class="mt-4 flex item-center gap-5">
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-5">
              <p class="text-white text-lg font-medium">
                {{ $route.params.title }}
              </p>
              <div class="flex items-center">
                <div class="px-3 border border-gray-500">
                  <p class="text-white font-bold">
                    S <span>{{ details.season_number }}</span
                    ><span> : </span>E <span>{{ details.episode_number }}</span>
                  </p>
                </div>
              </div>
            </div>

            <p class="text-gray-400">
              {{ details.name }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4 mt-3">
          <p class="text-red-500 font-medium">{{ details.vote_average }}</p>
          <p class="text-white">{{ details.air_date }}</p>
        </div>
        <div class="mt-3">
          <p class="text-md text-gray-300">{{ details.overview }}</p>
        </div>
      </div>
    </div>
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
      isLoading: true,
      id: "",
    };
  },
  methods: {
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
          `https://api.themoviedb.org/3/tv/${this.$route.params.id}/season/${this.$route.params.season}/episode/${this.$route.params.episode}?language=en-US'`,
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
    this.id = this.$route.params.id;
  },
};
</script>
