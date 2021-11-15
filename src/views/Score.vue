<template>
  <div>
    <b-card-group deck class="mr-2">
      <b-card>
        <template #header>
          <div style="text-align: center">
            <b class="mb-0">امتیازات کاربران</b>
          </div>
        </template>

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
                    >افزودن امتیاز
                  </v-btn>

                  <div>
                    <b-modal
                      v-model="showCreateModal"
                      dir="rtl"
                      id="create-modal"
                      title=" افزودن امتیاز"
                      :header-bg-variant="headerBgVariant"
                      :header-text-variant="headerTextVariant"
                    >
                      <b-container fluid>
                        <b-row>
                          <b-col>
                            <b-form-input
                              type="text"
                              v-model="form.ActivityName"
                              placeholder="نام فعالیت "
                              required
                              outlined
                            />

                            <br />

                            <b-form-input
                              v-model="form.Points"
                               type="number"
                              placeholder="تعداد امتیاز"
                              required
                              outlined
                            />

                            <br />

                            <b-form-input
                              v-model="form.Description"
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
                            class="btnsize"
                            color="#bea44d"
                            elevation="5"
                            rounded
                            larg
                            @click="setNewScore"
                            >ثبت
                          </v-btn>

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
                      id="create-modal"
                      title=" ویرایش امتیاز"
                      :header-bg-variant="headerBgVariant"
                      :header-text-variant="headerTextVariant"
                    >
                      <b-container fluid>
                        <b-row>
                          <b-col>
                            <b-form-input
                              type="text"
                              v-model="form.ActivityName"
                              placeholder="نام فعالیت "
                              required
                              outlined
                            />

                            <br />

                            <b-form-input
                              v-model="form.Points"
                              placeholder="تعداد امتیاز"
                              required
                              outlined
                            />

                            <br />

                            <b-form-input
                              v-model="form.Description"
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
                            class="btnsize"
                            color="#bea44d"
                            elevation="5"
                            rounded
                            larg
                            @click="updateScore"
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
                      id="create-modal"
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
                            class="btnsize"
                            color="#bea44d"
                            elevation="5"
                            rounded
                            larg
                            @click="deleteScore"
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
                  :items="items"
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
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "Score",

  computed: mapGetters(["getToken", "getMessage"]),

  data() {
    return {
      //create
      form: {
        Points: "",
        ActivityName: "",
        Description: "",
      },

      //Edit
      editForm: {
        Points: "",
        ActivityName: "",
        Description: "",
      },

      //Delete

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
        { actions: "عملیات" },
      ],

      items: [
        {
          Description: "true",

          ActivityName: "Dickerson",
          Points: "Macdonald",
        },

        {
          Description: "true",

          ActivityName: "Dickerson",
          Points: "Macdonald",
        },
        {
          Description: "true",

          ActivityName: "Dickerson",
          Points: "Macdonald",
        },
        {
          Description: "true",

          ActivityName: "Dickerson",
          Points: "Macdonald",
        },
      ],
    };
  },

  methods: {
    //create
    openCreateModal() {
      this.showCreateModal = true;
      console.log("getToken", this.getToken);
      console.log("getMessage", this.getMessage);
    },
    closeCreateModal() {
      this.showCreateModal = false;
    },

    //Edit
    editRow(row) {
      this.openEditModal();
      console.log("row111", row);
    },

    openEditModal() {
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },

    async updateScore() {
      await axios
        .post(`http://localhost:8080/api/Score/Update`, this.editForm, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })

        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          this.errors.push(e);
        });

      this.showEditModal = false;
    },

    //delete
    deletRow(row) {
      this.openDeleteModal();
      console.log("row111", row);
    },

    openDeleteModal() {
      this.showDeleteModal = true;
    },

    closeDeletModal() {
      this.showDeleteModal = false;
    },

    deleteScore() {
      this.closeDeletModal();
    },

    async setNewScore() {
      await axios
        .post(
          `http://localhost:8080/api/Score/Create`,
          this.form,

          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )

        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          this.errors.push(e);
        });
              this.showCreateModal = false;

    },
  },
};
</script>

<style>
</style>