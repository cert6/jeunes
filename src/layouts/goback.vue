<template>
    <div>
        <v-toolbar flat>
            <v-toolbar-title>
                <v-btn @click="$router.go(-1)" fab dark color="#8cc656" small icon >
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar-title>
        </v-toolbar>
          <transition
    name="custom-classes-transition"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
   
  >
        <router-view></router-view>
          </transition>
    </div>
</template>
