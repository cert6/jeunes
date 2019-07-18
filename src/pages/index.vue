<template>
   <div>
     <div v-if="!isLoad">
          <div class="animated fadeInDown" v-if="!register">

              
           <div>
           <img style="width" src="/img/ban.jpg" alt="">
       </div>
       <div  class="ui segment basic">
         <p>  <input v-model="jeuneC.email" type="text" id="inputs" placeholder="Adresse E-mail"></p>
         <br>
           <p>  <input v-model="jeuneC.password" type="password" id="inputs" placeholder="Mot de passe"></p>
     <br>
     <f7-button @click="loginJeune" id="btn" fill>Se connecter</f7-button>
    <br>

    <div class="ui divider horizontal">SE CONNECTER VIA</div>

<v-btn @click="auth('facebook')" fab color="blue" dark small>
    <v-icon>mdi-facebook</v-icon>
</v-btn>
    <v-btn style="display:none" fab color="red" dark small>
    <v-icon>mdi-google</v-icon>
</v-btn>
    

    <f7-button @click="$router.push('/forget')" color="green">Mot de passe oublié ?</f7-button>
<br>
    <f7-button @click="register=true" id="btn_">
        Inscrivez-vous 
    </f7-button>
      </div>
      </div>

      <div v-else>

<div class="animated fadeInUp ui segment basic">
    <p class="align-right">
        <v-btn @click="register=false" fab color="green" small >
        <v-icon>close</v-icon>
        </v-btn>
    </p>
    <h2>
        <b>Creer un compte jeune</b>
    </h2>
    <br>
    <p>
        <input v-model="jeune.nom" id="inputs" type="text" placeholder="Nom Complet"> <br>
    </p>
     <p>
        <input  id="inputs" v-model="jeune.email"  type="text" placeholder="Adresse E-mail"> <br>
    </p>
     <p>
        <input  id="inputs" v-model="jeune.password" type="password" placeholder="Mot de passe">
    </p>

    <br>
    <f7-button @click="registerJeune" fill id="btn_">
        Je m'inscris
    </f7-button>
</div>

      </div>
     </div>

     <div v-else>

<div class="ui segment basic">
    <img style="width:144px" src="/img/cc/icon.ico" alt="">
    <br>
<p>
    Chargement en cours ...
</p>
</div>
            
     </div>
   </div>
</template>


<script>
import { setTimeout } from 'timers';
export default {
    autoStorage: ["listEmail","isLoad"],
    data(){
        return{
            count:0,
            isRegisterUser:false,
            isLoad:true,
            listEmail:[],
            jeuneC:{
                email:'',
                password:''
            },

            jeune:{
                nom :"",
                email:"",
                password:"",
                active:false,
                ville:"",
                pays:"",
                profession:""
            },
            register:false
        }
    },
    apollo:{
      
        listEmail:{
            query:require('../graphql/listEmail.graphql'),
            update(data) {
               return data.jeunes
            },
    watchLoading (isLoading, countModifier) {
        console.log(isLoading)
     this.isLoad=isLoading
    },

        }


    },

    mounted(){ 

this.$apollo.queries.listEmail.refetch()
        this.$apiget.on('authFacebook',data=>{
        
            console.log(data.uuid,this.$uuid)
            if(data.uuid==this.$uuid){
            this.$browser.close()
            this.$vs.loading({background:'#fff',color:'#11998e',type:'default'})
          
               var jeunes ={
                   nom:data.profile.first_name+data.profile.last_name,
                   email:data.profile.email,
                   auth:'facebook',
                   contact:'',
                   active:true
               }

            this.listEmail.forEach(element => {
                console.log(element,data.profile.email)
              if(element.email==data.profile.email){
               
                 this.isRegisterUser =true
               
              }
            });

console.log(this.isRegisterUser)

            if(this.isRegisterUser){
               this.$apollo.query({
                   query:require('../graphql/getuser.graphql'),
                   variables:{
                       email:data.profile.email
                   }
               }).then(e=>{
                   console.log(e)
                   e=e.data.jeunes[0]
                      this.$store.commit('start_session',e)
                      console.log('isLogeed')
                setTimeout(()=>{
                 this.$router.push('/web')
                  this.$vs.loading.close()
                },1500)
               })

               
            } else {
                    
            this.$apollo.mutate({
                mutation:require('../graphql/inscription.graphql'),
                variables:{
                    jeune: {
                        data:jeunes
                    }
                }
            }).then(e=>{

                e=e.data.createJeune.jeune
                this.$store.commit('start_session',e)
                this.$router.push('/web')
                this.$vs.loading.close()
            }).catch(err=>{
                console.log(err)
                this.$vs.loading.close()
                this.$Message.error(`Error réessayer plutard`)
            })
            }

        
            }

            this.count=0
        })


    },

    methods:{

    auth(provider){
                this.$browser.open({
                url:"https://cert6.services/auth?method=facebook&uuid="+this.$uuid})
        },

        loginJeune(){

            if(this.jeuneC.email=="" || this.jeuneC.password=="") return false
               this.$vs.loading({background:'#fff',color:'#11998e',type:'default'})
            this.$apollo.query({
                query:require('../graphql/connect.graphql'),
                variables:{
                    email:this.jeuneC.email,
                    password:this.jeuneC.password
                }
            }).then((e)=>{

             e=e.data.jeunes
            if(e.length<1){
                this.$Message.error('Adresse email ou mot de passe incorrect')
            }  else {
               this.$store.commit('start_session',e[0])
               this.$router.push('/web')
                  this.$vs.loading.close()
            }
   this.$vs.loading.close()
            }).catch(err=>{
                   this.$vs.loading.close()
                this.$Message.error('Service indisponible')
            })

        },
        registerJeune(){

            if(this.jeune.nom=="" || this.email=="" || this.password =="") return this.$Message.error('Veuillez remplir les champs')
             this.$vs.loading({background:'#fff',color:'#11998e',type:'default'})
            this.$apollo.mutate({
                mutation:require('../graphql/inscription.graphql'),
                variables:{
                        jeune:{
                            data:this.jeune
                        }
                    
                }
            }).then(e=>{
                console.log(e.data.createJeune.jeune)
                e=e.data.createJeune.jeune
                  this.$store.commit('start_session',e)
                      this.$cookie.set('code',this.$rand.generateDigits(6),{ expires: '10m'})
   curli({
    name:'JeunesCI',
    to : e.email,
    from : "noreply@jeunes.ci",
    subject : "Confirmation de compte ",
    content : `
    <div>
    <p>
   <h3> Hello !  <b style="color:green">${e.nom}</b></h3>
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
      this.$router.push('/code')
      this.timeout=false
      setTimeout(()=>{
        
       
         
          this.$vs.loading.close()
      },1500)
          
  }
).catch(()=>{
   this.$vs.loading.close()
      this.$Message.info('Réessayer plutard')
});
                 this.$vs.loading.close()

            }).catch(err=>{
                console.log(err)

                 this.$vs.loading.close()
            })
        }
    }
}
</script>