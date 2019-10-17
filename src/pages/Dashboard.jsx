import React from 'react';
import { Card, Typography, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Icon, Menu, Spin } from 'antd';
import { connect } from 'dva';

var hour = new Date().getHours();
var greeting = 'Good ' + ((hour < 12 && 'Morning') || (hour < 18 && 'Afternoon') || 'Evening');

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userAsync: [], loading: true };
  }

  componentDidMount() {
    this.getUserAsync();
  }

  async getUserAsync() {
    const response = await fetch('api/currentuser');
    const data = await response.json();
    this.setState({ userAsync: data, loading: false });
  }

  render() {
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
      menu,
    } = this.props;

    console.log('user fetch async', this.state);
    return currentUser && currentUser.name && this.state.userAsync ? (
      <PageHeaderWrapper>
        <Card>
          <h1>
            {greeting}, {currentUser.name}
          </h1>

          <p
            style={{
              textAlign: 'center',
              marginTop: 24,
            }}
          >
            We <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" spin /> {currentUser.name}
          </p>
        </Card>
      </PageHeaderWrapper>
    ) : (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(Dashboard);
