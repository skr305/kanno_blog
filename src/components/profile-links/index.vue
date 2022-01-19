<template>
  <div class="profile-links">
    <fe-link v-for="(item, i) in links" :key="item">{{ item }}</fe-link>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "ProfileLinks",
  setup() {
    const links = ref(["Notes", "About", "Project", "Talk", "Resume"]);
    return { links };
  },
};
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
