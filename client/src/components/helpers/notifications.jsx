import React from 'react';
import { connect } from 'react-redux';
import {
	NotificationContainer,
	NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Notifications extends React.Component {
	componentWillReceiveProps(newProps) {
		if (newProps.notification.code && this.props.notification.code !== newProps.notification.code) {
			switch (newProps.notification.type) {
				case 'success':
					NotificationManager.success(
						newProps.notification.message,
						newProps.notification.title,
						3000,
					);
					break;
				default:
					break;
			}
		}
	}

	render() {
		return <NotificationContainer />;
	}
}

const mapStateToProps = (state) => {
  return {
    notification: state.ui.notification,
  };
};

export default connect(mapStateToProps)(Notifications);
