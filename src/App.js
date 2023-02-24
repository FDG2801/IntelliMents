import './App.css';
import {theme} from "./theme";
import {useEffect, useState} from 'react'
import {Container, Drawer, ThemeProvider} from "@mui/material";
import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom';
import {Outlet} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import NavbarComp from "./layout/NavbarComp";
import {LoginComp} from "./components/LoginComp";
import HomePageComp from "./layout/HomePageComp";
import {DataContext} from "./DataContext";
import {Navigate} from "react-router";
import MiniDrawer from "./layout/Drawer";
import {StoriesComp} from "./components/StoriesComp";
import {NewsComp} from "./components/NewsComp";
import {ExchangeComp} from "./components/ExchangeComp";
import {InvestorsComp} from "./components/InvestorsComp";
import {InvestorsTopComp} from "./components/InvestorsTopComp";
import {InvestorsFollowedComp} from "./components/InvestorsFollowedComp";
import {InvestorsProfileComp} from "./components/InvestorsProfileComp";
import {AboutComp} from "./components/AboutComp";
import {ContactComp} from "./components/ContactComp";
import {HelpComp} from "./components/HelpComp";
import {MyStoriesComp} from "./components/MyStoriesComp";
import CreateStoryComp from "./components/CreateStoryComp";
import {StoryContentComp} from "./components/StoryContentComp";
import ExchangeBuyComp from "./components/ExchangeBuyComp"
import ExchangeExploreComp from "./components/ExchangeExploreComp"

function App() {
    sessionStorage.setItem('auth-token', 'example');
    sessionStorage.setItem('userData', 'Test user')
    return (
        <Router>
            <App2/>
        </Router>
    )
}

function App2() {
    //login
    const [loggedIn, setLoggedIn] = useState(true);


    const navigate = useNavigate();

    // if(!loggedIn) {
    //     return <LoginComp setToken={setLoggedIn} />
    //   }

    const doLogout = async () => {
        //await API.logOut();
        //setEnableSelectCourses(false)
        //setLoggedIn(false);
        //setStudent({});
        navigate('/');
    }

    return (
        <ThemeProvider theme={theme}>
            <DataContext.Provider value={{
                // coursesInContext: coursesInContext
            }}>
                <Routes>

                    <Route path='/' element={<><Layout loggedIn={loggedIn} //student={student} setStudent={setStudent}
                                                       doLogout={doLogout}></Layout></>}>
                        <Route path='/' element={!loggedIn ? <Navigate to='/About'/> : <Navigate to='/Stories' />}></Route>
                        <Route path='/Login' element={<LoginComp loggedIn={loggedIn} setLoggedIn={setLoggedIn}></LoginComp>}></Route>
                        <Route path='/stories' element={<StoriesComp></StoriesComp>}></Route>
                        <Route path='/news' element={<NewsComp></NewsComp>}></Route>
                        <Route path='/investors' element={<InvestorsComp></InvestorsComp>}></Route>
                        <Route path='/investors/tops' element={<InvestorsTopComp></InvestorsTopComp>}></Route>
                        <Route path='/investors/followed' element={<InvestorsFollowedComp></InvestorsFollowedComp>}></Route>
                        <Route path='/investors/profile' element={<InvestorsProfileComp></InvestorsProfileComp>}></Route>
                        <Route path='/exchange' element={<ExchangeComp></ExchangeComp>}></Route>
                        <Route path='/About' element={<AboutComp></AboutComp>}></Route>
                        <Route path='/About/contact' element={<ContactComp></ContactComp>}></Route>
                        <Route path='/Help' element={<HelpComp></HelpComp>}></Route>
                        <Route path='/myStories' element={<MyStoriesComp></MyStoriesComp>}></Route>
                        <Route path='/watchStory' element={<StoryContentComp/>}></Route>
                        <Route path='/createStory' element={<CreateStoryComp></CreateStoryComp>}></Route>
                        <Route path='/exchangebuy' element={<ExchangeBuyComp></ExchangeBuyComp>}></Route>
                        <Route path='/Exchange/Explore' element={<ExchangeExploreComp></ExchangeExploreComp>}></Route>
                    </Route>

                    <Route path='*' element={<h1>Error 404, Page Not Found</h1>}/>
                </Routes>
            </DataContext.Provider>
        </ThemeProvider>


    );
}

function Layout(props) {

    let {param} = useParams();

    if (param !== undefined && param !== 'login')
        return <h1>404 Page not found</h1>

    return (
        <div>
            <header>
                <MiniDrawer></MiniDrawer>
            </header>
            <Container maxWidth="lg" sx={{marginTop: '70px'}}>
                <main>
                    {
                        <Outlet/>
                    }

                </main>
            </Container>

        </div>
    );


}

export default App;
