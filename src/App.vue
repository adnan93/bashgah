<template>
  <v-app class="home" style="font-family: IRYekan">
    <b-row dir="rtl">
      <b-navbar
        toggleable="lg"
        type="dark"
        variant="dark"
        style="background-color: #a5b9bd"
      >
        <div>
          <!-- Just an image -->
          <b-navbar variant="faded" type="light">
            <b-navbar-brand class="mr-5" href="/">
              <img
                class="mt-0 mb-0 pt-0 pb-0"
                width="100%"
                height="60px"
                src="@/assets/logo.png"
                alt="باشگاه زمرد"
              />

              <!-- <h4 class="mt-2"><b style="text-shadow: 2px 2px 4px #000000"> ZMRD </b></h4> -->
            </b-navbar-brand>
          </b-navbar>
        </div>
        <b-navbar-brand>
          <b style="font-size:25px">باشگاه زمرد</b>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse class="mr-15" id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item class="ml-2" href="#">
              <h6>
                <b style="color: #90c445"> </b>
              </h6>
            </b-nav-item>
            <!-- 
            <b-nav-item class="ml-2" href="/customerProfile">
              <h6><b style="color: #90c445"> صفحه اصلى </b></h6>
            </b-nav-item> -->

            <b-nav-item class="ml-2" href="/Update" v-show="showBtn()">
              <h6><b style="color: #90c445">ویرایش پروفایل </b></h6>
            </b-nav-item>

            <b-nav-item class="ml-2" @click="checkLogout()" v-show="showBtn()">
              <h6><b style="color: #90c445">خروج </b></h6>
            </b-nav-item>
            <!-- 
            <b-nav-item class="ml-2" href="#">
              <h6><b style="color: #90c445"> اخبار توليد و تجارت </b></h6>
            </b-nav-item> -->

            <!-- <b-nav-item class="ml-2" href="#">
              <h6><b style="color: #90c445"> اخبار اقتصادی </b></h6>
            </b-nav-item> -->
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <!-- add new -->
      <div>
        <b-modal
          v-model="showCreateModal"
          dir="rtl"
          id="modal-center"
          title=" خروج"
          :header-bg-variant="headerBgVariant"
          :header-text-variant="headerTextVariant"
        >
          <h3>آیا از خروج مطمئن هستید ؟</h3>
          <template #modal-footer>
            <div class="w-100">
              <v-btn
                class="select2"
                color="#f7b73a"
                elevation="3"
                rounded
                larg
                outlined
                @click="closeCreateModal"
                >انصراف
              </v-btn>

              <v-btn
                class="btnsize"
                color="#90c445"
                elevation="5"
                rounded
                large
                @click="logout()"
                href="/"
              >
                بلی
              </v-btn>
            </div>
          </template>
        </b-modal>
      </div>

      <v-snackbar v-model="snackbarGreen" color="green" dir="rtl">
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="dark"
            rounded
            v-bind="attrs"
            text
            @click="snackbarGreen = false"
          >
            x
          </v-btn>
        </template>
      </v-snackbar>

      <router-view class="home" />

      <b-row class="footer" align="center">
        <hr />

        <b-col>
          <div class="container">
            <h5><b> لینک های مفید </b></h5>
            <br />

            <div class="place">
              <h6>
                <a href="https://ex.ebidar.com/v-533">
                  <li class="place">اقتصاد بیدار</li>
                </a>
              </h6>

              <h6 class="place">
                <a style="color: black" href="https://t.me/tahlilonline_com">
                  <li class="place">تحلیل انلاین</li>
                </a>
              </h6>

              <h6 class="place ml-10">
                <a style="color: black" href="/">
                   <li class="place">طلاگرام</li> 
                   </a>
              </h6>
            </div>
          </div>
        </b-col>

        <b-col>
          <div>
            <h5 style="color: "><b> راه های ارتباطی </b></h5>
            <br />
            <div>
              <h6 style="color: #78878a">
                شیراز، بلوار شهید رجائی (فرهنگ شهر)، کوچه 30، ساختمان زمرد
              </h6>
            </div>

            <div class="place">
              <h3>
                <a href="tel:07136317299">
                  <p class="place">071-36317299</p>
                </a>
              </h3>
            </div>

            <br />
          </div>

        <div class="place1 container">
          <a class="place1 ml-1" href="https://t.me/talagram_chnl">
            <img class="place1" src="@/assets/tel3.png" />
          </a>

          <a
            class="place1 ml-1"
            href="https://instagram.com/tahlilonline_com?utm_medium=copy_link"
          >
            <img src="@/assets/ins.png" />
          </a>

          <a class="place1 ml-2" href="https://www.aparat.com/tahlilonline.com">
            <img src="@/assets/apa.png" />
          </a>

          <a
            class="place1"
            href="https://www.youtube.com/channel/UCo0Q1Re84VCVjemnr6-uN_g"
          >
            <img src="@/assets/you.png" />
          </a>
        </div>
        </b-col>
        <hr />
        <br />

        <h6>
          <v-icon style="font-size: 20px; color: black"> copyright </v-icon>

          کلیه حقوق متعلق به گروه مالی زمرد ‌می ‌باشد.
        </h6>
        <br />

        <br />
      </b-row>

      <br />
    </b-row>
  </v-app>
</template>
 
 
 
 <script>
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      show: true,
      //logout
      showCreateModal: false,

      //modal
      headerBgVariant: "dark",
      headerTextVariant: "light",

      //snachbar
      text: "با موفقیت خارج شدید",
      snackbarGreen: false,
    };
  },
  created() {
    // console.log("login..", this.token)
    this.showBtn();
  },
  methods: {
      changeRTL () {
        this.$vuetify.rtl = true
      },
      
    checkLogout() {
      this.openCreateModal();
    },

    logout() {
      localStorage.removeItem("token");
      if (this.token) {
        localStorage.removeItem("token");
      }
      this.showCreateModal = false;

      // this.$router.push({ path: "/" });

      this.snackbarGreen = true;
    },

    showBtn() {
      //  console.log("token: ", this.token);
      if (this.token == null) {
      //  console.log("no token ");

        return false;
      } else {
        return true;
      }
    },

    openCreateModal() {
      this.showCreateModal = true;
    },

    closeCreateModal() {
      this.showCreateModal = false;
    },
  },
};
</script>
 
 
<style scoped lang="scss">
@font-face {
  font-family: "IRYekan";
  src: local("IRYekan"), url(./font/IRANSansWeb_LightJustPersianNum.1bb7aba5.woff) format("truetype");
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

.home {
  // background-color: #ffffff80;

  //  background-color:rgb(240, 232, 232);
  background-color: #e8ede7;
}

.bg {
  background-color: #e8ede7;
}

.navbar.navbar-dark.bg-dark {
  background-color: #10503b !important;
}
.footer {
  background-color: #c8cfc7;
}

.place {
  color: #78878a;
}
.place :hover {
  color: #ffffff;
  transition: 0.1s;
  // opacity: 0.6;
}

.place1 :hover {
  -webkit-transform: translate(-10%, -10%);
}
</style>
