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
      <!--Mode-->
      <p class="text-white">-{{$route.name === "Series" || "SeriesDetails" || "EpisodeDetails" ? "Tv Series" : "Movies"}}-</p>
      <!-- Search Icon -->
      <button
        aria-label="Search"
        class="cursor-pointer"
        @click="onChangeSearchDialogueState"
      >
        <i class="fi fi-rr-search text-white text-xl"></i>
      </button>
    </div>

    <!-- Navbar content that opens when menu is clicked -->
    <div
      :class="`transition-transform duration-300 h-screen mt-auto fixed top-0 left-0 bg-black z-10 w-full ${isNavOpen ? 'translate-x-0 bg-primaryBlack' : '-translate-x-full'}`"
    >
      <div class="px-6 py-4 flex flex-col gap-10">
        <div>
          <div class="flex items-center justify-between">
            <router-link to="/" class="cursor-pointer" @click="onChangeNav">
              <p class="text-white text-xl font-bold font-pacifico">
                STREAM<span class="text-red-500">it</span>
              </p>
              <p class="text-sm text-gray-500">by _sodervan</p>
            </router-link>
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
            <div class="flex items-center gap-3 text-white">
              <i class="fi fi-rr-camera-movie"></i>
              <p class="text-white">Movies</p>
            </div>
          </router-link>
          <router-link
            @click="onChangeNav"
            to="/series"
            class="nav p-4 hover:bg-gray-500 transition-all duration-300 rounded-[20px] w-full"
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

    <!-- Dialog or Drawer -->
    <Dialog v-if="isDesktop" v-model:open="showSearchDialogue">
      <DialogTrigger as-child>
        <!-- Optionally, add a button here -->
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Search for movies, TV shows, etc.
          </DialogDescription>
        </DialogHeader>
        <!-- Your Search form inside the Dialog -->
        <form class="grid items-start gap-4 px-4">
          <div class="grid gap-2">
            <Label html-for="search">Search</Label>
            <Input id="search" type="text" placeholder="Search movies..." />
          </div>
          <Button type="submit"> Search</Button>
        </form>
      </DialogContent>
    </Dialog>

    <Drawer v-else v-model:open="showSearchDialogue">
      <DrawerTrigger as-child>
        <!-- Optionally, add a button here -->
      </DrawerTrigger>
      <DrawerContent class="font-poppins border-none">
        <DrawerHeader class="text-left">
          <DrawerTitle>Search</DrawerTitle>
          <DrawerDescription>
            Search for Movies, TV shows, etc.
          </DrawerDescription>
        </DrawerHeader>
        <!-- Your Search form inside the Drawer -->
        <div class="grid items-start gap-4 px-4">
          <div class="grid gap-2">
            <Label html-for="search">Search</Label>
            <Input
              id="search"
              type="text"
              placeholder="Search movies..."
              v-model="searchTerm"
            />
          </div>
          <Button
            @click="searchConstruct"
          >
            Search</Button
          >
        </div>
        <DrawerFooter class="pt-2">
          <DrawerClose as-child>
            <Button variant="outline"> Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </div>
</template>

<script>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ref } from "vue";
import { useMediaQuery } from "@vueuse/core";

export default {
  components: {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    Button,
    Input,
    Label,
  },
  data() {
    return {
      isNavOpen: false,
      showSearchDialogue: ref(false),
      isDesktop: useMediaQuery("(min-width: 768px)"),
      searchTerm: "",
    };
  },
  methods: {
    onChangeNav() {
      this.isNavOpen = !this.isNavOpen;
    },
    onChangeSearchDialogueState() {
      this.showSearchDialogue = !this.showSearchDialogue;
    },
    performSearch() {
      if (this.searchTerm) {
        const encodedSearchTerm = encodeURIComponent(this.searchTerm);
        this.$router.push({
          name: "Search",
          params: { page: 1 },
          query: { q: encodedSearchTerm },
        });
      } else {
        alert("Please enter a search term.");
      }
    },
    searchConstruct() {
      this.onChangeSearchDialogueState();
      this.performSearch();
    },
  },
};
</script>
