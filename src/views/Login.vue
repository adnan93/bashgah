<template>
  <div class="home">
    <div id="nav">
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

          <b-row>
            <b-col cols="3"> </b-col>

            <b-col cols="6">
              <div dir="rtl">
                <b-card class="mt-3">
                  <template #header>
                    <div style="text-align: center">
                      <b class="mb-0">ورود به باشگاه</b>
                    </div>
                  </template>

                  <b-form @submit="onSubmit">
                    <b-form-input
                      type="tel"
                      v-model="form.Mobile"
                      placeholder="شماره موبایل"
                      required
                    />

                    <br />

                    <b-form-input
                      v-model="form.Password"
                      type="text"
                      placeholder="رمز عبور"
                      success-message="Nice to meet you!"
                    />

                    <br />

                    <v-btn
                      class="btnsize ml-1"
                      color="#bea44d"
                      elevation="5"
                      rounded
                      large
                      type="submit"
                      variant="primary"
                      >ثبت
                    </v-btn>
                  </b-form>
                </b-card>
              </div>
            </b-col>

            <b-col cols="3"> </b-col>
          </b-row>

          <v-snackbar v-model="snackbarGreen" color="snackbarColor" dir="rtl">
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

        </b-card>
      </b-card-group>

      <br /><br />

      <br /><br />

      <!-- <div class="chart" ref="chart1"></div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import config from "@/config";

// import { createChart } from "lightweight-charts";
//  import { LightweightCharts } from "lightweight-charts";

export default {
  name: "Login",

  components: {},

  data() {
    return {

       text: "",

    //  url1: `${config.paseUrl}` + "api/v1/CurrentPrice/GetTalagram",
      // url2: `${config.paseUrl}` +"api/v1/ArchivedPrice/GetSekeByTimeFrame/?timeframe=5",

      //date
      today: 0,

      //form
      form: {
        Mobile: "",
        Password: "",
      },
    };
  },
  mounted() {},
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    async onSubmit(event) {
      event.preventDefault();

      await axios.post(`http://localhost:8080/api/Customer/Login`, this.form) .then((response) => {
          console.log(response);

          // if (response.data.Description == "کد احراز هویت صحیح نمی باشد") {
          //   this.snackbarColor = "red";
          // } else if (response.data.Description == " ") {
          //   this.snackbarColor = "success";
          // }

          this.text = response.data.JoinedErrors;
          this.signUpLoading = false;

          this.snackbarGreen = true;
        })
        .catch((e) => {
          this.errors.push(e);
        });
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
