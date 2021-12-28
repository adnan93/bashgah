<template>
  <div>
    <b-tabs content-class="mt-3" align="center">
      <b-tab title=" مشتریان " :title-link-class="'tab-title-class'">
        <div>
          <b-row dir="rtl">
            <b-col cols="1"> </b-col>

            <b-col cols="10">
              <b-row
                class="mt-4 d-flex justify-content-end"
                style="padding-left: 5%; padding-right: 3%"
              >
                <b-col cols="12" md="12" class="d-flex justify-content-end">
                  <v-btn
                    class="ml-1"
                    style="color: white"
                    color="#10503B"
                    elevation="3"
                    rounded
                    large
                    @click="openCreateCustomerModal"
                  >
                    افزودن مشتری
                  </v-btn>
                  <v-btn
                    class="ml-1"
                    style="color: white"
                    color="#10503B"
                    elevation="3"
                    rounded
                    large
                    @click="watingCustomer"
                    >لیست انتظار
                  </v-btn>
                  <v-btn
                    style="color: white"
                    color="#10503B"
                    elevation="3"
                    rounded
                    large
                    @click="owerCustomer"
                  >
                    مشتریان ما
                  </v-btn>
                </b-col>
              </b-row>

              <b-container style="padding-left: 5%" fluid>
                <b-row>
                  <b-col cols="12" md="4" class="d-flex">
                    <div dir="rtl" class="container">
                      <v-text-field
                        color="#10503B"
                        v-model="searchName"
                        label=" نام مشتری"
                        dense
                        dir="rtl"
                      ></v-text-field>

                      <!-- <v-text-field
                        color="#10503B"
                        v-model="searchFamily"
                        label=" نام خانوادگی"
                        dense
                      ></v-text-field> -->
                    </div>

                    <v-btn
                      elevation="3"
                      dark
                      rounded
                      color="#10503B"
                      @click="doSearch"
                      style="margin-right: 0.3125em"
                    >
                      <v-icon> search </v-icon>
                    </v-btn>
                  </b-col>

                  <b-col cols="12" md="3" class="text-right test pr-0">
                    <v-btn
                      elevation="3"
                      dark
                      rounded
                      color="#10503B"
                      @click="showAll"
                      :disabled="!showSearch"
                    >
                      مشاهده همه
                    </v-btn>
                  </b-col>
                </b-row>
              </b-container>

              <br />
              <br />

              <!-- create Customer -->
              <div>
                <b-modal
                  :body-bg-variant="bodyBgVariant"
                  :footer-bg-variant="bodyBgVariant"
                  v-model="showCreateCustomerModal"
                  dir="rtl"
                  id="modal-center"
                  title=" ثبت نام در باشگاه"
                  :header-bg-variant="headerBgVariant"
                  :header-text-variant="headerTextVariant"
                >
                  <div dir="rtl">
                    <b-form>
                      <br />

                      <v-text-field
                        v-model="form.Name"
                        type="text"
                        placeholder="نام "
                        outlined
                        dense
                        :rules="[phoneRules.required]"
                      />

                      <v-text-field
                        v-model="form.Family"
                        type="text"
                        placeholder="نام خانوادگی"
                        outlined
                        dense
                        :rules="[phoneRules.required]"
                      />

                      <v-text-field
                        v-model="form.Mobile"
                        placeholder="شماره موبایل"
                        outlined
                        dense
                        :rules="[phoneRules.required, phoneRules.validNum]"
                      />

                      <v-text-field
                        :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                        v-model="form.Password"
                        :type="show4 ? 'text' : 'password'"
                        placeholder="رمز عبور "
                        @click:append="show4 = !show4"
                        outlined
                        dense
                        :rules="[phoneRules.required]"
                      />
                    </b-form>
                  </div>

                  <template #modal-footer>
                    <div class="w-100">
                      <v-btn
                        :loading="signUpLoading"
                        class="btnsize ml-1"
                        color="#90c445"
                        elevation="5"
                        rounded
                        large
                        @click="createUser"
                        variant="primary"
                      >
                        ثبت
                      </v-btn>

                      <v-btn
                        class="select2"
                        color="#f7b73a"
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

              <!-- table customer  -->
              <div>
                <b-table
                  :items="AllUsers"
                  :fields="Customerfields"
                  striped
                  responsive="sm"
                  hover
                >
                  <template #table-busy>
                    <div class="text-center my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong>در حال دریافت اطلاعات...</strong>
                    </div>
                  </template>

                  <template #cell(details)="row">
                    <v-icon
                      @click="showDetails(row)"
                      style="font-size: 20px; color: #0f6b4d"
                      >account_box</v-icon
                    >
                  </template>

                  <template #cell(CustomerScores)="row">
                    <v-icon
                      @click="showCustomerScores(row)"
                      style="font-size: 20px; color: #0f6b4d"
                      >view_list</v-icon
                    >
                  </template>

                  <template #cell(CustomerPrograms)="row">
                    <v-icon
                      @click="showCustomerPrograms(row)"
                      style="font-size: 20px; color: #0f6b4d"
                      >poll</v-icon
                    >
                  </template>

                  <template #cell(addingScores)="row">
                    <v-icon
                      align="center"
                      @click="addScoreToCustomer(row)"
                      style="font-size: 20px; color: #0f6b4d"
                      >add_circle</v-icon
                    >
                  </template>

                  <template #cell(actions)="row">
                    <v-icon
                      @click="editCustRow(row)"
                      style="font-size: 20px; color: #0f6b4d"
                      >edit</v-icon
                    >

                    <v-icon
                      @click="deleteCustRow(row)"
                      style="font-size: 20px; color: #f7b73a"
                      >delete_outline</v-icon
                    >
                  </template>
                </b-table>
              </div>

              <!-- create New Score -->
              <div>
                <b-modal
                  v-model="addScoreToCustomerModal"
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

                        <div>
                          <b-table
                            :items="AllScores"
                            :fields="scoreFields"
                            striped
                            responsive="sm"
                            hover
                            outlined
                          >
                            <!-- <template #cell(Actions)="row">
                              <div @click="addNewScoreToCustomer(row)">
                                <div
                                  v-if="
                                    getenScores.includes(
                                      row.item.ActivityName
                                    ) || row.item.ActivityName == selectedName
                                  "
                                >
                                  <v-icon
                                    style="font-size: 20px; color: #90c445"
                                  >
                                    done_all
                                  </v-icon>
                                </div>

                                <div v-else>
                                  <v-icon
                                    style="font-size: 20px; color: #90c445"
                                  >
                                    add_circle
                                  </v-icon>
                                </div>
                              </div>
                            </template>
 -->

                            <template #cell(Actions)="row">
                              <div>
                                <v-icon
                                  @click="CheckaddNewScoreToCustomer(row)"
                                  style="font-size: 20px; color: #90c445"
                                >
                                  add_circle
                                </v-icon>
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
                        @click="closeeditCustomerModal"
                        >انصراف
                      </v-btn>
                    </div>
                  </template>

                  <v-snackbar
                    v-model="snackbarGreen"
                    :color="snackColor"
                    dir="rtl"
                  >
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

              <!--Apply create New Score -->
              <div>
                <b-modal
                  v-model="showApplyModal"
                  dir="rtl"
                  id="modal-center"
                  title=" افزودن فعالیت"
                  :header-bg-variant="headerBgVariant"
                  :header-text-variant="headerTextVariant"
                >
                  <b-container fluid>
                    <b-row>
                      <b-col>
                        <h4>فعالیت مورد نظر اضافه شود؟</h4>
                      </b-col>
                    </b-row>
                  </b-container>

                  <template #modal-footer>
                    <div class="w-100">
                      <v-btn
                        :loading="deleteCustomerLoading"
                        class="btnsize"
                        color="#90c445"
                        elevation="5"
                        rounded
                        larg
                        @click="addNewScoreToCustomer"
                        >بلی
                      </v-btn>

                      <v-btn
                        class="select2"
                        color="#f7b73a"
                        elevation="3"
                        rounded
                        larg
                        outlined
                        @click="closeeditCustomerModal"
                        >انصراف
                      </v-btn>
                    </div>
                  </template>
                </b-modal>
              </div>

              <!-- customer info -->
              <div>
                <b-modal
                  v-model="showDetailsModal"
                  dir="rtl"
                  id="modal-center"
                  title=" اطلاعات مشتری"
                  :header-bg-variant="headerBgVariant"
                  :header-text-variant="headerTextVariant"
                >
                  <div dir="rtl">
                    <b-row>
                      <b-col>
                        <b> نام و نام خانوادگی: </b>
                        {{ personal.FullName }}
                      </b-col>
                      <b-col>
                        <b> شماره موبایل: </b> {{ personal.Mobile }}
                      </b-col>
                    </b-row>

                    <br />

                    <b-row>
                      <b-col>
                        <b> کارگزار: </b>
                        {{ personal.Kargozar }}
                      </b-col>
                      <b-col>
                        <b>کد ملی: </b> {{ personal.NationalCode }}
                      </b-col>
                    </b-row>

                    <br />

                    <b-row>
                      <b-col>
                        <b> آدرس: </b>
                        {{ personal.Address }}
                      </b-col>
                      <b-col>
                        <b> تاریخ تولد: </b>
                        {{ personal.BirthDate }}
                      </b-col>
                    </b-row>
                    <br />

                    <b-row>
                      <b-col>
                        <b> استان: </b>
                        {{ personal.ProvinceId }}
                      </b-col>

                      <b-col>
                        <b> شهر: </b>
                        {{ personal.CityId }}
                      </b-col>
                    </b-row>
                    <br />

                    <b-row>
                      <b-col>
                        <b> وضعیت تاهل: </b>
                        {{ personal.IsMarried }}
                      </b-col>
                      <b-col>
                        <b> جنسیت: </b>
                        {{ personal.Gender }}
                      </b-col>
                    </b-row>
                    <br />

                    <b-row>
                      <b-col>
                        <b> شغل: </b>
                        {{ personal.JobType }}
                      </b-col>

                      <b-col>
                        <b> ایمیل: </b>
                        {{ personal.Email }}
                      </b-col>
                    </b-row>

                    <br />

                    <b-row>
                      <b-col>
                        <b> تحصیلات: </b>
                        {{ personal.Degree }}
                      </b-col>

                      <b-col> </b-col>
                    </b-row>

                    <b-row>
                      <div class="container" align="center">
                        <v-img
                          :src="`http://localhost:8080/api/Customer/GetPictureFile/${personal.ProfilePictrue}`"
                          width="25%"
                          height="100%"
                          style="border-radius: 10px; position: relative"
                        ></v-img>
                      </div>
                    </b-row>
                  </div>

                  <template #modal-footer>
                    <div class="w-100">
                      <v-btn
                        class="select2"
                        color="#f7b73a"
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

              <!-- show customer scores -->
              <div>
                <b-modal
                  v-model="showCustomerScoresModal"
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
                            :fields="fields"
                            striped
                            responsive="sm"
                            hover
                            outlined
                          >
                            <template #cell(actions)="row">
                              <v-icon
                                @click="RemoveScoreFromCustomer(row)"
                                style="font-size: 20px; color: #f7b73a"
                                >delete_outline</v-icon
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

                  <v-snackbar
                    v-model="snackbarGreen"
                    :color="snackColor"
                    dir="rtl"
                  >
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

              <!-- show customer programs -->
              <div>
                <b-modal
                  v-model="showCustomerProgramsModal"
                  dir="rtl"
                  id="modal-center"
                  title=" لیست برنامه  ها"
                  :header-bg-variant="headerBgVariant"
                  :header-text-variant="headerTextVariant"
                >
                  <b-container fluid>
                    <b-row>
                      <b-col>
                        <div>
                          <b-table
                            :items="CustomerPrograms"
                            :fields="fieldsOfCustomerPrograms"
                            striped
                            responsive="sm"
                            hover
                            outlined
                          >
                            <template #cell(actions)="row">
                              <v-icon
                                @click="RemoveProgramFromCustomer(row)"
                                style="font-size: 20px; color: #f7b73a"
                                >delete_outline</v-icon
                              >
                            </template>

                            <template #cell(status)="row">
                              <v-icon
                                @click="setStatus(row)"
                                style="font-size: 20px; color: #0f6b4d"
                                >info</v-icon
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
                        @click="closeeditCustomerModal"
                        >انصراف
                      </v-btn>
                    </div>
                  </template>

                  <v-snackbar
                    v-model="snackbarGreen"
                    :color="snackColor"
                    dir="rtl"
                  >
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

              <!-- status -->
              <div>
                <b-modal
                  v-model="showEditStatusModal"
                  dir="rtl"
                  id="modal-center"
                  title=" ویرایش وضعیت برنامه"
                  :header-bg-variant="headerBgVariant"
                  :header-text-variant="headerTextVariant"
                >
                  <div dir="rtl">
                    <b-form>
                      <br />

                      <v-select
                        class="select"
                        :items="statusList"
                        :item-text="'Name'"
                        :item-value="'Id'"
                        type="text"
                        v-model="customerStatus.Status"
                        label="وضعیت"
                        outlined
                        dense
                      >
                      </v-select>
                      <br />

                      <v-text-field
                        v-model="customerStatus.UserDescription"
                        type="text"
                        label="توضیحات"
                        outlined
                        dense
                      />
                    </b-form>
                  </div>

                  <template #modal-footer>
                    <div class="w-100">
                      <v-btn
                        :loading="editCustomerLoading"
                        class="btnsize"
                        color="#90c445"
                        elevation="5"
                        rounded
                        larg
                        @click="EditStatusbtn"
                        >ویرایش
                      </v-btn>

                      <v-btn
                        class="select2"
                        color="#f7b73a"
                        elevation="3"
                        rounded
                        larg
                        outlined
                        @click="closeDeletCustomerModal"
                        >انصراف
                      </v-btn>
                    </div>
                  </template>
                </b-modal>
              </div>

              <!--customer Delete Modal -->
              <div>
                <b-modal
                  v-model="showDeleteCustomerModal"
                  dir="rtl"
                  id="modal-center"
                  title=" حذف مشتری"
                  :header-bg-variant="headerBgVariant"
                  :header-text-variant="headerTextVariant"
                >
                  <b-container fluid>
                    <b-row>
                      <b-col>
                        <h4>مشتری مورد نظر حذف شود؟</h4>
                      </b-col>
                    </b-row>
                  </b-container>

                  <template #modal-footer>
                    <div class="w-100">
                      <v-btn
                        :loading="deleteCustomerLoading"
                        class="btnsize"
                        color="#90c445"
                        elevation="5"
                        rounded
                        larg
                        @click="deleteCustomerbtn"
                        >بلی
                      </v-btn>

                      <v-btn
                        class="select2"
                        color="#f7b73a"
                        elevation="3"
                        rounded
                        larg
                        outlined
                        @click="closeDeletCustomerModal"
                        >انصراف
                      </v-btn>
                    </div>
                  </template>
                </b-modal>
              </div>

              <!--customer edit Modal -->
              <div>
                <b-modal
                  v-model="showEditCustomerModal"
                  dir="rtl"
                  id="modal-center"
                  title=" ویرایش اطلاعات مشتری"
                  :header-bg-variant="headerBgVariant"
                  :header-text-variant="headerTextVariant"
                >
                  <div dir="rtl">
                    <b-form>
                      <br />

                      <v-text-field
                        v-model="editCustomer.Name"
                        type="text"
                        label="نام"
                        required
                        outlined
                        dense
                        :rules="[phoneRules.required]"
                      />

                      <v-text-field
                        v-model="editCustomer.Family"
                        type="text"
                        label="نام خانوادگی"
                        required
                        outlined
                        dense
                        :rules="[phoneRules.required]"
                      />

                      <v-text-field
                        v-model="editCustomer.Mobile"
                        label="شماره موبایل"
                        required
                        outlined
                        dense
                        :rules="[phoneRules.required, phoneRules.validNum]"
                      />

                      <v-text-field
                        :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                        v-model="editCustomer.Password"
                        :type="show4 ? 'text' : 'password'"
                        required
                        label="رمز عبور "
                        @click:append="show4 = !show4"
                        outlined
                        dense
                        :rules="[phoneRules.required]"
                      />
                    </b-form>
                  </div>

                  <template #modal-footer>
                    <div class="w-100">
                      <v-btn
                        :loading="editCustomerLoading"
                        class="btnsize"
                        color="#90c445"
                        elevation="5"
                        rounded
                        larg
                        @click="editCustomerbtn"
                        >ویرایش
                      </v-btn>

                      <v-btn
                        class="select2"
                        color="#f7b73a"
                        elevation="3"
                        rounded
                        larg
                        outlined
                        @click="closeeditCustomerModal"
                        >انصراف
                      </v-btn>
                    </div>
                  </template>
                </b-modal>
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

      <b-tab title=" برنامه ها" :title-link-class="'tab-title-class'">
        <b-row dir="rtl">
          <b-col cols="1"> </b-col>
          <b-col cols="10">
            <div>
              <b-row dir="rtl">
                <b-row
                  class="mt-4 d-flex justify-content-end"
                  style="padding-left: 5%; padding-right: 3%"
                >
                  <b-col cols="12" md="12" class="d-flex justify-content-end">
                    <v-btn
                      style="color: white"
                      color="#10503B"
                      elevation="3"
                      rounded
                      large
                      @click="openCreateModal"
                      >افزودن برنامه
                    </v-btn>
                  </b-col>
                </b-row>

                <b-container style="padding-left: 5%" fluid>
                  <b-row>
                    <b-col cols="12" md="4" class="d-flex">
                      <div dir="rtl" class="container">
                        <v-text-field
                          color="#10503B"
                          v-model="searchProgram"
                          label=" نام برنامه"
                          dense
                          dir="rtl"
                        ></v-text-field>

                        <!-- <v-text-field
                        color="#10503B"
                        v-model="searchFamily"
                        label=" نام خانوادگی"
                        dense
                      ></v-text-field> -->
                      </div>

                      <v-btn
                        elevation="3"
                        dark
                        rounded
                        color="#10503B"
                        @click="doSearchProgram"
                        style="margin-right: 0.3125em"
                      >
                        <v-icon> search </v-icon>
                      </v-btn>
                    </b-col>

                    <b-col cols="12" md="3" class="text-right test pr-0">
                      <v-btn
                        elevation="3"
                        dark
                        rounded
                        color="#10503B"
                        @click="showAllPrograms"
                        :disabled="!showSearchProgram"
                      >
                        مشاهده همه
                      </v-btn>
                    </b-col>
                  </b-row>
                </b-container>

                <!-- افزودن برنامه -->
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

                          <v-file-input
                            label="عکس برنامه "
                            outlined
                            :clearable="true"
                            append-icon="add_a_photo"
                            prepend-icon=""
                            @change="bgBase64"
                            accept="image/png, image/jpeg, image/bmp"
                            show-size
                            :rules="imgRules"
                          >
                          </v-file-input>
                          <b-row>
                            <div class="container" align="left">
                              <v-img
                                :src="`http://localhost:8080/api/Program/GetPictureFile/${imgId}`"
                                width="25%"
                                height="100%"
                                style="border-radius: 10px; position: relative"
                              ></v-img>
                            </div>
                          </b-row>
                        </b-col>
                      </b-row>
                    </b-container>

                    <template #modal-footer>
                      <div class="w-100">
                        <v-btn
                          :loading="createLoading"
                          class="btnsize"
                          color="#90c445"
                          elevation="5"
                          rounded
                          larg
                          @click="addNewProgram"
                          >ثبت
                        </v-btn>

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

                          <v-file-input
                            label="عکس برنامه "
                            outlined
                            :clearable="true"
                            append-icon="add_a_photo"
                            prepend-icon=""
                            @change="bgBase64"
                            accept="image/png, image/jpeg, image/bmp"
                            show-size
                            :rules="imgRules"
                          >
                          </v-file-input>

                          <!-- <b-row>
                              <div class="container" align="left">
                                <v-img
                                  :src="`http://localhost:8080/api/Program/GetPictureFile/${imgId}`"
                                  width="25%"
                                  height="100%"
                                  style="
                                    border-radius: 10px;
                                    position: relative;
                                  "
                                ></v-img>
                              </div>
                            </b-row> -->
                        </b-col>
                      </b-row>
                    </b-container>

                    <template #modal-footer>
                      <div class="w-100">
                        <v-btn
                          :loading="editLoading"
                          class="btnsize"
                          color="#90c445"
                          elevation="5"
                          rounded
                          larg
                          @click="updateProgrambtn"
                          >ویرایش
                        </v-btn>

                        <v-btn
                          class="select2"
                          color="#f7b73a"
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
                          color="#90c445"
                          elevation="5"
                          rounded
                          larg
                          @click="deleteProgrambtn"
                          >بلی
                        </v-btn>
                        <!-- 
                        <v-btn
                          class="select2"
                          color="#f7b73a"
                          elevation="3"
                          rounded
                          larg
                          outlined
                          @click="closeModal"
                          >انصراف
                        </v-btn> -->
                      </div>
                    </template>
                  </b-modal>
                </div>

                <b-col> </b-col>
              </b-row>
              <br />
              <br />

              <div class="table">
                <b-table
                  :items="programitems"
                  :fields="programfields"
                  striped
                  hover
                  responsive="sm"
                  :loading="loadingTable"
                  loading-text="در حال بارگیری اطلاعات ..."
                >
                  <template #cell(actions)="row">
                    <v-icon
                      @click="editProgramRow(row)"
                      style="font-size: 20px; color: #0f6b4d"
                      >edit</v-icon
                    >

                    <v-icon
                      @click="deletRow(row)"
                      style="font-size: 20px; color: #f7b73a"
                      >delete_outline</v-icon
                    >
                  </template>

                  <template align="center" #cell(Picture)="row">
                    <div class="container pic" align="right">
                      <v-img
                        :src="`http://localhost:8080/api/Program/GetPictureFile/${row.item.Picture}`"
                        width="100%"
                        style="border-radius: 10px"
                      ></v-img>
                    </div>
                  </template>
                </b-table>
              </div>
            </div>
          </b-col>
          <b-col cols="1"> </b-col>
        </b-row>
      </b-tab>

      <b-tab
        class="mytabs"
        title=" فعالیت ها "
        :title-link-class="'tab-title-class'"
      >
        <div>
          <b-row dir="rtl">
            <b-col cols="1"> </b-col>

            <b-col cols="10">
              <div>
                <b-col class="mb-5">
                  <b-row
                    class="mt-4 d-flex justify-content-end"
                    style="padding-left: 5%; padding-right: 3%"
                  >
                    <b-col cols="12" md="12" class="d-flex justify-content-end">
                      <v-btn
                        style="color: white"
                        color="#10503B"
                        elevation="3"
                        rounded
                        large
                        @click="openCreateScoreModal"
                        >افزودن فعالیت
                      </v-btn>
                    </b-col>
                  </b-row>

                  <b-container style="padding-left: 5%" fluid>
                    <b-row>
                      <b-col cols="12" md="4" class="d-flex">
                        <div dir="rtl" class="container">
                          <v-text-field
                            color="#10503B"
                            v-model="searchScore"
                            label=" نام فعالیت"
                            dense
                            dir="rtl"
                          ></v-text-field>
                        </div>

                        <v-btn
                          elevation="3"
                          dark
                          rounded
                          color="#10503B"
                          @click="doSearchScore"
                          style="margin-right: 0.3125em"
                        >
                          <v-icon> search </v-icon>
                        </v-btn>
                      </b-col>

                      <b-col cols="12" md="3" class="text-right test pr-0">
                        <v-btn
                          elevation="3"
                          dark
                          rounded
                          color="#10503B"
                          @click="showAllScores"
                          :disabled="!showSearchScore"
                        >
                          مشاهده همه
                        </v-btn>
                      </b-col>
                    </b-row>
                  </b-container>

                  <!-- create score -->
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
                            color="#90c445"
                            elevation="5"
                            rounded
                            larg
                            @click="addNewScore"
                            >ثبت
                          </v-btn>

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
                            color="#90c445"
                            elevation="5"
                            rounded
                            larg
                            @click="updateScorebtn"
                            >ویرایش
                          </v-btn>

                          <v-btn
                            class="select2"
                            color="#f7b73a"
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
                            color="#90c445"
                            elevation="5"
                            rounded
                            larg
                            @click="deleteScorebtn"
                            >بلی
                          </v-btn>

                          <v-btn
                            class="select2"
                            color="#f7b73a"
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

                  <!-- delete score from customer -->
                  <div>
                    <b-modal
                      v-model="removeScoreFromCustomerModal"
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
                            :loading="deleteCustomerScoreLoading"
                            class="btnsize"
                            color="#90c445"
                            elevation="5"
                            rounded
                            larg
                            @click="deleteScoreOfCustomerbtn"
                            >بلی
                          </v-btn>

                          <v-btn
                            class="select2"
                            color="#f7b73a"
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

                  <!-- delete program from customer -->
                  <div>
                    <b-modal
                      v-model="removeProgramFromCustomerModal"
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
                            :loading="deleteCustomerScoreLoading"
                            class="btnsize"
                            color="#90c445"
                            elevation="5"
                            rounded
                            larg
                            @click="deleteProgramOfCustomerbtn"
                            >بلی
                          </v-btn>

                          <v-btn
                            class="select2"
                            color="#f7b73a"
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
                        @click="editScoreRow(row)"
                        style="font-size: 20px; color: #10503b"
                        >edit</v-icon
                      >

                      <v-icon
                        @click="deletScoreRow(row)"
                        style="font-size: 20px; color: #f7b73a"
                        >delete_outline</v-icon
                      >
                    </template>
                  </b-table>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
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
    </b-tabs>

    <!-- show customer programs -->
    <div>
      <b-modal
        v-model="showWatingProgramsModal"
        dir="rtl"
        id="modal-center"
        title="  لیست برنامه  های در حال انتظار"
        :header-bg-variant="headerBgVariant"
        :header-text-variant="headerTextVariant"
      >
        <b-container fluid>
          <b-row>
            <b-col>
              <div>
                <b-table
                  :items="WaitingPrograms"
                  :fields="watingCustomerList"
                  striped
                  responsive="sm"
                  hover
                >
                  <template #table-busy>
                    <div class="text-center my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong>در حال دریافت اطلاعات...</strong>
                    </div>
                  </template>

                  <template #cell(programStatus)="row">
                    <v-icon
                      align="center"
                      @click="setStatus(row)"
                      style="font-size: 20px; color: #0f6b4d; align: center"
                      >info</v-icon
                    >
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
              @click="closeeditCustomerModal"
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

    <!-- our costomer -->
    <div>
      <b-modal
        v-model="showOwerCustomerModal"
        dir="rtl"
        id="modal-center"
        title="  لیست مشتریان ما"
        :header-bg-variant="headerBgVariant"
        :header-text-variant="headerTextVariant"
      >
        <b-container fluid>
          <b-row>
            <b-col>
              <div>
                <b-table
                  :items="registerCustomer"
                  :fields="owerCustomers"
                  striped
                  responsive="sm"
                  hover
                >
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
              @click="closeeditCustomerModal"
              >انصراف
            </v-btn>
            <v-btn
              class="select2"
              color="#90c445"
              elevation="3"
              rounded
              larg
              
              @click="getFile"
              >دریافت فایل
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
</template>

<script>
import axios from "axios";
import config from "@/config";
import { mapGetters, mapActions } from "vuex";
import Papa from "papaparse";

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
      bDate: "",
      ProfileImg: "",
      //status
      status: "",
      statusList: [
        { Name: " در انتظار تایید", Id: 0 },
        { Name: "تایید شده", Id: 1 },
        { Name: "رد شده", Id: 2 },
      ],
      WaitingPrograms: [],

      //search
      searchName: "",
      searchProgram: "",
      searchScore: "",

      showSearch: false,
      showSearchProgram: false,
      showSearchScore: false,

      showDetailsModal: false,
      addScoreToCustomerModal: false,
      deleteCustomerScoreLoading: false,

      // program image
      bg64: "",

      getenPrograms: [],
      getenScores: [],

      personal: {
        Address: "",
        BirthDate: "",
        CityId: "",
        Email: "",
        FullName: "",
        Gender: "",
        IsMarried: "",
        JobType: "",
        Mobile: "",
        ProvinceId: "",
        Kargozar: "",
        NationalCode: "",
        Degree: "",
        ProfilePictrue: "",
      },

      //Users
      AllUsers: [],

      //Customer
      //create
      IdOfCustomer: "",
      Customeritems: [],
      scoreOfCustomer: "",
      programOfCustomer: "",

      Customerfields: [
        { FullName: "نام مشتری" },
        { details: "اطلاعلات مشتری" },

        { CustomerScores: " فعالیت ها" },
        { CustomerPrograms: " برنامه ها" },
        { addingScores: " افزودن فعالیت " },
        { actions: " عمليات" },
      ],

      //customer delete
      showDeleteCustomerModal: false,
      deletedRow: "",
      deleteCustomerLoading: false,
      deleteID: "",
      editId: "",

      //customer edit
      showEditCustomerModal: false,
      showEditStatusModal: false,
      editdRow: "",
      editCustomerLoading: false,

      editCustomer: {
        Name: "",
        Family: "",
        Password: "",
        Mobile: "",
      },

      // CreateNewScoreModal
      CreateNewScoreModal: false,
      selectedName: "",
      scoreId: "",
      customerId: "",
      CustomerScores: "",

      //program
      //create
      createLoading: false,
      loadingTable: false,

      programform: {
        PointsNeeded: "",
        Title: "",
        Description: "",
        Picture: "",
        Base64File: "",
      },

      //Edit
      editLoading: false,
      editedRow: "",
      editProgramForm: {
        Id: "",
        PointsNeeded: "",
        Title: "",
        Description: "",
        Picture: "",
        Base64File: "",
      },

      //table
      programfields: [
        { Title: "نام برنامه" },
        { PointsNeeded: " امتیاز لازم" },
        { Description: "توضیحات" },
        { Picture: " عکس برنامه" },
        { actions: "عملیات" },
      ],

      programitems: [],
      AllScores: [],
      //score
      //create
      // createLoading: false,
      scoreform: {
        Points: "",
        ActivityName: "",
        Description: "",
        Picture: "",
        Base64File: "",
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
      showCustomerScoresModal: false,
      showCustomerProgramsModal: false,
      showWatingProgramsModal: false,
      showOwerCustomerModal: false,

      showApplyModal: false,
      removeScoreFromCustomerModal: false,
      removeProgramFromCustomerModal: false,

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

      scoreFields: [
        { ActivityName: "نام فعالیت" },
        { Points: "تعداد امتیاز" },
        { Description: "توضیحات" },
        { Actions: "عملیات" },
      ],

      fieldsOfCustomerPrograms: [
        { Title: "نام برنامه" },
        { PointsNeeded: " تعداد امتیاز لازم" },
        { Description: "توضیحات" },
        { status: "وضعیت" },
        { Actions: "عملیات" },
      ],

      watingCustomerList: [
        { CustomerName: "نام مشتری" },
        { ProgramTitle: "نام برنامه" },
        { programStatus: " وضعیت " },
      ],

      owerCustomers: [{ Mobile: "شماره مشتری" }, { NationalCode: "نام مشتری" }],

      registerCustomer: [],

      items: [],
      CustomerPrograms: [],
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

      //customerStatus
      customerStatus: {
        Id: "",
        Status: "",
        UserDescription: "",
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
    getFile() {
      var blob = new Blob([Papa.unparse(this.registerCustomer)], {
        type: "text/csv;charset=utf-8;",
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

    async owerCustomer() {
      this.showOwerCustomerModal = true;

      await axios
        .get(
          `http://localhost:8080/api/RegisterLog/GetAll`,

          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.registerCustomer = response.data;

          console.log(this.registerCustomer);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    async watingCustomer() {
      this.showWatingProgramsModal = true;

      await axios
        .get(
          `http://localhost:8080/api/User/GetAllProgramCustomersWaiting`,

          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.WaitingPrograms = response.data;

          console.log(this.WaitingPrograms);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    closeModal() {
      this.showDeleteModal = false;
    },

    async setStatus(row) {
      this.showWatingProgramsModal = false;
      this.showCustomerProgramsModal = false;
      this.showEditStatusModal = true;
      this.status = row;
      console.log("row--", row);

      this.customerStatus.Id = row.item.Id;
      this.customerStatus.Status = row.item.Status;

      this.customerStatus.UserDescription = row.item.UserDescription;

      await axios
        .get(
          `http://localhost:8080/api/User/GetCustomerPrograms/${this.IdOfCustomer}`,

          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.CustomerPrograms = response.data;
          console.log("Customer scores:", response.data);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    async EditStatusbtn() {
      console.log(this.customerStatus);

      await axios
        .post(
          `http://localhost:8080/api/User/UpdateProgramCustomerStatus/${this.customerStatus}`,
          this.customerStatus,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.snackbarGreen = true;
          this.snackColor = "green";
          this.text = response.data.Description;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.showEditStatusModal = false;
    },

    async showCustomerPrograms(row) {
      this.showCustomerProgramsModal = true;
      this.IdOfCustomer = row.item.Id;

      await axios
        .get(
          `http://localhost:8080/api/User/GetCustomerPrograms/${this.IdOfCustomer}`,

          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.CustomerPrograms = response.data;
          console.log("Customer scores:", response.data);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    async showAllScores() {
      this.showSearchScore = false;

      this.loadingTable = true;
      await axios
        .get(`http://localhost:8080/api/Score/GetAll`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })

        .then((response) => {
          this.AllScores = response.data;
          this.text = "در حال دریافت اطلاعات ...";
          this.snackbarGreen = true;
          this.snackColor = "green";
          this.signUpLoading = false;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    async showAllPrograms() {
      this.showSearchProgram = false;

      this.loadingTable = true;
      await axios
        .get(`http://localhost:8080/api/Program/GetAll`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })

        .then((response) => {
          this.programitems = response.data;
          this.text = "در حال دریافت اطلاعات ...";
          this.snackbarGreen = true;
          this.snackColor = "green";
          this.signUpLoading = false;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.loadingTable = false;
    },

    async showAll() {
      this.showSearch = false;

      this.loadingTable = true;
      await axios
        .get(`http://localhost:8080/api/User/GetAllCustomers`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })

        .then((response) => {
          this.AllUsers = response.data;
          this.text = "در حال دریافت اطلاعات ...";
          this.snackbarGreen = true;

          this.snackColor = "green";

          this.signUpLoading = false;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.loadingTable = false;
    },

    RemoveScoreFromCustomer(row) {
      console.log("row score of customer", row);
      this.scoreOfCustomer = row.item.Id;
      this.removeScoreFromCustomerModal = true;
    },

    RemoveProgramFromCustomer(row) {
      console.log("row score of customer", row);
      this.programOfCustomer = row.item.Id;
      this.removeProgramFromCustomerModal = true;
    },

    async deleteScoreOfCustomerbtn() {
      this.deleteCustomerScoreLoading = true;
      let response = await axios.post(
        `http://localhost:8080/api/User/RemoveScoreFromCustomer/${this.scoreOfCustomer}`,
        this.scoreOfCustomer,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      await axios
        .get(
          `http://localhost:8080/api/User/GetCustomerScores/${this.IdOfCustomer}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.CustomerScores = response.data;
          console.log("Customer scores:", response.data);
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.deleteCustomerScoreLoading = false;

      this.snackbarGreen = true;
      this.text = response.data.Description;
      this.removeScoreFromCustomerModal = false;
    },

    async deleteProgramOfCustomerbtn() {
      this.deleteCustomerScoreLoading = true;
      let response = await axios.post(
        `http://localhost:8080/api/User/RemoveProgramFromCustomer/${this.programOfCustomer}`,
        this.programOfCustomer,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      await axios
        .get(
          `http://localhost:8080/api/User/GetCustomerPrograms/${this.IdOfCustomer}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.CustomerPrograms = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.deleteCustomerScoreLoading = false;

      this.snackbarGreen = true;
      this.text = response.data.Description;
      this.removeProgramFromCustomerModal = false;
    },

    async doSearchScore() {
      this.showSearchScore = true;
      let res = await axios.get(
        `http://localhost:8080/api/Score/GetByName?name=${this.searchScore}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      this.AllScores = res.data;
    },

    async doSearch() {
      this.showSearch = true;
      let res = await axios.get(
        `http://localhost:8080/api/User/GetByName?fullname=${this.searchName}`,

        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      this.AllUsers = res.data;
    },

    async doSearchProgram() {
      this.showSearchProgram = true;
      let res = await axios.get(
        `http://localhost:8080/api/Program/GetByName?name=${this.searchProgram}`,

        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      console.log("res : ", res);

      this.programitems = res.data;
    },

    async getImg() {
      let res = await axios.get(
        `http://localhost:8080/api/Customer/GetPictureFile/${this.imgId}`,
        this.imgId,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("img is: ", res.data);
    },
    getRow(row) {
      console.log("img", row);
    },
    bgBase64(e) {
      new Promise((res) => {
        const fileReader = new FileReader();
        fileReader.onload = function (FileLoadEvent) {
          const image64 = FileLoadEvent.target?.result;
          res(image64);
        };
        fileReader.readAsDataURL(e);
      }).then((img) => {
        this.bg64 = img;
        this.bgSend();
      });

      // this.images.push(e.name);
    },

    async bgSend() {
      this.programform.Base64File = this.bg64;
      this.editProgramForm.Base64File = this.bg64;
    },
    async showCustomerScores(row) {
      this.showCustomerScoresModal = true;
      this.IdOfCustomer = row.item.Id;

      await axios
        .get(
          `http://localhost:8080/api/User/GetCustomerScores/${this.IdOfCustomer}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.CustomerScores = response.data;
          console.log("Customer scores:", response.data);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    async CheckaddNewScoreToCustomer(row) {
      console.log("row:", row);
      this.showApplyModal = true;

      this.editedRow = row;
      this.selectedName = row.item.ActivityName;
      this.scoreId = row.item.Id;

      // this.openEditModal();
      console.log("scoreId:", this.scoreId);
    },

    async addNewScoreToCustomer() {
      //  this.addScoreToCustomerModal = false;
      this.showApplyModal = false;

      await axios
        .get(
          `http://localhost:8080/api/User/GetCustomerScores/${this.customerId}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.CustomerScores = response.data;
          console.log("Customer scores:", response.data);
        })
        .catch((e) => {
          this.errors.push(e);
        });

      for (let item of this.CustomerScores) {
        this.getenScores.push(item.ActivityName);
      }
      console.log("selectedName:", this.selectedName);

      // if (this.getenScores.includes(this.selectedName)) {
      //   console.log("has been added ! ");
      //   this.snackColor = "red";
      //   this.text = "اين فعاليت قبلا اضافه شده !";
      //   this.snackbarGreen = true;
      // }
      // else {
      console.log("noot");
      // this.snackColor = "green";

      // this.text = "فعالیت با موفقیت اضافه شده";

      await axios
        .post(
          `http://localhost:8080/api/User/AddScoreToCustomer/${this.customerId}?scoreid=${this.scoreId}`,
          this.customerId,
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
        .get(
          `http://localhost:8080/api/User/GetCustomerScores/${this.customerId}`,
          this.customerId,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.CustomerScores = response.data;
          console.log("Customer scores:", response.data);
        })
        .catch((e) => {
          this.errors.push(e);
        });
      // }
      this.selectedName = "";
      // this.showTrueIcon(row);
    },

    addScoreToCustomer(row) {
      console.log("addScoreToCustomer row", row);
      this.customerId = row.item.Id;
      this.addScoreToCustomerModal = true;
      this.selectedName = "";
    },

    editCustRow(row) {
      console.log("edit row", row);
      this.showEditCustomerModal = true;
      this.editdRow = row;
      this.editCustomer.Name = row.item.Name;
      this.editCustomer.Family = row.item.Family;
      this.editCustomer.Password = row.item.Password;
      this.editCustomer.Mobile = row.item.Mobile;
      this.editId = row.item.Id;
    },

    closeeditCustomerModal() {
      this.showEditCustomerModal = false;
      this.addScoreToCustomerModal = false;
      this.showApplyModal = false;
      this.showCustomerProgramsModal = false;
      this.showWatingProgramsModal = false;
      this.showOwerCustomerModal = false;
    },

    async editCustomerbtn() {
      this.editCustomerLoading = true;

      await axios
        .post(
          `http://localhost:8080/api/User/UpdateCustomer/${this.editId}`,
          this.editCustomer,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.text = response.data.Description;
          this.MessageType = response.data.MessageType;

          if (response.data.MessageType == 1) {
            this.snackbarGreen = true;

            this.snackColor = "green";
            // this.$router.push({ path: "/customerLogin" });
          } else {
            this.snackbarGreen = true;

            this.snackColor = "red";
          }

          this.signUpLoading = false;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.showEditCustomerModal = false;
      this.editCustomerLoading = false;

      await axios
        .get(`http://localhost:8080/api/User/GetAllCustomers`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })

        .then((response) => {
          this.AllUsers = response.data;
          // this.text = "در حال دریافت اطلاعات ...";
          // this.snackbarGreen = true;

          // this.snackColor = "green";

          console.log("AllUsers: ", this.AllUsers);

          this.signUpLoading = false;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    async deleteCustomerbtn() {
      this.deleteCustomerLoading = true;

      await axios
        .post(
          `http://localhost:8080/api/User/DeleteCustomer?id=${this.deleteID}`,
          this.deleteID,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.text = response.data.Description;
          this.MessageType = response.data.MessageType;

          if (response.data.MessageType == 1) {
            this.snackbarGreen = true;

            this.snackColor = "green";
            // this.$router.push({ path: "/customerLogin" });
          } else {
            this.snackbarGreen = true;

            this.snackColor = "red";
          }

          this.signUpLoading = false;
        })
        .catch((e) => {
          this.errors.push(e);
        });

      await axios
        .get(`http://localhost:8080/api/User/GetAllCustomers`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })

        .then((response) => {
          this.AllUsers = response.data;
          // this.snackColor = "green";

          // this.snackbarGreen = true;

          console.log("AllUsers: ", this.AllUsers);

          // if (response.data.MessageType == 1) {
          //   this.snackbarGreen = true;

          //   this.snackColor = "green";
          //   // this.$router.push({ path: "/customerLogin" });
          // } else {
          //   this.snackbarGreen = true;

          //   this.snackColor = "red";
          // }

          this.signUpLoading = false;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.showDeleteCustomerModal = false;
      this.deleteCustomerLoading = false;
    },

    closeDeletCustomerModal() {
      this.showDeleteCustomerModal = false;
      this.showEditStatusModal = false;
    },

    async deleteCustRow(row) {
      console.log("delete..", row);
      this.showDeleteCustomerModal = true;
      this.deletedRow = row;
      this.deleteID = row.item.Id;
      console.log(" deleteID ..", this.deleteID);
    },

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

    async showDetails(row) {
      console.log("row", row);

      this.showDetailsModal = true;

      this.bDate = row.item.BirthDate;
      this.personal.BirthDate = this.bDate.substring(0, 10);

      this.personal.FullName = row.item.FullName;

      this.personal.ProfilePictrue = row.item.ProfilePictrue;

      if (row.item.Degree == 5) {
        this.personal.Degree = "دیپلم";
      } else if (row.item.Degree == 1) {
        this.personal.Degree = "کاردانی";
      } else if (row.item.Degree == 2) {
        this.personal.Degree = "لیسانس";
      } else if (row.item.Degree == 3) {
        this.personal.Degree = "فوق لیسانس";
      } else if (row.item.Degree == 4) {
        this.personal.Degree = "دکترا";
      }

      // this.personal.Degree = row.item.Degree;

      this.personal.NationalCode = row.item.NationalCode;

      this.personal.Kargozar = row.item.Kargozar;

      if (row.item.Gender) {
        this.personal.Gender = "مرد";
      } else {
        this.personal.Gender = "زن";
      }

      this.personal.Mobile = row.item.Mobile;

      if (row.item.IsMarried) {
        this.personal.IsMarried = "متاهل";
      } else {
        this.personal.IsMarried = "مجرد";
      }

      this.personal.JobType = row.item.JobType;

      this.personal.Email = row.item.Email;
      this.personal.Address = row.item.Address;

      this.personal.CityId = row.item.CityId;

      await axios
        .get(`http://localhost:8080/api/City/GetById/${row.item.CityId}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })

        .then((response) => {
          this.personal.ProvinceId = response.data.ProvinceName;
          this.personal.CityId = response.data.Name;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    //create
    openCreateModal() {
      this.showCreateModal = true;
    },
    closeCreateModal() {
      this.showCreateModal = false;
      this.showCreateScoreModal = false;
      this.showCustomerScoresModal = false;
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
      this.showDetailsModal = false;
      this.showCreateScoreModal = false;
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
      this.programform.Title = "";
      this.programform.Description = "";
      this.programform.PointsNeeded = "";
    },

    async addNewScore() {
      this.createLoading = true;
      await this.setNewScore(this.scoreform);
      await this.getUserScores();
      this.AllScores = this.getScores;

      this.text = await this.getMessage;

      if ((await this.getMessageType) == 1) {
        this.snackColor = "green";
      } else {
        this.snackColor = "red";
      }

      this.snackbarGreen = true;

      this.createLoading = false;

      this.showCreateScoreModal = false;

      this.scoreform.ActivityName = "";
      this.scoreform.Points = "";
      this.scoreform.Description = "";
    },

    //Edit Program

    async editProgramRow(row) {
      this.editedRow = row;
      this.editProgramForm.Id = row.item.Id;
      this.imgId = row.item.Picture;
      this.editProgramForm.Picture = row.item.Picture;

      console.log("imggg", this.imgId);

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
      this.showEditScoreModal = true;
      // await this.getScoreById(this.editedRow.item.Id);

      console.log("score row: ", row);

      this.editForm.ActivityName = row.item.ActivityName;
      this.editForm.Points = row.item.Points;
      this.editForm.Description = row.item.Description;
    },

    closeEditModal() {
      this.showEditScoreModal = false;
      this.showEditStatusModal = false;
    },

    async updateScorebtn() {
      this.editLoading = true;
      await this.updateScore(this.editForm);

      await this.getUserScores();
      this.AllScores = this.getScores;

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
      this.showDeleteScoreModal = false;
      this.removeScoreFromCustomerModal = false;
      this.removeProgramFromCustomerModal = false;
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
      this.AllScores = this.getScores;

      this.deleteLoading = false;

      this.showDeleteScoreModal = false;
    },

    async createUser() {
      this.signUpLoading = true;

      await axios
        .post(`http://localhost:8080/api/User/RegisterNewCustomer`, this.form, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.text = response.data.Description;
          this.MessageType = response.data.MessageType;

          if (response.data.MessageType == 1) {
            this.snackbarGreen = true;

            this.snackColor = "green";
            // this.$router.push({ path: "/customerLogin" });
          } else {
            this.snackbarGreen = true;

            this.snackColor = "red";
          }

          this.signUpLoading = false;
        })
        .catch((e) => {
          this.errors.push(e);
        });

      await axios
        .get(`http://localhost:8080/api/User/GetAllCustomers`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })

        .then((response) => {
          this.AllUsers = response.data;
          // this.snackColor = "green";

          // this.snackbarGreen = true;

          console.log("AllUsers: ", this.AllUsers);

          // if (response.data.MessageType == 1) {
          //   this.snackbarGreen = true;

          //   this.snackColor = "green";
          //   // this.$router.push({ path: "/customerLogin" });
          // } else {
          //   this.snackbarGreen = true;

          //   this.snackColor = "red";
          // }

          this.signUpLoading = false;
        })
        .catch((e) => {
          this.errors.push(e);
        });

      this.showCreateCustomerModal = false;
      this.form.Name = "";
      this.form.Mobile = "";

      this.form.Password = "";

      this.form.Family = "";
    },
  },

  async created() {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
    this.loadingTable = true;
    await axios
      .get(`http://localhost:8080/api/User/GetAllCustomers`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })

      .then((response) => {
        this.AllUsers = response.data;
        this.text = "در حال دریافت اطلاعات ...";
        this.snackbarGreen = true;

        this.snackColor = "green";

        console.log("AllUsers: ", this.AllUsers);

        // if (response.data.MessageType == 1) {
        //   this.snackbarGreen = true;

        //   this.snackColor = "green";
        //   // this.$router.push({ path: "/customerLogin" });
        // } else {
        //   this.snackbarGreen = true;

        //   this.snackColor = "red";
        // }

        this.signUpLoading = false;
      })
      .catch((e) => {
        this.errors.push(e);
      });

    await this.getUserScores();
    this.AllScores = this.getScores;
    console.log("allScores", this.AllScores);

    await this.getUserprograms();
    this.programitems = this.getprograms;
    console.log("allPrograms :", this.programitems);
    this.loadingTable = false;
  },
};
</script>

<style >
.my-class {
  background: black;
  color: white;
}
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
.tab-title-class {
  color: #6667ab !important;
}

.tab {
  color: red;
}

.modalbg {
  color: red !important;
}

/* .table {
  overflow-x: scroll;
  overflow-y: hidden;
} */

.pic {
  width: 150px !important ;
  margin: 0 !important;
}
</style>