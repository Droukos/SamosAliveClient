<template>
  <v-list>
    <v-list-item v-for="(item, index) in navOpts" :key="index">
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on" @click="to(index)">
            <v-icon>{{ item.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ item.desc }}</span>
      </v-tooltip>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
//import { fs } from "@/plugins/files/fsUtility";

interface NavOpts {
  index: number;
  link: string;
  desc: string;
  icon: string;
}
@Component
export default class NavBarList extends Vue {
  @Prop()
  readonly navOpts!: NavOpts[];
  
  to(index: number) {
    //this.$fsEngine.print("/");
    this.$router.push({
      name: this.navOpts[index].link
    });
  }
}
</script>>