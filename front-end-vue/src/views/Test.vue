<template>
<div>
     <v-toolbar color="#141d2b" flat>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer></v-spacer>
      <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="error"
          dark
          v-bind="attrs"
          v-on="on"
        >
         Finalise
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Are You Sure ?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="dialog = false"
          >
           NO
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            
            @click="dialog = false"
          >
            YES
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
    </v-toolbar>
      <v-spacer />
    <v-spacer />
      <v-spacer />
    <v-spacer />
    <v-container fluid>
      <v-alert
      text
      color="info"
    >
      <h3 class="headline">
        WELCOME TO THE DETAILS OF 
      </h3>
    </v-alert>
  
    </v-container>
   <v-container fluid>
    <v-row>
      <v-col md ="6">
  <v-card>
    <v-toolbar
      color="info"
      dark
      flat
    >
     

      <v-toolbar-title  color="info">Answers across all rounds</v-toolbar-title>


      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
           color="#9fef00"
        >
          <v-tabs-slider color="#9fef00"></v-tabs-slider>

          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card flat>
          <v-card-text v-text="text"></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
      </v-col>
           <v-col md ="6">
   <div>
       <v-alert dense outlined type="error">
      <v-row align="center">
        <v-col >
          Current Round : 1 Current selection status : true by 
        </v-col>
        <v-col class="shrink">
          <v-btn>Change Selection Status</v-btn>
        </v-col>
      </v-row>
    </v-alert>
      <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col >
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-spacer></v-spacer>
              <v-toolbar-title> Your Feedback </v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-spacer />
            <v-card-text>
              <v-textarea
                v-model="feedback"
                label="YOUR feedback"
                name="feedback"
                outlined
                type="text"
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn @click="submitFeedback" color="teal darken-3"
                >Post your feedback</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
       <v-data-iterator
       
      >
        <template v-slot:header>
         
        </template>
        <template v-slot:default="{ items }">
          <v-row>
            <v-col
              v-for="item in items"
              :key="item._id"
              
            >
              <v-card>
                <v-card-title>
                  <h4>
                    Feed-back by {{ item.user }} in Round {{ item.round }}
                  </h4>
                </v-card-title>

                <v-divider></v-divider>
                <v-list dense>
                  <v-container fluid>
                    {{ item.feedback }}
                  </v-container>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
      </v-col>
    </v-row>
     </v-container>
  
</div>
</template>

<script>
  export default {
    data () {
      return {
        tab: null,
        dialog: false,
        items: [
          'ROUND1', 'ROUND2'
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
  }
</script>