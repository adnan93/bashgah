<template>
  <div>
    <b-tabs content-class="mt-3" align="center">
      <b-tab title=" مشتریان " active>
        <div>
          <b-row>
            <b-col cols="1"> </b-col>

            <b-col cols="10">
              <v-btn
                class="btnsize"
                color="#bea44d"
                elevation="3"
                rounded
                large
                @click="openCreateCustomerModal"
                >افزودن مشتری
              </v-btn>

              <br />
              <br />

              <!-- create Customer -->
              <div>
                <b-modal
                  v-model="showCreateCustomerModal"
                  dir="rtl"
                  id="modal-center"
                  title=" ثبت نام در باشگاه"
                  :header-bg-variant="headerBgVariant"
                  :header-text-variant="headerTextVariant"
                >
                  <div dir="rtl">
                    <b-form @submit="onSubmit">
                      <br />

                      <v-text-field
                        v-model="form.Name"
                        type="text"
                        placeholder="نام "
                        required
                        outlined
                        dense
                        :rules="[phoneRules.required]"
                      />

                      <v-text-field
                        v-model="form.Family"
                        type="text"
                        placeholder="نام خانوادگی"
                        required
                        outlined
                        dense
                        :rules="[phoneRules.required]"
                      />

                      <v-text-field
                        v-model="form.Mobile"
                        placeholder="شماره موبایل"
                        required
                        outlined
                        dense
                        :rules="[phoneRules.required, phoneRules.validNum]"
                      />

                      <v-text-field
                        :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                        v-model="form.Password"
                        :type="show4 ? 'text' : 'password'"
                        required
                        placeholder="رمز عبور "
                        @click:append="show4 = !show4"
                        outlined
                        dense
                        :rules="[phoneRules.required]"
                      />

                      <v-text-field
                        v-model="form.VerificationCode"
                        placeholder="کد تایید"
                        required
                        outlined
                        dense
                        :rules="[phoneRules.required]"
                      />
                    </b-form>

                    <b-modal
                      dir="rtl"
                      v-model="show"
                      title="دریافت کد تایید"
                      :header-bg-variant="headerBgVariant"
                      :header-text-variant="headerTextVariant"
                      :body-bg-variant="bodyBgVariant"
                      :body-text-variant="bodyTextVariant"
                      :footer-bg-variant="bodyBgVariant"
                      :footer-text-variant="footerTextVariant"
                    >
                      <b-form-input
                        v-model="PhoneNumber"
                        placeholder=" شماره موبایل خود را وارد کنید"
                        required
                      ></b-form-input>

                      <template #modal-footer>
                        <div class="w-100">
                          <v-btn
                            :loading="getCodeLoading"
                            class="btnsize ml-1"
                            color="#bea44d"
                            elevation="5"
                            rounded
                            large
                            type="submit"
                            variant="primary"
                            @click="getCode()"
                          >
                            درخواست کد تایید
                          </v-btn>
                        </div>
                      </template>
                    </b-modal>

                    <v-snackbar
                      v-model="snackbarGreen"
                      :color="snackColor"
                      dir="rtl"
                    >
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

                  <template #modal-footer>
                    <div class="w-100">
                      <v-btn
                        :loading="signUpLoading"
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
                        :loading="getCodeLoading"
                        class="select2"
                        color="#bea44d"
                        elevation="3"
                        rounded
                        large
                        outlined
                        @click="show = true"
                      >
                        دریافت کد
                      </v-btn>

                      <v-btn
                        class="select2"
                        color="#bea44d"
                        elevation="5"
                        rounded
                        larg
                        outlined
                        @click="closeCreateCustomerModal"
                        >انصراف
                      </v-btn>
                    </div>
                  </template>
                </b-modal>
              </div>

              <div>
                <b-table
                  :items="Customeritems"
                  :fields="Customerfields"
                  striped
                  responsive="sm"
                  hover
                >
                  <template #cell(details)="row">
                    <v-icon
                      @click="editScoreRow(row)"
                      style="font-size: 20px; color: blue"
                      >edit</v-icon
                    >
                  </template>

                  <template #cell(CustomerScores)="row">
                    <v-icon
                      @click="editScoreRow(row)"
                      style="font-size: 20px; color: blue"
                      >edit</v-icon
                    >
                  </template>

                  <template #cell(CustomerPrograms)="row">
                    <v-icon
                      @click="editScoreRow(row)"
                      style="font-size: 20px; color: blue"
                      >edit</v-icon
                    >
                  </template>
                </b-table>
              </div>
            </b-col>

            <b-col cols="1"> </b-col>
          </b-row>
          <br />
          <br /><br /><br />
          <br />
          <br /><br /><br />
          <br />
          <br /><br /><br />
        </div>
      </b-tab>

      <b-tab title=" فعالیت ها ">
        <div>
          <b-row dir="rtl">
            <b-col cols="1"> </b-col>

            <b-col cols="10">
              <div>
                <b-row dir="rtl">
                  <b-col class="mb-5">
                    <v-btn
                      class="btnsize"
                      color="#bea44d"
                      elevation="3"
                      rounded
                      large
                      @click="openCreateScoreModal"
                      >افزودن فعالیت
                    </v-btn>

                    <div>
                      <b-modal
                        v-model="showCreateScoreModal"
                        dir="rtl"
                        id="modal-center"
                        title=" افزودن فعالیت"
                        :header-bg-variant="headerBgVariant"
                        :header-text-variant="headerTextVariant"
                      >
                        <b-container fluid>
                          <b-row>
                            <b-col>
                              <b-form-input
                                type="text"
                                v-model="scoreform.ActivityName"
                                placeholder="نام فعالیت "
                                required
                                outlined
                              />

                              <br />

                              <b-form-input
                                v-model="scoreform.Points"
                                type="number"
                                placeholder="تعداد امتیاز"
                                required
                                outlined
                              />

                              <br />

                              <b-form-input
                                v-model="scoreform.Description"
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
                              @click="addNewScore"
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
                        v-model="showEditScoreModal"
                        dir="rtl"
                        id="modal-center"
                        title=" ویرایش فعالیت"
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
                        v-model="showDeleteScoreModal"
                        dir="rtl"
                        id="modal-center"
                        title=" حذف فعالیت"
                        :header-bg-variant="headerBgVariant"
                        :header-text-variant="headerTextVariant"
                      >
                        <b-container fluid>
                          <b-row>
                            <b-col>
                              <h4>فعالیت مورد نظر حذف شود؟</h4>
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
                        @click="editScoreRow(row)"
                        style="font-size: 20px; color: blue"
                        >edit</v-icon
                      >

                      <v-icon
                        @click="deletScoreRow(row)"
                        style="font-size: 20px; color: red"
                        >delete_outline</v-icon
                      >
                    </template>
                  </b-table>
                </div>
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
      </b-tab>

      <b-tab title=" برنامه ها">
        <b-row dir="rtl">
          <b-col cols="1"> </b-col>
          <b-col cols="10">
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
                              v-model="programform.Title"
                              placeholder="نام برنامه "
                              required
                              outlined
                            />

                            <br />

                            <b-form-input
                              v-model="programform.PointsNeeded"
                              type="number"
                              placeholder="تعداد امتیاز مورد نیاز"
                              required
                              outlined
                            />

                            <br />

                            <b-form-input
                              v-model="programform.Description"
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
                      v-model="showEditProgramModal"
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
                              v-model="editProgramForm.Title"
                              placeholder="نام برنامه "
                              required
                              outlined
                            />

                            <br />

                            <b-form-input
                              v-model="editProgramForm.PointsNeeded"
                              placeholder="تعداد امتیاز لازم"
                              type="number"
                              required
                              outlined
                            />

                            <br />

                            <b-form-input
                              v-model="editProgramForm.Description"
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
                            @click="updateProgrambtn"
                            >ویرایش
                          </v-btn>

                          <v-btn
                            class="select2"
                            color="#bea44d"
                            elevation="3"
                            rounded
                            larg
                            outlined
                            @click="closeEditProgramModal"
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
                            @click="deleteProgrambtn"
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
                  :items="programitems"
                  :fields="programfields"
                  striped
                  responsive="sm"
                  hover
                >
                  <template #cell(actions)="row">
                    <v-icon
                      @click="editProgramRow(row)"
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
          <b-col cols="1"> </b-col>
        </b-row>
      </b-tab>

    </b-tabs>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config";
import { mapGetters, mapActions } from "vuex";

// import { createChart } from "lightweight-charts";
//  import { LightweightCharts } from "lightweight-charts";

export default {
  computed: mapGetters([
    "getScores",
    "getActivityName",
    "getPoints",
    "getDescription",
    "getMessage",
    "getMessageType",
    "getprograms",
    "getTitle",
    "getPointsNeeded",
  ]),

  name: "App",
  data() {
    return {
      //Customer
      //create

      Customeritems: [],

      Customerfields: [
        { Title: "نام مشتری" },
        { details: "اطلاعلات مشتری" },

        { CustomerScores: " فعالیت ها" },
        { CustomerPrograms: " برنامه ها" },
        { addingScores: " افزودن فعالیت " },
      ],

      //program
      //create
      createLoading: false,
      programform: {
        PointsNeeded: "",
        Title: "",
        Description: "",
      },

      //Edit
      editLoading: false,
      editedRow: "",
      editProgramForm: {
        Id: "",
        PointsNeeded: "",
        Title: "",
        Description: "",
      },

      //table
      programfields: [
        { Title: "نام برنامه" },
        { PointsNeeded: " امتیاز لازم" },
        { Description: "توضیحات" },
        { actions: "عملیات" },
      ],

      programitems: [],

      //score
      //create
      // createLoading: false,
      scoreform: {
        Points: "",
        ActivityName: "",
        Description: "",
      },

      //Edit
      // editLoading: false,
      // editedRow: "",
      editForm: {
        Id: "",
        Points: "",
        ActivityName: "",
        Description: "",
      },

      //Delete
      deleteLoading: false,
      row: "",

      //modal
      showCreateScoreModal: false,
      showCreateModal: false,
      showCreateCustomerModal: false,

      showEditScoreModal: false,
      showEditProgramModal: false,

      showDeleteScoreModal: false,
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

      items: [],

      show4: false,

      //loading
      getCodeLoading: false,
      signUpLoading: false,

      //snackbar
      snackbarGreen: false,
      snackColor: "",

      MessageType: "",

      text: "",

      // modal
      show: false,
      //   headerBgVariant: "dark",
      //   headerTextVariant: "light",
      bodyBgVariant: "light",
      bodyTextVariant: "dark",
      footerBgVariant: "warning",
      footerTextVariant: "dark",
      PhoneNumber: "",

      url1: `${config.paseUrl}` + "api/v1/CurrentPrice/GetTalagram",
      // url2: `${config.paseUrl}` +"api/v1/ArchivedPrice/GetSekeByTimeFrame/?timeframe=5",

      //date
      today: 0,

      //form
      form: {
        Mobile: "",
        VerificationCode: "",
        Password: "",
        Name: "",
        Family: "",
      },

      //validation
      phoneRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validNum: (v) => /^[\s۰-۹\s0-9]+$/.test(v) || "شماره معتبر نیست",
      },
    };
  },
  components: {},
  mounted() {},
  methods: {
    //score
    ...mapActions([
      "getUserScores",
      "setNewScore",
      "deleteScore",
      "getScoreById",
      "updateScore",
      "getUserprograms",
      "setNewprogram",
      "deleteprogram",
      "getprogramById",
      "updateprogram",
    ]),

    //create
    openCreateModal() {
      this.showCreateModal = true;
    },
    closeCreateModal() {
      this.showCreateModal = false;
            this.showCreateScoreModal = false;

    },

    //create score
    openCreateScoreModal() {
      this.showCreateScoreModal = true;
      // console.log("getToken", this.getToken);
      // console.log("getMessage", this.getMessage);
    },
    closeCreateScoreModal() {
      this.showCreateScoreModal = false;
    },

    //create customer
    openCreateCustomerModal() {
      this.showCreateCustomerModal = true;
    },
    closeCreateCustomerModal() {
      this.showCreateCustomerModal = false;
    },

    async addNewProgram() {
      this.createLoading = true;
      await this.setNewprogram(this.programform);

      await this.getUserprograms();
      this.programitems = this.getprograms;

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

    async addNewScore() {
      this.createLoading = true;
      await this.setNewScore(this.scoreform);
      await this.getUserScores();
      this.items = this.getScores;

      this.text = await this.getMessage;

      if ((await this.getMessageType) == 1) {
        this.snackColor = "green";
      } else {
        this.snackColor = "red";
      }

      this.snackbarGreen = true;

      this.createLoading = false;

      this.showCreateScoreModal = false;
    },

    //Edit Program

    async editProgramRow(row) {
      this.editedRow = row;
      this.editProgramForm.Id = row.item.Id;
      this.openEditProgramModal();
      await this.getprogramById(this.editedRow.item.Id);

      console.log("this.getTitle", await this.getTitle);

      this.editProgramForm.Title = await this.getTitle;
      this.editProgramForm.PointsNeeded = await this.getPointsNeeded;
      this.editProgramForm.Description = await this.getDescription;
    },

    openEditProgramModal() {
      this.showEditProgramModal = true;
    },
    closeEditProgramModal() {
      this.showEditProgramModal = false;
    },

    async updateProgrambtn() {
      this.editLoading = true;
      await this.updateprogram(this.editProgramForm);

      await this.getUserprograms();
      this.programitems = this.getprograms;

      this.text = await this.getMessage;

      if ((await this.getMessageType) == 1) {
        this.snackColor = "green";
      } else {
        this.snackColor = "red";
      }

      this.snackbarGreen = true;

      this.editLoading = false;

      this.showEditProgramModal = false;
    },

    //Edit Score

    async editScoreRow(row) {
      this.editedRow = row;
      this.editForm.Id = row.item.Id;
      this.openEditModal();
      await this.getScoreById(this.editedRow.item.Id);

      console.log("this.getActivityName", await this.getActivityName);

      this.editForm.ActivityName = await this.getActivityName;
      this.editForm.Points = await this.getPoints;
      this.editForm.Description = await this.getDescription;
    },

    openEditModal() {
      this.showEditScoreModal = true;
    },
    closeEditModal() {
      this.showEditScoreModal = false;
    },

    async updateScorebtn() {
      this.editLoading = true;
      await this.updateScore(this.editForm);

      await this.getUserScores();
      this.items = this.getScores;

      this.text = await this.getMessage;

      if ((await this.getMessageType) == 1) {
        this.snackColor = "green";
      } else {
        this.snackColor = "red";
      }

      this.snackbarGreen = true;

      this.editLoading = false;

      this.showEditScoreModal = false;
    },

    //delete Score
    deletScoreRow(row) {
      this.row = row;
      this.openDeleteScoreModal();
    },

    openDeleteScoreModal() {
      this.showDeleteScoreModal = true;
    },

    closeDeletScoreModal() {
      this.showDeleteScoreModal = false;
    },

    //delete program
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

    async deleteProgrambtn() {
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
      this.programitems = this.getprograms;

      this.deleteLoading = false;

      this.showDeleteModal = false;
    },

    async deleteScorebtn() {
      this.deleteLoading = true;

      let deletedId = this.row.item.Id;
      console.log("ID :", deletedId);

      await this.deleteScore(deletedId);

      this.text = await this.getMessage;

      if ((await this.getMessageType) == 1) {
        this.snackColor = "green";
      } else {
        this.snackColor = "red";
      }

      this.snackbarGreen = true;

      await this.getUserScores();
      this.items = this.getScores;

      this.deleteLoading = false;

      this.showDeleteScoreModal = false;
    },

    async onSubmit(event) {
      event.preventDefault();
      this.signUpLoading = true;

      await axios
        .post(`http://localhost:8080/api/Customer/Register`, this.form)
        .then((response) => {
          this.text = response.data.Description;

          if (response.data.MessageType == 1) {
            this.snackColor = "green";
            // this.$router.push({ path: "/customerLogin" });
          } else {
            this.snackColor = "red";
          }

          this.signUpLoading = false;
          this.snackbarGreen = true;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    async getCode() {
      this.show = false;
      this.getCodeLoading = true;

      await axios

        .post(
          `http://localhost:8080/api/Customer/SendVerificationCode?PhoneNumber=${this.PhoneNumber}`
        )

        .then((response) => {
          console.log(response);

          this.text = response.data.Description;

          if (response.data.MessageType == 1) {
            this.snackColor = "black";
          } else {
            this.snackColor = "black";
          }

          this.snackbarGreen = true;
          this.getCodeLoading = false;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },

  async created() {
    await this.getUserScores();
    this.items = this.getScores;

    await this.getUserprograms();
    this.programitems = this.getprograms;
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
.home {
  background-color: #f0f0f5;
}
</style>