<template>

    <v-content>
        <categorie/>
     <div> 
      <contenu/>
      </div>
    </v-content>
    
</template>

<script>
import categorie from './categorie'
import contenu from './contenu'
export default {
    components:{categorie,contenu},
layout:'nav'
    
    
}
</script>