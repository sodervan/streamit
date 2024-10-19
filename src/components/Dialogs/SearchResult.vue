<template>
  <div>
    <!-- Search Results -->
    <div class="mt-16 px-6">
      <div v-if="isLoading" class="px-6">
        <div class="flex flex-col space-y-3">
          <Skeleton class="h-[125px] w-full rounded-xl" />
          <div class="space-y-2">
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-full" />
          </div>
        </div>
      </div>

      <div v-if="!isLoading">
        <div class="my-3">
          <p class="text-white text-center text-lg">Search Results</p>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <router-link
            v-for="(item, index) in searchResults"
            :to="'/details/' + item.original_title + '/' + item.id"
            class="mb-6 flex flex-col items-center cursor-pointer shadow-lg"
            @click="
              passSelectedDetails(
                item.original_title,
                item.vote_average,
                item.release_date,
                item.original_language,
                item.overview,
                item.genre_ids,
                item.id,
              )
            "
          >
            <div class="relative w-full h-52">
              <img
                :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"
                alt="#"
                class="absolute top-0 left-0 w-full h-full object-cover rounded-t-[30px]"
              />
            </div>
            <div
              class="bg-[#151414] flex flex-col w-full h-24 px-3 py-2 items-start overflow-hidden relative"
            >
              <marquee-text class="text-white text-md"
                >{{ item.original_title }}
              </marquee-text>
              <div class="flex items-center mt-1">
                <i class="fi fi-rr-calendar mr-2 text-red-500"></i>
                <p class="text-gray-500 text-sm">{{ item.release_date }}</p>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 mt-1">
                  <i class="fi fi-rr-feedback-review text-yellow-500"></i>
                  <p class="text-gray-500 text-sm">{{ item.vote_average }}</p>
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <div class="my-4">
          <Pagination
            v-slot="{ page }"
            :total="totalPages"
            :sibling-count="1"
            show-edges
            :default-page="parseInt($route.params.page) || 1"
          >
            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
              <PaginationFirst />
              <PaginationPrev />
              <template v-for="(item, index) in items">
                <PaginationListItem
                  v-if="item.type === 'page'"
                  :key="index"
                  :value="item.value"
                  as-child
                >
                  <Button
                    class="w-10 h-10 p-0"
                    :variant="item.value === page ? 'default' : 'outline'"
                    @click="handlePageChange(item.value)"
                  >
                    {{ item.value }}
                  </Button>
                </PaginationListItem>
                <PaginationEllipsis v-else :key="item.type" :index="index" />
              </template>
              <PaginationNext />
              <PaginationLast />
            </PaginationList>
          </Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Skeleton } from "@/components/ui/skeleton/index.js";
import MarqueeText from "vue-marquee-text-component";
import { Button } from "@/components/ui/button";

import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

export default {
  components: {
    MarqueeText,
    Skeleton,
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
    Button,
  },
  data() {
    return {
      isLoading: false,
      searchResults: [],
      totalResultNumber: "",
      totalPages: 0,
    };
  },
  methods: {
    async fetchSearchResults() {
      this.isLoading = !this.isLoading;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmZmN2JkOWMxZmY5MTk4M2U4YmIyMTU4YjY0MzIzNSIsIm5iZiI6MTcyODc3MDY4MS4wMzIxMTgsInN1YiI6IjY2YmI1N2Q1NzAxNjYyMWZiMDczMDIxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UYjZnCFWNuHFaiddoofrRDt_EkLwxwObJeOPLfn0tKE",
        },
      };
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${this.$route.query.q}&include_adult=false&language=en-US&page=${this.$route.params.page}`,
          options,
        );
        const result = await response.json();
        this.searchResults = result.results;
        this.totalResultNumber = result.total_result;
        this.totalPages = result.total_pages;
        // console.log(result);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = !this.isLoading;
      }
    },
    handlePageChange(newPage) {
      // Navigate to the new page, updating the URL
      this.$router.push({
        name: "Search",
        params: { page: newPage },
        query: { q: this.$route.query.q },
      });
    },
  },
  mounted() {
    this.fetchSearchResults();
  },
  watch: {
    "$route.query.q": {
      immediate: true,
      handler() {
        this.fetchSearchResults();
      },
    },
    "$route.params.page": {
      immediate: true,
      handler() {
        this.fetchSearchResults();
      },
    },
  },
};
</script>
