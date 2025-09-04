import UserDefault from "./user/Default/UserDefault";
// import AdminLayout from "./admin/Default/AdminLayout";
import NoHeaderLayout from "./other/NoHeader/NoHeaderLayout.jsx";


const layouts = {
  //   admin: {
  //     default: AdminLayout,
  //   },

  user: {
    default: UserDefault,
  },

  other: {
    noHeader: NoHeaderLayout,
  },

};

export default layouts;
