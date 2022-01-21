<template>
  <div class="notes">
    <h2>Recent</h2>
    <ul class="notes__container">
      <li v-for="note in noteList" :key="note.name">
        <h3>
          <fe-link underline :to="{ name: note.name }">
            {{ note.meta.title }}
          </fe-link>
        </h3>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { notes } from '../router'

type Note = typeof notes[number]

export default defineComponent({
  name: 'Notes',

  setup() {
    const [noteList, setNoteList] = useState<Note[]>(notes)
    return {
      noteList
    }
  }
})
</script>

<style scoped>
.notes h2 {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: inline-block;
  margin: 0;
  color: var(--accents-6);
  padding: 2 var(--fect-gap-quarter) 0 0;
  border-bottom: 2px solid var(--accents-5);
}

ul {
  margin: 0;
  padding: 0;
}
ul li {
  text-decoration: none;
  list-style: none;
}

ul li > h3 {
  font-size: 1rem;
  text-transform: uppercase;
}
</style>
