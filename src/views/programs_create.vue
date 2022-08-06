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
      <span class="mt-5 ">Create New Program</span>
    </v-card-title>
            <v-card-text class="mt-15">
            <v-row justify="center" align="center">
              <v-col align-self="end" cols=6>
                <v-text-field
                  v-model="program.name"
                  label="Program Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col align-self="end" cols=6>
                <v-text-field
                  v-model="program.price"
                  label="Price"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col align-self="end" cols=6>
                <v-text-field
                  v-model="program.version"
                  label="Version"
                  outlined hint="ex. v1" persistent-hint
                ></v-text-field>
              </v-col>
              <v-col align-self="end" cols=6>
                <v-text-field
                  v-model="program.url"
                  label="Url"
                  outlined
                ></v-text-field>
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
  data(){
    return {
      program:{
        name:'',
        price:'',
        version:'',
        url:'',
      }
    }
  },
  methods:{
    create(){
      this.$store.dispatch('createProgram',this.program)
    }
  }
}
</script>