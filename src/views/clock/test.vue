<template>
  <div class="page">
    <div class="page-bd">
      <calendar 
        :range="calendar1.range" 
        :lunar="calendar1.lunar">
      </calendar>  
    </div>  
  </div>      
</template>
<script>
import calendar from "@/components/calendar";
export default {
  components: {
    calendar
  },
  data() {
    return {
      calendar1: {
        range: false,
        lunar: true
      }
    };
  }
};
</script>
<style lang="less">
</style>
