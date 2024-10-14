<template>
  <div class="w-full font-poppins">
    <SideBar/>
    <router-view/>
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";

export default {
  components: {
    SideBar,
  }
}
</script>