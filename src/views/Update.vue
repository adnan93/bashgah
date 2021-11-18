<template>
  <div>
    <b-row dir="rtl">
      <b-col cols="1"> </b-col>
      <b-col cols="10">
        <b-card>
          <template #header>
            <div style="text-align: center">
              <b class="mb-0">ويرايش اطلاعات مشتری</b>
            </div>
          </template>

          <b-row>
            <b-col>
              <v-text-field
                type="text"
                v-model="form.Name"
                placeholder="نام"
                required
                outlined
              />

              <br />

              <v-text-field
                type="text"
                v-model="form.Family"
                placeholder="نام خانوادگی"
                required
                outlined
              />

              <br />

              <v-text-field
                :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="form.Password"
                :type="show4 ? 'text' : 'password'"
                required
                placeholder="رمز عبور"
                @click:append="show4 = !show4"
                outlined
              ></v-text-field>

              <br />

              <v-select
                :items="Married"
                label="وضعیت تاهل"
                :item-text="'Name'"
                :item-value="'Value'"
                v-model="mar"
                outlined
                dense
              >
              </v-select>

              <br />

              <v-text-field
                v-model="form.Mobile"
                placeholder="شماره موبایل"
                required
                outlined
              />

              <br />

              <v-text-field
                v-model="form.BirthDate"
                placeholder="تاریخ تولد"
                required
                outlined
              />

              <br />
            </b-col>

            <b-col>
              <v-text-field
                v-model="form.Degree"
                type="integer"
                placeholder="تحصیلات"
                outlined
                required
              />
              <br />

              <v-text-field
                v-model="form.JobType"
                type="integer"
                placeholder="شغل"
                outlined
                required
              />
              <br />

              <v-text-field
                v-model="form.Email"
                type="email"
                placeholder="ایمیل"
                outlined
                required
              />
              <br />

              <v-select
                class="select"
                :items="Gender"
                :item-text="'Name'"
                :item-value="'Value'"
                type="text"
                placeholder="جنسیت"
                required
                outlined
                dense
              >
              </v-select>
              <br />

              <v-text-field
                v-model="form.Address"
                type="text"
                placeholder="آدرس"
                outlined
                required
              />
              <br />

              <v-select
                class="select"
                :items="Province"
                :item-text="'Name'"
                :item-value="'Value'"
                type="text"
                v-model="form.ostan"
                placeholder="استان"
                required
                outlined
                dense
              >
              </v-select>
              <br />

              <v-select
                class="select"
                :items="showList"
                :item-text="'Name'"
                :item-value="'Value'"
                type="text"
                v-model="form.CityId"
                placeholder="شهر"
                required
                outlined
                dense
              >
              </v-select>
              <br />

              <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder=" عکس پروفایل آپلود کنید"
                prepend-icon=""
                append-icon="mdi-camera"
                outlined
              ></v-file-input>
            </b-col>
          </b-row>

          <v-btn
            class="btnsize ml-1"
            color="#bea44d"
            elevation="5"
            rounded
            large
          @click="updateCust()"
            variant="primary"
            >ثبت
          </v-btn>

          <v-btn
            :loading="resetLoading"
            class="select2"
            color="#bea44d"
            elevation="3"
            rounded
            large
            outlined
            @click="signup()"
            >انصراف</v-btn
          >
        </b-card>
      </b-col>

      <b-col cols="1"> </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
// import config from "@/config";

export default {
  name: "Update",
  async created() {
    // let rest = await axios.get(
    //   `http://localhost:8080/api/Province/GetAll`,

    //   {
    //     headers: {
    //       token: localStorage.getItem("token"),
    //     },
    //   }
    // );
    // console.log(rest);
    // this.Province = rest.data;

    //  let res = await axios.get(
    //   `http://localhost:8080/api/City/GetByProvinceId/${this.form.ostan.id}`, this.form.ostan.id,

    //   {
    //     headers: {
    //       token: localStorage.getItem("token"),
    //     },
    //   }
    // );
    // console.log(res);
    // this.cities = res.data;

    let response = await axios.get(
      `http://localhost:8080/api/Customer/GetMyUser`,

      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    console.log(response);
    this.form.Name = response.data.Name;
    this.form.Family = response.data.Family;

    this.form.Password = response.data.Password;

    this.form.Gender = response.data.Gender;

    this.form.Mobile = response.data.Mobile;

    this.mar = response.data.IsMarried;
    console.log("dfdfdfdfd", this.mar);

    // if(  response.data.IsMarried){
    //   this.mar = "متاهل";
    //   console.log ("dfdfdfdfd", this.mar)

    // }

    this.form.BirthDate = response.data.BirthDate;

    this.form.Degree = response.data.Degree;
    this.form.JobType = response.data.JobType;

    this.form.Email = response.data.Email;

    this.form.Address = response.data.Address;

    this.form.CityId = response.data.CityId;
    this.form.ProfilePictrue = response.data.ProfilePictrue;
  },

  data() {
    return {
      Province: [],
      cities: [],

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
        ostan: "",
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

      show4: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },

  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    async updateCust() {

      await axios
        .post(`http://localhost:8080/api/Customer/Update`, this.form, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);

          this.$router.push({ path: "/customerProfile" });
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>

<style>
</style>