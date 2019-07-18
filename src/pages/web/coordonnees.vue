<template>
    <div class="ui align-center">
         <f7-page>
        <v-toolbar small  flat>
            <v-toolbar-title>
                <v-btn @click="$router.go(-1)" fab dark color="#8cc656" small icon >
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar-title>
        </v-toolbar>
       
<div class="uk-card uk-card-body">
    <h4 class="uk-card-title">
        <v-icon size="60" color="#8cc656">mdi-account-circle</v-icon>
    </h4>
    <br>
<h4>{{$store.state.session.user.nom}}</h4>
<br>
<div class="ui divider horizontal">PROFESSION</div>
<p class="uk-text-uppercase">
    {{$store.state.session.user.profession}}
</p>
<div class="ui divider horizontal">Adresse E-mail</div>
<p class="uk-text-lowercase">
    {{$store.state.session.user.email}}
</p>

<div class="ui divider horizontal">CONTACT/ TELEPHONE</div>
<p class="uk-text-uppercase">
    {{$store.state.session.user.contact}}
</p>

<div class="ui divider horizontal">PAYS</div>
<p class="uk-text-uppercase">
    {{$store.state.session.user.pays}}
</p>

<div class="ui divider horizontal">VILLE</div>
<p class="uk-text-uppercase">
    {{$store.state.session.user.ville}}
</p>
<br>

<div class="uk-card uk-card-large uk-card-default uk-card-body">
    <h3 class="uk-h4">
    Changer vos coordonnées
    </h3>
    <p>
        <input v-model="contact" type="text" placeholder="CONATCT/ TELEPHONE">
    </p>
      <p>
        <input v-model="profession" type="text" placeholder="PROFESSION">
    </p>

    <br>
    <v-btn @click="updateUser" dark round color="#11998e" fill>
     <v-icon>save</v-icon> &nbsp; sauvegarder
    </v-btn>
</div>



</div>
 <h1>&nbsp;</h1>
        </f7-page>
       
    </div>
</template>


<script>
export default {
    data(){
        return{
            contact:this.$store.state.session.user.contact,
            profession:this.$store.state.session.user.profession

        }
    },
    methods:{
        updateUser(){
           if(this.contact=="" || this.profession=="") return false
            this.$vs.loading({background:'#fff',color:'#11998e',type:'default'})
           this.$apollo.mutate({
                mutation:require('../../graphql/updateUser.graphql'),
                variables:{
                    id:this.$store.state.session.user.id,
                    contact:this.contact,
                    profession:this.profession
                }
            }).then(e=>{
                 this.$vs.loading.close()
                e=e.data.updateJeune.jeune
                 this.$store.commit('start_session',e)
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

div p{
    color: #11998e;
    font-family:'Raleway',sans-serif;
}
</style>
