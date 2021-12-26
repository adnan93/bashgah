<template>
  <div class="home">
    <div id="nav">
      <br />

      <!-- تعداد امتیاز -->
      <b-row>
        <b-col cols="2"> </b-col>

        <b-col cols="8">
          <div dir="rtl">
            <h3>
              مشتری گرامی {{ FullName }} تعداد امتیاز های فعلی ({{ points }})
              امتیاز می باشد
            </h3>
          </div>
        </b-col>

        <b-col cols="2"> </b-col>
      </b-row>

      <br />

      <b-row dir="rtl">
        <b-col cols="1"> </b-col>
        <b-col cols="10">
          <br />
          <div class="container">
            <v-btn
              class="btnsize ml-3"
              color="#90c445"
              elevation="3"
              rounded
              large
              @click="openCreateScoreModal"
              :loading="loadingbtn"
            >
              <v-icon style="font-size: 20px">star_outline</v-icon>
              مشاهده لیست فعالیت ها
            </v-btn>

            <v-btn
              class="btnsize"
              color="#90c445"
              elevation="3"
              rounded
              large
              @click="openCreateProgramModal"
              :loading="loadingbtn"
            >
              <v-icon style="font-size: 20px">star_outline</v-icon>
              مشاهده لیست برنامه ها
            </v-btn>

            <hr />
            <h4>برنامه مد نظر خود را انتخاب کنید:</h4>
            <br />
            <br />

            <Programs :programs="AllPrograms" />
          </div>

          <div>
            <b-modal
              v-model="showCreateModal"
              dir="rtl"
              id="modal-center"
              title=" لیست فعالیت ها"
              :header-bg-variant="headerBgVariant"
              :header-text-variant="headerTextVariant"
            >
              <b-container fluid>
                <b-row>
                  <b-col>
                    <div>
                      <b-table
                        :items="CustomerScores"
                        :fields="scorefields"
                        striped
                        responsive="sm"
                        hover
                        outlined
                      >
                        <template #cell(actions)="row">
                          <div @click="addNewScoreToCustomer(row)">
                            <div
                              v-if="
                                getenScores.includes(row.item.ActivityName) ||
                                row.item.ActivityName == selectedName
                              "
                            >
                              <v-icon style="font-size: 20px; color: #90c445">
                                done_all
                              </v-icon>
                            </div>

                            <div v-else>
                              <v-icon style="font-size: 20px; color: #90c445">
                                add_circle
                              </v-icon>
                            </div>
                          </div>
                        </template>

                        <template #table-busy>
                          <div class="text-center my-2">
                            <b-spinner class="align-middle"></b-spinner>
                            <strong>در حال دریافت اطلاعات...</strong>
                          </div>
                        </template>
                      </b-table>
                    </div>
                  </b-col>
                </b-row>
              </b-container>

              <template #modal-footer>
                <div class="w-100">
                  <v-btn
                    class="select2"
                    color="#f7b73a"
                    elevation="3"
                    rounded
                    larg
                    outlined
                    @click="closeCreateModal"
                    >انصراف
                  </v-btn>
                </div>
              </template>

              <v-snackbar v-model="snackbarGreen" :color="snackColor" dir="rtl">
                {{ text }}

                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="red"
                    rounded
                    v-bind="attrs"
                    text
                    @click="snackbarGreen = false"
                  >
                    x
                  </v-btn>
                </template>
              </v-snackbar>
            </b-modal>
          </div>
        </b-col>

        <b-col cols="1"> </b-col>
      </b-row>

      <b-row>
        <b-col cols="1"> </b-col>
        <b-col cols="10">
          <div dir="rtl" class="container">
            <b-row dir="rtl">
              <div>
                <b-row dir="rtl">
                  <b-col class="mb-5">
                    <!-- <v-btn
                          class="btnsize"
                          color="#90c445"
                          elevation="3"
                          rounded
                          large
                          @click="openCreateProgramModal"
                        >
                          <v-icon style="font-size: 20px">fact_check</v-icon>
                          افزودن برنامه
                        </v-btn>  -->

                    <div>
                      <b-modal
                        v-model="showCreateProgramModal"
                        dir="rtl"
                        id="modal-center"
                        title=" لیست برنامه ها"
                        :header-bg-variant="headerBgVariant"
                        :header-text-variant="headerTextVariant"
                      >
                        <b-container fluid>
                          <b-row>
                            <b-col>
                              <div>
                                <b-table
                                  :items="CustomerPrograms"
                                  :fields="programsFields"
                                  striped
                                  responsive="sm"
                                  hover
                                  outlined
                                >
                                </b-table>
                              </div>
                            </b-col>
                          </b-row>
                        </b-container>

                        <template #modal-footer>
                          <div class="w-100">
                            <v-btn
                              class="select2"
                              color="#f7b73a"
                              elevation="3"
                              rounded
                              larg
                              outlined
                              @click="closeCreateProgramModal"
                              >انصراف
                            </v-btn>
                          </div>
                        </template>
                      </b-modal>
                    </div>
                  </b-col>
                  <b-col> </b-col>
                </b-row>

                <div v-show="showlistPrograms">
                  <b-table
                    :items="CustomerPrograms"
                    :fields="program"
                    striped
                    responsive="sm"
                    hover
                    :busy="isBusyProgram"
                    outlined
                  >
                    <template #cell(Status)="row">
                      <v-icon
                        @click="editRow(row)"
                        style="font-size: 20px; color: blue"
                        >edit</v-icon
                      >
                    </template>

                    <template #table-busy>
                      <div class="text-center my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>در حال دریافت اطلاعات...</strong>
                      </div>
                    </template>
                  </b-table>
                </div>
              </div>
            </b-row>
          </div>
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
    </div>
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
  </div>
</template>

<script>
import axios from "axios";
import Programs from "../components/Programs.vue";

export default {
  name: "customerProfile",

  components: {
    Programs,
  },

  data() {
    return {
      testprograms: [],
      loadingbtn: false,

      //snackbar
      snackColor: "",
      snackbarGreen: false,
      text: "",
      token: "",
      y: "top",

      //create
      showlistPrograms: false,

      trueIcon: false,
      addIcon: true,
      icon: "add_circle",
      getenPrograms: [],
      getenScores: [],

      createLoading: false,
      AllScores: [],
      AllPrograms: [],
      CustomerScores: [],
      CustomerPrograms: [],

      form: {
        Points: "",
        ActivityName: "",
        Description: "",
      },
      //loading table
      isBusyScore: false,
      isBusyProgram: false,

      //Add New Score
      editLoading: false,
      editedRow: "",
      selectedId: "",
      selectedName: "",

      editForm: {
        Id: "",
        Points: "",
        ActivityName: "",
        Description: "",
      },

      //Delete
      deleteLoading: false,
      row: "",

      //customer
      FullName: "",

      //date
      today: 0,

      points: 0,

      //modal
      showCreateModal: false,
      showEditModal: false,
      showCreateProgramModal: false,
      headerBgVariant: "dark",
      headerTextVariant: "light",

      //table
      fields: [
        { ActivityName: "نام فعالیت" },
        { Points: "تعداد امتیاز" },
        { Description: "توضیحات" },
      ],

      program: [
        { Title: "نام برنامه" },
        { PointsNeeded: "امتیاز لازم" },
        { Description: "توضیحات" },
      ],

      //scorefields
      scorefields: [
        { ActivityName: "نام فعالیت" },
        { Points: "تعداد امتیاز" },
        { Description: "توضیحات" },
      ],

      programsFields: [
        { Title: "نام برنامه" },
        { PointsNeeded: "تعداد امتیاز لازم" },
        { Status: "وضعیت" },
        { UserDescription: "توضیحات" },
      ],
      Title: "",

      items: [],
      UpdatedCustomerPrograms: [],
    };
  },

  methods: {
    showPrograms() {
      this.showlistPrograms = !this.showlistPrograms;
    },

    showTrueIcon(row) {
      console.log(row);
      this.trueIcon = false;
      return this.trueIcon;
    },

    showAddIcon(row) {
      console.log("showIcon", row);
      this.addIcon = true;
      return this.addIcon;
    },

    //create
    openCreateScoreModal() {
      this.showCreateModal = true;
      // console.log("getToken", this.getToken);
      // console.log("getMessage", this.getMessage);
    },
    closeCreateModal() {
      this.showCreateModal = false;
    },

    openCreateProgramModal() {
      this.showCreateProgramModal = true;
    },

    closeCreateProgramModal() {
      this.showCreateProgramModal = false;
    },

    //add new score

    async addNewScoreToCustomer(row) {
      this.editedRow = row;
      this.selectedName = row.item.ActivityName;
      this.selectedId = row.item.Id;
      // this.openEditModal();
      console.log("CustomerScores:", this.CustomerScores);

      console.log("AllScores:", this.AllScores);

      console.log("selectedId:", this.selectedId);

      for (let item of this.CustomerScores) {
        this.getenScores.push(item.ActivityName);
      }
      console.log("selectedName:", this.selectedName);

      if (this.getenScores.includes(this.selectedName)) {
        console.log("has been added ! ");
        this.snackColor = "red";
        this.text = "اين فعاليت قبلا اضافه شده !";
        this.snackbarGreen = true;
      } else {
        console.log("noot");
        // this.snackColor = "green";

        // this.text = "فعالیت با موفقیت اضافه شده";

        await axios
          .post(
            `http://localhost:8080/api/Customer/AddScoreToCustomer/${this.selectedId}`,
            this.selectedId,
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            // this.CustomerScores = response.data;

            this.text = response.data.Description;

            if (response.data.MessageType == 0) {
              this.snackColor = "red";
            } else {
              this.snackColor = "green";
            }
            this.snackbarGreen = true;
            console.log("add new score:", response.data);
          });

        await axios
          .get(`http://localhost:8080/api/Customer/GetCustomerScores`, {
            headers: {
              token: localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.CustomerScores = response.data;
            console.log("Customer scores:", response.data);
          })
          .catch((e) => {
            this.errors.push(e);
          });

        //Customer Points
        await axios
          .get(`http://localhost:8080/api/Customer/GetCustomerPoints`, {
            headers: {
              token: localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.points = response.data;
          })
          .catch((e) => {
            this.errors.push(e);
          });
      }
      this.showTrueIcon(row);
    },

    //add new program
    // async addNewProgramToCustomer(row) {
    //   this.icon = "done";

    //   console.log(row, "row");
    //   this.showTrueIcon = true;
    //   this.showPlusIcon = false;

    //   // let temp = [];
    //   this.editedRow = row;
    //   this.Title = row.item.Title;
    //   this.selectedId = row.item.Id;

    //   // this.openEditModal();

    //   console.log("AllPrograms:", this.AllPrograms);

    //   console.log("selectedId:", this.selectedId);

    //   for (let item of this.CustomerPrograms) {
    //     this.getenPrograms.push(item.Title);
    //   }
    //   console.log("temp", this.getenPrograms);
    //   console.log("selectedId:", this.selectedName);

    //   if (this.getenPrograms.includes(this.Title)) {
    //     console.log("added ");

    //     this.snackColor = "red";
    //     this.text = "اين برنامه قبلا اضافه شده !";
    //     this.snackbarGreen = true;
    //   } else {
    //     console.log("noot");
    //     this.snackColor = "green";

    //     await axios
    //       .post(
    //         `http://localhost:8080/api/Customer/AddProgramToCustomer/${this.selectedId}`,
    //         this.selectedId,
    //         {
    //           headers: {
    //             token: localStorage.getItem("token"),
    //           },
    //         }
    //       )
    //       .then((response) => {
    //         // this.CustomerScores = response.data;
    //         this.snackbarGreen = true;
    //         this.text = response.data.Description;
    //         if (response.data.MessageType == 0) {
    //           this.snackColor = "red";
    //         } else {
    //           this.snackColor = "green";
    //         }

    //         console.log("add new progrma:", response.data);
    //       });

    //     await axios
    //       .get(`http://localhost:8080/api/Customer/GetCustomerPrograms`, {
    //         headers: {
    //           token: localStorage.getItem("token"),
    //         },
    //       })
    //       .then((response) => {
    //         this.CustomerPrograms = response.data;
    //         console.log("Customer programs:", response.data);
    //       })
    //       .catch((e) => {
    //         this.errors.push(e);
    //       });

    //     //Customer Points
    //     await axios
    //       .get(`http://localhost:8080/api/Customer/GetCustomerPoints`, {
    //         headers: {
    //           token: localStorage.getItem("token"),
    //         },
    //       })
    //       .then((response) => {
    //         this.points = response.data;
    //       })
    //       .catch((e) => {
    //         this.errors.push(e);
    //       });
    //   }
    // },

    openEditModal() {
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
  },

  async created() {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }

    //date
    this.today = new Date().toLocaleDateString("fa-IR");
    this.loadingbtn = true;

    this.text = "در حال دریافت اطلاعات ...";
    this.snackColor = "green";
    this.snackbarGreen = true;
    this.isBusyScore = true;
    this.isBusyProgram = true;
    //Customer Points
    await axios
      .get(`http://localhost:8080/api/Customer/GetCustomerPoints`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.points = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });

    //get customer
    await axios
      .get(`http://localhost:8080/api/Customer/GetMyUser`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.FullName = response.data.FullName;
      })
      .catch((e) => {
        this.errors.push(e);
      });

    //get All scores
    // await axios
    //   .get(`http://localhost:8080/api/Score/GetAll`, {
    //     headers: {
    //       token: localStorage.getItem("token"),
    //     },
    //   })
    //   .then((response) => {
    //     this.AllScores = response.data;
    //     //   console.log("All scores:", response.data);
    //   })
    //   .catch((e) => {
    //     this.errors.push(e);
    //   });

    //GetCustomerProgram
    await axios
      .get(`http://localhost:8080/api/Customer/GetCustomerPrograms`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.CustomerPrograms = response.data;

        for (let item of this.CustomerPrograms) {
          // console.log(item)
          if (item.Status == 0) {
            console.log("item.Status", item.Status);

            item.Status = " در انتظار تایید";
          } else if (item.Status == 1) {
            item.Status = "تایید شده";
            console.log("item.Status", item.Status);
          } else if (item.Status == 2) {
            item.Status = "رد شده";
            console.log("item.Status", item.Status);
          }
        }

     
      })
      .catch((e) => {
        this.errors.push(e);
      });

    //GetCustomerScores
    await axios
      .get(`http://localhost:8080/api/Customer/GetCustomerScores`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.CustomerScores = response.data;
        //   console.log("Customer scores:", response.data);
      })
      .catch((e) => {
        this.errors.push(e);
      });

    this.isBusyScore = false;

    //get All programs
    await axios
      .get(`http://localhost:8080/api/Program/GetAll`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.AllPrograms = response.data;
        console.log("All programs:", response.data);
      })
      .catch((e) => {
        this.errors.push(e);
      });
    this.isBusyProgram = false;
    this.loadingbtn = false;
  },

  mounted() {
    this.testprograms = [
      {
        id: 1,
        text: "أموزش خريد",
        day: "sunday",
        reminder: true,
      },
      {
        id: 2,
        text: "دوره فروش  ",
        day: "satrday",
        reminder: false,
      },

      {
        id: 3,
        text: "كلاس تكنيكال",
        day: "wenthday",
        reminder: true,
      },

      {
        id: 4,
        text: "كلاس خريد",
        day: "friday",
        reminder: false,
      },

      {
        id: 5,
        text: "دوره حسابداري",
        day: "monday",
        reminder: true,
      },

      {
        id: 6,
        text: "آموزش سهام",
        day: "sunday",
        reminder: false,
      },
    ];
  },
};
</script>

<style scope>
p {
  padding: 0%;
  margin: 0%;
  margin-bottom: 0% !important;
}
.background {
  margin: 0% !important;
  padding: 0% !important;
  background-color: #f0f0f5;
  width: 10rem;
}
</style>
