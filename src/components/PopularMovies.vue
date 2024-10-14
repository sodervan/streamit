<template>
  <div class="px-6 my-10">
    <div class="text-white font-medium text-md mb-5">
      <p>POPULAR MOVIES</p>
    </div>

    <!-- Grid with equal height rows -->
    <div class="grid grid-cols-2 gap-3">
      <div
          v-for="(item, index) in $store.state.popularMoviesData"
          :key="index"
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
        <div class="bg-[#151414] w-full h-20 px-3 py-2 flex items-start overflow-hidden relative">
          <p
              ref="movieTitle"
              class="text-white text-sm"
              :class="{ marquee: isOverflowing(item.original_title, index) }"
              @mouseover="stopMarquee(index)"
              @mouseleave="startMarquee(index)"
          >
            {{ item.original_title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      marqueeEnabled: [], // Track whether marquee is applied for each item
    };
  },
  methods: {
    isOverflowing(title, index) {
      this.$nextTick(() => {
        const titleElement = this.$refs.movieTitle[index]; // Get the specific element
        const parentWidth = titleElement.parentElement.offsetWidth;
        const titleWidth = titleElement.scrollWidth;

        // If the title exceeds the parent's width, enable marquee
        this.marqueeEnabled[index] = titleWidth > parentWidth;
      });
      return this.marqueeEnabled[index];
    },
    stopMarquee(index) {
      // Stop marquee animation on hover
      this.marqueeEnabled[index] = false;
    },
    startMarquee(index) {
      // Restart marquee animation when hover ends
      this.marqueeEnabled[index] = true;
    },
  },
};
</script>

<!-- TailwindCSS Styles -->
<style scoped>
/* Prevent text from wrapping and set marquee overflow */
.marquee {
  white-space: nowrap;
  display: inline-block;
  position: absolute;
  animation: scroll-text 8s linear infinite;
}

/* Keyframes for marquee scrolling effect */
@keyframes scroll-text {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
