<template>
<div>
  <v-card>
    <v-card-title>
      Waiting List
      <v-spacer></v-spacer>
      <v-btn
      class='primary'
      size="lg"
      dark @click="$router.go(-1)">
      Back
    </v-btn>
    </v-card-title>
    <v-data-table
      :loading=this.$store.state.load
      :headers="headers"
      :items="this.$store.state.waiting"
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
        
            >
        mdi-checkbox-marked-circle
      </v-icon>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Login Details</v-toolbar>
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
                <v-window-item :value="2">
                    <v-row>
                        <v-col cols="8"><span class="text-h7">Username: {{ $store.state.infoKey.user }}</span></v-col>
                        <v-col cols="8"><span class="text-h7">Password: {{ $store.state.infoKey.pass }}</span></v-col>
                        <v-col cols="8"><span class="text-h7">Expire: {{ $store.state.infoKey.expire }}</span></v-col>
                        <v-col cols="8"><span class="text-h7">Program: {{ $store.state.infoKey.program }}</span></v-col>
                        <v-col cols="8"><span class="text-h7">Version: {{ $store.state.infoKey.version }}</span></v-col>
                        <v-col cols="8"><span class="text-h7">Date: {{ $store.state.infoKey.activate_at }}</span></v-col>
                    </v-row>
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
                   v-if="$store.state.step == 2"
                    color="primary"
                    depressed
                     @click="copy()">
                     Copy
                </v-btn>

                <v-btn v-else
                    :loading="$store.state.btnload"
                    :disabled="$store.state.btnload"
                    color="primary"
                    depressed
                     @click="$store.dispatch('newActivate',{expire:expire.toString(),req:item.active_request})"
                >
                    Create
                </v-btn>
                </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <v-icon
      class="mr-2"
        @click="$store.dispatch('testKey',item.active_request)"
        color="warning"
      >
        mdi-alarm
      </v-icon>
      <v-icon
        @click="deleteKey(item.id)"
        color="error"
      >
        mdi-close-circle
      </v-icon>
    </template>
    </v-data-table>
  </v-card>
    </div>
</template>
<script>
var moment = require('moment')
  export default {
    created(){
      this.$store.dispatch('getWaiting')
      console.log(this.$store.state.textCopy)
       
    },
    mounted(){
        var d = new Date();
        this.expir = d.setMonth(d.getMonth() + parseInt(this.expire));
        this.expir = d.toLocaleString().split(',')[0]
    },
    data () {
      return {
        waiting:this.$store.state.waiting,
        search: '',
        load:false,
        expire:1,
        expir:'',
        step:1,
        headers: [
          { text: 'Request', value: 'active_request' },
          { text: 'Program', value: 'program' },
          { text: 'Mac', value: 'mac' },
          { text: 'Version', value: 'version' },
          { text: 'Requested At', value: 'created_at' },
          { text: 'Control', value: 'control' },
        ],
      
      }
    },
    methods:{
      initialize () {
        this.progs = this.$store.state.keys
      },
      generate(id){
        this.$store.dispatch('newActivate',id)
      },
      deleteProg(id){
        if(confirm('Are You Sure You Want Delete This Program?'))  this.$store.dispatch('deleteKey',id)
       
      },
      copy() {
      if (!navigator.clipboard){
    // use old commandExec() way
        } else{
            navigator.clipboard.writeText(this.$store.state.textCopy)
        }
    }
    },
    watch:{
      hand(){
        this.hand()
      }
    },
    computed:{
      hand(){
        var d = new Date();
        this.expir = d.setMonth(d.getMonth() + parseInt(this.expire));
        this.expir = d.toLocaleString().split(',')[0]
      }
    }
  }
</script>