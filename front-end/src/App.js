import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";
import Home from "./views/home";
import MyProfile from "./views/myProfile"
import Exchange from "./views/exchange"
import PageNotFound from "./views/pageNotFound";
import Navbar from "./components/navbar"

function App() {
 
  return (
    <ChakraProvider>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/profile" exact element={<MyProfile />} />
          <Route path="/exchange" exact element={<Exchange />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>  
      </BrowserRouter>    
    </ChakraProvider>
  );
}
export default App;
