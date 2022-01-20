<template>
  <div class="project">
    <fe-grid-group :gap="2">
      <fe-grid
        v-for="project in projectKeys"
        :key="project"
        :xs="24"
        :sm="8"
        :md="8"
        :lg="8"
        :xl="8"
        style="height: 200px; overflow: hidden"
        align-items="center"
      >
        <fe-link :href="reoslveProject(project, 'url')">
          <fe-card shadow hoverable>
            <!-- <fe-image :src="reoslveProject(project, 'src')" skeleton /> -->
            <h3 class="project__item-title">
              {{ reoslveProject(project, 'title') }}
            </h3>
            <span class="project__item-summary">{{
              reoslveProject(project, 'summary')
            }}</span>
          </fe-card>
        </fe-link>
      </fe-grid>
    </fe-grid-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import projects from '../../project.json'

type ProjectAttr = keyof typeof projects[number]

export default defineComponent({
  setup() {
    const projectKeys = ref(Object.keys(projects))

    const reoslveProject = (prop: string, attr: ProjectAttr) =>
      projects[prop][attr]

    return {
      projectKeys,
      reoslveProject,
    }
  },
})
</script>

<style scoped>
.project {
  width: 90%;
  margin: 0 auto;
}
.project .project__item-title {
  font-size: 1.3rem;
  font-weight: 600;
}
</style>
