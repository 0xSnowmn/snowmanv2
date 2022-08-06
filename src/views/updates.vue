<template>
<div>
  <v-card>
    <v-card-title>
      Updates
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
      :items="this.$store.state.updates"
      :items-per-page=10
    >
    <template v-slot:item.control="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="$router.push('/updates/edit/' + item.id)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="delet(item.id)"
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
    async created(){
      this.updates = await this.$store.dispatch('getUpdates')
    },
    data () {
      return {
        updates:this.$store.state.updates,
        search: '',
        headers: [
          { text: 'id', value: 'id' },
          { text: 'Program', value: 'program' },
          { text: 'Version', value: 'version' },
          { text: 'Urgent', value: 'urgent' },
          { text: 'Control', value: 'control' },
        ],
      
      }
    },
    methods:{
      create(){
        this.$router.push('/updates/create')
      },
      delet(id){
        if(confirm('Are You Sure You Want Delete This Update?'))  this.$store.dispatch('deleteUpdate',id)
      }
    },
  }
</script>