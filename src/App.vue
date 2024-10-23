<template>
  <div class="w-full font-poppins">
    <SideBar />
    <router-view />
    <div class="fixed bottom-0 left-0 z-[1000]">
      <Toaster class="border-none"/>
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import { Toaster } from "@/components/ui/toast/index.js";

export default {
  components: {
    SideBar,
    Toaster,
  },
};
</script>
