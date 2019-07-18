<template>
    <div>
        <div class="ui segment basic">
<div class="ui divider horizontal">
                MENTIONS LEGALES
</div>

<p>
    {{applications.mentions}}
</p>

            <div class="ui divider horizontal">
                CGU


            </div>

            <f7-button  @click="$browser.open({ url: 'https://jeunes.ci/cgu' })" outline color="green">
                CONSULTER NOS CGU</f7-button>


        </div>


    </div>
</template>


<script>
export default {
    layout:'goback',
    data() {
        return {
            applications:{}
        }
    },

    apollo:{
        applications:{
        query:require('../../graphql/application.graphql'),
        update(data){
            console.log(data.applications[0])
            return data.applications[0]
        }
        }
    }
}
</script>