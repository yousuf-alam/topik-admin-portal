<template>
  <div class="container mt-4">
    <div class="card shadow-lg">
      <div class="card-header bg-primary text-white">
        <h4>Update Question (ID: {{ questionId }})</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="updateQuestion">
          <!-- Question Title -->
          <div class="form-group">
            <label>Title</label>
            <input type="text" class="form-control" v-model="question.title" required />
          </div>
          <div v-if="question.image" class="form-group">
            <label>Question Image</label> <br>
            <img :src="`${BASE_URL}/images/${question.image}`" class="img-fluid  shadow-sm" alt="Question Image" style="max-width: 300px;" />
          </div>

          <!-- Play Audio (If Exists) -->
          <div v-if="question.audio" class="form-group  mt-3">
            <label>Question Audio</label> <br>
            <audio controls>
              <source :src="`${BASE_URL}/listening/${question.audio}`" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>

          <!-- Question Type -->
          <div class="form-group">
            <label>Type</label>
            <select class="form-control" v-model="question.type">
              <option value="reading">Reading</option>
              <option value="listening">Listening</option>
            </select>
          </div>

          <!-- Difficulty Level -->
          <div class="form-group">
            <label>Difficulty Level</label>
            <input type="number" class="form-control" v-model="question.difficulty_level" min="1" required />
          </div>

          <!-- Right Answer -->
          <div class="form-group">
            <label>Right Answer (Option ID)</label>
            <input type="number" class="form-control" v-model="question.right_answer" required />
          </div>

          <!-- Options -->
          <div class="form-group">
            <label>Options</label>
            <div v-for="(option, index) in question.options" :key="index" class="input-group mb-2">
              <input type="text" class="form-control" v-model="option.title" required />
              <div class="input-group-append">
                <button type="button" class="btn btn-danger" @click="removeOption(index)">Remove</button>
              </div>
            </div>
            <button type="button" class="btn btn-success mt-2" @click="addOption">Add Option</button>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-primary">Update Question</button>
        </form>

        <!-- Display Messages -->
        <div v-if="message" class="alert alert-info mt-3">
          {{ message }}
        </div>

        <div v-if="error" class="alert alert-danger mt-3">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
const BASE_URL  = process.env.VUE_APP_BASE_URL;

export default {
  name: 'EditQuestion',
  data() {
    return {
      questionId: null,
      BASE_URL:BASE_URL,
      ADMIN_URL:ADMIN_URL,
      question: {
        title: "",
        type: "",
        difficulty_level: 1,
        right_answer: 1,
        options: []
      },
      message: "",
      error: ""
    };
  },
  created() {
    // Get question ID from route params
    this.questionId = this.$route.params.id;
    this.fetchQuestion();
  },
  methods: {
    async fetchQuestion() {
      try {
        const response = await axios.get(`${ADMIN_URL}/question-by-id/${this.questionId}`);
        this.question = response.data.data;
      } catch (err) {
        this.error = "Failed to fetch question data.";
      }
    },
    addOption() {
      this.question.options.push({ title: "" });
    },
    removeOption(index) {
      this.question.options.splice(index, 1);
    },
    async updateQuestion() {
      try {
        const response = await axios.post(`${ADMIN_URL}/update-question/${this.questionId}`, this.question);
        this.message = response.data.message;
        this.error = "";
      } catch (err) {
        this.error = "Failed to update question.";
        this.message = "";
      }
    }
  }
};
</script>

<style>

.card {
  border-radius: 10px;
}
</style>
