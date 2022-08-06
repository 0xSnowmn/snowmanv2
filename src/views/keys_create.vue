<template>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <v-container>
                  <div class="mt-4 text-h4 text-center">
                  Add New Key
                </div>
                 <v-spacer></v-spacer>
                  <v-row class="mt-10" align="center"
      justify="center">
                  <v-col align-self="end" cols="10" sm="8">
                  <v-select v-model="prog" label="Program" :items="$store.state.programs" outlined></v-select>
                </v-col>
                  </v-row>
                  <v-row class="mt-10" align="center"
      justify="center">
                <v-col cols="10" align-self="end" sm="8">
                  <v-text-field
                  v-model="expire"
                  label="Date"
                  outlined :hint="`Key Will Expire in ${this.expir}`" persistent-hint
                ></v-text-field>
                <v-checkbox
                v-model="check"
                label="Days"
              ></v-checkbox>
                </v-col>
                  </v-row>
                <v-row class="mt-10" align="center"
      justify="center">
                <v-col class="text-center" justify="center" align-self="center" sm="8">
                  <v-btn 
                  class="ma-2"
                  color="secondary"
                  @click="done()"
                >
                  Generate Key
                </v-btn>
                </v-col>
                </v-row>
              </v-container>
            </v-sheet>
</template>

<script>
  export default {
    data() {return{
      expire:1,
      expir:'',
      prog:'',
      check:0,
      progs:null
    }},
    methods:{
      done(){
        this.$store.dispatch('generateKey',{expire:this.expir,prog:this.prog})
      }
    },
    mounted(){
        var d = new Date();
        this.expir = d.setMonth(d.getMonth() + parseInt(this.expire));
        this.expir = d.toLocaleString().split(',')[0]
        this.progs = this.$store.dispatch('getPrograms')
    },
    watch:{
      hand(){
        this.hand()
      }
    },
    computed:{
      hand(){
        if(this.check == 1){
        var d = new Date();
        this.expir = d.setDate(d.getDate() + parseInt(this.expire));
        this.expir = d.toLocaleString().split(',')[0]
        } else {
        var d = new Date();
        this.expir = d.setMonth(d.getMonth() + parseInt(this.expire));
        this.expir = d.toLocaleString().split(',')[0]
        }
      }
    }
  }
</script>