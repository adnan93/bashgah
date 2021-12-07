<template>
  <div class="">
    <b-row>
      <b-card class="cardSize">
        
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
                  @click="UserLogin()"
                >
                  <v-icon style="font-size: 20px; color: black"
                    >portrait</v-icon
                  >
                  مدیر
                </v-btn>

                <v-btn
                  class="select2"
                  color="#bea44d"
                  elevation="3"
                  rounded
                  x-large
                  outlined
                  @click="GoToCustomer()"
                >
                  <v-icon style="font-size: 20px">people_alt</v-icon> کاربر
                </v-btn>
              </div>
            </div>
          </b-col>

          <b-col cols="3"> </b-col>
        </b-row>
        
      </b-card>
    </b-row>

    <div class="row2"></div>

 
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
      this.$router.push("UserLogin");
    },
    login() {
      this.$router.push("customerLogin");
    },
    GoToCustomer() {
      this.$router.push("Customer");
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

.cardSize{
  height: 50% !important;
}
</style>
