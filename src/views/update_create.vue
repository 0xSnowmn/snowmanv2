<template>
<v-container  fluid>
  <v-row align="center" style="height:80vh"
      justify="center">
      <v-col>
  <v-card
    class="mx-auto mt-1"
    max-width="1200"   
    min-height="500" 
  >
  <v-card-title class="text-h4 text-center font-weight-light justify-center">
      <span class="mt-5 ">New Update</span>
    </v-card-title>
            <v-card-text class="mt-15">
            <v-row justify="center" align="center">
              <v-col align-self="end" cols=6>
                <v-select
                :items="this.$store.state.programs"
                  v-model="update.program"
                  label="Program Name"
                  outlined
                ></v-select>
              </v-col>
              <v-col align-self="end" cols=6>
                <v-text-field
                  v-model="update.version"
                  label="Version"
                  outlined hint="ex. v1" persistent-hint
                ></v-text-field>
              </v-col>
              <v-col align-self="end" cols=6>
                <v-checkbox
                  v-model="update.urgent"
                  label="Urgent"
                  outlined
                ></v-checkbox>
              </v-col>
                <v-col class="text-center" justify="center" align-self="center" sm="8">
                  <v-btn 
                  class="ma-2"
                  size="xlg"
                  color="orange darken-2"
                  @click="create()"
                >
                  Create
                </v-btn>
                </v-col>
              </v-row>
              
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  created(){
    this.$store.dispatch('getPrograms')
  },
  data(){
    return {
      update:{
        program:'',
        urgent:false,
        version:'',
      }
    }
  },
  methods:{
    create(){
      this.$store.dispatch('newUpdate',this.update)
    }
  }
}
</script>