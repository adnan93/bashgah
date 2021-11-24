<template>
  <div class="home">
    <div id="nav">
      <b-card-group deck class="mr-2">
        <b-card>
          <template #header>
            <div style="text-align: center">
              <b>
                <b class="mb-0"> امروز </b>
                {{ today }}
              </b>
            </div>
          </template>

          <b-row>
            <b-col cols="3"> </b-col>

            <b-col cols="6">
              <div dir="rtl">
                <h3>
                  مشتری گرامی {{ FullName }} تعداد امتیاز های فعلی
                  <b> ({{ points }}) </b> امتیاز می باشد
                </h3>
              </div>
            </b-col>

            <b-col cols="3"> </b-col>
          </b-row>

          <hr />

          <b-row>
            <b-col cols="1"> </b-col>
            <b-col cols="10">
              <div dir="rtl" class="container">
                <b-row dir="rtl">
                  <div>
                    <b-row dir="rtl">
                      <b-col class="mb-5">
                        <v-btn
                          class="btnsize"
                          color="#bea44d"
                          elevation="3"
                          rounded
                          large
                          @click="openCreateModal"
                        >
                          <v-icon style="font-size: 20px">star_outline</v-icon>
                          افزودن فعالیت
                        </v-btn>

                        <!-- add new -->
                        <div>
                          <b-modal
                            v-model="showCreateModal"
                            dir="rtl"
                            id="modal-center"
                            title=" افزودن فعالیت"
                            :header-bg-variant="headerBgVariant"
                            :header-text-variant="headerTextVariant"
                          >
                            <b-container fluid>
                              <b-row>
                                <b-col>
                                  <h3>فعالیت مد نظر را اضافه کنید:</h3>
                                  <hr />

                                  <div>
                                    <b-table
                                      :items="AllScores"
                                      :fields="scorefields"
                                      striped
                                      responsive="sm"
                                      hover
                                    >
                                      <template #cell(actions)="row">
                                        <v-icon
                                          @click="addNewScoreToCustomer(row)"
                                          style="
                                            font-size: 20px;
                                            color: #bea44d;
                                          "
                                          >add_circle
                                        </v-icon>
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
                                  color="#bea44d"
                                  elevation="3"
                                  rounded
                                  larg
                                  outlined
                                  @click="closeCreateModal"
                                  >انصراف
                                </v-btn>
                              </div>
                            </template>
                          </b-modal>
                        </div>
                      </b-col>
                      <b-col> </b-col>
                    </b-row>

                    <div>
                      <b-table
                        :items="CustomerScores"
                        :fields="fields"
                        striped
                        responsive="sm"
                        hover
                      >
                        <template #cell(actions)=""> </template>
                      </b-table>
                    </div>
                  </div>
                </b-row>
              </div>
            </b-col>

            <b-col cols="1"> </b-col>
          </b-row>

          <hr />

          <b-row>
            <b-col cols="1"> </b-col>
            <b-col cols="10">
              <div dir="rtl" class="container">
                <b-row dir="rtl">
                  <div>
                    <b-row dir="rtl">
                      <b-col class="mb-5">
                        <v-btn
                          class="btnsize"
                          color="#bea44d"
                          elevation="3"
                          rounded
                          large
                          @click="openCreateProgramModal"
                        >
                          <v-icon style="font-size: 20px">fact_check</v-icon>
                          افزودن برنامه
                        </v-btn>

                        <!-- add new -->
                        <div>
                          <b-modal
                            v-model="showCreateProgramModal"
                            dir="rtl"
                            id="modal-center"
                            title=" افزودن برنامه"
                            :header-bg-variant="headerBgVariant"
                            :header-text-variant="headerTextVariant"
                          >
                            <b-container fluid>
                              <b-row>
                                <b-col>
                                  <h3>برنامه مد نظر را اضافه کنید :</h3>

                                  <hr />

                                  <div>
                                    <b-table
                                      :items="AllPrograms"
                                      :fields="programsFields"
                                      striped
                                      responsive="sm"
                                      hover
                                    >
                                      <template #cell(actions)="row">

                                        <!-- <v-icon
                                          style="
                                            font-size: 20px;
                                            color: #bea44d;
                                          "
                                          v-show="showTrueIcon(row)"
                                        >
                                          done
                                        </v-icon>
                                             -->


                                        <v-icon
                                          @click="addNewProgramToCustomer(row)"
                                          style="
                                            font-size: 20px;
                                            color: #bea44d;
                                          "
                                       
                                        >
                                          add_circle
                                        </v-icon>

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
                                  color="#bea44d"
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

                    <div>
                      <b-table
                        :items="CustomerPrograms"
                        :fields="program"
                        striped
                        responsive="sm"
                        hover
                      >
                        <template #cell(actions)="row">
                          <v-icon
                            @click="editRow(row)"
                            style="font-size: 20px; color: blue"
                            >edit</v-icon
                          >

                          <v-icon
                            @click="deletRow(row)"
                            style="font-size: 20px; color: red"
                            >delete_outline</v-icon
                          >
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
          
        </b-card>
      </b-card-group>

      <br /><br />

      <br /><br />

      <!-- <div class="chart" ref="chart1"></div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "customerProfile",

  components: {},

  data() {
    return {
 
      //snackbar
      snackColor: "",
      snackbarGreen: false,
      text: "",
      token: "",

      //create
      trueIcon: false,
      addIcon: true,

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
        { actions: "عمليات" },
      ],

      programsFields: [
        { Title: "نام برنامه" },
        { PointsNeeded: "تعداد امتیاز لازم" },
        { Description: "توضیحات" },
        { actions: "عمليات" },
      ],
      Title: "",

      items: [],
    };
  },

  methods: {
    showTrueIcon(row){
      console.log(row)
      this.trueIcon =false;
      return this.trueIcon;
    },

    showAddIcon(row){
      console.log(row)
     this.addIcon =true;
     return this.addIcon;
    },

    //create
    openCreateModal() {
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

      let temp = [];
      this.editedRow = row;
      this.selectedName = row.item.ActivityName;
      this.selectedId = row.item.Id;
      // this.openEditModal();
      console.log("CustomerScores:", this.CustomerScores);

      console.log("AllScores:", this.AllScores);

      console.log("selectedId:", this.selectedId);

      for (let item of this.CustomerScores) {
        temp.push(item.ActivityName);
      }
      console.log("temp", temp);
      console.log("selectedName:", this.selectedName);

      if (temp.includes(this.selectedName)) {
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
    },

    //add new program
    async addNewProgramToCustomer(row) {

            this.showTrueIcon=true;
      this.showPlusIcon= false;

      let temp = [];
      this.editedRow = row;
      this.Title = row.item.Title;
      this.selectedId = row.item.Id;
      

      // this.openEditModal();
      console.log("CustomerPrograms:", this.CustomerPrograms);

      console.log("AllPrograms:", this.AllPrograms);

      console.log("selectedId:", this.selectedId);

      for (let item of this.CustomerPrograms) {
        temp.push(item.Title);
      }
      console.log("temp", temp);
      console.log("selectedId:", this.selectedName);

      if (temp.includes(this.Title)) {
        console.log("added ");
        this.snackColor = "red";
        this.text = "اين برنامه قبلا اضافه شده !";
        this.snackbarGreen = true;
      } else {
        console.log("noot");
        this.snackColor = "green";

        await axios
          .post(
            `http://localhost:8080/api/Customer/AddProgramToCustomer/${this.selectedId}`,
            this.selectedId,
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            // this.CustomerScores = response.data;
            this.snackbarGreen = true;
            this.text = response.data.Description;
            if (response.data.MessageType == 0) {
              this.snackColor = "red";
            } else {
              this.snackColor = "green";
            }

            console.log("add new progrma:", response.data);
          });

        await axios
          .get(`http://localhost:8080/api/Customer/GetCustomerPrograms`, {
            headers: {
              token: localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.CustomerPrograms = response.data;
            console.log("Customer programs:", response.data);
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
    },

    openEditModal() {
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
  },

  async created() {
    //date
    this.today = new Date().toLocaleDateString("fa-IR");

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
    await axios
      .get(`http://localhost:8080/api/Score/GetAll`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.AllScores = response.data;
        //   console.log("All scores:", response.data);
      })
      .catch((e) => {
        this.errors.push(e);
      });

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

    //GetCustomerScores
    await axios
      .get(`http://localhost:8080/api/Customer/GetCustomerPrograms`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.CustomerPrograms = response.data;
        console.log("Customer programs:", response.data);
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
