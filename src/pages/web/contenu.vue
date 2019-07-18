<template>
    <div class="align-left ui ">
    <div v-if="loading">

   <div class="align-center ui segment basic">
           
         <i class="ui icon sync loading"></i>  Chargement ... <br>
        <van-skeleton
  title
  avatar
  :row="5"
  :loading="loading"
>
  <div></div>
</van-skeleton>
   </div>

    </div>
    <div v-else>
 <div  style="margin:0% 4%"><b style="font-size:16px"> Pour vous</b></div>
 <div v-if="contenus !==undefined && contenus!==null && Object.keys(contenus).length>0" class="align-center">
     <css-grid  style="padding:1.3%;"  :columns="columns" uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 100;repeat: true">
  <css-grid-item  :key="contenu.id"
            v-for="(contenu,i) in contenus"  id="item"  style="margin:3.5%" >
   <div  class="animated fadeIn"  @click="$router.push({path:'/web/slide',query:{start:i,ref:type,count:contenus.length}})" > 
          <div id="opacity" style="height:40vh;border-radius:3.5%;z-index:211" class="uk-overflow-hidden uk-background-cover"  :data-src="$store.state.baseUrlFile+contenu.media.hash+contenu.media.ext " uk-img>
<div   class=" uk-overflow-hidden  uk-flex uk-flex-left uk-flex-middle  ">
<div  style="position:relative;margin:0% 2%;font-size: calc(3vw + 2vw);" class="uk-position-bottom-left">
    <div id="top-right" class="">
 <span class="title-desc">{{contenu.titre}}</span>
  <br>
                    <span
                      style="font-weight:bold;color:#grey;font-family:'Raleway',sans-sherif;text-align:left;font-size:10px"
                    >
                    <i style="position:relative;top:-3px" size="10" class="ui icon world"></i>
                      {{contenu.updatedAt | moment("from", "now")}}
                    </span>
 </div>

</div>
</div>
   </div>
      </div>
  </css-grid-item>
 
</css-grid>

 </div>

 <div v-if="contenus == undefined || contenus==null || Object.keys(contenus).length<1">
<div class="align-center ui segment basic">
   <p>
    <v-icon size="33">info</v-icon> <br>
        Aucun contenu trouvé
   </p> <br>
   <f7-button @click="initial" color="green" round outline >
      Retour
   </f7-button>
</div>
 </div>
    </div>
      
 <h1>&nbsp;</h1>
  <h1>&nbsp;</h1>
    </div>
</template>

<script>
export default {
    data(){
        return{
            columns: ['50%', '50%'],
            loading:true,
            contenus:{},
            type:"",
            titre:""

        }
    },
     apollo:{
         contenus:{
             query:require('../../graphql/contenu.graphql'),
              variables() {
        return {
          categorie: this.type,
          titre: this.titre
        };
      },
         update(data){
        data = data.contenus.reverse();

        console.log(data)

           var filter = data.filter(e => {

               console.log(this.titre.toLowerCase())
         return e.titre.toLowerCase().includes(this.titre.toLowerCase());
        });
            console.log(filter);

        return filter;
         },
          result({ data, loading }) {
               this.loading=false

        if (!loading) {
      this.loading=false
        }
      }
         }
     },


     mounted(){

       this.$bus.on('contenus_sync',()=>{ // Sync de contenue

       this.$apollo.queries.contenus.refetch()

       })
        this.$bus.on('infos_sync',()=>{
           this.$apollo.queries.contenus.refresh()
        })

         this.$bus.on('onSearch',value=>{   // Rechercher par input
            this.type=""
             this.loading=true
             this.titre=value
         })

          this.$bus.on('filter',value=>{  // recherche par categorie
          
              this.loading=true
             this.type=value
             if(value==""){
               this.loading=false
             }
         })
     },
     methods:{
         initial(){
             this.titre=""
             this.type=""
         }
     }


}
</script>

<style scoped>

#opacity::after{
    position: absolute;
    content:" ";
    left:0;
    height: 100%;
    color: white;
    z-index:1;
    background:rgba(0, 0, 0, 0.452);
    width:100%;
}

#opacity{
    
    position: relative;
    

}

#top-right{

color:white;
  text-align: left;
  font-family: "Fjalla One", sans-serif;
  position: relative;
  z-index: 777;
  bottom: 2%;
  left: 2.3%;
}
.title-desc {
  font-weight: bold;
  font-family: "Fjalla One", sans-serif;
  font-size: calc(3vw + 2vw);
}


#item{
    
    border-radius: 12px;
}
</style>


