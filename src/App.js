import { Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";
import NotFoundPage from "./pages/404";

// Routes relative to Services
import Services from "./pages/services";
import Case from "./pages/services/case";
import CaseRequest from "./pages/services/caseRequest";

// Routes relative to Chat
import Chat from "./pages/Chat";
import ChatEmpty from "./pages/Chat/empty";

// Routes for Featured Cases/Lawyers
import Favorites from "./pages/Favorites";
import FavoritesEmpty from "./pages/Favorites/empty";

// Routes regarding Login/Register
import Login from "./pages/Auth/Login";
import SmsAuth from "./pages/Auth/SmsAuth";
import Register from "./pages/Auth/Register";

// Routes Relative To Profile
import Profile from "./pages/Profile";
import ProfilePersonalData from "./pages/Profile/personalData";
import ProfileVerificationFirst from "./pages/Profile/verificationFirst";
import ProfileVerificationSecond from "./pages/Profile/verificationSecond";
import ProfileFeedbacksUser from "./pages/Profile/feedbacksUser";
import ProfileFeedbacksLawyer from "./pages/Profile/feedbacksLawyer";
import ProfileFaq from "./pages/Profile/faq";
import ProfileSupportchat from "./pages/Profile/supportChat";
import Templates from "./pages/services/templates";

import RequireAuth from "./routes/requiredAuth";

// Routes regarding Requests for Users (non-lawyers)
// import Requests from "./pages/Requests/requests";
// import SingleRequest from "./pages/Requests/singleRequest";
// import Lawyer from "./pages/Requests/lawyer";
// import Landing from "./pages/Landing";

// Routes relative to Moderator
// import Moderator from "./pages/Moderator/moderator";
// import ModeratorUser from "./pages/Moderator/moderatorUser";
// import ModeratorVerf from "./pages/Moderator/moderatorVerf";
// import ModeratorVerfUser from "./pages/Moderator/moderatorVerfUser";
// import ModeratorChat from "./pages/Moderator/moderatorChat";

import "./App.css";
import "./assets/styles/main.scss";

const ROLES = {
  Lawyer: "Lawyer",
  User: "costumer",
};

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route path="/" element={<Landing />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="sms" element={<SmsAuth />} />
          <Route path="Register" element={<Register />} />

          {/* <Route element={<RequireAdmin />}>
            <Route path="mdtr" element={<Moderator />} />
            <Route path="mdtruser/:id" element={<ModeratorUser />} />
            <Route path="mdtrverf" element={<ModeratorVerf />} />
            <Route path="mdtrverfuser/:id" element={<ModeratorVerfUser />} />
            <Route path="mdtrchat" element={<ModeratorChat />} />
          </Route> */}

          <Route
            element={<RequireAuth allowedRoles={[ROLES.Lawyer, ROLES.User]} />}
          >
            <Route path="chat" element={<Chat />} />
            <Route path="chatempty" element={<ChatEmpty />} />
            <Route path="favorite" element={<Favorites />} />
            <Route path="favoritempty" element={<FavoritesEmpty />} />
            <Route path="/profile" element={<Profile />}>
              <Route
                index
                path="personal-data"
                element={<ProfilePersonalData />}
              />
              <Route path="supportchat" element={<ProfileSupportchat />} />
              <Route path="faq" element={<ProfileFaq />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Lawyer]} />}>
            <Route path="/service" element={<Services />} />
            <Route path="case/:id" element={<Case />} />
            <Route path="case/:id/:id" element={<CaseRequest />} />
            <Route path="templates" element={<Templates />} />
            <Route path="/profile" element={<Profile />}>
              <Route
                path="/profile/verification"
                element={<ProfileVerificationFirst />}
              />
              <Route
                path="/profile/verification2"
                element={<ProfileVerificationSecond />}
              />
              <Route
                path="/profile/lawyer-feedbacks"
                element={<ProfileFeedbacksLawyer />}
              />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            {/* <Route path="/requests" element={<Requests />} /> */}
            {/* <Route path="/requests/:id" element={<SingleRequest />} /> */}
            {/* <Route path="/requests/:id/:id" element={<Lawyer />} /> */}
            <Route path="case/:id" element={<Case />} />
            <Route path="case/:id/:id" element={<CaseRequest />} />
            <Route path="/profile" element={<Profile />}>
              <Route
                path="/profile/user-feedbacks"
                element={<ProfileFeedbacksUser />}
              />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
