import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { signOutStart } from '../../redux/user/user.actions';

import { 
	HeaderContainer,
	LogoContainer,
	OptionsContainer, 
	OptionLink 
} from './header.styles';

import './header.styles.scss';

const Header = ({ currentUser, hidden, cartItems, signOutStart }) => {

	const handleSignout = event => {
		event.preventDefault();
		signOutStart({ currentUser, cartItems });
	}

	return (
		<HeaderContainer>
			<LogoContainer to="/">
				<Logo className='logo' />
			</LogoContainer>
			<OptionsContainer>
				<OptionLink to='/shop'>
					SHOP
				</OptionLink>
				<OptionLink to='/contact'>
					CONTACT
				</OptionLink>
				{
					currentUser ?
					<OptionLink as='div' onClick={handleSignout}>SIGN OUT</OptionLink>
					:
					<OptionLink to='/signin'>SIGN IN</OptionLink>
				}
				<CartIcon />
			</OptionsContainer>
			{ hidden ? null : <CartDropdown /> }
		</HeaderContainer>
	);
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
	cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
	signOutStart: userAndCartItems => dispatch(signOutStart(userAndCartItems))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

