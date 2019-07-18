<template>
    <v-app>
      <div id="nav">

            <v-toolbar  fixed color="fax" flat>
           
            <v-toolbar-side-icon @click="$refs.menu.open()"></v-toolbar-side-icon>
            <VSpacer/>
  
   <van-search
    v-model="search"
    @keyup.enter="onSearch"
  placeholder="Recherchez..."
  shape="round"
    @cancel="onCancel"
    clear>
  <div  slot="action" @click="onCancel">
<v-btn v-if="search!==''" icon>
    <Icon size="25" type="ios-close-circle" />
</v-btn>
  </div>
   </van-search>
      
            </v-toolbar>

        <f7-page style="overflow:hidden">
             
            <router-view/>
            
        </f7-page>
<van-tabbar active-color="#11998e" v-model="active">
  <van-tabbar-item  @click="$router.replace('/web')" icon="home-o"></van-tabbar-item>
  <van-tabbar-item  @click="updatePush" icon="envelop-o" :info="$store.state.session.push"></van-tabbar-item>

  <van-tabbar-item @click="$router.push('/web/coordonnees')" icon="user-o"></van-tabbar-item>
</van-tabbar>
    
<va-aside v-touch:swipe.left="closeMenu"  style="border-radius:0%;border:0" ref="menu">
  <div >
      <div class="align-right">
       <v-toolbar   extended color="white">
        
               <img style="width:60%" src="/img/logo/jeune.png" alt="">
          
           <VSpacer/>
            <v-btn @click="$refs.menu.close()" fab dark color="#8cc656" small>
                <v-icon >mdi-close</v-icon>
            </v-btn>
            
            
       </v-toolbar>
      
      </div>
      
    <div>
        <menu-item/>
    </div>
     
  </div>
  
</va-aside>
      </div>
    </v-app>
</template>


<script>
import menuItem from './menu'
export default {
    components:{menuItem},
    data(){
        
        return{
            active:0,
            search:"",
        }
    },
    watch:{

      search(e){
        this.onSearch()
      }

    },
    methods:{
      closeMenu(){
        this.$refs.menu.close()
      },
      updatePush(){
       
        this.$router.push('/web/messages')
         this.$store.commit('init_push')
      },
        onCancel(){

        },
        onSearch(){
            this.$bus.emit('onSearch',this.search)
        }
    }
}
</script>

<style lang="css" scoped>
#nav input{
  display: none;
}
</style>
