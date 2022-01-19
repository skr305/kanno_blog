<template>
  <fe-grid class="profile">
    <fe-link class="user" to="/">
      <div class="user-link">
        <fe-avatar :src="userInfo.avatar" alt-text="avatar" />
        <fe-grid class="user-info">
          <div class="name">{{ userInfo.author }}</div>
          <div class="summary">{{ userInfo.introduce }}</div>
        </fe-grid>
      </div>
    </fe-link>
  </fe-grid>
  <profile-links />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProfileLinks from "../profile-links/index.vue";
import { useLayoutContext } from "../layout/use-layout-context";
export default defineComponent({
  components: {
    ProfileLinks,
  },
  setup() {
    const { context } = useLayoutContext();
    const userInfo = {
      avatar: context.avatar,
      author: context.author,
      introduce: context.introduce,
    };
    return {
      userInfo,
    };
  },
});
</script>

<style scoped>
.profile {
  padding: var(--fect-gap) 0;
}

.profile .user {
  color: var(--accents-5);
}

.profile .user-link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  font-size: 1rem;
  margin: 0;
  padding: 0;
}

.profile .user-link .user-info {
  font-size: 0.85rem;
  margin-left: var(--fect-gap-half);
}

.profile .user-link .user-info .summary {
  line-height: 1.5rem;
  font-size: 0.75rem;
}

@media only screen and (max-width: 650px) {
  .profile {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1rem;
  }
}
</style>
