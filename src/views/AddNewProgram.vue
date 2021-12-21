<template>
  <div>
    <b-row>
      <b-col cols="1"> </b-col>
      <b-col class="container" cols="10">
    
        <br />
        <br />
        <b-row>
          <b-col align="center" cols="7">
            <v-img
              :src="`http://localhost:8080/api/Program/GetPictureFile/${programDetails.data.Picture}`"
              height="100%"
              width="60%"
              style="border-radius: 10px; position: relative"
            ></v-img>
          </b-col>

          <b-col cols="5">
            <br />

            <b-row class="myCard">
              <div align="center">
                <h5>
                  <b> نام برنامه : </b>

                  {{ programDetails.data.Title }}
                </h5>
              </div>
            </b-row>
            <br />

            <b-row class="myCard">
              <div align="center">
                <h5>
                  <b> تعداد امتیاز لازم : </b>
                  <b> {{ programDetails.data.PointsNeeded }} </b>

                  می باشد
                </h5>
              </div>
            </b-row>
            <br />

            <b-row class="myCard">
              <div align="center">
                <h5>
                  <b> توضیحات : </b>

                  {{ programDetails.data.Description }}
                </h5>
              </div>
            </b-row>

            <br />
            <br />

            <br />
            <b-row>
              <b-col class="afzodan">
                <v-btn
                  style="color: white"
                  color="#10503B"
                  elevation="5"
                  rounded
                  x-large
                  @click="addNewProgram()"
                >
                  افزودن
                </v-btn>

                <v-btn
                  class="mr-1"
                  style="color: white"
                  color="#10503B"
                  elevation="5"
                  rounded
                  x-large
                  @click="goBack()"
                >
                  بازگشت
                </v-btn>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <br />
      </b-col>

      <b-col cols="1"> </b-col>
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      programId: this.$route.params.id,
      programDetails: "",

      //snackbar
      snackbarGreen: false,
      snackColor: "",

      MessageType: "",

      text: "",

    };
  },
  async created() {
    console.log(this.$route.params.id);
    await axios
      .get(`http://localhost:8080/api/Program/GetById/${this.programId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.programDetails = response;
        console.log("programDetails: ", this.programDetails);
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/customerProfile" });
    },

    async addNewProgram() {
      await axios
        .post(
          `http://localhost:8080/api/Customer/AddProgramToCustomer/${this.programId}`,
          this.programId,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {

            this.text = response.data.Description;

          if (response.data.MessageType == 0) {
            this.snackColor = "red";
          } else {
            this.snackColor = "green";
          }
          this.snackbarGreen = true;

        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>

<style>
.myCard {
  background-color: rgb(122, 196, 122);
  border-radius: 20%;
  width: 100%;
}
.afzodan {
  padding: 0px !important;
}
</style>