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
            </b-col>

            <b-col cols="6">
              <div dir="rtl">
                  <h3> :تعداد امتیاز های کاربر </h3>

                
              </div>
            </b-col>

            <b-col cols="3"> </b-col>
          </b-row>

          <v-snackbar v-model="snackbarGreen" :color="snackColor" dir="rtl">
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


export default {
  name: "customerProfile",

  components: {},

  data() {
    return {
      //snackbar
      snackColor: "",
      snackbarGreen: false,
      text: "",
      token: "",

      //date
      today: 0,

    };
  },

  methods: {
 
  },

  async created() {
    //date
    this.today = new Date().toLocaleDateString("fa-IR");

    //Customer Points
      await axios
        .get(`http://localhost:8080/api/Customer/GetCustomerPoints`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);

        })
        .catch((e) => {
          this.errors.push(e);
        });

   
    

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
