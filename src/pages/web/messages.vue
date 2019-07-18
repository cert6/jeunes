<template>
  <section>
  
    <div class="align-left aniamted fadIn uk-card uk-card-large uk-card-default uk-card-body uk-position-cover">
      <div id="message">
       <f7-button color="green" fill>Messages</f7-button>

        <br>
        <div
          class=""
          v-if="Object.keys(notifications).length>0"
        >
          <div v-for="notification in notifications">
        
              <div class="align-left">
                <h5 style=";font-weight:600">{{notification.titre}}</h5> <br>
                <span style="font-weight:100">{{notification.contenu}}</span>
                <!-- card body -->
                <br>

                <span
                  style="font-size:10px;color:grey"
                >{{notification.updatedAt | moment("from", "now")}}</span>
              </div>
              <hr>
              <!-- card body -->
          
          </div>
        </div>
        <div v-else>
          <van-skeleton title :row="6" />

        </div>
      </div>
    </div>
    <h1>&nbsp;</h1>
  </section>
</template>


<script>
export default {
    layout:'goback',
  data() {
    return {
      notifications: {}
    };
  },
  
  apollo: {
    notifications: {
      query: require("../../graphql/notification.graphql"),

      update(data) {
       
        return data.notifications.reverse();
      }
    }
  },
  mounted() {
    this.$apollo.queries.notifications.refetch();
    this.$bus.on("notifications_sync", data => {
      this.$apollo.queries.notifications.refetch();
    });
  }
};
</script>

<style lang="scss" scoped>
#message {
  padding-top: 1%;
  font-family: "Raleway";
  font-weight: 600;
  font-size: 14px;
  position: relative;
}
</style>
