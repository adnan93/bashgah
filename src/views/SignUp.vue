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
                      <b class="mb-0">ثبت نام در باشگاه</b>
                    </div>
                  </template>

                  <b-form @submit="onSubmit">
                    <b-form-input
                      v-model="form.Name"
                      type="text"
                      placeholder="نام "
                      required
                    ></b-form-input>
                    <br />

                    <b-form-input
                      v-model="form.Family"
                      type="text"
                      placeholder="نام خانوادگی"
                      required
                    ></b-form-input>
                    <br />

                    <b-form-input
                      v-model="form.Mobile"
                      placeholder="شماره موبایل"
                      required
                    ></b-form-input>
                    <br />

                    <b-form-input
                      v-model="form.Password"
                      type="text"
                      placeholder="رمز عبور"
                      required
                    ></b-form-input>
                    <br />

                    <div>
                      <b-form-input
                        v-model="form.VerificationCode"
                        placeholder="کد تایید"
                        required
                      >
                      </b-form-input>
                    </div>

                    <br />

                    <v-btn
                      :loading="signUpLoading"
                      class="btnsize ml-1"
                      color="#bea44d"
                      elevation="5"
                      rounded
                      large
                      type="submit"
                      variant="primary"
                      >ثبت
                    </v-btn>

                    <v-btn
                      :loading="getCodeLoading"
                      class="select2"
                      color="#bea44d"
                      elevation="3"
                      rounded
                      large
                      outlined
                      @click="show = true"
                    >
                      دریافت کد
                    </v-btn>

                    <b-modal
                      dir="rtl"
                      v-model="show"
                      title="دریافت کد تایید"
                      :header-bg-variant="headerBgVariant"
                      :header-text-variant="headerTextVariant"
                      :body-bg-variant="bodyBgVariant"
                      :body-text-variant="bodyTextVariant"
                      :footer-bg-variant="bodyBgVariant"
                      :footer-text-variant="footerTextVariant"
                    >
                      <b-form-input
                        v-model="PhoneNumber"
                        placeholder=" شماره موبایل خود را وارد کنید"
                        required
                      ></b-form-input>

                      <template #modal-footer>
                        <div class="w-100">
                          <v-btn
                            :loading="getCodeLoading"
                            class="btnsize ml-1"
                            color="#bea44d"
                            elevation="5"
                            rounded
                            large
                            type="submit"
                            variant="primary"
                            @click="getCode()"
                          >
                            درخواست کد تایید
                          </v-btn>
                        </div>
                      </template>
                    </b-modal>

                    <v-snackbar v-model="snackbarGreen" color=snackbarColor>
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

                    <!-- <v-snackbar v-model="snackbarRed" color=snackbarColor>
                      {{ text }}

                      <template v-slot:action="{ attrs }">
                        <v-btn
                          color="dark"
                          rounded
                          v-bind="attrs"
                          text
                          @click="snackbarRed = false"
                        >
                          x
                        </v-btn>
                      </template>
                    </v-snackbar> -->


                  </b-form>
                </b-card>
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
import axios from "axios";
import config from "@/config";

// import { createChart } from "lightweight-charts";
//  import { LightweightCharts } from "lightweight-charts";

export default {
  name: "App",
  data() {
    return {
      //loading
      getCodeLoading: false,
      signUpLoading: false,

      //snackbar
      snackbarGreen: false,
      snackbarRed: false,

      text: "",
      snackbarColor: "",

      // modal
      show: false,
      headerBgVariant: "dark",
      headerTextVariant: "light",
      bodyBgVariant: "light",
      bodyTextVariant: "dark",
      footerBgVariant: "warning",
      footerTextVariant: "dark",
      PhoneNumber: "",

      url1: `${config.paseUrl}` + "api/v1/CurrentPrice/GetTalagram",
      // url2: `${config.paseUrl}` +"api/v1/ArchivedPrice/GetSekeByTimeFrame/?timeframe=5",

      //date
      today: 0,

      //form
      form: {
        Mobile: "",
        VerificationCode: "",
        Password: "",
        Name: "",
        Family: "",
      },
    };
  },
  components: {},
  mounted() {},
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    async onSubmit(event) {
      event.preventDefault();
      this.signUpLoading = true;

      await axios
        .post(`http://localhost:8080/api/Customer/Register`, this.form)
        .then((response) => {
          console.log(response);

          // if (response.data.Description == "کد احراز هویت صحیح نمی باشد") {
          //   this.snackbarColor = "red";
          // } else if (response.data.Description == " ") {
          //   this.snackbarColor = "success";
          // }

          this.text = response.data.Description;
          this.signUpLoading = false;

          this.snackbarGreen = true;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    async getCode() {
      this.show = false;
      this.getCodeLoading = true;

      await axios

        .post(
          `http://localhost:8080/api/Customer/SendVerificationCode?PhoneNumber=${this.PhoneNumber}`
        )

        .then((response) => {
          console.log(response);

          if (response.data.Description == "کد احراز هویت با موفقیت ارسال شد") {
            this.snackbarColor =  "success" ;
          } else if (response.data.Description == " ") {
            this.snackbarColor ="red" ;
          }



          this.text = response.data.Description;
          this.snackbarGreen = true;
          this.getCodeLoading = false;
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
