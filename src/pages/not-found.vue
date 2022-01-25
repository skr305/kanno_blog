<template>
  <div class="not-found">
    <div class="center">
      <div>
        <h1 class="tip">404</h1>
        <div class="wid">
          <h2>This page could not be found</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFound'
})
</script>

<style lang="css" scoped>
.center {
  color: #000;
  background: #fff;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tip {
  display: inline-block;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  margin: 0;
  margin-right: 20px;
  padding: 10px 23px 10px 0;
  font-size: 24px;
  font-weight: 500;
  vertical-align: top;
}

.wid {
  display: inline-block;
  text-align: left;
  line-height: 49px;
  height: 49px;
  vertical-align: middle;
}

.wid > h2 {
  font-size: 14px;
  font-weight: normal;
  line-height: inherit;
  margin: 0;
  padding: 0;
}
</style>
