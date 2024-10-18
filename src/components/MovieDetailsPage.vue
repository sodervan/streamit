<template>
  <div class="mt-14">
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
          {{ details.title }}
        </p>
      </div>
      <div class="flex items-center gap-4 mt-3">
        <p class="text-red-500 font-medium">{{ details.rating }}</p>
        <p class="text-white">{{ details.releaseDate }}</p>
        <div class="px-2 border border-white">
          <p class="text-white">{{ details.language }}</p>
        </div>
      </div>
      <div class="mt-3">
        <p class="text-md text-gray-300">{{ details.description }}</p>
      </div>
      <div class="mt-3">
        <p class="text-red-500">
          Genres:
          <span
            v-for="(item, index) in details.genres"
            class="text-sm text-gray-400"
            >{{ genres[item]
            }}<span v-if="details.genres.length > 1">, </span></span
          >
        </p>
      </div>
    </div>

    <SimilarMovies />
  </div>
</template>

<script>
import SimilarMovies from "@/components/SimilarMovies.vue";

export default {
  components: {
    SimilarMovies,
  },
  data() {
    return {
      details: this.$store.state.selectedMovieDetails,
      genres: this.$store.state.genres,
    };
  },
};
</script>
