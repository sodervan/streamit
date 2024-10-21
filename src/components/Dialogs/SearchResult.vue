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
          <p class="text-white text-center text-lg">Search Results for "{{ decodeURIComponent($route.query.q)}}"</p>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <router-link
            v-for="(item, index) in searchResults"
            :to="
              item.media_type === 'movie'
                ? '/details/' + item.original_title + '/' + item.id
                : '/details/series/' + item.name + '/' + item.id
            "
            class="mb-6 flex flex-col items-center cursor-pointer shadow-lg"
            :key="index"
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
                loading="lazy"
              />
            </div>
            <div
              class="bg-[#151414] flex flex-col w-full h-24 px-3 py-2 items-start overflow-hidden relative"
            >
              <marquee-text class="text-white text-md">
                {{ item.original_title || item.original_name }}
              </marquee-text>
              <div class="flex items-center mt-1">
                <i class="fi fi-rr-calendar mr-2 text-red-500"></i>
                <p class="text-gray-500 text-sm">
                  {{ item.release_date || item.first_air_date }}
                </p>
              </div>
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-2 mt-1">
                  <i class="fi fi-rr-feedback-review text-yellow-500"></i>
                  <p class="text-gray-500 text-sm">{{ item.vote_average }}</p>
                </div>
                <div class="px-2 border border-gray-500">
                  <p class="uppercase text-gray-500 text-sm">
                    {{ item.media_type }}
                  </p>
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Pagination -->
        <!--          <Pagination-->
        <!--              v-slot="{ page }"-->
        <!--              :total="totalPages"-->
        <!--              :sibling-count="1"-->
        <!--              show-edges-->
        <!--              :default-page="parseInt($route.params.page) || 1"-->
        <!--          >-->
        <!--            <PaginationList v-slot="{ items }" class="flex items-center gap-1">-->
        <!--              <PaginationFirst />-->
        <!--              <PaginationPrev />-->
        <!--              <template v-for="(item, index) in items" :key="index">-->
        <!--                <PaginationListItem-->
        <!--                    v-if="item.type === 'page'"-->
        <!--                    :value="item.value"-->
        <!--                    as-child-->
        <!--                >-->
        <!--                  <Button-->
        <!--                      class="w-10 h-10 p-0"-->
        <!--                      :variant="item.value === page ? 'default' : 'outline'"-->
        <!--                      @click="handlePageChange(item.value)"-->
        <!--                  >-->
        <!--                    {{ item.value }}-->
        <!--                  </Button>-->
        <!--                </PaginationListItem>-->
        <!--                <PaginationEllipsis v-else :key="item.type" :index="index" />-->
        <!--              </template>-->
        <!--              <PaginationNext />-->
        <!--              <PaginationLast />-->
        <!--            </PaginationList>-->
        <!--          </Pagination>-->
        <p class="text-gray-500 text-center">Pages</p>
        <div
          class="mb-4 flex flex-wrap items-center justify-center space-x-2 w-full p-3 overflow-y-auto max-h-[95px]"
        >
          <!--          <button-->
          <!--            v-if="currentPage > 1"-->
          <!--            class="w-10 h-10 border border-white text-white rounded-lg"-->
          <!--            @click="changePage(currentPage - 1)"-->
          <!--          >-->
          <!--            &lt;-->
          <!--          </button>-->
          <button
            v-for="page in totalPages"
            :key="page"
            :class="[
              'w-10 h-10 rounded-lg mb-2',
              currentPage === page
                ? 'bg-white text-black'
                : 'border border-white text-white',
            ]"
            @click="changePage(page)"
          >
            {{ page }}
          </button>

          <!--          <button-->
          <!--            v-if="currentPage < totalPages"-->
          <!--            class="w-10 h-10 border border-white text-white"-->
          <!--            @click="changePage(currentPage + 1)"-->
          <!--          >-->
          <!--            &gt;-->
          <!--          </button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {
//   Pagination,
//   PaginationEllipsis,
//   PaginationFirst,
//   PaginationLast,
//   PaginationList,
//   PaginationListItem,
//   PaginationNext,
//   PaginationPrev,
// } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton/index.js";
import MarqueeText from "vue-marquee-text-component";
import { Button } from "@/components/ui/button";
import Paginator from "primevue/paginator";

export default {
  components: {
    MarqueeText,
    Skeleton,
    Paginator,
    Button,
    // Pagination,
    // PaginationEllipsis,
    // PaginationFirst,
    // PaginationLast,
    // PaginationList,
    // PaginationListItem,
    // PaginationNext,
    // PaginationPrev,
  },
  data() {
    return {
      isLoading: false,
      searchResults: [],
      totalPages: 0,
      currentPage: parseInt(this.$route.params.page) || 1,
    };
  },
  methods: {
    async fetchSearchResults() {
      this.isLoading = true;
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
          `https://api.themoviedb.org/3/search/multi?query=${this.$route.query.q}&include_adult=false&language=en-US&page=${this.currentPage}`,
          options,
        );
        const result = await response.json();
        this.searchResults = result.results;
        this.totalPages = result.total_pages;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    changePage(page) {
      this.currentPage = page;
      this.$router.push({
        name: "Search",
        params: { page },
        query: { q: this.$route.query.q },
      });
    },
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
      handler(newPage) {
        this.currentPage = parseInt(newPage) || 1;
        this.fetchSearchResults();
      },
    },
  },
};
//   data() {
//     return {
//       isLoading: false,
//       searchResults: [],
//       totalResultNumber: "",
//       totalPages: 0,
//     };
//   },
//   methods: {
//     async fetchSearchResults() {
//       this.isLoading = true;
//       const options = {
//         method: "GET",
//         headers: {
//           accept: "application/json",
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmZmN2JkOWMxZmY5MTk4M2U4YmIyMTU4YjY0MzIzNSIsIm5iZiI6MTcyODc3MDY4MS4wMzIxMTgsInN1YiI6IjY2YmI1N2Q1NzAxNjYyMWZiMDczMDIxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UYjZnCFWNuHFaiddoofrRDt_EkLwxwObJeOPLfn0tKE",
//         },
//       };
//       try {
//         const response = await fetch(
//           `https://api.themoviedb.org/3/search/multi?query=${this.$route.query.q}&include_adult=false&language=en-US&page=${this.$route.params.page}`,
//           options,
//         );
//         const result = await response.json();
//         this.searchResults = result.results;
//         this.totalResultNumber = result.total_results;
//         this.totalPages = result.total_pages;
//         console.log(result);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         this.isLoading = false;
//       }
//     },
//     handlePageChange(newPage) {
//       // Navigate to the new page, updating the URL
//       this.$router.push({
//         name: "Search",
//         params: { page: newPage },
//         query: { q: this.$route.query.q },
//       });
//     },
//   },
//   watch: {
//     "$route.query.q": {
//       immediate: true,
//       handler() {
//         this.fetchSearchResults();
//       },
//     },
//     "$route.params.page": {
//       immediate: true,
//       handler() {
//         this.fetchSearchResults();
//       },
//     },
//   },
// };
</script>
