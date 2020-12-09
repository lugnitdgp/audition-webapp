<template>
	<div>
      <v-container fluid>
    
    <v-card
    outlined
    shaped
    tile
    >
     <v-card-text >
     {{question.quesText}}
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
    	props: ['question'],
    data () {
      return {
        checkbox: [],
      }
    },
  }
</script>
