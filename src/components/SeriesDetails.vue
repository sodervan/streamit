<template>
  <div class="mt-14">
    <div v-if="isLoading" class="px-6">
      <div class="flex flex-col space-y-3">
        <Skeleton class="h-[125px] w-full rounded-xl"/>
        <div class="space-y-2">
          <Skeleton class="h-4 w-full"/>
          <Skeleton class="h-4 w-full"/>
        </div>
      </div>
    </div>
    <div v-if="!isLoading && details.name">
      <div class="w-full h-[300px]">
        <!-- Use route params correctly -->
        <img
            alt="details.name"
            :src="`https://image.tmdb.org/t/p/original${details.backdrop_path}`"
            class="object-cover"
        ></img>
      </div>
      <div class="px-6">
        <div class="mt-4">
          <p class="text-white text-lg font-medium">
            {{ details.name }}
          </p>
        </div>
        <div class="flex items-center gap-4 mt-3">
          <p class="text-red-500 font-medium">{{ details.vote_average }}</p>
          <p class="text-white">{{ details.first_air_date }}</p>
          <div class="px-2 border border-white">
            <p class="text-white">{{ details.languages[0] }}</p>
          </div>
        </div>
        <div class="mt-3">
          <p class="text-md text-gray-300">{{ details.overview }}</p>
        </div>
        <div class="mt-3 flex flex-col items center gap-3">
          <p class="text-red-500">
            Genres:
            <span
                v-for="(item, index) in details.genres"
                class="text-sm text-gray-400"
            >{{
                item.name
              }}<span v-if="details.genres.length > 1">, </span></span
            >
          </p>
          <div class="flex items-center gap-5">
            <p class="text-red-500">
              Country:
              <span
                  v-for="(item, index) in details.origin_country"
                  class="text-sm text-gray-400"
              >{{
                  item
                }}<span v-if="details.origin_country.length > 1">, </span></span
              >
            </p>
            <p class="text-red-500">
              Seasons:
              <span class="text-gray-500">{{ details.number_of_seasons }}</span>
            </p>
          </div>
          <div class="mt-2">
            <Select v-model="seasonNumber">
              <SelectTrigger class="w-[180px] border-none">
                <SelectValue :placeholder="'Season ' + seasonNumber"/>
              </SelectTrigger>
              <SelectContent class="font-poppins border-none">
                <SelectGroup>
                  <SelectLabel>Season</SelectLabel>
                  <SelectItem
                      v-for="(item, index) in details.number_of_seasons"
                      :key="index"
                      :value="index + 1"
                  >
                    Season {{ index + 1 }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <!--EPISODES-->
          <div class="mt-2">
            <div v-if="episodeLoading">
              <div class="space-y-2">
                <Skeleton class="h-4 w-full"/>
                <Skeleton class="h-4 w-full"/>
              </div>
            </div>
            <p v-if="!episodeLoading" class="text-gray-500 text-center my-2">Episodes</p>
            <div
                v-if="!episodeLoading && seasonDetails.length"
                class="flex justify-center items-center space-x-2 flex-wrap p-3 border border-gray-700 rounded-lg max-h-[300px] overflow-y-auto"
            >
              <div
                  v-for="(episode, index) in seasonDetails"
                  :key="episode.id"
                  class="w-10 h-10 text-white my-1 flex justify-center items-center border border-gray-500 rounded-md cursor-pointer hover:bg-white hover:text-black transition duration-300 ease-in-out"
                  @click="navigateToEpisode({details, episode: index + 1})"
              >
                {{ index + 1 }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="text-white text-center font-medium mt-10">SIMILAR TV SERIES</p>
      <SimilarSeries/>
    </div>
  </div>
</template>

<script>
import SimilarSeries from "@/components/SimilarSeries.vue";
import {Skeleton} from "@/components/ui/skeleton/index.js";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default {
  components: {
    SimilarSeries,
    Skeleton,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  },
  data() {
    return {
      details: [],
      genres: this.$store.state.genres,
      isLoading: false,
      id: "",
      seasonNumber: 1,
      seasonDetails: [],
      episodeLoading: true,
    };
  },
  methods: {
    navigateToEpisode(prop) {
      this.$router.push({
        name: "EpisodeDetails",
        params: {title: prop.details.name, id: this.$route.params.id, season: this.seasonNumber, episode: prop.episode}
      })
    },
    updateSeasonNumber(number) {
      this.seasonNumber = number;
    },
    async fetchSeriesById() {
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
            `https://api.themoviedb.org/3/tv/${this.$route.params.id}?language=en-US`,
            options,
        );
        const result = await response.json();
        this.details = result;
        console.log(this.details);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchSeasonById() {
      this.episodeLoading = true;
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
            `https://api.themoviedb.org/3/tv/${this.$route.params.id}/season/${this.seasonNumber}?language=en-US`,
            options,
        );
        const result = await response.json();
        this.seasonDetails = result.episodes;
        // console.log(this.seasonDetails);
        console.log(result)
      } catch (error) {
        console.log(error);
      } finally {
        this.episodeLoading = false;
      }
    },
  },
  watch: {
    seasonNumber: {
      immediate: true,
      handler() {
        this.fetchSeasonById();
      },
    },
    "$route.params.id": {
      immediate: true,
      handler() {
        this.fetchSeriesById();
      },
    },
  },
  mounted() {
    this.fetchSeriesById();
    this.fetchSeasonById()
    this.id = this.$route.params.id;
  },
};
</script>
