<template>
    <div>
        <div class="align-center ui segment basic">
            <h2>&nbsp;</h2>

            <img style="width:20%"  src="/img/logo/net.svg" alt="">
            <br>
           <p>
              Oops !  connexion indisponible
           </p>
<br>
           <br>
           <v-btn @click="$router.go(-1)" dark icon fab color="green">
               <v-icon>undo</v-icon>
           </v-btn>
        </div>

    </div>
</template>

<script>
export default {
    
}
</script>