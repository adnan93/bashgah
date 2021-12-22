<template>
  <div>
    <div class="mycards ml-10" :key="program.id" v-for="program in programs">
      <Program :program="program" />
    </div>
  </div>
</template>

<script>
import Program from "./Program.vue";

export default {
  name: "Programs",
  props: {
    programs: Array,
  },
  components: {
    Program,
  },
};
</script>

<style>
.mycards {
  float: right !important;
}
</style>