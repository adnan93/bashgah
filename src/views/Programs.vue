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
          <b-col cols="1"> </b-col>

          <b-col cols="10">
            <div>
              <b-row>
                <b-col class="mb-5">
                  <v-btn
                    class="btnsize"
                    color="#bea44d"
                    elevation="3"
                    rounded
                    large
                    @click="login()"
                    >افزودن برنامه
                  </v-btn>
                </b-col>
                <b-col> </b-col>
              </b-row>

              <v-data-table
                :headers="headers"
                :items="desserts"
                sort-by="calories"
                class="elevation-1"
                dir="rtl"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon color="red" big class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon color="blue" big @click="deleteItem(item)">
                    mdi-delete
                  </v-icon>
                </template>

              </v-data-table>
            </div>
          </b-col>

          <b-col cols="1"> </b-col>
        </b-row>
      </b-card>
    </b-card-group>


    
 

   
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "نام فعالیت",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "امتیاز",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "توضیحات",
          align: "start",
          sortable: true,
          value: "name",
        },

        { text: "عملیات", value: "actions", sortable: false },
      ],
    };
  },
};
</script>

<style>
</style>