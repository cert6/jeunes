<template>
  <div>
     <transition
    name="custom-classes-transition"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
   
  >
    <router-view/>
     </transition>
  </div>
</template>
