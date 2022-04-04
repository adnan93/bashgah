<template>
  <!-- create Customer -->
  <div>
    <b-row>
      <b-col cols="2"> </b-col>

      <b-col cols="8">
        <div dir="rtl">
          <br />
          <br />
          <h3 align="center">ثبت نام در باشگاه</h3>

          <b-form @submit="onSubmit">
            <br />

            <v-text-field
              v-model="form.Name"
              type="text"
              placeholder="نام "
              outlined
              dense
              required
              :rules="[phoneRules.required]"
            />

            <v-text-field
              v-model="form.Family"
              type="text"
              placeholder="نام خانوادگی"
              outlined
              dense
              required
              :rules="[phoneRules.required]"
            />

            <v-text-field
              v-model="checkPhone"
              placeholder="شماره موبایل"
              outlined
              required
              dense
              :rules="[
                phoneRules.required,
                phoneRules.validNum,
                phoneRules.select2,
              ]"
            />

            <v-text-field
              placeholder="رمز عبور (کد ملی) "
              @click:append="show4 = !show4"
              outlined
              dense
              required
              v-model="checkMelliCode"
              :rules="[
                melliRules.required,
                melliRules.validNum,
                melliRules.select2,
                melliRules.select3,
              ]"
            />
            <br />

            <div class="w-100">
              <v-btn
                :loading="signUpLoading"
                class="btnsize ml-1"
                color="#90c445"
                elevation="5"
                rounded
                large
                type="submit"
                variant="primary"
                :disabled="
                  MelliCodeStatus && MobileStatus && form.Family && form.Name
                    ? false
                    : true
                "
              >
                ثبت
              </v-btn>

              <v-btn
                class="select2"
                color="#f7b73a"
                elevation="5"
                rounded
                larg
                outlined
                @click="goBack"
                >بازگشت
              </v-btn>
            </div>
          </b-form>
        </div>
      </b-col>
      <b-col cols="2"> </b-col>
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
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config";


export default {
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

        this.form.Password = meli_code;
      }
    },

    checkPhone: function (phone) {
      this.phone = phone;
      if (phone.length == 11) {
        if (this.regExp.test(phone)) {
          console.log(phone, "lettter found");
          this.MobileStatus = false;
          this.form.Mobile = phone;

          return this.MobileStatus;
        }

        this.MobileStatus = true;
        this.form.Mobile = phone;

        return this.MobileStatus;
      } else {
        this.MobileStatus = false;
        this.form.Mobile = phone;

        return this.MobileStatus;
      }
    },
  },
  data() {
    return {
      adValidate: "",
      signUpLoading: false,
      show4: false,
      regExp: /[a-zA-Z]/g,
      notVaildCode: "",

      //snackbar
      snackbarGreen: false,
      snackColor: "",

      MessageType: "",

      text: "",

      checkMelliCode: "",
      checkPhone: "",

      phoneRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validNum: (v) => /^[\s۰-۹\s0-9]+$/.test(v) || "شماره موبایل معتبر نیست",
        select2: (v) => v.length == 11 || "شماره موبایل معتبر نیست",
      },

      melliRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validNum: (v) => /^[\s۰-۹\s0-9]+$/.test(v) || "کد ملی معتبر نیست",
        select2: (v) => v.length == 10 || "کد ملی معتبر نیست",
        select3: (v) => v == this.notVaildCode || "   کد ملی معتبر نمیباشد",
      },
      MobileStatus: false,
      MelliCodeStatus: false,

      form: {
        Mobile: "",
        Password: "",
        Name: "",
        Family: "",
      },
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();

      this.signUpLoading = true;

      let response = await axios.post(
        `${config.paseUrl}/api/User/RegisterNewCustomer`,
        this.form,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      this.text = response.data.Description;

      if (response.data.MessageType == 1) {
        this.snackbarGreen = true;

        this.snackColor = "green";
        this.$router.push({ path: "/User" });

        // this.$router.push({ path: "/customerLogin" });
      } else {
        this.snackbarGreen = true;

        this.snackColor = "red";
      }

      this.signUpLoading = false;
    },
    goBack() {
      this.$router.push({ path: "/User" });
    },
  },
};
</script>

<style>
</style>