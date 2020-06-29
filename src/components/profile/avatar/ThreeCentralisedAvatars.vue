<template>
  <div class="d-flex align-center">
    <div :class="clazz" v-for="image in images" :key="image.id">
      <avatar-base :size="image.size" :username="username" :avatar="avatar" :style="image.style"></avatar-base>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        {
          id: 1,
          size: "190",
          style: "font-size: 75px;color: black;"
        },
        {
          id: 2,
          size: "100",
          style: "font-size: 50px;color: black;"
        },
        {
          id: 3,
          size: "40",
          style: "font-size: 24px;color: black;"
        }
      ]
    };
  },
  props: ["username", "clazz", "avatar"],
  components: {
    AvatarBase: () =>
    import(
      /* webpackChunkName: "AvatarBase" */ /* webpackPreload: true */ "@/components/profile/avatar/AvatarBase.vue"
    )
  }
};
</script>