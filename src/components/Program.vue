<template>
  <div>
    <div class="mCard mb-10">
      <b-card
        :class="[program.reminder ? 'reminder' : 'program']"
        :img-src="`http://localhost:8080/api/Program/GetPictureFile/${program.Picture}`"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 10rem"
      >
        <b-card-text>
          <b-row> 

          <h5>({{ program.PointsNeeded }}) امتیاز</h5>

          <h6 style="  font-size: 15px; ">{{ program.Title }}</h6>
          <!-- <h5>{{ program.Description }}</h5> -->
          <br />

          <router-link
            :to="{ path: '/AddNewProgram/' + program.Id }"
            v-bind:tooltip="program.Id"
            append
          >
            <a class="link" style="text-decoration: none; color: #90c445">
              ادامه
            </a>
          </router-link>
          </b-row>

        </b-card-text>
      </b-card>
    </div>

    <!-- <br />
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
    <br /> -->
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
    console.log("program is: ", this.program);
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
a:link {
  text-decoration: none;
  background-color: none !important;
}

.program {
  /* border: 3px solid #10503b; */

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

.mCard {
  display: grid;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.9);
  border-radius: 18px;
  grid-template-columns: 150px;
  grid-template-rows: 280px;
  text-align: center;
}

.mCard:hover {
  transform: scale(1.15);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6);
  transition: 0.5s ease;
}
</style>