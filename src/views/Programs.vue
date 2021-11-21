<template>
  <div>
    <b-card-group deck class="mr-2">
      <b-card>
        <template #header>
          <div style="text-align: center">
            <b class="mb-0">برنامه های کاربران</b>
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
                    >افزودن برنامه
                  </v-btn>

                  <div>
                    <b-modal
                      v-model="showCreateModal"
                      dir="rtl"
                      id="modal-center"
                      title=" افزودن برنامه "
                      :header-bg-variant="headerBgVariant"
                      :header-text-variant="headerTextVariant"
                    >
                      <b-container fluid>
                        <b-row>
                          <b-col>
                            <b-form-input
                              type="text"
                              v-model="form.Title"
                              placeholder="نام برنامه "
                              required
                              outlined
                            />

                            <br />

                            <b-form-input
                              v-model="form.PointsNeeded"
                              type="number"
                              placeholder="تعداد امتیاز مورد نیاز"
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
                            :loading="createLoading"
                            class="btnsize"
                            color="#bea44d"
                            elevation="5"
                            rounded
                            larg
                            @click="addNewProgram"
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
                      id="modal-center"
                      title=" ویرایش برنامه"
                      :header-bg-variant="headerBgVariant"
                      :header-text-variant="headerTextVariant"
                    >
                      <b-container fluid>
                        <b-row>
                          <b-col>
                            <b-form-input
                              type="text"
                              v-model="editForm.Title"
                              placeholder="نام فعالیت "
                              required
                              outlined
                            />

                            <br />

                            <b-form-input
                              v-model="editForm.PointsNeeded"
                              placeholder="تعداد برنامه"
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
                      title=" حذف برنامه"
                      :header-bg-variant="headerBgVariant"
                      :header-text-variant="headerTextVariant"
                    >
                      <b-container fluid>
                        <b-row>
                          <b-col>
                            <h4>برنامه مورد نظر حذف شود؟</h4>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Score",

  computed: mapGetters([
    "getprograms",
    "getTitle",
    "getPointsNeeded",
    "getDescription",
    "getMessage",
    "getMessageType",
  ]),

  data() {
    return {
      //snackbar
      text: "",
      snackbarGreen: false,
      snackColor: "",

      //create
      createLoading: false,
      form: {
        PointsNeeded: "",
        Title: "",
        Description: "",
      },

      //Edit
      editLoading: false,
      editedRow: "",
      editForm: {
        Id: "",
        PointsNeeded: "",
        Title: "",
        Description: "",
      },

      //Delete
      deleteLoading: false,
      row: "",

      //modal
      showCreateModal: false,
      showEditModal: false,
      showDeleteModal: false,
      headerBgVariant: "dark",
      headerTextVariant: "light",

      //table
      fields: [
        { Title: "نام فعالیت" },
        { PointsNeeded: " امتیاز لازم" },
        { Description: "توضیحات" },
        { actions: "عملیات" },
      ],

      items: [],
    };
  },

  methods: {
    ...mapActions([
      "getUserprograms",
      "setNewprogram",
      "deleteprogram",
      "getprogramById",
      "updateprogram",
    ]),

    //create
    openCreateModal() {
      this.showCreateModal = true;
      // console.log("getToken", this.getToken);
      // console.log("getMessage", this.getMessage);
    },
    closeCreateModal() {
      this.showCreateModal = false;
    },

    async addNewProgram() {
      this.createLoading = true;
      await this.setNewprogram(this.form);

      await this.getUserprograms();
       this.items = this.getprograms;

       this.text = await this.getMessage;

      if ((await this.getMessageType) == 1) {
        this.snackColor = "green";
      } else {
        this.snackColor = "red";
      }

      this.snackbarGreen = true;

      this.createLoading = false;

      this.showCreateModal = false;
    },

    //Edit

    async editRow(row) {
      this.editedRow = row;
      this.editForm.Id = row.item.Id;
      this.openEditModal();
      await this.getprogramById(this.editedRow.item.Id);

      console.log("this.getTitle", await this.getTitle);

      this.editForm.Title = await this.getTitle;
      this.editForm.PointsNeeded = await this.getPointsNeeded;
      this.editForm.Description = await this.getDescription;
    },

    openEditModal() {
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },

    async updateScorebtn() {
      this.editLoading = true;
      await this.updateprogram(this.editForm);

      await this.getUserprograms();
      this.items = this.getprograms;

      this.text = await this.getMessage;

      if ((await this.getMessageType) == 1) {
        this.snackColor = "green";
      } else {
        this.snackColor = "red";
      }

      this.snackbarGreen = true;

      this.editLoading = false;

      this.showEditModal = false;
    },

    //delete
    deletRow(row) {
      this.row = row;
      this.openDeleteModal();
    },

    openDeleteModal() {
      this.showDeleteModal = true;
    },

    closeDeletModal() {
      this.showDeleteModal = false;
    },

    async deleteScorebtn() {
      this.deleteLoading = true;

      let deletedId = this.row.item.Id;
      console.log("ID :", deletedId);

      await this.deleteprogram(deletedId);

      this.text = await this.getMessage;

      if ((await this.getMessageType) == 1) {
        this.snackColor = "green";
      } else {
        this.snackColor = "red";
      }

      this.snackbarGreen = true;

      await this.getUserprograms();
      this.items = this.getprograms;

      this.deleteLoading = false;

      this.showDeleteModal = false;
    },
  },
  async created() {
    await this.getUserprograms();
    this.items = this.getprograms;
  },
};
</script>

<style>
</style>