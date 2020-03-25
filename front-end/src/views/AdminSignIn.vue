


<template>
  <v-app id="inspire">
    
    <v-content>
        <v-card
        class="mx-auto overflow-hidden"
            >
    <v-app-bar
      color = "red darken-4"
      
      dark
      src="../../../img/bg.jpg"
    >
    
      
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>GLUG AUDITIONS 2020</v-toolbar-title>
    </v-app-bar>

    
            </v-card>

    
      <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--lighten-2"
        >
          <router-link tag="span" to='/'>
          <v-list-item>
            
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
            
          </v-list-item>
          </router-link>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
      </v-navigation-drawer>
      <v-container fluid
      class= "fill-height">
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="red darken-4"
                dark
                flat
              >
              <v-spacer></v-spacer>
                <v-toolbar-title> Admin Login </v-toolbar-title>
                <v-spacer />
                  
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                     v-model="email"
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                  />

                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="send" color="red darken-4">Login</v-btn>
                <v-btn  color="primary">Sign Up</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      
    </v-content>
  </v-app>
</template>

<script>
  export default {
     data: () => ({
      drawer: false,
      email:'',
      password:''

    }),
    props: {
      source: String,
    },
    methods:{
        send(){
          
        }
    }
      
  }
  
</script>