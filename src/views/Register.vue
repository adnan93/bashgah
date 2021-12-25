<template>
  <div>
    <b-row dir="rtl">
      <b-col cols="3"> </b-col>
      <b-col cols="6">
        <b-card class="mt-5" border-variant="dark" header-bg-variant="dark">
          <template #header>
            <div style="text-align: center">
              <p style="color: white" class="mb-0">ثبت نام</p>
            </div>
          </template>

          <b-form @submit="onSubmit">
            <b-row>
              <b-col>
                <v-text-field
                  type="text"
                  v-model="form.NationalCode"
                  label="کد ملی"
                  required
                  outlined
                  dense
                  :rules="[phoneRules.required, phoneRules.validNum]"
                />

                <v-text-field
                  v-model="form.Mobile"
                  label="شماره موبایل"
                  required
                  outlined
                  dense
                  :rules="[phoneRules.required, phoneRules.validNum]"
                />
              </b-col>
              <br />
            </b-row>

            <v-btn
              class="btnsize ml-1"
              color="#90c445"
              elevation="5"
              rounded
              x-large
              @click="updateCust()"
              type="submit"
              variant="primary"
              :loading="loadingbtn"
              >ثبت
            </v-btn>

            <br />
          </b-form>
          <br />
        </b-card>
      </b-col>

      <b-col cols="3"> </b-col>
    </b-row>
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
  </div>
</template>

<script>
import axios from "axios";
// import config from "@/config";

export default {
  name: "Update",

  mounted() {
    // window.location.reload(true);
  },

  data() {
    return {
      text: "  در حال دریافت اطلاعات ...",

      //validation
      phoneRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validNum: (v) => /^[\s۰-۹\s0-9]+$/.test(v) || "شماره معتبر نیست",
      },

      emailRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validEmail: (v) =>
          /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(v) || " معتبر نیست",
      },

      loadingbtn: false,
      date: "",
      //img
      title: "Image Upload",
      dialog: false,
      imageName: "",
      imageUrl: "",
      imageFile: {},

      bg64: "",
      imgId: "",

      imgRules: [
        (v) => v.size < 500000 || "حجم عكس بايد كمتر از KB 500 می باشد",
      ],

      Province: [],
      cities: [],
      files: [],

      //form
      form: {
        Mobile: "",
        NationalCode: "",
      },

      show4: false,
    };
  },

  watch: {},

  methods: {
    async onSubmit(event) {
      event.preventDefault();

      console.log("form: ", this.form);

      this.loadingbtn = true;
      await axios
        .post(`http://localhost:8080/api/RegisterLog/Create`, this.form, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("updated customer: ", response);

          ///  https://ex.ebidar.com/v-533
          window.location.href = "https://ex.ebidar.com/v-533";
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.loadingbtn = false;
    },
  },
};
</script>

<style>
.datePicker {
  background-color: red;
}

.ui-datepicker {
  background: #333;
  border: 1px solid #555;
  color: #eee;
}
</style>