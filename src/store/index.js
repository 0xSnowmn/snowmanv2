import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
var moment = require("moment")
window.axios = require('axios')
axios.defaults.baseURL = 'https://snoworg.herokuapp.com/api';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged:false,
    load:true,
    token:null,
    programs:[],
    step:1,
    btnload:false,
    infoKey:{},
    textCopy:'',
    updates:[],
    programs_stats:[],
    waiting:[],
    keys:[],
    alert:{
      visable:false,
      type:'success',
      text:'Message',
    },
  },
  mutations: {
    alert:(state,payload) => {
      state.alert.visable = true
      setTimeout(() => {
        state.alert.visable = false
      }, 5000)
      state.alert.type = payload.type
      state.alert.text = payload.text
    },
    changeToLogin (state,token) {
      state.isLogged = true
      state.token = token
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      localStorage.setItem('token',token)
    },
    appendPrograms(state,programs){
      console.log(programs)
      programs.forEach(el => {
        state.programs.push(el.program)
      }); 
    },
    appendWaiting(state,list){
      state.waiting = list
    },
    appendUpdates(state,updates){
      updates.map(el => {
        el.urgent == 1 ? el.urgent = 'True' : el.urgent = 'false'
      })
      state.updates = updates
    },
    appendKeys(state,keys){
      state.keys = keys
    },
    appendStats(state,data){
        data.data.forEach(el => {
          var expires = 0
          var valid = 0
          state.programs_stats.push({'id': el.id ,'prog':el.program,'keys':0,'valids':valid,'expires':expires,'price':el.price,'version':el.version})
        });
        data.keys.forEach(ell => {
          var program = state.programs_stats.findIndex(e => ell.program == e.id)
          var ExpireData = moment(String('8/2/2022'),'M-D-YYYY');
          var RealDate = moment(new Date().toLocaleDateString(),'M-D-YYYY');
          var diffDays = ExpireData.diff(RealDate, 'days');
          state.programs_stats[program].keys = ++state.programs_stats[program].keys
          if(diffDays < 0) {
            state.programs_stats[program].expires = state.programs_stats[program].expires + 1
          } else {
            console.log(diffDays,true)
            state.programs_stats[program].valids = state.programs_stats[program].valids + 1
          }
       })
    }
  },
  actions: {
    login(context,pay) {
      axios.post('/auth/login',{username:pay.name,password:pay.pass}).then((res) => {
        context.commit('alert',{type:'success',text:res.data.message})
        context.commit('changeToLogin',res.data.access_token)
        router.push('/')
      }).catch(err => {
        if(err.response.status == 401){
          context.commit('alert',{type:'error',text:err.response.data.message})
        }
      })
    },
    createProgram(context,pay) {
      axios.post('/programs/create',{program:pay.name,price:pay.price,version:pay.version,url:pay.url}).then((res) => {
        context.commit('alert',{type:'success',text:'Created Successfully'})
        router.push('/programs')
      }).catch(err => {
          context.commit('alert',{type:'error',text:err.response.data.message})
      })
    },
    async stopKey(context,pay){
      context.state.btnload = true
      await axios.post('/activates/stop_key',{active_request:pay}).then((res) => {
        context.commit('alert',{type:'success',text:'Stoped Successfully'})
        context.state.btnload = false
      }).catch(err => {
          context.commit('alert',{type:'error',text:err.response.data.message})
      })
    },
    async reActive(context,pay){
      context.state.btnload = true
      await axios.post('/activates/reactivate',{active_request:pay.req,expire:pay.expire}).then((res) => {
        context.commit('alert',{type:'success',text:'Expire Date Updated Successfully'})
        context.state.btnload = false
      }).catch(err => {
          context.commit('alert',{type:'error',text:err.response.data.message})
      })
    },
    async newActivate(context,pay) {
      context.state.btnload = true
      await axios.post('/activates/confirm',{active_request:pay.req,expire:pay.expire}).then((res) => {
        context.commit('alert',{type:'success',text:'Created Successfully'})
        context.state.btnload = false
        context.state.step = 2
        context.state.infoKey = res.data.data
        context.state.infoKey.pass = res.data.pass
        context.state.textCopy = "user: " + context.state.infoKey.user + '\nPass: ' + context.state.infoKey.pass + '\nProgram: ' + context.state.infoKey.program + '\nExpire: ' + context.state.infoKey.expire + '\nMac Address: ' + context.state.infoKey.mac
      }).catch(err => {
          context.commit('alert',{type:'error',text:err.response.data.message})
      })
    },
    getPrograms(context) {
      axios.get('/programs/all').then((res) => {
        context.commit('appendPrograms',res.data.data)
      })
    },
    testKey(context,pay) {
      axios.post('/activates/test',{active_request:pay}).then((res) => {
        context.commit('alert',{type:'success',text:'Created Test Activate Successfully'})
        router.push('/activates')
      }).catch(err => {
          context.commit('alert',{type:'error',text:err.response.data.message})
      })
    },
    async getProgramsStat(context) {
      await axios.get('/programs/all').then((res) => {
        context.commit('appendStats',res.data)
        context.state.load = false

      })
    },
    async getKeys(context) {
      await axios.get('/activates/all').then((res) => {
        context.commit('appendKeys',res.data.data)
        context.state.load = false
      })
    },
    async getUpdates(context) {
      await axios.get('/updates/all').then((res) => {
        context.commit('appendUpdates',res.data.data)
        context.state.load = false
      })
    },
    async getWaiting(context) {
      await axios.get('/activates/waiting').then((res) => {
        context.commit('appendWaiting',res.data.data)
        context.state.load = false
      })
    },
    newUpdate(context,pay) {
      axios.post('/updates/create',{program:pay.program,version:pay.version,urgent:pay.urgent}).then((res) => {
        context.commit('alert',{type:'success',text:'Created Successfully'})
        router.push('/updates')
      }).catch(err => {
          context.commit('alert',{type:'error',text:err.response.data.message})
      })
    },
    deleteProg(context,id) {
      axios.delete('/programs/delete/' + id).then((res) => {
        context.commit('alert',{type:'success',text:'Delted Successfully'})
        context.state.programs_stats.splice(context.state.programs_stats.findIndex(function(i){
          return i.id === id;
      }), 1);
      }).catch(err => {
          context.commit('alert',{type:'error',text:err.response.data.message})
      })
    },
    deleteKey(context,pay) {
      axios.delete('/keys/delete',{data:{KeyStr:pay.keys}}).then((res) => {
      })
    },
    deleteUpdate(context,pay) {
      axios.delete('/updates/delete/' + pay).then((res) => {
        context.commit('alert',{type:'success',text:'Delted Successfully'})
        context.state.updates.splice(context.state.updates.findIndex(function(i){
          return i.id === pay;
      }), 1);
      }).catch(err => {
          context.commit('alert',{type:'error',text:err.response.data.message})
      })
    },
    editProg(context,pay) {
      axios.put('/programs/edit',{name:pay.prog,price:pay.price}).then((res) => {
        console.log(res.data)
      })
    },
  },
  modules: {
  }
})
