import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import initializeHomepage from "app/redux/global-actions/initializeHomepage";

import LazyComponent from "components/LazyComponent";

const Homepage = React.lazy(() => import("features/homepage"));
const Drawer = React.lazy(() => import("features/drawer/Drawer"));
const Note = React.lazy(() => import("features/note/Note"));
const Bookmark = React.lazy(() => import("features/bookmark/Bookmark"));
const Setting = React.lazy(() => import("features/settings/Settings"));

const HomepageRoutes = () => {
  useEffect(() => {
    initializeHomepage();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LazyComponent Component={Homepage} />}>
        <Route path="drawer" element={<LazyComponent Component={Drawer} />} />
        <Route path="note" element={<LazyComponent Component={Note} />} />
        <Route
          path="bookmark"
          element={<LazyComponent Component={Bookmark} />}
        />
        <Route path="setting" element={<LazyComponent Component={Setting} />} />
      </Route>
    </Routes>
  );
};

export default HomepageRoutes;
