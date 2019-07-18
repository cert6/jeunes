<template>
<div>
 <div style="font-size:16px">
        <v-expansion-panel dark focusable>
    <v-expansion-panel-content
    >
      <template v-slot:header>
        <div >
    
            Mon compte</div>
      </template>
       <template v-slot:actions>
        <v-icon color="white">mdi-account-outline</v-icon>
      </template>
 <f7-page-content>
     <f7-block-title style="color:white">Informations personnelles</f7-block-title>
       <f7-list>
  <f7-list-item @click="$router.push('/web/coordonnees')" title="Coordonnées" link="#"></f7-list-item>
  <f7-list-item @click="$router.push('/web/password')" title="Mot de passe" link="#"></f7-list-item>

</f7-list>
 </f7-page-content>
    </v-expansion-panel-content>
     <v-expansion-panel-content
    >
      <template v-slot:header>
        <div>
    
            Parametre</div>
      </template>
       <template v-slot:actions>
        <v-icon color="white">mdi-settings</v-icon>
      </template>
      <f7-page-content>
     <f7-block-title style="color:white"></f7-block-title>
 <f7-list>
    <f7-list-item style="display:none" @click="$router.push('/web/notification')"  title="Notification" link="#"></f7-list-item>
    <f7-list-item style="display:none" @click="$router.push('/web/aide')"  title="Aide/Assisatnce" link="#"></f7-list-item>
    <f7-list-item  @click="$router.push('/web/cgu')" title="CGU /Mentions " link="#"></f7-list-item>
    <f7-list-item @click="$router.push('/web/version')" title="Version 1.0.1" link="#"></f7-list-item>
 

</f7-list>
 </f7-page-content>
    </v-expansion-panel-content>
     <v-expansion-panel-content 
    >
      <template  v-slot:header>
        <div @click="logOut" >
   
            Se déconnecter</div>
      </template>
      <template @click="logOut" v-slot:actions>
        <v-icon color="white">mdi-power</v-icon>
      </template>

    </v-expansion-panel-content>
  </v-expansion-panel>

  <div class="ui segment basic">
    <div class="ui divider horizontal">Nous suivre</div>
    <div class="align-left">
   <v-btn @click="$browser.open({ url: 'https://facebook.com/jeunesciv' })" icon color="blue" dark>
       <v-icon>mdi-facebook</v-icon>
   </v-btn>

    <v-btn @click="$browser.open({ url: 'https://instagram.com/jeunesciv' })" icon color="black" dark>
       <v-icon>mdi-instagram</v-icon>
   </v-btn>
     <v-btn @click="$browser.open({ url: 'https://twitter.com/jeunesciv' })" icon color="blue">
       <v-icon>mdi-twitter</v-icon>
   </v-btn>
    </div>
  </div>
 </div>
</div>
</template>


<script>
import { setTimeout } from 'timers';
export default {
    

    methods:{
      logOut(){
        this.$store.commit('stop_session')
         this.$vs.loading({background:'#ffffff',color:'#11998e',type:'point'})
         setTimeout(()=>{
          
           this.$router.replace('/')
            setTimeout(()=>{
              this.$vs.loading.close()
            },2000)
           //this.$Message.success('Vous êtes bien déconnecté')

         },2000)
      }
    }
}
</script>