import * as React from 'react';
import '../styles/App.scss';
import { connect } from 'react-redux';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

import { handleFetchUpcomingRidesRequest } from '../redux/actions';
import { Ride, AccountType } from '../types';
import RideCard from './RideCard';

interface IUpcomingRidesProps {
  userEmail: string;
  fetchUpcomingRides: (userEmail, accountType) => any;
  upcomingRides: Ride[];
  accountType: AccountType;
  fetchingUpcomingRides: boolean;
}

interface IUpcomingRidesState {

}

class UpcomingRides extends React.Component<IUpcomingRidesProps, IUpcomingRidesState>{

  public constructor(props) {
    super(props);
  }

  public componentDidMount() {
    this.props.fetchUpcomingRides(this.props.userEmail, this.props.accountType);
  }

  public render() {
    return (
      (this.props.fetchingUpcomingRides) ?
        <Loader active inline="centered">Loading upcoming rides</Loader>
        :
        <div>
          <p>
            You have {this.props.upcomingRides.length} upcoming ride{(this.props.upcomingRides.length == 1) ? '' : 's'}.
        </p>
          {
            this.props.upcomingRides.map((ride) => {
              return (
                <RideCard {...ride}
                  key={"ride" + ride.id}
                  accountType={this.props.accountType} />
              );
            })
          }
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { email, accountType } = state.auth.user;
  const { upcomingRides, fetchingUpcomingRides } = state.rides;
  return {
    "userEmail": email,
    accountType,
    upcomingRides,
    fetchingUpcomingRides
  };
}

function matchDispatchToProps(dispatch) {
  return {
    fetchUpcomingRides: (userEmail, accountType) => dispatch(handleFetchUpcomingRidesRequest({ userEmail, accountType }))
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(UpcomingRides);