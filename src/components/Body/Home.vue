<template>
  <div class="pt-16 h-screen">
    <div v-if="$store.state.isLoading" class="px-6">
      <div class="flex flex-col space-y-3">
        <Skeleton class="h-[125px] w-full rounded-xl" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-full" />
        </div>
      </div>
    </div>

    <!-- Carousel -->
    <Carousel
      :opts="{
        align: 'start',
        loop: true,
      }"
      :plugins="[autoplayPlugin]"
      v-if="!$store.state.isLoading"
    >
      <CarouselContent>
        <!-- Render a CarouselItem for each movie in the movies array -->
        <CarouselItem
          v-for="(movie, index) in $store.state.trendingMoviesData"
          :key="index"
        >
          <div class="relative w-full h-64 mx-auto">
            <!-- Image container with gradient overlay -->
            <img
              :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
              :alt="movie.title"
              class="object-cover w-full h-full"
            />
            <!-- Gradient overlay (left-to-right, black to transparent) -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-black to-transparent"
            ></div>

            <!-- Movie details on top of the gradient -->
            <div
              class="absolute inset-0 flex flex-col justify-end items-start p-4 text-white"
            >
              <h3 class="text-lg font-bold">
                {{ movie.title }}
              </h3>
              <div class="flex items-center gap-4">
                <div>
                  <p class="text-red-500 font-medium">
                    {{ movie.vote_average }}
                  </p>
                </div>
                <div>
                  <p>{{ movie.release_date }}</p>
                </div>
                <div class="px-2 border border-white">
                  <p>{{ movie.original_language }}</p>
                </div>
              </div>

              <!-- Movie overview with read more/less functionality -->
              <div class="overflow-auto">
                <p class="text-sm text-gray-300 mt-3">
                  <!-- Conditionally show truncated or full text based on isExpanded -->
                  {{
                    expandedMovie === index
                      ? movie.overview
                      : truncatedText(movie.overview)
                  }}
                </p>
              </div>

              <!-- Toggle button for Read More / Read Less -->
              <button
                @click="toggleReadMore(index)"
                class="text-red-500 text-sm underline"
              >
                {{ expandedMovie === index ? "Read Less" : "Read More" }}
              </button>

              <div class="mt-3">
                <Button variant="secondary">Watch Now</Button>
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>

    <PopularMovies v-if="!$store.state.isLoading" />
  </div>
</template>

<script>
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "@/components/ui/skeleton";
import PopularMovies from "@/components/PopularMovies.vue";

export default {
  data() {
    return {
      autoplayPlugin: Autoplay({ delay: 5000 }), // Autoplay with 5-second delay
      expandedMovie: null, // To track the expanded/collapsed state of the movie overview
      truncatedLength: 100, // Define the length for the truncated text
    };
  },
  components: {
    PopularMovies,
    Carousel,
    CarouselNext,
    CarouselPrevious,
    CarouselItem,
    CarouselContent,
    Button,
    Autoplay,
    Skeleton,
  },
  methods: {
    truncatedText(text) {
      return text.length > this.truncatedLength
        ? text.slice(0, this.truncatedLength) + "..."
        : text;
    },
    toggleReadMore(index) {
      this.expandedMovie = this.expandedMovie === index ? null : index;
    },
  },
  mounted() {
    this.$store.dispatch("fetchTrendingMovies");
    this.$store.dispatch("fetchPopularMoviesData");
  },
};
</script>

<style scoped>
.text-primaryRed {
  color: hsl(0, 80%, 50%);
}
</style>
