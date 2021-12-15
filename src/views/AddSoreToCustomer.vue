<template>
  <div>
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
        <template #cell(Actions)="row">
          <div @click="addNewScoreToCustomer(row)">
            <v-icon style="font-size: 20px; color: #90c445">
              add_circle
            </v-icon>

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
      </b-table>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>