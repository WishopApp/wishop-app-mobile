import React from 'react'
import SuccessfulPopup from './SuccessfulPopup'

export const SuccessPopup = (navigation, topic, content) => {
	return <SuccessfulPopup showDialog={true} topic={topic} content={content} navigation={navigation} />
}
