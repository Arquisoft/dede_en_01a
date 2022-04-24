import {Route, Switch} from 'react-router-dom';
import NavBar from "./NavBar";
import Home from "./Home";
import LoadingSession from "./LoadingSessionComponent"
import OrdersPage from "../pages/orders/OrdersPage";
import {NavigationProps} from "../shared/shareddtypes";
import {SelectProviderComponent} from "./userAuthentication/SelectProviderComponent";
import {Box} from "@mui/material";
import {DisplayProductsComponent} from "./checkout/DisplayProductsComponent";
import {DisplayShippingDataComponent} from "./checkout/DisplayShippingDataComponent"
import {DisplayOrderSummaryComponent} from "./checkout/DisplayOrderSummaryComponent";

const Navigation = (props: NavigationProps) => {
    const {isLoggedIn, handleOpen} = props
    return (
        <Box>
            <Box>
                <NavBar isLoggedIn={isLoggedIn} handleOpen={handleOpen}/>
            </Box>
            <Box>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path={'/checkout/displayProducts'} component={DisplayProductsComponent}/>
                    <Route exact path={"/checkout/shippingData"} component={DisplayShippingDataComponent}></Route>
                    <Route exact path={"/checkout/summary"} component={DisplayOrderSummaryComponent}/>
                    <Route exact path='/orders/list' component={OrdersPage}/>
                    <Route exact path='/solid/login/:webID/:sessionId' component={LoadingSession}/>
                    <Route exact path='/selectProvider' component={SelectProviderComponent}/>
                </Switch>
            </Box>
        </Box>
    )
}

export default Navigation;