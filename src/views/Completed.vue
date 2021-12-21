<template>
  <div>
    <b-row dir="rtl">
      <b-col cols="1"> </b-col>
      <b-col cols="10">
        <b-card class="mt-5" border-variant="dark" header-bg-variant="dark">
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
                >
                </v-select>
                <br />

                <v-select
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

                <v-select
                  :items="Degree"
                  label="تحصیلات"
                  :item-text="'Name'"
                  :item-value="'Value'"
                  v-model="form.Degree"
                  outlined
                  dense
                  :rules="[emailRules.required]"
                  required
                >
                </v-select>

                <br />

                <v-text-field
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
                <div>
                  <date-picker
                    class="datePicker"
                    v-model="form.BirthDate"
                    label="تاریخ تولد"
                    color="#10503B"
                    format="jYYYY-jMM-jDD"
                    inputFormat="YYYY-MM-DD"
                    type="date"
                    required
                    :rules="[emailRules.required]"
                  ></date-picker>
                </div>

                <br />
              </b-col>

              <b-col>
                <v-text-field
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

                <v-file-input
                  label="  250*250 عکس پروفایل "
                  outlined
                  :clearable="true"
                  append-icon="add_a_photo"
                  prepend-icon=""
                  @change="bgBase64"
                  accept=image/*
                  show-size
                  :rules="imgRules"
                  
                >
                </v-file-input>

                <b-row>
                  <div class="container" align="left">
                    <v-img
                      :src="`http://localhost:8080/api/Customer/GetPictureFile/${imgId}`"
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
  async created() {
    this.snackbarGreen = true;
    this.loadingbtn = true;
    let rest = await axios.get(`http://localhost:8080/api/Province/GetAll`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    this.Province = rest.data;

    console.log("Province: ", rest.data);

    let response = await axios.get(
      `http://localhost:8080/api/Customer/GetMyUser`,
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

    this.form.BirthDate = response.data.BirthDate.toString();

    this.form.Degree = response.data.Degree;

    this.form.JobType = response.data.JobType;

    this.form.Email = response.data.Email;

    this.form.Address = response.data.Address;

    this.form.CityId = response.data.CityId;
    this.imgId = response.data.ProfilePictrue;

    this.form.NationalCode = response.data.NationalCode;
    this.form.Kargozar = response.data.Kargozar;

    let res = await axios.get(
      `http://localhost:8080/api/City/GetByProvinceId/${response.data.ProvinceId}`,
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
        (v) => v.size < 500000 || "حجم عكس بايد كمتر از  500 KB  می باشد",
      ],

      Province: [],
      cities: [],
      files: [],

      //form
      form: {
        Name: "",
        Family: "",
        Password: "",
        Gender: "",
        Mobile: "",
        IsActive: "",
        IsMarried: "",
        BirthDate: "",
        Degree: "",
        JobType: "",
        Email: "",
        Address: "",
        CityId: "",
        ProfilePictrue: "",
        ProvinceId: "",
        Base64File: "",
        Kargozar: "",
        NationalCode: "",
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

  watch: {},

  methods: {
    async onSubmit(event) {
      event.preventDefault();

      console.log("form: ", this.form);

      this.loadingbtn = true;
      await axios
        .post(`http://localhost:8080/api/Customer/Update`, this.form, {
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
        `http://localhost:8080/api/Customer/GetPictureFile/${this.imgId}`,
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
        `http://localhost:8080/api/City/GetByProvinceId/${this.form.ProvinceId}`,
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

      await axios.post(`http://localhost:8080/api/Customer/UpdateUserImage`, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
        data: this.imageFile,
      });

      // post({
      //   method: "post",
      //   url: `http://localhost:8080/api/Customer/UpdateUserImage`,
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
</style>