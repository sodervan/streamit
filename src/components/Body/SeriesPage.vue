<template>
  <div class="pt-16 h-screen">
    <div v-if="$store.state.isLoading" class="px-6">
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
          v-for="(series, index) in $store.state.trendingSeriesData"
          :key="index"
        >
          <div class="relative w-full h-64 mx-auto">
            <!-- Image container with gradient overlay -->
            <img
              :src="`https://image.tmdb.org/t/p/original${series.backdrop_path}`"
              :alt="series.name"
              class="object-cover w-full h-full"
            />
            <!-- Gradient overlay (left-to-right, black to transparent) -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-black to-transparent"
            ></div>

            <!-- Movie details on top of the gradient -->
            <div
              class="absolute inset-0 flex flex-col justify-end items-start p-4 text-white"
            >
              <h3 class="text-lg font-bold">
                {{ series.name }}
              </h3>
              <div class="flex items-center gap-4">
                <div>
                  <p class="text-red-500 font-medium">
                    {{ series.vote_average }}
                  </p>
                </div>
                <div>
                  <p>{{ series.first_air_date }}</p>
                </div>
                <div class="px-2 border border-white">
                  <p>{{ series.original_language }}</p>
                </div>
              </div>

              <!-- Movie overview with read more/less functionality -->
              <div class="overflow-auto">
                <p class="text-sm text-gray-300 mt-3">
                  <!-- Conditionally show truncated or full text based on isExpanded -->
                  {{
                    expandedMovie === index
                      ? series.overview
                      : truncatedText(series.overview) || "No Overview"
                  }}
                </p>
              </div>

              <!-- Toggle button for Read More / Read Less -->
              <button
                v-if="series.overview.length > 0"
                @click="toggleReadMore(index)"
                class="text-red-500 text-sm underline"
              >
                {{ expandedMovie === index ? "Read Less" : "Read More" }}
              </button>

              <div class="flex items-center gap-3 mt-3">
                <div>
                  <Button variant="secondary" @click="showDetails(series)"
                    >Watch Now
                  </Button>
                </div>
                <div>
                  <Button
                    @click="
                      () => {
                        watchlist.some((item) => item.id === series.id)
                          ? toast({
                              title: 'Removed from Watchlist',
                              description: `${series.name} has been removed from your watchlist.`,
                            })
                          : toast({
                              title: 'Added to Watchlist',
                              description: `${series.name} has been added to your watchlist.`,
                            });
                        addToWatchlist(series);
                      }
                    "
                  >
                    <X
                      class="mr-1"
                      v-if="watchlist.some((item) => item.id === series.id)"
                    />
                    <Plus class="mr-1" v-else />
                    {{
                      watchlist.some((item) => item.id === series.id)
                        ? "Remove"
                        : "Watchlist"
                    }}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>

    <PopularSeries v-if="!$store.state.isLoading" />
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
import PopularSeries from "@/components/PopularSeries.vue";
import { Plus, X } from "lucide-vue-next";
import { useToast } from "@/components/ui/toast/use-toast";
import { watch } from "vue";

export default {
  data() {
    return {
      autoplayPlugin: Autoplay({
        delay: 5000,
        stopOnMouseEnter: true,
        stopOnInteraction: true,
      }),
      expandedMovie: null,
      truncatedLength: 100,
      toast: useToast().toast,
      watchlist: [],
    };
  },
  components: {
    X,
    PopularSeries,
    Carousel,
    CarouselNext,
    CarouselPrevious,
    CarouselItem,
    CarouselContent,
    Button,
    Autoplay,
    Skeleton,
    Plus,
  },
  methods: {
    watch,
    getWatchlist() {
      let watchlist = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const item = JSON.parse(localStorage.getItem(key));
        this.watchlist.push(item);
      }
      console.log(this.watchlist);
      return watchlist;
    },
    addToWatchlist(prop) {
      if (this.watchlist.some((item) => item.id === prop.id)) {
        localStorage.removeItem(prop.id);
        this.watchlist = this.watchlist.filter(
            (watchlistItem) => watchlistItem.id !== prop.id,
        );
      } else {
        localStorage.setItem(prop.id, JSON.stringify(prop));
        this.getWatchlist()
        console.log(localStorage.getItem(prop.id));
      }
    },
    showDetails(prop) {
      this.$router.push({
        name: "SeriesDetails",
        params: { title: prop.name, id: prop.id },
      });
    },
    truncatedText(text) {
      return text.length > this.truncatedLength
        ? text.slice(0, this.truncatedLength) + "..."
        : text;
    },
    toggleReadMore(index) {
      this.expandedMovie = this.expandedMovie === index ? null : index;
    },
  },
  mounted() {
    this.$store.dispatch("fetchTrendingSeries");
    this.$store.dispatch("fetchPopularSeriesData");
    this.getWatchlist()
  },
};
</script>

<style scoped>
.text-primaryRed {
  color: hsl(0, 80%, 50%);
}
</style>
