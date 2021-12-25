<template>
  <div>
    <br />
    <div style="text-align: center">
      <h4>
        امروز
        {{ today }}
      </h4>
    </div>

    <br />
    <!-- <b-card class="cardSize"> -->

    <!-- <template #header>
          <div style="text-align: center">
            <b>
              <b class="mb-0"> امروز </b>
              {{ today }}
            </b>
          </div>
        </template> -->

    <b-row dir="rtl">
      <b-col cols="3"> </b-col>

      <b-col cols="6">
        <div align="center">
          <h1>به باشگاه مشتریان زمرد خوش آمدید</h1>
          <br />
          <br />
          <br />

          <div class="container">
            <v-btn
              class="select2"
              color="#90c445"
              elevation="3"
              rounded
              x-large
              @click="GoToCustomer()"
            >
              <!-- <v-icon style="font-size: 20px">people_alt</v-icon>  -->ورود
            </v-btn>

            <v-btn
              class="btnsize"
              color="#6667ab"
              elevation="5"
              rounded
              x-large
              outlined
              @click="UserLogin()"
            >
              <!-- <v-icon style="font-size: 20px; color: black">portrait</v-icon> -->
              ثبت نام جدید
            </v-btn>
            <hr />
          </div>
        </div>
      </b-col>

      <b-col cols="3"> </b-col>
    </b-row>
    <br />
    <br />
    <br />
    <br /><br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />

    <!-- </b-card> -->
  </div>
</template>

<script>
// import config from "@/config";
// import { createChart } from "lightweight-charts";
// import { LightweightCharts } from "lightweight-charts";

export default {
  name: "App",
  data() {
    return {
      //date
      today: 0,

      //form
      form: {
        email: "",
        name: "",
      },
    };
  },
  components: {},
  mounted() {},
  methods: {
    UserLogin() {
      this.$router.push("Register");
     // https://accounts.ebidar.com/
    },
    login() {
      this.$router.push("customerLogin");
    },
    GoToCustomer() {
      this.$router.push("customerLogin");
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    onSubmit(event) {
      event.preventDefault();
    },
  },

  async created() {
    //date
    this.today = new Date().toLocaleDateString("fa-IR");
  },
};
</script>

<style scope>
p {
  padding: 0%;
  margin: 0%;
  margin-bottom: 0% !important;
}
.background {
  margin: 0% !important;
  padding: 0% !important;
  background-color: #f0f0f5;
  width: 10rem;
}

.backGroundColor {
  background-color: #f0f0f5;
}

.row2 {
  background-color: red;
}

.cardSize {
  height: 50% !important;
}
</style>
