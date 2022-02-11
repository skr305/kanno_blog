<template>
  <div class="notes">
    <h2>Recent</h2>
    <ul class="notes__container">
      <li v-for="note in noteList" :key="note.name">
        <h5>
          <fe-link underline :to="{ name: note.name }">
            {{ note.meta.title }}
          </fe-link>
        </h5>
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
ul li::before {
  content: none;
}
ul li:first-child {
  margin-top: 1.4rem;
}
</style>
