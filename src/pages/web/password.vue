<template>
    <div>
        <div class="uk-card uk-card-large uk-card-default uk-card-body">
            <h3 class="uk-h3">
              Modifier mon  mot de passe
            </h3>
  <p>
        <input v-model="original" type="password" placeholder="ANCIEN MOT DE PASSE">
    </p>
      <p>
        <input v-model="password" type="password" placeholder="NOUVEAU MOT PASSE">
    </p>

 <p>
        <input v-model="password_tmp" type="password" placeholder="CONFIRMER MOT DE PASSE">
    </p>

    <br>
    <v-btn @click="updateUser" dark round color="#11998e" fill>
     <v-icon>save</v-icon> &nbsp; valider
    </v-btn>

        </div>
    </div>
</template>


<script>
export default {
    layout:'goback',
    data(){
        return{
            original:'',
            password:'',
            password_tmp:''

        }
    },
    methods:{
        updateUser(){
           if(this.original=="" || this.password=="" || this.password_tmp=="") {
               this.$Message.error('Renseigner les champs')
               return false
           }
           if(this.password_tmp !==this.password) {
               this.$Message.error('Erreur dans les nouveaux mots de passes') 
               return false
           }
           if(this.$store.state.session.user.password!==this.original){
               this.$Message.error(`Erreur dans l'ancien mot de passe`)
               return false
           }
            this.$vs.loading({background:'#fff',color:'#11998e',type:'default'})
            console.log('My new password',this.password_tmp)
           this.$apollo.mutate({
                mutation:require('../../graphql/updatePassword.graphql'),
                variables:{
                    id:this.$store.state.session.user.id,
                    password:this.password_tmp,
                   
                }
            }).then(e=>{
                 this.$vs.loading.close()
                
                 var l=e.data.updateJeune.jeune
                   console.log('drown',l)
                 this.$store.commit('start_session',l)
                this.$Message.success('Coordonnées à jour')
                this.contact=""
                this.profession=""
            }).catch((err)=>{
                this.$vs.loading.close()
this.$Message.error('Service indisponible')
            })


        }
    }
}
</script>


<style scoped>
input{
    padding:3%;
    text-align: center;
    border-bottom: 2px solid #11998e;
}
</style>
