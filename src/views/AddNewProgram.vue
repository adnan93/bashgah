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
              :src="`http://95.217.131.10/api/Program/GetPictureFile/${programDetails.data.Picture}`"
              height="60%%"
              width="60%"
              style="border-radius: 10px; position: relative"
            ></v-img>
          </b-col>

          <b-col cols="5">
            <br />

            <b-row class="myCard" align="center">
              <!-- <b-col align="left">
                <h5><b style="color: black"> نام برنامه: </b></h5>
              </b-col> -->
              <b-col align="center">
                <h5> <b> 
                {{ programDetails.data.Title }} 
                </b>  </h5>
              </b-col>
            </b-row>

            <br />

            <b-row class="myCard" align="center">
              <b-col align="left">
                <h5 class="mt-2">
                  <b style="color: black">امتیاز مورد نیاز: </b>
                </h5>
              </b-col>

              <b-col align="right">
                <h2>{{ programDetails.data.PointsNeeded }}</h2>
              </b-col>
            </b-row>
            <br />

            <b-row class="container myCard" align="center">
              <b-col align="left">
                <h5><b style="color: black"> توضیحات: </b></h5>
              </b-col>
              <b-col align="right">
                {{ programDetails.data.Description }}
              </b-col>
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
                  @click="openCreateModal()"
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
        <hr />

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
        <br />
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

    <!--Apply create New Score -->
    <div>
      <b-modal
        v-model="showApplyModal"
        dir="rtl"
        id="modal-center"
        title=" افزودن جایزه"
        :header-bg-variant="headerBgVariant"
        :header-text-variant="headerTextVariant"
      >
        <b-container fluid>
          <b-row>
            <b-col>
              <h4>از انتخاب خود مطمئن هستيد  ؟</h4>
            </b-col>
          </b-row>
        </b-container>

        <template #modal-footer>
          <div class="w-100">
            <v-btn
              :loading="addProgrmLoading"
              class="btnsize"
              color="#90c445"
              elevation="5"
              rounded
              larg
              @click="addNewProgram"
              >بلی
            </v-btn>

            <v-btn
              class="select2"
              color="#f7b73a"
              elevation="3"
              rounded
              larg
              outlined
              @click="closeeditCustomerModal"
              >انصراف
            </v-btn>
          </div>
        </template>
      </b-modal>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      programId: this.$route.params.id,
      programDetails: "",
      showApplyModal: false,
      headerBgVariant: "dark",
      headerTextVariant: "light",
      addProgrmLoading: false,

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
      .get(`http://95.217.131.10/api/Program/GetById/${this.programId}`, {
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
    openCreateModal() {
      this.showApplyModal = true;
    },

    closeeditCustomerModal() {
      this.showApplyModal = false;
    },

    goBack() {
      this.$router.push({ path: "/customerProfile" });
    },

    async addNewProgram() {
      this.addProgrmLoading = true;
      await axios
        .post(
          `http://95.217.131.10/api/Customer/AddProgramToCustomer/${this.programId}`,
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

      this.showApplyModal = false;
      this.addProgrmLoading = false;
    },
  },
};
</script>

<style>
.myCard {
  background-color: #c7d7d2;
  /* border-radius: 20%; */
  width: 100%;
  padding-top: 10px;
  scroll-padding-bottom: 10px;
}
.afzodan {
  padding: 0px !important;
}
.points {
  font-size: 15px !important;
}
</style>