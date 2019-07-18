

router.beforeEach((to,from,next)=>{
    console.log(store.state.session.keep)
      if(to.fullPath.match(/(web)/)){ // if naviguate to web
        if(store.state.session.keep){ // if login true----------
              if(store.state.session.active){ // if user is active---------------
               next()
               } else {
                 next('/code')        
               }
        } else {
          next('/')
        }
      } else { // if naviguate outside Web
    if(store.state.session.active){
     
      next('/web')
    } else {
      next()
    }
      }
    })