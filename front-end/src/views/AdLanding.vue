<template>
<v-app>
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
<v-spacer></v-spacer><v-spacer></v-spacer>
<v-spacer></v-spacer>
<v-spacer></v-spacer>
<v-spacer></v-spacer>
<v-spacer></v-spacer>
<v-spacer></v-spacer>
<v-spacer></v-spacer>

              <v-btn @click="logout" color="teal darken-3">Logout</v-btn>
              <v-spacer></v-spacer>

              <v-btn @click="purge" color="teal darken-3">PURGE</v-btn>

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
         

        </v-list-item-group>
      </v-list>
      </v-navigation-drawer>

        
  <v-container fluid>
      <div>
        <v-spacer>  <h1>Welcome, {{adminUser.UserName}}</h1> </v-spacer>
        <v-switch v-model="darkmode" label="Dark Mode"></v-switch>
        </div>
    <v-switch v-model="expand" label="Expand Single Item"></v-switch>
    
    <v-data-iterator
      :items="items"
      item-key="_id"
      :items-per-page="4"
      :single-expand="expand"
      hide-default-footer
    >
      <template v-slot:default="{ items, isExpanded, expand }">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item._id"
            cols="40"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title>
                <h4>{{ item.name }}</h4>
              </v-card-title>
              <v-switch
                :input-value="isExpanded(item)"
                :label="isExpanded(item) ? 'Expanded' : 'Closed'"
                class="pl-4 mt-0"
                @change="(v) => expand(item, v)"
              ></v-switch>
              <v-divider></v-divider>
              <v-list v-if="isExpanded(item)" dense>
                <v-container fluid>
                  <v-card>
                    <strong>Selection status : {{item.selected.status}} last change by : {{item.selected.user}}</strong><v-spacer />
                    <strong>Final : {{item.final.status}} Finalised by : {{item.final.user}}</strong>
                    </v-card>
                    <v-card-actions>
                        <v-spacer />
                    <v-btn @click="usercontrol(item._id)" color="teal darken-3">User Details</v-btn>
                    </v-card-actions>
                </v-container>
              </v-list>
            </v-card>
          </v-col>  
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>

</v-content> 
</v-app>

</template>

<script>
import axios from 'axios'
export default {
    name:'Landing',
     components: {
        
    },
    
    data(){
        return{
            drawer: false,
        adminUser : null,
        items:[],
        expand: false,
        darkmode: false

    }},
    watch:{
                    darkmode(newvalue){
                    this.$vuetify.theme.dark = newvalue
                    }

        },
    beforeCreate(){
        
        if(localStorage.getItem('token') ===  null){
            localStorage.clear()
            this.$router.push('/')
        }
        else{
            axios.get('http://localhost:3000/auth/jwt', {
           'headers': { 'Authorization': localStorage.getItem('token') }
          }).then((res)=>{

                if(res.data.isAdmin === true){
                    this.adminUser= res.data
                        }
                else{
                    alert('You are trying to access higher level access and have been flagged in our audition process')
                    axios.post('http://localhost:3000/flag',res.data).then(()=>{
                        axios.get('http://localhost:3000/logout').then(()=>{
                       localStorage.clear('token')
                        this.$router.push('/')})
                    })
                    
                }
            })
           
        }
    },
    created(){
        axios.get('http://localhost:3000/protected/getUsers').then((res)=>{
            this.items = res.data
            console.log(this.items)
            
        })
        this.$vuetify.theme.dark = false
    },
    methods:{
        logout(){
          axios.get('http://localhost:3000/logout').then((res)=>{
                localStorage.clear()
                alert(res.data)
                this.$router.push('/AdLog')

            })
            
        },
        usercontrol(a){
            let routeData = this.$router.resolve({name: 'UserControl', query: {id: a}});
            window.open(routeData.href, '_blank');
            },
            purge(){
              axios.post('http://localhost:3000/protected/purge').then((res)=>{
                alert(res.data.message)
                location.reload()
              })
            }
        
    }

}
</script>