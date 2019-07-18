<template>
    <div>
       
            <div v-if="!success" class="ui segment basic">
              <div class="animated fadeInDown" v-if="!reset">
                    <div class="uk-h3 uk-text-secondary">Réinitialisation mot de passe </div>
                <p>
                    <input v-model="$v.email.$model" style="text-align:center" type="text" id="inputs" placeholder="Entrer votre Adresse E-mail">
                </p>
                <br>
                <f7-button @click="sendCode" outline color="green">
                    Envoyer la demande
                </f7-button>
                
                <div v-if="$v.email.$error && email!==''" class="uk-alert-danger" uk-alert>
                 Adresse E-mail invalide
                    <p></p>
                </div>
              </div>

              <div v-else class="animated fadeInUp">
                  <p>
                      <input maxlength="6" v-model.trim="password"  style="text-align:center" id="inputs" type="password" placeholder="Nouveau mot de passe">
                  </p> <br>
                   <p>
                      <input maxlength="6" v-model.trim="password_tmp" style="text-align:center" id="inputs" type="password" placeholder="Confirmation mot de passe">
                  </p>
                  <br>
                  <p class="align-left">
                      <label for="">Code de rénitialisation </label>
                      <br>
                       <input v-model="code" maxlength="6" style="letter-spacing:3px;text-align:center" id="inputs" type="text" placeholder="_ _ _ _ _ _">
                
                  </p>
                  <br>
                  <f7-button @click="changePass" fill id="btn">
                      Confirmer
                  </f7-button>
                  <br>
                  <f7-button @click="reset=false" fill id="btn_">
                      Renvoyer le code
                  </f7-button>
              </div>
            </div>

            <div v-else>
<div class="ui segment basic">
   <v-icon>check</v-icon>
    <p>
        Votre mot de passe à été rénitialisé.
    </p>

    <br>
    <f7-button id="btn" color="green" @click="$router.push('/')">
   Page de connexion
    </f7-button>
</div>
            </div>
    </div>
</template>
<script>
import { required, minLength,email, between } from 'vuelidate/lib/validators'
export default {
    layout:'goback',
    mounted(){
         this.$apollo.query({
                query:require('../graphql/Users.graphql')
            }).then(e=>{
                this.array=e.data.jeunes
            })
    },
    data(){
        return{
            UserID:{},
            array:{},
            success:false,
            reset:false,
            email:'',
            password:'',
            code:'',
            password_tmp:''
        }
    },
    validations:{
        email:{
            email,
            required
        }
    },
    methods:{
        getUser(){
            this.$apollo.query({
                query:require('../graphql/Users.graphql')
            })

        },

        changePass(){

            if(this.password_tmp =="" || this.password==""){
                this.$Message.error('Renseigner les champs correctement ')
                return false
            }

            if(this.password_tmp !== this.password){
                this.$Message.error('Erreur dans les mots de passes')
                return false

            }

             if(this.password_tmp.length<6 || this.password.length<6){
                this.$Message.error(`Mot de passe 6 caractères minimum`)
                return false

            }


              if(this.code !== this.$cookie.get('CODE_RESET')){
                this.$Message.error('Code de rénitialisation incorrect')
                return false

            }

this.$vs.loading({background:'#fff',color:'#11998e',type:'default'})
this.$apollo.mutate({
                mutation:require('../graphql/changePassword.graphql'),
                variables:{
                    id:this.UserID[0].id,
                    password:this.password_tmp,
                   
                }
            }).then(e=>{
                 this.$vs.loading.close()
                
                 this.success=true
                
            }).catch((err)=>{
                this.$vs.loading.close()
this.$Message.error('Service indisponible')
            })
        },
        sendCode(){

            if(this.email=="") return false

        this.UserID =this.array.filter(e=>e.email.toLowerCase().includes(this.email))
    console.log('ID USER ID',this.UserID[0].id)
    if(this.UserID.length<1) return this.$Message.error('Adresse E-mail inconnue')
    this.$vs.loading({background:'#fff',color:'#11998e',type:'default'})
             this.$cookie.set('CODE_RESET',this.$rand.generateDigits(6),{ expires: '10m'})
             var mailOptions={
                 name:'Jeune CI',
                 from:'noreply@jeunes.ci',
                 to:this.email,
                 subject:'Code rénitialisation mot de passe',
                 content:`<div>
                 <p>
                 Votre de code de rénitialisation est : <b>${ this.$cookie.get('CODE_RESET')}</b>
                 </p>
                 </div>`
             }

             curli(mailOptions,0).then(res=>{
                this.$vs.loading.close()
                 this.reset=true
             }).catch(err=>{
                 this.$vs.loading.close()
                 this.$Message.error('Service indisponible')

             })

        }
    }
}
</script>
