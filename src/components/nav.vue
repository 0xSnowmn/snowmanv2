<template>
    <v-app-bar
      app
      color="dark"
      flat
      class="m-5"
    >
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <v-btn
          v-for="(name,index) in names"
          :key="index"
          text
        >
        <router-link tag="span" :to=links[index]>
          {{ name }}
        </router-link>
        </v-btn>
      </v-container>
    </v-app-bar>
</template>

<script>
export default {
  data(){
      return {
        names: [
        'Home',
        'Programs',
        'Updates',
        'Activates',
        'Informations'
        ],
        links:['/home','/programs','/updates','/activates','/info']
      }
    }
}
</script>