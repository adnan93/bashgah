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
            <b-col cols="3">
              {{ getMessage }}
            </b-col>

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
                      >ورود
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
// import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",
  computed: mapGetters(["getToken", "getMessage"]),

  components: {},

  data() {
    return {
      snackbarGreen: false,
      text: "",
      token: "",

      //date
      today: 0,

      //form
      form: {
        Mobile: "",
        Password: "",
      },
    };
  },

  methods: {
    ...mapActions(["logIn"]),

    async onSubmit(event) {
      event.preventDefault();
      this.logIn(this.form);

      console.log("getToken", this.getToken);
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
