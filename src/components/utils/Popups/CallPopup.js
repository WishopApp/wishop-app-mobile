import React from 'react'
import SuccessfulPopup from './SuccessfulPopup'

export const SuccessPopup = (navigation, topic, content, navigateTo) => {
	return (
		<SuccessfulPopup
			showDialog={true}
			navigateTo={navigateTo}
			topic={topic}
			content={content}
			navigation={navigation}
		/>
	)
}

/* example 
this.props.navigation, 'Success', 'Login Success \n Welcome to Wishop!', {route: 'Search',action: 'navigate'}
*/
