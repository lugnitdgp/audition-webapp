<template>
  <v-app id="inspire">
    <v-content>
      <v-container>
        <v-card>
          <v-text-field
            v-model="newTodo"
            label="What are you working on?"
            solo
            @keydown.enter="addTodo"
          >
          </v-text-field>
          <v-select
            :items="items"
            v-model="item"
            label="Outlined style"
            outlined
          ></v-select>
          <component v-bind:is="currentComponent"></component>
          <v-spacer />
          <v-text-field
            v-model="quesLink"
            label="Resource Link"
            solo
            @keydown.enter="addTodo"
          >
          </v-text-field>
        </v-card>
        <v-spacer />
        <v-spacer />
        <v-spacer />
        <br />
        <draggable
          group="people"
          @start="drag = true"
          @end="drag = false"
        >
          <v-card
            class="mx-auto"
            color="#26126a"
            dark
            min-width="600"
            min-height="100"
            v-for="(todo, index) in todos"
            :key="todo.id"
          >
            <v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>mdi-pen</v-icon>
                </v-btn>

                <v-btn icon @click="removeTodo(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card-title>

            <v-card-text>
              <div>{{ todo.text }}</div>
            </v-card-text>
          </v-card>
        </draggable>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  data: () => ({
    newTodo: "",
    quesLink: "",
    todos: [],
    items: ["MCQ", "", "", ""],
    item: "",
  }),
  methods: {
    addTodo() {
      this.todos.push({ text: this.newTodo, completed: false });
      this.newTodo = "";
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },

  },
  mounted() {
    console.log("App mounted!");
    if (localStorage.getItem("todos"))
      this.todos = JSON.parse(localStorage.getItem("todos"));
    else localStorage.removeItem("todos");
  },
  watch: {
    todos: {
      handler() {
        console.log("Todos changed!");
        localStorage.setItem("todos", JSON.stringify(this.todos));
      },
      deep: true,
    },

    item: {
      handler(){
        console.log(this.item);
        console.log("theeeee")
      }
    }
  },
};
</script>
<style scoped>
</style>