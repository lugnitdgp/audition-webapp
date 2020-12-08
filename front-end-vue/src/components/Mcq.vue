<template>
	<div>
      <v-container fluid>
    
    <v-card
    outlined
    shaped
    tile
    >
     <v-card-text >
      "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
      "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
       "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
      "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
    </v-card-text>
    </v-card>
    <v-spacer />
    <v-spacer />
    <div v-for="n in 4" :key="n.id"> 
    <v-checkbox v-model="checkbox"   label="success" color="success" value="success">
      <template v-slot:label>
        <div>
            Item {{ n }} {{ checkbox.indexOf(n) }}
        </div>
      </template>
    </v-checkbox>
    </div>
  </v-container>
	</div> 
</template>

<script>
  export default {
    data () {
      return {
        checkbox: [],
      }
    },
  }
</script>
