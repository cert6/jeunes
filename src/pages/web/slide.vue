<template>
  <f7-page style="background:black">
     <f7-page-content>
        <div v-if="contenus!==undefined && contenus!==null">
             <div  v-touch:tap="direction"
      v-touch:swipe.right="prev"
      v-touch:swipe.left="next" id="slide" v-if="contenus!==undefined && contenus!==null && Object.keys(contenus).length>0">
          <hooper v-if="!loading && contenus[0].infos!==undefined"   ref="hooper" style="height:100vh">
          <slide   :key="info.id" v-for="info in contenus[0].infos">
              <div style="height:100vh;width:100%" :class="{'default':info.media!==null && info.media==!undefined}" class="uk-background-cover uk-position-relative" :data-src="$store.state.baseUrlFile+info.media.hash+info.media.ext" uk-img>

<v-toolbar  dark color="black">

<v-btn @click="shareInfo(contenus[0].partage)" small  dark fab  color="green"><v-icon>share</v-icon></v-btn>
<VSpacer/>
 <div style="font-size:calc(1.3vw + 2.4vw)">
     &nbsp; {{contenus[0].titre}}
 </div>
</v-toolbar>

<div style="padding:3%" class="uk-position-center">
      <section  id="description"  v-html="info.description"></section>
</div>

              </div>

          </slide>
           <hooper-pagination slot="hooper-addons"></hooper-pagination>
      </hooper>
     </div>
        </div>

        <div v-if="loading">
<div class="uk-position-center">
    <van-loading color="green" />
</div>
        </div>
        <div 
        style="width:100%;position:fixed;bottom:4%;text-align:center"
        @click="$router.back()"
        id="back"
      >
        <div class="align-center">
          <Icon size="45" color="white" type="ios-close-circle"/>
        </div>
      </div>
     </f7-page-content>
     
  </f7-page>
</template>


<script>
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      size:{
        fontSize:'1px'
      },
      show:false,
      loading:true,
      actions: [
        { name: 'Partager' },
        
      
        
      ],
      i:1,
      video: true,
      contenus: {},
      showCarousel: false,
      type: null,
      start: null,
      limit: 1,
      count: 0
    };
  },
  methods: {

shareInfo(e){

      this.$Message.info("Partager ");
      this.$share.share({
        title: "JeuneCI",
        text: "--Information--",
        url: e,
        dialogTitle: "Partager l'article"
      });
},
    onSelect(e,index){
    
        this.$Message.info("Partager ");
      this.$share.share({
        title: "JeuneCI",
        text: "--Information--",
        url: e,
        dialogTitle: "Partager l'article"
      });
      
      this.show=false
    },
    onCancel(e){
this.$browser.open({ url: e })

    },
    direction(e) {
    console.log(e.changedTouches[0].clientY)
      const screenX = window.innerWidth / 2;
      const touchX = e.changedTouches[0].clientX;
      if(e.changedTouches[0].clientY <65 )return false
      if (touchX > screenX) {
        console.log("Touched right");
        this.$refs.hooper.slideNext();
        if(this.i<this.contenus[0].infos.length) this.i++
      } else {
        this.$refs.hooper.slidePrev();
        if(this.i>1) this.i--
        console.log("Touched Left");
      }
    },
   
    change(e) {},
    pauses(e) {
      if (this.video) {
        e.target.pause();
      } else {
        e.target.play();
      }
      this.video = !this.video;
    },

    next() {
      if (this.start < this.count - 1) {
       
        this.start++;
        this.i=1
        this.$refs.hooper.slideTo(0)
      }
    },
    prev() {
      if (this.start > 0) {

         this.i=1
       
        this.start--;
        this.$refs.hooper.slideTo(0)
      }
    }
  },

  beforeMount() {
    let type = this.$route.query.ref;
    console.log(type);
    this.start = parseInt(this.$route.query.start);
    this.type = this.$route.query.ref;
    this.count = this.$route.query.count;
  },
  beforeDestroy() {
    this.$off();
  },
  mounted() {
    this.$on();
   
  },
  apollo: {
    contenus: {
      query: require("../../graphql/contenu.graphql"),
      variables() {
        return {
          start: this.start,
          limit: 1,
          type: this.type || ""
        };
      },
       result({ data, loading }) {
               this.loading=true

        if (!loading) {
     setTimeout(()=>{
          this.loading=false
     },1000)
        }
      },
      update(data) {
       
        return data.contenus;
      }
    }
  }
};
</script>


<style lang="scss" scoped>
#description {
font-size:100px;
  padding: 02% 3%;
  width: 100%;
  color: white;
}
#slide{
   
}

#slide .default{
    background:black;

}


#description h1,h2,h3,h4,h5{
  color:white;
  display:none;

}
</style>
