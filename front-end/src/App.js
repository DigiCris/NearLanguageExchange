import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useEffect, useState} from "react"
import {ChakraProvider} from "@chakra-ui/react";
import {getProfiles} from "./utils/contract"
import { getAccountId } from "./utils/near";
import Home from "./views/home";
import MyProfile from "./views/myProfile"
import Exchange from "./views/exchange"
import PageNotFound from "./views/pageNotFound";
import Navbar from "./components/navbar"
import CreateClass from "./views/createClass"
import MyClassesCreated from "./views/myClassesCreated"
import MyClassesTaken from "./views/myClassesTaken"
import GetAClass from "./views/getAClass"
 
function App() {
  const [user, setUser] = useState({})

  useEffect(()=> {
    const getUsers = async () => {
      const data = await getProfiles()
      
      const currentAccount = await getAccountId()
      const userFound = data.find(datum => datum.wallet == currentAccount)
      if(userFound){
        setUser(userFound)
      } else {
        setUser(undefined)
      }
    }

    getUsers()

  },[])
 
  return (
    <ChakraProvider>
      <Navbar user={user}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          {!user && <Route path="/profile" exact element={<MyProfile/>} />}
          {user && <Route path="/create" exact element={<CreateClass />} />}
          <Route path="/created" exact element={<MyClassesCreated />} />
          <Route path="/taken" exact element={<MyClassesTaken />} />
          <Route path="/get" exact element={<GetAClass/>} />
          <Route path="/exchange" exact element={<Exchange />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>  
      </BrowserRouter>    
    </ChakraProvider>
  );
}
export default App;
