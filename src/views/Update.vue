<template>
  <div>
    <b-row dir="rtl">
      <b-col cols="1"> </b-col>
      <b-col cols="10">
        <b-card class="mt-3">
          <template #header>
            <div style="text-align: center">
              <b class="mb-0">ويرايش اطلاعات کاربر</b>
            </div>
          </template>

          <b-form @submit="onSubmit">
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
                  :type="show4 ? 'text' : 'password'"
                  required
                  placeholder="رمز عبور"
                  @click:append="show4 = !show4"
                  outlined
                ></v-text-field>

                <br />

                <v-select
                  class="select"
                  :items="showList"
                  :item-text="'Name'"
                  :item-value="'Value'"
                  type="text"
                  v-model="form.Gender"
                  placeholder="جنسیت"
                  required
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

                <v-select
                  class="select"
                  :items="showList"
                  :item-text="'Name'"
                  :item-value="'Value'"
                  type="text"
                  v-model="form.IsActive"
                  placeholder="فعال بودن"
                  required
                  outlined
                  dense
                >
                </v-select>
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
                  :items="showList"
                  :item-text="'Name'"
                  :item-value="'Value'"
                  type="text"
                  v-model="form.IsMarried"
                  placeholder="وضعیت تاهل"
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
              type="submit"
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
          </b-form>

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
  data() {
    return {
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
      },
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

    async onSubmit(event) {
      event.preventDefault();

      await axios
        .post(`http://localhost:8080/api/Customer/Login`, this.form)
        .then((response) => {
          console.log(response);

          // if (response.data.Description == "کد احراز هویت صحیح نمی باشد") {
          //   this.snackbarColor = "red";
          // } else if (response.data.Description == " ") {
          //   this.snackbarColor = "success";
          // }

          this.text = response.data.JoinedErrors;
          this.signUpLoading = false;

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
</style>