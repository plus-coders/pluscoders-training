const App = {
  el: "#app",
  router: new VueRouter(),
  template: `<main>
          <header id="header">
              <h1>Icon</h1>
              <span class="dropdownMenu" v-if="loggedIn" :class="{ dropdownMenu__opened: active }">
                  <span class="dropdownMenu__link" @click="active = !active">
                      Hola {{ username }}
                      <i class="fa fa-angle-down"></i>
                  </span>
                  <nav class="dropdownMenu__menu">
                      <div class="dropdownMenu__item">
                          Edit account
                          <i class="fa fa-pencil-square-o"></i>
                      </div>
                      <div class="dropdownMenu__item" @click="onLogout">
                          Log out
                          <i class="fa fa-sign-out"></i>
                      </div>
                  </nav>
              </span>
          </header>
  
          <access-view v-if="!loggedIn" @onLogin="onLogin" @onRegister="onRegister" :feedback="feedback" />
  
          <router-view></router-view>
      </main>`,

  router: new VueRouter({
    routes: [
      {
        path: "/",
        component: Home,
        name: "home",
      },
    ],
  }),

  data: {
    username: null,
    active: false,
    loggedIn: false || !!sessionStorage.token,
  },

  created() {
    if (!this.loggedIn) {
      if (this.$router.path !== "/login")
        this.$router.push({ path: "/login" });
    } else {
      const user = retrieveUser(sessionStorage.token)
      .then( user => {
        this.username = user.fullname
        if (this.$router.path !== "/") this.$router.push({ path: "/" });
      })      
    }
  },

  props: ["feedback"],

  methods: {
    async onLogin(email, password) {
      try {
        const token = await authenticateUser(email, password);
        
        var user = await retrieveUser(token)

        if (user) {
          sessionStorage.token = token;

          this.loggedIn = true;

          this.username = user.fullname;

          if (this.$router.path !== "/") this.$router.push({ path: "/" });
        }
      } catch (error) {
        this.feedback = error.message;
      }
    },

    async onRegister(fullname, email, password) {
      try {
        await registerUser(fullname, email, password);

        const token = await authenticateUser(email, password);
        
        var user = await retrieveUser(token)

        if (user) {
          sessionStorage.token = token;

          this.loggedIn = true;

          this.username = user.fullname;

          if (this.$router.path !== "/") this.$router.push({ path: "/" });
        }        
      } catch (error) {
        this.feedback = error.message;
      }
    },

    onLogout() {
      sessionStorage.clear();
      this.active = false;
      this.loggedIn = false
      if (this.$router.path !== "/login")
        this.$router.push({ path: "/login" });
    },
  },
};
