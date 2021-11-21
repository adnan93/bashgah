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
                label="نام"
                required
                outlined
                dense
              />

              <br />

              <v-text-field
                type="text"
                v-model="form.Family"
                label="نام خانوادگی"
                required
                outlined
                dense
              />

              <br />

              <!-- <v-text-field
                v-model="form.BirthDate"
                label="تاریخ تولد"
                required
                outlined
              />

              <br /> -->

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
              >
              </v-select>

              <br />

              <v-text-field
                v-model="form.Mobile"
                label="شماره موبایل"
                required
                outlined
                dense
              />

              <v-select
                :items="Degree"
                label="تحصیلات"
                :item-text="'Name'"
                :item-value="'Value'"
                v-model="form.Degree"
                outlined
                dense
              >
              </v-select>

              <br />

              <v-select
                :items="JobType"
                label="شغل"
                :item-text="'Name'"
                :item-value="'Value'"
                v-model="form.JobType"
                outlined
                dense
              >
              </v-select>

              <br />
            </b-col>

            <b-col>
              <v-text-field
                :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="form.Password"
                :type="show4 ? 'text' : 'password'"
                required
                label="رمز عبور"
                @click:append="show4 = !show4"
                outlined
                dense
              ></v-text-field>

              <br />

              <v-text-field
                v-model="form.Address"
                type="text"
                label="آدرس"
                outlined
                required
                dense

              />
              <br />

              <v-text-field
                v-model="form.Email"
                style="hight: 150px;"
                type="email"
                label="ایمیل"
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
              >
              </v-select>
       

              <div>
                <date-picker v-model="form.BirthDate"
                 label="تاریخ تولد"
                ></date-picker>
              </div>
               <br />

              <!-- <v-file-input
                v-model="files"
                accept="image/png, image/jpeg, image/bmp"
                placeholder=" عکس پروفایل آپلود کنید"
                prepend-icon=""
                append-icon="mdi-camera"
                outlined
              ></v-file-input> -->

              <img :src="imageUrl" height="150" v-if="imageUrl" />
              <v-text-field
                label=" عکس پروفایل خود را آپلود کنید"
                @click="pickFile"
                v-model="imageName"
                prepend-icon="attach_file"
              ></v-text-field>
              <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
              />
                  <br />
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
            :loading="loadingbtn"
            >ثبت
          </v-btn>

          <!-- <v-btn
            :loading="resetLoading"
            class="select2"
            color="#bea44d"
            elevation="3"
            rounded
            large
            outlined
            @click="signup()"
            >انصراف</v-btn
          > -->
        </b-card>
      </b-col>

      <b-col cols="1"> </b-col>
    </b-row>

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

    let rest = await axios.get(`http://localhost:8080/api/Province/GetAll`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    this.Province = rest.data;

    //  console.log('Province', this.Province);

    //    let rest1 = await axios.get(`http://localhost:8080/api/City/GetAll`, {
    //   headers: {
    //     token: localStorage.getItem("token"),
    //   },
    // });

    // this.cities = rest1.data;

    //  console.log('cities', this.cities);

    let response = await axios.get(
      `http://localhost:8080/api/Customer/GetMyUser`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    console.log("Customer: ", response.data);
    this.form.Name = response.data.Name;
    this.form.Family = response.data.Family;

    this.form.Password = response.data.Password;

    this.form.Mobile = response.data.Mobile;

    this.form.IsMarried = response.data.IsMarried.toString();
    this.form.Gender = response.data.Gender.toString();

    this.form.BirthDate = response.data.BirthDate.toString();

    this.form.Degree = response.data.Degree;
    console.log("Degree: ", this.form.Degree);

    this.form.JobType = response.data.JobType;

    this.form.Email = response.data.Email;

    this.form.Address = response.data.Address;

    this.form.CityId = response.data.CityId;

    this.form.ProvinceId = response.data.ProvinceId;

    console.log("ProvinceId: ", this.form.ProvinceId);

    this.form.ProfilePictrue = response.data.ProfilePictrue;

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
    console.log("cities", res.data);

  },

  data() {
    return {

        text: "  در حال دریافت اطلاعات ...",
      loadingbtn: false,
      date: "",
      //img
      title: "Image Upload",
      dialog: false,
      imageName: "",
      imageUrl: "",
      imageFile: {},

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
        { Name: "دیپلم", Value: 0 },
        { Name: "کاردانی", Value: 1 },
        { Name: "لیسانس", Value: 2 },
        { Name: "فوق لیسانس", Value: 3 },
        { Name: "دکترا", Value: 4 },
      ],

      JobType: [
        { Name: "کارمند", Value: 0 },
        { Name: "شغل آزاد", Value: 1 },
      ],

   


      show4: false,
    };
  },

  watch: {
    getOstan() {},
  },

  methods: {
    pickFile() {
      this.$refs.image.click();
    },

    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
          this.sendImg();
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },

    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    async updateCust() {
      this.loadingbtn =true;
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

              this.loadingbtn =false;

    },

    //   async submitUpdateUserImage() {

    //   let vm = this._updateUserImageVue;
    //   var formData = new FormData();
    //   var fileUpload = vm.$refs.fileUpload;

    //   if (fileUpload && fileUpload["files"].length > 0) {
    //     formData.append(fileUpload["name"], fileUpload["files"][0]);
    //   }
    //   else
    //   {
    //     await this.notify({vm , data : {Message : "فایل باید وارد شود." , MessageType : MessageType.Error ,Obj : null }})
    //     return ;
    //   }
    //   return axios({
    //     method: "post",
    //     url: `${baseUrl}/UpdateUserImage`,
    //     data: formData,
    //     headers: { "Content-Type": "multipart/form-data" }
    //   })

    // },

    async sendImg() {
      console.log(this.imageFile);

      await axios.post(`http://localhost:8080/api/Customer/UpdateUserImage`, {
        headers: { "Content-Type": "multipart/form-data" },
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
</style>