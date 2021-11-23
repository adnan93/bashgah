<template>
  <v-app style="font-family: IRYekan">
    <b-row dir="rtl">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <div>
          <!-- Just an image -->
          <b-navbar variant="faded" type="light">
            <b-navbar-brand class="mr-15" href="/">
              <img
                class="mt-0 mb-0 pt-0 pb-0"
                width="55px"
                height="55px"
                src="@/assets/talagram.png"
                alt="طلاگرام"
              />
            </b-navbar-brand>
          </b-navbar>
        </div>
        <b-navbar-brand>
          <router-link to="/">باشگاه مشتریان</router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse class="mr-15" id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item class="ml-2" href="#">
              <h6>
                <b style="color: #bea44d"> </b>
              </h6>
            </b-nav-item>

            <b-nav-item class="ml-2" href="/Update">
              <h6><b style="color: #bea44d">ویرایش پروفایل </b></h6>
            </b-nav-item>

            <b-nav-item class="ml-2" href="/Score">
              <h6><b style="color: #bea44d">امتیاز کاربران </b></h6>
            </b-nav-item>

            <b-nav-item class="ml-2" href="/Programs">
              <h6><b style="color: #bea44d">برنامه های کاربران </b></h6>
            </b-nav-item>

            <b-nav-item
              class="ml-2"
              href="/"
              @click="logout()"
             
            >
              <h6><b style="color: #bea44d">خروج </b></h6>
            </b-nav-item>

            <!-- <b-nav-item class="ml-2" href="#">
              <h6><b style="color: #bea44d"> اخبار توليد و تجارت </b></h6>
            </b-nav-item>

            <b-nav-item class="ml-2" href="#">
              <h6><b style="color: #bea44d"> اخبار اقتصادی </b></h6>
            </b-nav-item> -->
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-row>
    <router-view />
  </v-app>
</template>
 
 
 
 <script>
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      show: true,
    };
  },
  created() {
    // console.log("login..", this.token)
  },
  methods: {
    logout() {
      if (this.token) {
        localStorage.removeItem("token");
      }
    },

    showBtn() {
      if (this.token) {
        return true;
      } else return false;
    },
  },
};
</script>
 
 
<style scoped lang="scss">
@font-face {
  font-family: "IRYekan";
  src: local("IRYekan"), url(./font/IRYekan.ttf) format("truetype");
}
.chart {
  position: absolute;
  width: 100%;
  height: 300px;
}
.test {
  text-align: right !important;
  margin: 0 px;
  padding-bottom: 0% !important;
}
.test1 {
  margin-bottom: 0% !important;
}
.hobabptn :hover {
  background-color: none !important;
}
p {
  padding: 0%;
  margin: 0%;
  margin-bottom: 0% !important;
}
.background {
  margin: 0% !important;
  padding: 0% !important;
  background-color: #f0f0f5;
  width: 7.8rem;
}

a:link {
  text-decoration: none;
  background-color: none !important;
}

a {
  color: white !important;
}
</style>
