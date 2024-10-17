<template>
  <div class="mt-14">
    <div class="w-full h-[300px]">
      <!-- Use route params correctly -->
      <iframe
          :src="`https://vidsrc.icu/embed/movie/${$route.params.id}`"
          class="w-full h-full"
          frameborder="0"
          allowfullscreen
      ></iframe>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
</script>
