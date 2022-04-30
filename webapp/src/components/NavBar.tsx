import React from 'react'
import {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {CartContext} from '../context/CartContext';
import {getTotalItems} from '../helpers/calculate';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    IconButton,
    AppBar,
    Badge,
    Container,
    Toolbar,
    Typography,
    Box,
    Button
} from "@mui/material";
import logo from "../images/logoName.png";
import "./styles.css"
import {CartItem, NavBarProps, NavigationProps} from "../shared/shareddtypes";
import {LogInSignUpComponent} from "./userAuthentication/LogInSignUpComponent"


type NavBarItemProps = {
    isLoggedIn: boolean
}

type ShoppingCartProps = {
    handleOpen: (state: boolean) => void;
    cartItems: CartItem[]
}

function ShoppingCart(props: ShoppingCartProps) {
    const {handleOpen, cartItems} = props

    return(
        <IconButton
            size="large"
            color="primary"
            onClick={ () => handleOpen(true)}
            sx={{ mr: 2, color: "white"}}
            id="shoppingCart"
        >
            <Badge badgeContent={getTotalItems(cartItems)} color="error">
                <ShoppingCartIcon/>
            </Badge>
        </IconButton>
    )
}


/**
 * This function creates the buttons displayed in the navbar
 * @param props
 * @constructor
 */
function NavBarButtons(props: NavBarItemProps) {
    // This list contains the names of the options in the navBar
    const pages = ["Home", "My orders"]
    const history = useHistory()

    // Props
    const {isLoggedIn} = props

    const navigateToHome = () => {
        history.push("/")
    }

    const navigateToOrders = () => {
        history.push("/orders/list")
    }

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
                key={pages[0]}
                onClick={navigateToHome}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                {pages[0]}
            </Button>
            <Button
                key={pages[1]}
                onClick={navigateToOrders}
                sx={{ my: 2, color: 'white', display: 'block' }}
                hidden={!isLoggedIn}
            >
                {pages[1]}
            </Button>
        </Box>
    )
}

const NavBar = (props: NavBarProps) => {
    const {isLoggedIn, handleOpen} = props
    const {cartItems} = useContext(CartContext);


    return (
    <AppBar position="static" style={{background: '#2E3B55'}}>
        <Container maxWidth='xl'>
            <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                    <img src={logo} style={{height:"50px", width:"200px"}} alt="dededeals"/>
                </Typography>

                <NavBarButtons  isLoggedIn={isLoggedIn}/>
                <ShoppingCart handleOpen={handleOpen} cartItems={cartItems}/>
                <LogInSignUpComponent isLoggedIn={isLoggedIn}/>
            </Toolbar>
        </Container>
    </AppBar>
    )
}

export default NavBar;