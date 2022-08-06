<template>
<div>
  <v-card>
    <v-card-title>
      Keys
      <v-spacer></v-spacer>
      <v-btn
      class='primary'
      size="lg"
      dark @click="create()">
      Waiting List
    </v-btn>
    </v-card-title>
    <v-data-table
      :loading=this.$store.state.load
      :headers="headers"
      :items="this.$store.state.keys"
      :items-per-page=10
    >
    <template v-slot:item.control="{ item }">
                  <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs"
            v-on="on"
        class="mr-2"
        color="green"
        @click="ex = item.expire"
            >
         mdi-cached
      </v-icon>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Expire Details</v-toolbar>
                        <v-card-text>

            <v-window v-model="$store.state.step">
                <v-row class="mt-10" align="center" justify="center">
                <v-col cols="10" align-self="end" sm="8">
            <v-window-item :value="1">
                  <v-text-field
                  v-model="expire"
                  label="Expire Date"
                  outlined :hint="`Key Will Expire in ${expir}`" persistent-hint
                ></v-text-field>
                </v-window-item>
                 </v-col>
                 </v-row>
                </v-window>
                </v-card-text>
                <v-card-actions>
                <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    :loading="$store.state.btnload"
                    :disabled="$store.state.btnload"
                    color="primary"
                    depressed
                     @click="$store.dispatch('reActive',{expire:expire.toString(),req:item.active_request})"
                >
                    Create
                </v-btn>
                </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <v-btn 
      :loading="$store.state.btnload"
      :disabled="$store.state.btnload"
      text @click="$store.dispatch('stopKey',item.active_request)" icon>
      <v-icon
        color="warning"
      >
        mdi-shield-alert
      </v-icon>
      </v-btn>
    </template>
    </v-data-table>
  </v-card>
    </div>
</template>
<script>
  export default {
    watch:{
      hand(){
        this.hand()
      }
    },
    computed:{
      hand(){
        var d = new Date(this.ex);
        this.expir = d.setMonth(d.getMonth() + parseInt(this.expire));
        this.expir = d.toLocaleString().split(',')[0]
      }
    },
    created(){
      this.initialize()
      this.$store.dispatch('getKeys')
    },
    data () {
      return {
        keys:this.$store.state.keys,
        search: '',
        load:false,
        expire:1,
        expir:'',
        ex:'',
        headers: [
          { text: 'Request', value: 'active_request' },
          { text: 'Program', value: 'program' },
          { text: 'Mac', value: 'mac' },
          { text: 'User', value: 'user' },
          { text: 'Last Used', value: 'last_used' },
          { text: 'Expires', value: 'expire' },
          { text: 'Version', value: 'version' },
          { text: 'Control', value: 'control' },
        ],
      
      }
    },
    methods:{
      initialize () {
        this.progs = this.$store.state.keys
      },
      create(){
        this.$router.push('/activates/waiting')
      },
      deleteProg(id){
        if(confirm('Are You Sure You Want Delete This Program?'))  this.$store.dispatch('deleteKey',id)
       
      }
    },
  }
</script>