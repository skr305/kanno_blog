<template>
  <div class="profile-links">
    <fe-link :to="item.route" v-for="item in links" :key="item.tip">{{
      item.tip
    }}</fe-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ProfileLinks",
  setup() {
    const links = [
      {
        route: "/",
        tip: "Notes",
      },
      {
        route: "project",
        tip: "project",
      },
      {
        route: "talk",
        tip: "Talk",
      },
      {
        route: "resume",
        tip: "Resume",
      },
    ];
    return { links };
  },
});
</script>

<style scoped>
.profile-links a {
  color: var(--accents-5);
  padding: var(--fect-gap-quarter);
  text-transform: uppercase;
  font-size: 0.8rem;
}
.profile-links a:hover {
  color: var(--fect-link-color);
}

.profile-links a:last-of-type {
  margin-right: 0;
}
</style>
