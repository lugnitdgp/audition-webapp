


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
            <router-link tag="span" to="/">
          <v-list-item>
            
            <v-list-item-icon>
              
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
            
          </v-list-item>
          </router-link>


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
                color="primary"
                dark
                flat
              >
              <v-spacer></v-spacer>
                <v-toolbar-title> Student Login </v-toolbar-title>
                <v-spacer />
                  
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                  />

                  <v-text-field
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
                <v-btn @click="send" color="indigo darken-4">Login</v-btn>
                <v-btn @click="$router.push('/StSign')" color="teal darken-3">Sign Up</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'

  export default {
    
     data: () => ({
      drawer: false,
    }),
    props: {
      source: String,
    },
    methods:{
        send(){
          var credentials = {
            email: this.email,
            password: this.password
          }
          axios.post('http://localhost:3000/login', credentials).then((res)=>{
            if(res.data.success==true){
                localStorage.setItem('token', res.data.token)
                alert('Successful login')
                this.$router.push('/Stlanding')
            }
            else{
              alert(res.data.message)
              this.$router.push('/StLog')
            }
          })
        }
    }
      
  }
  
</script>