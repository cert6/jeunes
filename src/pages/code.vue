<template>
    <div>
        <div class="uk-card uk-card-large uk-card-default uk-card-body">
            <h5 class="uk-h4">
                CODE DE VERIFICATION
            </h5>
<br>
<p><input style="letter-spacing:3px;text-align:center;border-bottom:1px solid grey" v-model="code" type="text" placeholder="Ex: 034066"></p>
<br>
  <p>
      Code de validation 6 chiffres
  </p>
        </div>
        <div class="ui segment basic">

             <f7-button @click.prevent="confirmer" fill color="orange">
                Valider
            </f7-button> <br>
            <f7-button @click.prevent="resend" :class="{'disabled':!timeout}" fill color="green">
                Renvoyé le code
            </f7-button>

        <div uk-alert>
            <p style="font-size:13px">
                Le code expire dans 5 min .
            </p>
        </div>
<h1>&nbsp;</h1>
<h1>&nbsp;</h1>
        <div class="uk-position-bottom">
               <v-btn @click="backTo" fab color="green" small dark>
                   <v-icon>undo</v-icon>
               </v-btn>

        </div>
        </div>
    </div>
</template>


<script>

export default {
    mounted(){
      if(this.$cookie.get('code')==undefined || this.$cookie.get('code')==null){
        this.resend()
      }
   
       setTimeout(()=>{
           this.timeout=true
       },60000*5)
    },
    data() {
        return {
            timeout:false,
            showKeyboard: true,
            code:''
        }
    },
    watch:{
        code(e){
            
            if(this.$cookie.get('code')!==undefined){
                if(e==this.$cookie.get('code')){
                    this.$apollo.mutate({
                        mutation:require('../graphql/active.graphql'),
                        variables:{
                            active:true,
                            id:this.$store.state.session.user.id
                        }
                    }).then(e=>{
                        console.log(e)
                          e=e.data.updateJeune.jeune
                           this.$store.commit('start_session',e)
                         this.$store.commit('active_user',true)
                         this.$router.replace('/web')
                    })

                   
                    
                } else {
                   // this.$Message.error('Code incorrect')
                }

            } else {
                this.timeout=true
            }
        }
    },

    methods:{
        backTo(){
            this.$store.commit('stop_session')
            this.$vs.loading({background:'#fff',color:'#11998e',type:'default'})
setTimeout(() => {
    this.$router.replace('/')
     this.$vs.loading.close()
}, 1000);
        },

        resend(){
             this.$vs.loading({background:'#fff',color:'#11998e',type:'default'})
            this.$cookie.set('code',this.$rand.generateDigits(6),{ expires: '10m'})
   curli({
    name:'JeunesCI',
    to : this.$store.state.session.user.email,
    from : "nulls@mail.com",
    subject : "Confirmation de compte ",
    content : `
    <div>
    <p>
   <h3> Hello !  <b style="color:green">${this.$store.state.session.user.nom}</b></h3>
    </p>
    
    <p>Votre code de confirmation est : ${this.$cookie.get('code')}</p>
    <div>
  &copy;  <a href='https://www.jeunes.ci'>www.jeunes.ci</a>
  <p>
  <img style="width:50%" src="https://jeunes.ci/sites/default/files/revslider/image/banie%CC%80rre-jeunes.jpg">
  </p>
    </div>
    </div>
    `
}).then(message => {
    console.log(message)
      
      this.timeout=false
      setTimeout(()=>{
        this.$vs.loading.close()
         this.$router.replace('/code')
      },1500)
          
  }
).catch(()=>{
   this.$vs.loading.close()
      this.$Message.info('Réessayer plutard')
});
        },
        confirmer(){
           
            if(this.$cookie.get('code')!==undefined){
                if(this.$cookie.get('code')==!this.code) return this.$Message.error('Code incorrect')
                 this.$vs.loading({background:'#fff',color:'#11998e',type:'default'})
                if(this.code==this.$cookie.get('code')){
                    this.$apollo.mutate({
                        mutation:require('../graphql/active.graphql'),
                        variables:{
                            active:true,
                            id:this.$store.state.session.user.id
                        }
                    }).then(e=>{
                          console.log(e)
                         this.$store.commit('active_user',true)
                         this.$vs.loading.close()
                         this.$router.replace('/web')
                    })

                   
                    
                }

            } else {
                this.timeout=true
            }
        }
    }
    
}
</script>