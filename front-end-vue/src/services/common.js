import Api from "./Api";

export default {
  login(user) {
    return Api().post("auth/login", JSON.stringify(user), {
      headers: { "content-type": "application/json" },
    });
  },
  signup(user) {
    return Api().post("auth/signup", user);
  },
  logout() {
    return Api().get("logout");
  },
  getUsers() {
    return Api()
      .get("protected/getUsers", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .catch(() => {
        const res = {
          status: 401,
        };
        return res;
      });
  },
  getUser(id) {
    return Api().post("protected/getUser", id, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  },
  updateEntry(a) {
    return Api().post("protected/update", a);
  },
  purge() {
    return Api().post("protected/purge");
  },
};
