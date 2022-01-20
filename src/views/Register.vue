<template>
  <div>
    <b-row dir="rtl">
      <b-col cols="3"> </b-col>
      <b-col cols="6">
        <b-card class="mt-5" border-variant="dark" header-bg-variant="#10503b">
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
                  v-model="checkMelliCode"
                  placeholder="کد ملی ده رقمی"
                  color="#10503b"
                  required
                  outlined
                  dense
                  :rules="[
                    melliRules.required,
                    melliRules.validNum,
                    melliRules.select2,
                    melliRules.select3,
                  ]"
                />

                <v-text-field
                  v-model="checkPhone"
                  placeholder="شماره موبایل"
                  color="#10503b"
                  required
                  outlined
                  dense
                  :rules="[
                    phoneRules.required,
                    phoneRules.validNum,
                    phoneRules.select2,
                  ]"
                />
              </b-col>
              <br />
            </b-row>

            <v-btn
              class="btnsize ml-1"
              color="#90c445"
              style="color:white"
              elevation="5"
              rounded
              large
              @click="updateCust()"
              type="submit"
              variant="primary"
              :loading="loadingbtn"
              :disabled="MelliCodeStatus && MobileStatus ? false : true"
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

    <b-modal
      dir="rtl"
      v-model="showMessageModal"
      title="توجه"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      :footer-bg-variant="bodyBgVariant"
      :footer-text-variant="footerTextVariant"
    >
      <h4>جهت استفاده از خدمات باشگاه زمرد،
      باید در کارگزاری اقتصاد بیدار ثبت‌نام نمایید.
      </h4>

      <template #modal-footer>
        <div class="w-100">
          <v-btn
            :loading="getCodeLoading"
            class="btnsize ml-1"
            color="#90c445"
            style="color:white"
            elevation="5"
            rounded
            large
            type="submit"
            variant="primary"
            @click="redirect()"
          >
            تایید
          </v-btn>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
// import config from "@/config";

export default {
  name: "Update",

  watch: {
    checkMelliCode: function (meli_code) {
      if (
        !/^\d{10}$/.test(meli_code) ||
        meli_code == "0000000000" ||
        meli_code == "1111111111" ||
        meli_code == "2222222222" ||
        meli_code == "3333333333" ||
        meli_code == "4444444444" ||
        meli_code == "5555555555" ||
        meli_code == "6666666666" ||
        meli_code == "7777777777" ||
        meli_code == "8888888888" ||
        meli_code == "9999999999"
      ) {
        console.log("meli_code", meli_code);

        this.MelliCodeStatus = false;
        return this.MobileStatus;
      } else {
        var check = parseInt(meli_code[9]);
        var sum = 0;
        var i;
        for (i = 0; i < 9; ++i) {
          sum += parseInt(meli_code[i]) * (10 - i);
        }
        sum %= 11;

        if ((sum < 2 && check == sum) || (sum >= 2 && check + sum == 11)) {
          this.MelliCodeStatus = true;
          this.notVaildCode = meli_code;
        }

        this.form.NationalCode = meli_code;
      }
    },

    checkPhone: function (phone) {
      this.phone = phone;
      if (phone.length == 11 && phone[0] == 0) {
        this.MobileStatus = true;
      } else {
        this.MobileStatus = false;
      }
      this.form.Mobile = phone;
    },
  },

  mounted() {
    // window.location.reload(true);
  },

  data() {
    return {
      headerBgVariant: "10503b",
      headerTextVariant: "light",
      bodyBgVariant: "light",
      bodyTextVariant: "dark",
      footerBgVariant: "warning",
      footerTextVariant: "dark",
      showMessageModal: false,
      text: "  در حال دریافت اطلاعات ...",
      checkMelliCode: "",
      regExp: /[a-zA-Z]/g,
      MobileStatus: false,
      checkPhone: "",

      //validation
      melliRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validNum: (v) => /^[\s۰-۹\s0-9]+$/.test(v) || "کد ملی معتبر نیست",
        select2: (v) => v.length == 10 || "کد ملی معتبر نیست",
        select3: (v) => v == this.notVaildCode || "   کد ملی معتبر نمیباشد",
      },

      phoneRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validNum: (v) => /^[\s۰-۹\s0-9]+$/.test(v) || "شماره معتبر نیست",
        select2: (v) => v.length == 11 || "شماره موبایل معتبر نیست",
      },

      emailRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validEmail: (v) =>
          /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(v) || " معتبر نیست",
      },

      rules: {
        required: (value) => !!value || "این فیلد الزامی است.",
        counter: (value) => value.length == 11 || "شماره معتبر نیست",
        validNum: (v) => /^[\s۰-۹\s0-9]+$/.test(v) || "شماره معتبر نیست",
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

  methods: {
    redirect() {
      window.location.href = "https://ex.ebidar.com/v-533";
    },
    async onSubmit(event) {
      this.showMessageModal = true;

      event.preventDefault();

      console.log("form: ", this.form);

      this.loadingbtn = true;
      await axios
        .post(`http://95.217.131.10/api/RegisterLog/Create`, this.form, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("updated customer: ", response);

          ///  https://ex.ebidar.com/v-533
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

.card-header {
  background-color: #10503b;
}
.modal-header {
  background-color: #10503b;
}
</style>