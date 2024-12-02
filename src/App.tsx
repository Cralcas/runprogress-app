import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./auth/AuthProvider";
import { router } from "./router/Router";

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </>
  );
}

export default App;
