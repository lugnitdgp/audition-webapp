import Api from './Api'

export default {

  login(user) {
    return Api().post('auth/login', user)
  },
  signup(user) {
    return Api().post('auth/signup', user)
  },
  logout() {
    return Api().get('auth/logout')
  },
  getUsers() {

      return Api().get('protected/getUsers', {
        headers: { Authorization: localStorage.getItem("token") }
      }).catch(()=>{
        const res = {
          status : 401,
        }
        return res;
      })
    
  },
  getUser(id){
      return Api().post('protected/getUser',id,{
        headers: { Authorization: localStorage.getItem("token") },
      })
  },
  updateEntry(a){

    return Api().put('protected/update',a,{
      headers: { Authorization: localStorage.getItem("token") },
    })
  },
  upload(formdata){
    return Api().post('upload',formdata,{
      headers: { Authorization: localStorage.getItem("token") },
    })
  },
  addround(round){
    return Api().post('addround',round,{
      headers: { Authorization: localStorage.getItem("token") },
    })

  },
  getAuditionStatus(){ 
    return Api().get('auditionstatus')
  },

  changeRole(id){ 
    return Api().put('protected/changerole',id ,{
      headers: { Authorization: localStorage.getItem("token") },
    })
  },
  
  setClearance(id) { 
    return Api().put('protected/setclearance',id ,{
      headers: { Authorization: localStorage.getItem("token") },
    })
},
pushRound(){
  return Api().post('protected/pushround',null,{
    headers: { Authorization: localStorage.getItem("token") },
  })
},
stopRound(){
  return Api().post('protected/stopround',null,{
    headers: { Authorization: localStorage.getItem("token") },
  })
},

pushResult(){
  return Api().post('protected/pushresult',null,{
    headers: { Authorization: localStorage.getItem("token") },
  })
},


  
}

