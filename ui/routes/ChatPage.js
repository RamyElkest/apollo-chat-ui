import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../components/Loading';


class Channel extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { messages, user } = this.props;

    return (
      <div>
        <h2>Welcome {user.username}</h2>
        <span>You have {user.threads.length} threads</span>
        <ul>
        {user.threads.map((thread) => (
          <li key={thread.id}>
            {thread.name}
            <ul>
              {thread.messages.map((mes) => <li key={mes.id}>{mes.content}</li>)}
            </ul>
          </li>
        ))}
        </ul>
      </div>
    );
  }
}

Channel.propTypes = {
  currentUser: React.PropTypes.shape({
    username: React.PropTypes.string.isRequired,
  }),
  messages: React.PropTypes.array,
};

class ChatPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { loading, user, messages } = this.props;

    return (
      <div>
        <Channel
          messages={messages || []}
          user={user && user || "!NO USER!"}
        />
        {loading ? <Loading /> : null}
      </div>
    );
  }
}

ChatPage.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  user: React.PropTypes.shape({
    username: React.PropTypes.string.isRequired,
  }),
  messages: React.PropTypes.array,
};

const USER_QUERY = gql`
  query User
  {
    user {
      username
      threads {
        id
        name
        messages {
          id
          content
        }
      }
    }
  }`;

const withData = graphql(USER_QUERY, {
  options: props => ({
    forceFetch: true,
  }),
  props: ({ data: { loading, messages, user } }) => ({
    loading,
    messages,
    user,
  }),
});

export default withData(ChatPage);
