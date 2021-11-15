<template>
  <div class="home">
    <div>
      <b-card-group deck class="mr-2">
        <b-card>
          <template #header>
            <div style="text-align: center">
              <b>
                <b class="mb-0"> امروز </b>
                {{ today }}
              </b>
            </div>
          </template>

          <b-row dir="rtl">
            <b-col cols="3"> </b-col>

            <b-col cols="6">
              <div align="center">
                <h2>به باشگاه مشتریان طلاگرام خوش آمدید</h2>
                <br />

                <div class="container">
                  <v-btn
                    class="btnsize"
                    color="#bea44d"
                    elevation="5"
                    rounded
                    x-large
                    @click="login()"
                    >ورود
                  </v-btn>

                  <v-btn
                    :loading="resetLoading"
                    class="select2"
                    color="#bea44d"
                    elevation="3"
                    rounded
                    x-large
                    outlined
                    @click="signup()"
                    >ثبت نام</v-btn
                  >
                </div>
              </div>
            </b-col>

            <b-col cols="3"> </b-col>
          </b-row>
        </b-card>
      </b-card-group>

      <br /><br />

      <br /><br />

      <!-- <div class="chart" ref="chart1"></div> -->
    </div>
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
    login() {
      this.$router.push("Login");
    },
    signup() {
      this.$router.push("SignUp");
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
</style>
