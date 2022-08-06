<template>
  <v-app id="inspire">
    <v-container  fluid>
  <v-row align="center" style="height:80vh"
      justify="center">
      <v-col>
  <v-card
    class="mx-auto mt-15"
    max-width="600"   
    min-height="500" 
  >
  <v-card-title class="text-h4 text-center font-weight-light justify-center">
      <span class="mt-5 ">Login</span>
    </v-card-title>
    <v-card-text class="mt-15">
    <v-row justify="center" align="center">
      <v-col align-self="end" cols=8>
         <v-text-field class="mb-6"  required
            label="Username"
            outlined
            v-model="user"
         ></v-text-field>    
         </v-col>
         <v-col align-self="end" cols=8>
         <v-text-field  required
            label="Password"
            outlined
            type="password"
            v-model="pass"
         ></v-text-field>    
         </v-col>
         <v-col class="text-center" justify="center" align-self="center" sm="8">
                  <v-btn 
                  class="ma-2"
                  color="orange darken-2"
                  @click="login()"
                >
                  Login
                </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data(){
    return {
      user:'',
      pass:''
    }
  },
  methods:{
    login(){
      this.$store.dispatch('login',{name:this.user,pass:this.pass})
    },
  },
  mounted(){
    if(this.$store.state.isLogged){
      this.$router.push('/')
    }
  }
}
</script>