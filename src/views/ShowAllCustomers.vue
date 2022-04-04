<template>
  <div class="scrolling-warpper" >
    <h3 class="mt-2" align="center">همه مشتریان</h3>
    <br />
    <v-btn
      class="select2"
      color="#90c445"
      elevation="3"
      rounded
      larg
      @click="getFile"
      >دریافت فایل
    </v-btn>

    <b-table
      :items="allCustomers"
      :fields="Customerfields"
      striped
      responsive="sm"
      hover
    >
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
import Papa from "papaparse";
 import config from "@/config";


export default {
  data() {
    return {
      allCustomers: [],

      Customerfields: [
        { FullName: "نام " },
        { NationalCode: "کد ملی" },
        { Mobile: "شماره موبایل" },
        { Kargozar: "کارگزار" },
        { Address: " آدرس" },
        { Birthdate: "تاریخ تولد" },
        { Province: "استان " },
        { City: "شهر" },
        { Married: "وضعیت تاهل" },
        { Gender: "جنسیت" },
        { Email: "ایمیل" },
        { Degree: "تحصیلات" },
        {Points: "امتیازات"},
        { JobType: "شغل" },
      ],
    };
  },
  async created() {
    await axios
      .get(`${config.paseUrl}/api/User/GetAllCustomerJson`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        this.allCustomers = response.data;

        console.log("ALL Cus", response);
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  methods: {
    getFile() {
      var blob = new Blob([Papa.unparse(this.allCustomers)], {
        //   type: "text/csv;charset=utf-8;",
        type: "text/csv;charset=UTF-8,\uFEFF",
      });

      var link = document.createElement("a");

      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "filename.csv");

      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style>
.scrolling-warpper{
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
</style>