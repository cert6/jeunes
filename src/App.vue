<template>
  <f7-app :params="$root.f7params">
<div id="app">
   <f7-page>
     <router-view/>
   </f7-page>
</div>
  </f7-app>
</template>

<script>


export default {
  name: 'App',
  components: {
  
  },
  data () {
    return {
      //
    }
  }
}
</script>


<style lang="css" >
@import url('./css/app.css');
</style>