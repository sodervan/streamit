<template>
  <div class="px-6 my-10">
    <div class="text-white font-medium text-md mb-5">
      <p>POPULAR MOVIES</p>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div
          v-for="(item, index) in $store.state.popularMoviesData"
          :key="index"
          class="mb-6 flex flex-col items-center"
      >
        <!-- Image container with fixed height and object-cover -->
        <div class="relative w-full h-52">
          <img
              :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"
              alt="#"
              class="absolute top-0 left-0 w-full h-full object-cover rounded-t-[30px]"
          />
        </div>

        <!-- Movie title with fixed height -->
        <div class="bg-[#151414] w-full h-16 flex items-center justify-center">
          <p class="text-white text-center text-sm">{{ item.original_title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
