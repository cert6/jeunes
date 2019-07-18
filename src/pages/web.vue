<template>
    <div>
    <v-app>
        <router-view/>
    </v-app>
    
    </div>
</template>


<script>
import store from '../store'
export default {
  beforeRouteEnter (to, from, next) {
    console.log('Check session user in web')
    if(store.state.session.keep){
      if(store.state.session.active){
        next()
        return false
      } else {
        next('/code')
        return false
      }
    } else {
      next('/')
    }
    
  },
    mounted(){

     

    
       this.$store.commit('init_push')
       this.$on('online',()=>{ 
         this.$Message.success('Connection rétablie')
       })
       this.$on('offline',()=>{
         this.$router.push('/offline')
       })
    },
    beforeMount(){
         this.$socket.on("sync", model => {
      console.log(model);
      switch (model) {
        case "contenu":
          console.log("emit to contenu");
          this.$bus.emit("contenus_sync");
          break;
        case "info":
          this.$bus.emit("infos_sync");
          break;
          break;

        case "notification":
          this.pushnotification();
          this.$bus.emit("notifications_sync");
          break;
          break;

        default:
          break;
      }
    });
    },

    methods:{
      pushnotification(){
        

       

         fetch(this.$store.state.baseUrl+'notifications').then((e)=>{
    return e.json()
      }).then(e=>{
      var size=e.length
      var alert = e[length]
   if(size<this.$store.state.session.push) {
     return false
   } else {
      this.$store.commit('update_push',size)
   }
   
  this.$push.schedule({
  notifications: [
    {
      title: "Jeunes.ci "+alert.titre,
      body: alert.contenu,
      id: 1,
      schedule: { at: new Date(Date.now() + 1000 * 5) },
      sound: null,
      attachments: null,
      actionTypeId: "",
      extra: null
    }
  ]
});
      }).catch(err=>{
        console.log(err)
      })
   
      }
    }
    
    
}
</script>