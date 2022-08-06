<template>
<div>
  <v-card>
    <v-card-title>
      Programs
      <v-spacer></v-spacer>
      <v-btn
      class='primary'
      size="lg"
      dark @click="create()">
      New
    </v-btn>
    </v-card-title>
    <v-data-table
      :loading=this.$store.state.load
      :headers="headers"
      :items="this.progs"
      :items-per-page=10
    >
    <!-- :search="search" -->
    <template v-slot:item.control="{ item }">
      <v-icon
        small
        class="mr-2"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteProg(item.id)"
      >
        mdi-delete
      </v-icon>
    </template>
    </v-data-table>
  </v-card>
    </div>
</template>
<script>
  export default {
    created(){
      this.initialize()
      this.$store.dispatch('getProgramsStat')
    },
    data () {
      return {
        progs:this.$store.state.programs_stats,
        search: '',
        load:false,
        headers: [
          { text: 'ID', value: 'id' },
          { text: 'Program', value: 'prog' },
          { text: 'Keys', value: 'keys' },
          { text: 'Valid', value: 'valids' },
          { text: 'Expires', value: 'expires' },
          { text: 'Version', value: 'version' },
          { text: 'Price', value: 'price' },
          { text: 'Control', value: 'control' },
        ],
      
      }
    },
    methods:{
      initialize () {
        this.progs = this.$store.state.programs_stats
      },
      create(){
        this.$router.push('/programs/create')
      },
      deleteProg(id){
        if(confirm('Are You Sure You Want Delete This Program?'))  this.$store.dispatch('deleteProg',id)
       
      }
    },
  }
</script>