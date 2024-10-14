<template>
  <div class="pt-16 h-screen">
    <div v-if="$store.state.isLoading">
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
              class="absolute inset-0 flex flex-col justify-end p-4 text-white"
            >
              <h3 class="text-lg font-bold">
                {{ movie.title }}
              </h3>
              <p class="text-sm text-gray-300">
                {{ movie.release_date }}
              </p>
              <div class="mt-2">
                <Button variant="secondary">Watch Now</Button>
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>

      <!-- Carousel navigation buttons -->
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    <PopularMovies v-if="!$store.state.isLoading"/>
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
      autoplayPlugin: Autoplay({ delay: 5000 }), // Autoplay with 3-second delay
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
  mounted() {
    this.$store.dispatch("fetchTrendingMovies");
    this.$store.dispatch("fetchPopularMoviesData");
  },
};
</script>
