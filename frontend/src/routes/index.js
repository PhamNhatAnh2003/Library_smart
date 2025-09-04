import config from "../config";
import Pages from "../pages";
import layouts from "../layouts";

const publicRoutes = [

  {
    path: config.routes.user.home,
    element: Pages.user.home,
    layout: layouts.user.default,
  },

];

const privateRoutes = [
  // User
//   { path: config.routes.user.booking, element: pages.user.booking },
//   { path: config.routes.user.payment, element: pages.user.booking },
//   { path: config.routes.user.completed, element: pages.user.booking },
//   { path: config.routes.user.bookingList, element: pages.user.bookingList },
//   { path: config.routes.user.bookingDetail, element: pages.user.bookingDetail },
//   { path: config.routes.user.profile, element: pages.user.profile },

  // Admin
  {
    // path: config.routes.admin.profile,
    // element: pages.admin.profile,
    // layout: layouts.admin.default,
    // role: "admin",
  },
  
];

export { publicRoutes, privateRoutes };
