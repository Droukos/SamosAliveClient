<template>
  <div>
    <p v-text="$t('messages.inbox')"/>
  </div>
  
</template>


<script>
export default {
  components: {
    HeaderNavBarBundler: () =>
      import("@components/navbar/SideNavMenu.vue")
  }
};

</script>
<style>
body {
  font-family: "Roboto";
}
h1 {
  text-align: center;
}
</style>