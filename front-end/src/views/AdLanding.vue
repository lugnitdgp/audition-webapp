<template>
    <div>
        <v-btn @click="logout" color="teal darken-3">Logout</v-btn>
        </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Landing',
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
                    alert('what?')
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
    methods:{
        logout(){
          axios.get('http://localhost:3000/logout').then((res)=>{
                localStorage.clear()
                alert(res.data)
                this.$router.push('/AdLog')

            })
            
        }
    }

}
</script>