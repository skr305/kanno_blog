<template>
  <div class="notes">
    <ul>
      <li v-for="note in noteList" :key="note.name">
        <h3>
          <fe-link :to="{ name: note.name }">
            {{ note.name }}
          </fe-link>
        </h3>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useState } from "@fect-ui/vue-hooks";
import { notes } from "../router";

type Note = typeof notes[number];

export default defineComponent({
  name: "Notes",

  setup() {
    const [noteList, setNoteList] = useState<Note[]>(notes);
    return {
      noteList,
    };
  },
});
</script>

<style scoped>
ul li {
  text-decoration: none;
  list-style: none;
}
</style>
