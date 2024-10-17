<template>
  <div class="px-6 my-10">
    <div class="text-white font-medium text-md mb-5">
      <p>POPULAR MOVIES</p>
    </div>

    <!-- Grid with equal height rows -->
    <div class="grid grid-cols-2 gap-3">
      <router-link
        v-for="(item, index) in $store.state.popularMoviesData"
        :to="'/details/' + item.original_title + '/' + item.id"
        class="mb-6 flex flex-col items-center cursor-pointer shadow-lg"
        @click=""
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
          class="bg-[#151414] flex flex-col w-full h-20 px-3 py-2 items-start overflow-hidden relative"
        >
          <marquee-text class="text-white text-md">
            {{ item.original_title }}
          </marquee-text>
          <div class="flex items-center mt-1">
            <i class="fi fi-rr-calendar mr-2 text-red-500"></i>
            <p class="text-gray-500 text-sm">{{ item.release_date }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import MarqueeText from "vue-marquee-text-component";

export default {
  components: {
    MarqueeText,
  },
  methods: {},
};
</script>
