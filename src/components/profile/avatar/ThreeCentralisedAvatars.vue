<template>
  <div class="d-flex align-center">
    <div :class="clazz" v-for="image in images" :key="image.id">
      <AvatarBase
        :size="image.size"
        :username="username"
        :avatar="avatar"
        :style="image.style"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    AvatarBase: () =>
      import(
        /* webpackChunkName: "AvatarBase" */ /* webpackPreload: true */ "@/components/profile/avatar/AvatarBase.vue"
      )
  }
})
export default class ThreeCentralisedAvatars extends Vue {
  images: Array<{ id: number; size: string; style: string }> = [
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
  ];

  @Prop()
  public username!: string;
  @Prop()
  public clazz!: string;
  @Prop()
  public avatar!: string;
}
</script>
