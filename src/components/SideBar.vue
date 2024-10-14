<template>
  <div>
    <!-- Navbar -->
    <div
      class="fixed top-0 left-0 w-full bg-[#000000] z-10 px-6 py-3 flex items-center justify-between"
    >
      <!-- Menu Icon (Hamburger) -->
      <button
        @click="onChangeNav"
        aria-label="Toggle navigation"
        class="cursor-pointer"
      >
        <i class="fi fi-rr-menu-burger text-white text-xl"></i>
      </button>
      <!-- Search Icon -->
      <button aria-label="Search" class="cursor-pointer">
        <i class="fi fi-rr-search text-white text-xl"></i>
      </button>
    </div>

    <!-- Navbar content that opens when menu is clicked -->
    <div
      :class="`transition-transform duration-300 h-screen mt-auto fixed top-0 left-0 bg-black z-10  w-full ${isNavOpen ? 'translate-x-0 bg-primaryBlack' : '-translate-x-full'}`"
    >
      <div class="px-6 py-4 flex flex-col gap-10">
        <div>
          <div class="flex items-center justify-between">
            <div class="cursor-pointer">
              <p class="text-white text-xl font-bold font-pacifico">
                <span class="text-primaryRed">STREAM</span>it
              </p>
              <p class="text-sm text-gray-500">by _sodervan</p>
            </div>
            <button @click="onChangeNav">
              <i class="fi fi-rr-cross text-white"></i>
            </button>
          </div>
        </div>

        <!-- Navbar Links -->
        <div class="flex flex-col gap-5 w-full">
          <router-link
            @click="onChangeNav"
            to="/"
            class="nav p-4 hover:bg-gray-500 transition-all duration-300 rounded-[20px] w-full"
          >
            <div class="flex items-center gap-3">
              <i class="fi fi-rr-camera-movie"></i>
              <p class="text-white">Movies</p>
            </div>
          </router-link>
          <router-link
            @click="onChangeNav"
            to="/"
            class="p-4 hover:bg-gray-500 transition-all duration-300 rounded-[20px] w-full"
          >
            <div class="flex items-center gap-3 text-white">
              <i class="fi fi-rr-tv-retro"></i>
              <p class="text-white">TvShows</p>
            </div>
          </router-link>
          <router-link
            @click="onChangeNav"
            to="/"
            class="p-4 hover:bg-gray-500 transition-all duration-300 rounded-[20px] w-full"
          >
            <div class="flex items-center gap-3 text-white">
              <i class="fi fi-rr-theater-masks"></i>
              <p class="text-white">K-Drama</p>
            </div>
          </router-link>
          <router-link
            @click="onChangeNav"
            to="/"
            class="p-4 hover:bg-gray-500 transition-all duration-300 rounded-[20px] w-full"
          >
            <div class="flex items-center gap-3 text-white">
              <i class="fi fi-rr-info"></i>
              <p class="text-white">About</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNavOpen: false, // Controls whether the navbar content below hamburger is open
    };
  },
  methods: {
    onChangeNav() {
      // Toggles the visibility of navbar content
      this.isNavOpen = !this.isNavOpen;
    },
  },
};
</script>

<!-- TailwindCSS Styles -->
<style scoped>
.bg-primaryBlack {
  background-color: hsl(260, 10%, 6%);
}

.text-primaryRed {
  color: hsl(0, 80%, 50%);
}
</style>
