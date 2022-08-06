<template>
  <v-app>
    <v-main>
    <v-container>
      <navbar v-if="$store.state.isLogged" />
      <v-row >
      <v-col>
        <router-view/>
      </v-col>
        </v-row>
      </v-container>
      <v-fade-transition leave-absolute>
        <v-alert v-if="this.$store.state.alert.visable" elevation="999" :type="this.$store.state.alert.type" width="30%">
          {{ this.$store.state.alert.text }}
        </v-alert>
     </v-fade-transition>
    </v-main>
  </v-app>
</template>
<style scoped>
.v-alert {
  position: fixed;
  left: 82%;
  bottom: 20px;
  transform: translate(-50%, -50%);
  margin: 0 auto;  
}
</style>
<script>
import navbar from './components/nav.vue'
//import list from './components/lists.vue'

export default {
  name: 'App',
  mounted(){
    if(localStorage.getItem('token') !== null){
      this.$store.commit("changeToLogin",localStorage.getItem('token'))
    }
    if(!this.$store.state.isLogged){
      this.$router.push('/login')
    }
  },
  components:{
    navbar,
    //list
  }
};
</script>
