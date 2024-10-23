<template>
  <div class="mt-14 px-2 h-screen">
    <div
      v-if="watchlist.length === 0"
      class="flex flex-col items-center justify-center h-screen"
    >
      <div>
        <i class="fi fi-rr-drawer-empty text-[90px] text-white"></i>
      </div>
      <div>
        <p class="text-gray-500">No items in your Watchlist</p>
      </div>
    </div>
    <div v-if="watchlist.length > 0">
      <div
        class="w-full rounded-lg p-3 bg-[#151414] shadow-lg mb-3 cursor-pointer transition-all duration-300 ease-in-out"
        v-for="(item, index) in watchlist"
        :key="index"
      >
        <div class="flex gap-3 items-start">
          <!-- Poster image -->
          <div class="w-[119px] h-full">
            <img
              :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"
              :alt="item.name || item.original_title"
              class="object-cover w-full rounded-lg"
            />
          </div>

          <!-- Details and buttons container -->
          <div class="flex flex-col justify-between w-full">
            <!-- Title and vote info -->
            <div>
              <div class="overflow-x-auto">
                <p class="text-white text-lg">
                  {{ item.name || item.original_title }}
                </p>
              </div>
              <div class="flex gap-2 flex-wrap my-1">
                <p class="text-red-500">{{ item.vote_average }}</p>
                <p class="text-gray-500">
                  {{ item.release_date || item.first_air_date }}
                </p>
              </div>
              <div class="flex items-start mt-1 gap-2">
                <div
                  class="px-3 border border-gray-500 text-white uppercase text-sm"
                >
                  <p>{{ item.media_type }}</p>
                </div>
                <div>
                  <p class="text-gray-500">{{ item.original_language }}</p>
                </div>
              </div>
            </div>

            <!-- Buttons with justify-between -->
            <div class="flex gap-3 items-center mt-3">
              <Button
                variant="secondary"
                @click="
                  () => {
                    item.media_type === 'movie'
                      ? showMoreInfo(item)
                      : showMoreInfo2(item);
                  }
                "
                >Watch now
              </Button>
              <Button @click="removeItem(item)">
                <X class="mr-1 w-5" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "@/components/ui/button/index.js";
import { X } from "lucide-vue-next";
import { watch } from "vue";

export default {
  components: {
    Button,
    X,
  },
  data() {
    return {
      showComponent: false,
      watchlist: [],
    };
  },
  methods: {
    showMoreInfo(prop) {
      this.$router.push({
        name: "Details",
        params: { title: prop.original_title || prop.name, id: prop.id },
      });
    },
    showMoreInfo2(prop) {
      this.$router.push({
        name: "SeriesDetails",
        params: { title: prop.original_title || prop.name, id: prop.id },
      });
    },
    watch,
    getWatchlist() {
      let watchlist = [];

      // Loop through all the keys in localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); // Get each key
        const item = JSON.parse(localStorage.getItem(key)); // Parse the stored value
        this.watchlist.push(item);
      }
      console.log(this.watchlist);
      return watchlist;
    },
    removeItem(prop) {
      localStorage.removeItem(prop.id);
      this.watchlist = this.watchlist.filter(
        (watchlistItem) => watchlistItem.id !== prop.id,
      );
    },
  },
  mounted() {
    this.getWatchlist();
  },
};
</script>
