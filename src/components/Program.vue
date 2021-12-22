<template>
  <div>
    <b-card
      :class="[program.reminder ? 'reminder' : 'program']"
      :img-src="`http://localhost:8080/api/Program/GetPictureFile/${program.Picture}`"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 10rem"
    >
      <b-card-text>
        <h5>
          {{ program.PointsNeeded }}
          امتیاز
        </h5>
        <p>{{ program.Title }}</p>
        <!-- <h5>{{ program.Description }}</h5> -->
      </b-card-text>
<!-- 
      <v-btn
        class="btnsize"
        color="#90c445"
        elevation="5"
        rounded
        small
        @click="addNewProgram()"

      >
      
        ادامه
      </v-btn> -->

      <router-link 
      
      :to="{ path: '/AddNewProgram/'+ program.Id }"
             v-bind:tooltip=" program.Id" append>
      
      <a > ادامه</a>
      
      </router-link>

    </b-card>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "Program",
  props: {
    program: Object,
  },
  data() {
    return {
      imgId: "",
    };
  },
  async created() {
    console.log("program is: ", this.program)
    //  let res = await axios.get(
    //   `http://localhost:8080/api/Customer/GetPictureFile/${this.program.Picture}`,
    //   this.program.Picture,
    //   {
    //     headers: {
    //       token: localStorage.getItem("token"),
    //     },
    //   }
    // );
    // console.log("img is: ", res.data);
  },
  methods: {
    addNewProgram() {
      this.$router.push({ path: "/AddNewProgram" });
    },
  },
};
</script>

<style scope>
.program {
  border: 3px solid #10503b;

  margin-bottom: 1rem;
}

.reminder {
  border: 3px solid #b8b6b0;

  margin-bottom: 1rem;
}

.program h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>