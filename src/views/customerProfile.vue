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
                <b-row>
                  <b-col align="center">
                    <b-row dir="rtl">
                      <b-col cols="12">
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
                                >افزودن فعالیت
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
                                            :fields="fields"
                                            striped
                                            responsive="sm"
                                            hover
                                          >
                                            <template #cell(actions)="row">
                                              <v-icon
                                                @click="
                                                  addNewScoreToCustomer(row)
                                                "
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

                              <!-- Edit Modal -->
                              <div>
                                <b-modal
                                  v-model="showEditModal"
                                  dir="rtl"
                                  id="modal-center"
                                  title=" ویرایش امتیاز"
                                  :header-bg-variant="headerBgVariant"
                                  :header-text-variant="headerTextVariant"
                                >
                                  <b-container fluid>
                                    <b-row>
                                      <b-col>
                                        <b-form-input
                                          type="text"
                                          v-model="editForm.ActivityName"
                                          placeholder="نام فعالیت "
                                          required
                                          outlined
                                        />

                                        <br />

                                        <b-form-input
                                          v-model="editForm.Points"
                                          placeholder="تعداد امتیاز"
                                          type="number"
                                          required
                                          outlined
                                        />

                                        <br />

                                        <b-form-input
                                          v-model="editForm.Description"
                                          placeholder="توضیحات"
                                          required
                                          outlined
                                        />

                                        <br />
                                      </b-col>
                                    </b-row>
                                  </b-container>

                                  <template #modal-footer>
                                    <div class="w-100">
                                      <v-btn
                                        :loading="editLoading"
                                        class="btnsize"
                                        color="#bea44d"
                                        elevation="5"
                                        rounded
                                        larg
                                        @click="updateScorebtn"
                                        >ویرایش
                                      </v-btn>

                                      <v-btn
                                        class="select2"
                                        color="#bea44d"
                                        elevation="3"
                                        rounded
                                        larg
                                        outlined
                                        @click="closeEditModal"
                                        >انصراف
                                      </v-btn>
                                    </div>
                                  </template>
                                </b-modal>
                              </div>

                              <!-- Delete Modal -->
                              <div>
                                <b-modal
                                  v-model="showDeleteModal"
                                  dir="rtl"
                                  id="modal-center"
                                  title=" حذف امتیاز"
                                  :header-bg-variant="headerBgVariant"
                                  :header-text-variant="headerTextVariant"
                                >
                                  <b-container fluid>
                                    <b-row>
                                      <b-col>
                                        <h4>امتیاز مورد نظر حذف شود؟</h4>
                                      </b-col>
                                    </b-row>
                                  </b-container>

                                  <template #modal-footer>
                                    <div class="w-100">
                                      <v-btn
                                        :loading="deleteLoading"
                                        class="btnsize"
                                        color="#bea44d"
                                        elevation="5"
                                        rounded
                                        larg
                                        @click="deleteScorebtn"
                                        >بلی
                                      </v-btn>

                                      <v-btn
                                        class="select2"
                                        color="#bea44d"
                                        elevation="3"
                                        rounded
                                        larg
                                        outlined
                                        @click="closeDeletModal"
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
                      </b-col>
                    </b-row>
                  </b-col>

                  <b-col align="center">
                    <h5>افزودن برنامه جدید</h5>
                  </b-col>
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
      createLoading: false,

      AllScores: [],
      CustomerScores: [],

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
      showDeleteModal: false,
      headerBgVariant: "dark",
      headerTextVariant: "light",

      //table
      fields: [
        { ActivityName: "نام فعالیت" },
        { Points: "تعداد امتیاز" },
        { Description: "توضیحات" },
      ],

      items: [],
    };
  },

  methods: {
    //create
    openCreateModal() {
      this.showCreateModal = true;
      // console.log("getToken", this.getToken);
      // console.log("getMessage", this.getMessage);
    },
    closeCreateModal() {
      this.showCreateModal = false;
    },

    async addNewScore() {
      this.createLoading = true;

      this.snackbarGreen = true;

      this.createLoading = false;

      this.showCreateModal = false;
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
      console.log("selectedId:", this.selectedName);

      if (temp.includes(this.selectedName)) {
        console.log("added ");
        this.snackColor = "red";
        this.text = "اين فعاليت قبلا اضافه شده !";
        this.snackbarGreen = true;
      } else {
        console.log("noot");
        this.snackColor = "green";

        this.snackbarGreen = true;
        this.text = "فعالیت با موفقیت اضافه شده";

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

    openEditModal() {
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },

    async updateScorebtn() {
      this.editLoading = true;
      await this.updateScore(this.editForm);

      await this.getUserScores();
      // this.items = this.getScores;

      this.text = await this.getMessage;

      // if ((await this.getMessageType) == 1) {
      //   this.snackColor = "green";
      // } else {
      //   this.snackColor = "red";
      // }

      this.snackbarGreen = true;

      this.editLoading = false;

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
        console.log("All scores:", response.data);
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
        console.log("Customer scores:", response.data);
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
