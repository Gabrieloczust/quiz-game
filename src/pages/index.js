import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Home } from './Home'
import { Confirm } from './Confirm'
import { Questions } from './Questions'

export const Pages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirm/:numberQuestions" element={<Confirm />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </BrowserRouter>
  );
}
