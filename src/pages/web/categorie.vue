<template>
  <div>
      <h1>&nbsp;</h1>
    <div id="type" class="align-center ui segment basic">
      <hooper pagination="true" style="padding:1%;height:100%;outline:none" :itemsToShow="4">
        <slide style="width:40%">
          <div
            @click="$bus.emit('filter','')"
            id="slide"
            style="border-radius:6px;font-weight:bold;color:white;background:url('/img/cc/tout.png') no-repeat center;background-size:cover"
          >
            <div>
              <br>Tout
            </div>
          </div>
        </slide>

        <slide style="width:40%">
          <div
            id="slide"
            style="border-radius:6px;font-weight:bold;color:white;background:url('/img/cc/newss.png') no-repeat center;background-size:100% 100%;"
          >
            <div @click="$bus.emit('filter','actualites')">
              <br>Actualités
            </div>
          </div>
        </slide>
        <slide style="width:40%">
          <div
            id="slide"
            style="border-radius:6px;font-weight:bold;color:white;background:url('/img/cc/formation.png') no-repeat center;background-size:100% 100%"
          >
            <div @click="$bus.emit('filter','formations')">
              <br>Formations
            </div>
          </div>
        </slide>
        <slide style="width:45%">
          <div
            id="slide"
            style="border-radius:6px;font-weight:bold;color:white;background:url('/img/cc/job.png') no-repeat center;background-size:100% 100%;"
          >
            <div @click="$bus.emit('filter','entrepreneuriat')">
              <br>Entrepreneuriat
            </div>
          </div>
        </slide>
        <slide style="width:40%">
          <div
            id="slide"
            style="border-radius:6px;font-weight:bold;color:white;background:url('/img/cc/emploi.png') no-repeat center;background-size:100% 100%;"
          >
            <div @click="$bus.emit('filter','emplois')">
              <br>Emplois
            </div>
          </div>
        </slide>
        <slide style="width:40%">
          <div
            @click="$bus.emit('filter','bourses')"
            id="slide"
            style="border-radius:6px;font-weight:bold;color:white;background:url('/img/cc/bourses.png') no-repeat center;background-size:100% 100%;"
          >
            <div>
              <br>Bourses
            </div>
          </div>
        </slide>
        <slide style="width:40%">
          <div
            @click="$bus.emit('filter','evenements')"
            id="slide"
            style="border-radius:3px;font-weight:bold;color:white;background:url('/img/cc/agenda.png') no-repeat center;background-size:cover;"
          >
            <div>
              <br>Agenda
            </div>
          </div>
        </slide>
        <slide style="width:40%">
          <div
            id="slide"
            style="border-radius:6px;font-weight:bold;color:white;background:url('/img/cc/tv.png') no-repeat center;background-size:cover;"
          >
            <div @click="$bus.emit('filter','jtv')">
              <!-- <Icon size="40" type="ios-easel"/> -->
              <br>JTV
            </div>
          </div>
        </slide>
          <slide style="width:40%">
          <div
            id="slide"
            style="border-radius:6px;font-weight:bold;color:white;background:url('/img/cc/engagement.png') no-repeat center;background-size:cover;"
          >
            <div @click="$bus.emit('filter','engement_social')">
              <!-- <Icon size="40" type="ios-easel"/> -->
              <br>Engagement Social
            </div>
          </div>
        </slide>
        <slide style="width:40%">
          <div
            @click="$bus.emit('filter','sport')"
            id="slide"
            style="border-radius:6px;font-weight:bold;color:white;background:url('/img/cc/sport.png') no-repeat center;background-size:100% 100%;"
          >
            <div>
              <br>Sport
            </div>
          </div>
        </slide>
        <slide style="width:40%">
          <div
            id="slide"
            style="border-radius:6px;font-weight:bold;color:white;background:url('/img/cc/inter.png') no-repeat center;background-size:100% 100%;"
            @click="$bus.emit('filter','international')"
          >
            <div>
              <br>International
            </div>
          </div>
        </slide>
        <slide style="width:40%">
          <div
            id="slide"
            @click="$bus.emit('filter','culture')"
            style="border-radius:6px;font-weight:bold;color:white;background:url('/img/cc/culture.png') no-repeat center;background-size:100% 100%;"
          >
            <div>
              <br>Culture
            </div>
          </div>
        </slide>
        <slide style="width:40%">
          <div
            style="border-radius:6px;font-weight:bold;color:white;background:url('/img/cc/bu.jpg') no-repeat center;background-size:cover;"
            id="slide"
            @click="$bus.emit('filter','concours')"
          >
            <div>
              <br>Concours
            </div>
          </div>
        </slide>
        <slide>
          <div>&nbsp;</div>
        </slide>
        <slide>
          <div>&nbsp;</div>
        </slide>
        <slide>
          <div>&nbsp;</div>
        </slide>
        <slide>
          <div>&nbsp;&nbsp;</div>
        </slide>
         
      </hooper>
    </div>
  </div>
</template>

<script>
import 'hooper/dist/hooper.css';
import { Hooper, Slide } from 'hooper';
export default {
    components: {
      Hooper,
      'slide':Slide
    }
    
}
</script>
<style lang="css" scoped>
div span {
  font-weight: 200;
  position: relative;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  opacity: 0.9;
}

div span:hover {
  opacity: 1;
  color: #11998e;
}

#type {
  color: rgba(0, 0, 0, 0.767);
  font-size: calc(1vw + 1vw);
}
#slide >div{
    z-index:33;
    position: relative;
    font-size: calc(2vw + 3vw);
}

#slide:after{
    content:"  ";
    width:100%;
    left:0;
    height: 100%;
    position: absolute;
    top:0;
    background:rgba(0, 0, 0, 0.322);
    border-radius: 5%;
}


#slide {
    
  font-size: 16px;
  height: 90px;
  text-align: center;
  font-family: "Arial", sans-serif;
  margin: 3%;
  padding: 3%;
  position: relative;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);

  border-radius: 5%;
}
</style>


