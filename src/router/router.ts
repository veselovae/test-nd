import { createWebHashHistory, createRouter } from "vue-router";

import WelcomePage from "@/components/pages/WelcomePage/WelcomePage.vue";
import NotesPage from "@/components/pages/NotesPage/NotesPage.vue";

export default createRouter({
  routes: [
    { path: "/", component: WelcomePage, alias: "/" },
    { path: "/notes", component: NotesPage },
  ],
  history: createWebHashHistory(),
});
