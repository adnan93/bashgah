<template>
  <div>
    <b-row dir="rtl">
      <b-col cols="1"> </b-col>
      <b-col cols="10">
        <b-card class="mt-5" border-variant="dark" header-bg-variant="#10503b">
          <template #header>
            <div style="text-align: center">
              <p style="color: white" class="mb-0">اطلاعات تکمیلی</p>
            </div>
          </template>

          <b-form @submit="onSubmit">
            <b-row>
              <b-col>
                <v-select
                  class="select"
                  :items="Province"
                  :item-text="'Name'"
                  :item-value="'Id'"
                  type="text"
                  v-model="form.ProvinceId"
                  label="استان"
                  required
                  outlined
                  dense
                  @change="OstanChange()"
                  :rules="[emailRules.required]"
                  color="#10503b"
                  
                >
                </v-select>
                <br />

                <v-select
                                  color="#10503b"

                  class="select"
                  :items="cities"
                  :item-text="'Name'"
                  :item-value="'Id'"
                  type="text"
                  v-model="form.CityId"
                  label="شهر"
                  required
                  outlined
                  dense
                  :rules="[emailRules.required]"
                >
                </v-select>
                <br />

              <div> 
          
                
                <v-select
                                  color="#10503b"

                  id="deg1"
                  :items="Degree"
                  label="تحصیلات"
                  :item-text="'Name'"
                  :item-value="'Value'"
                  v-model="form.Degree"
                  outlined
                  dense
                  required
                  :rules="[emailRules.required]"
                  >
                </v-select>
                </div>
                <br />

                <v-text-field
                                  color="#10503b"

                  label="شغل"
                  :item-text="'Name'"
                  :item-value="'Value'"
                  v-model="form.JobType"
                  outlined
                  dense
                  required
                  :rules="[emailRules.required]"
                >
                </v-text-field>
                <br>

                <div>
                  
                      <v-text-field
                      id="date3"
                    label="تاریخ تولد"
                  :item-text="'Name'"
                  :item-value="'Value'"
                    v-model="form.BirthDate"
                  outlined
                  dense
                  required
                  :rules="[emailRules.required]"
                  append-icon="today"
                >
                </v-text-field>

                  <date-picker
                  element="date3"
                    class="datePicker"
                    v-model="form.BirthDate"
                    label="تاریخ تولد"
                    color="#10503B"
                    format="jYYYY-jMM-jDD"
                    inputFormat="YYYY-MM-DD"
                    type="date"
                  ></date-picker>

                </div>

                <br />
              </b-col>

              <b-col>
                <v-text-field
                                  color="#10503b"

                  v-model="form.Address"
                  type="text"
                  label="آدرس"
                  outlined
                  required
                  dense
                  :rules="[phoneRules.required]"
                />
                <br />

                <v-text-field
                                  color="#10503b"

                  v-model="form.Email"
                  style="hight: 150px"
                  type="Email"
                  label="ایمیل"
                  :rules="[emailRules.required]"
                  outlined
                  required
                  dense
                />
                <br />

                <v-select
                                  color="#10503b"

                  :items="Married"
                  label="وضعیت تاهل"
                  :item-text="'Name'"
                  :item-value="'Value'"
                  v-model="form.IsMarried"
                  outlined
                  dense
                  required
                  :rules="[emailRules.required]"
                >
                </v-select>
                <br />

                <v-select
                                  color="#10503b"

                  class="select"
                  :items="Gender"
                  :item-text="'Name'"
                  :item-value="'Value'"
                  type="text"
                  label="جنسیت"
                  v-model="form.Gender"
                  required
                  outlined
                  dense
                  :rules="[emailRules.required]"
                >
                </v-select>

                <!-- <v-text-field
                id="pic"
                                    v-model="form.ProfilePictrue"
                  style="hight: 150px"
                  type="Email"
                  label="  250*250 عکس پروفایل "
                  :rules="[emailRules.required]"
                  outlined
                  required
                  dense
                /> -->
                <br>
                

                <v-file-input
                                  color="#10503b"

                element="pic"
                  placeholder="  250*250 عکس پروفایل "
                  outlined
                  :clearable="true"
                  append-icon="add_a_photo"
                  prepend-icon=""
                  @change="bgBase64"
                  v-model="imgId" 
                  accept=image/*
                  show-size                  
                >
                </v-file-input>

                <b-row>
                  <div class="container" align="left">
                    <v-img
                      :src="`${this.paseUrl}/api/Customer/GetPictureFile/${imgId}`"
                      width="25%"
                      height="100%"
                      style="border-radius: 10px; position: relative"
                    ></v-img>
                  </div>
                </b-row>
              </b-col>
            </b-row>

            <v-btn
              class="btnsize ml-1"
              color="#90c445"
              elevation="5"
              rounded
              x-large
              @click="updateCust()"
              style="color:white"

               :disabled=" form.Degree
                  ? false
                  : true
              "

              type="submit"
              variant="primary"
              :loading="loadingbtn"
              >ثبت
            </v-btn>

            <br />
          </b-form>

        </b-card>
      </b-col>

      <b-col cols="1"> </b-col>
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
// import { mapGetters, mapActions } from "vuex";

import config from "../config";

export default {
  name: "Update",
  data() {
    return {

      paseUrl: `${config.paseUrl}`,

      text: "  در حال دریافت اطلاعات ...",
      bDate: "",
      snackbarGreen: false,

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

      rules: {
        select: [(v) => !!v || "این فیلد الزامی است"],
        select2: [(v) => v.length > 0 || "Item is required in select 2"],
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

      imgRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validImg: (v) =>
          v.size < 500000 || "حجم عكس بايد كمتر از  500 KB  می باشد",
      },

      Province: [],
      cities: [],
      files: [],

      //form
      form: {
        Gender: "",
        IsMarried: "",
        BirthDate: "",
        Degree: "",
        JobType: "",
        Email: "",
        Address: "",
        CityId: "",
        ProfilePictrue: "",
        Description: "",
        Base64File: "",
        FileBytes: "",
      },

      mar: null,

      Gender: [
        { Name: "مرد", Value: "true" },
        { Name: "زن", Value: "false" },
      ],

      Married: [
        { Name: "متاهل", Value: "true" },
        { Name: "مجرد", Value: "false" },
      ],

      Degree: [
        { Name: "دیپلم", Value: 5 },
        { Name: "کاردانی", Value: 1 },
        { Name: "لیسانس", Value: 2 },
        { Name: "فوق لیسانس", Value: 3 },
        { Name: "دکترا", Value: 4 },
      ],

      show4: false,
    };
  },
  async created() {
    console.log("coooon"+this.paseUrl)
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }

    this.snackbarGreen = true;
    this.loadingbtn = true;
    let rest = await axios.get(`${this.paseUrl}/api/Province/GetAll`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    this.Province = rest.data;

    console.log("Province: ", rest.data);

    let response = await axios.get(
      `${this.paseUrl}/api/Customer/GetMyUser`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (response) {
      this.snackbarGreen = true;
    }

    console.log("Customer: ", response.data);
    this.form.Name = response.data.Name;
    this.form.Family = response.data.Family;

    this.form.Password = response.data.Password;

    this.form.Mobile = response.data.Mobile;

    this.form.IsMarried = response.data.IsMarried.toString();
    this.form.Gender = response.data.Gender.toString();

    this.bDate = response.data.BirthDate;

    if (this.bDate == "0001-01-01T00:00:00") {
      console.log("date :: ", response.data.BirthDate.toString());

      this.form.BirthDate = null;
    } else {
      this.form.BirthDate = this.bDate.substring(0, 10);
    }

    //this.form.BirthDate = this.bDate.substring(0, 10);

    this.form.Degree = response.data.Degree;

    this.form.JobType = response.data.JobType;

    this.form.Email = response.data.Email;

    this.form.Address = response.data.Address;

    this.form.CityId = response.data.CityId;
    this.imgId = response.data.ProfilePictrue;

    this.form.NationalCode = response.data.NationalCode;
    this.form.Kargozar = response.data.Kargozar;

    let res = await axios.get(
      `${this.paseUrl}/api/City/GetByProvinceId/${response.data.ProvinceId}`,
      response.data.ProvinceId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    this.getImg();
    this.cities = res.data;

    this.form.ProvinceId = response.data.ProvinceId;

    this.form.ProfilePictrue = response.data.ProfilePictrue;
    this.loadingbtn = false;
  },
  mounted() {},

  watch: {},

  methods: {
    async onSubmit(event) {
      event.preventDefault();

      console.log("form: ", this.form);

      this.loadingbtn = true;
      await axios
        .post(`${this.paseUrl}/api/Customer/Update`, this.form, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("updated customer: ", response);

          this.$router.push({ path: "/customerProfile" });
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.loadingbtn = false;
    },
    // goBack() {
    //   this.$router.push({ path:"/Update"});
    // },

    async getImg() {
      await axios.get(
        `${this.paseUrl}/api/Customer/GetPictureFile/${this.imgId}`,
        this.imgId,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
    },

    async bgSend() {
      this.form.Base64File = this.bg64;
    },

    bgBase64(e) {
      new Promise((res) => {
        const fileReader = new FileReader();
        fileReader.onload = function (FileLoadEvent) {
          const image64 = FileLoadEvent.target?.result;
          res(image64);
        };
        fileReader.readAsDataURL(e);
      }).then((img) => {
        this.bg64 = img;
        this.bgSend();
      });

      // this.images.push(e.name);
    },

    async OstanChange() {
      let res = await axios.get(
        `${this.paseUrl}/api/City/GetByProvinceId/${this.form.ProvinceId}`,
        this.form.ProvinceId,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      this.cities = res.data;
      console.log("cities", this.cities);
    },

    async sendImg() {
      console.log(this.imageFile);

      await axios.post(`${this.paseUrl}/api/Customer/UpdateUserImage`, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
        data: this.imageFile,
      });

      // post({
      //   method: "post",
      //   url: `http://95.217.131.10/api/Customer/UpdateUserImage`,
      //   data: this.imageFile,
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      // .then((response) => {
      //   console.log(response);

      // })
      // .catch((e) => {
      //   this.errors.push(e);
      // });
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