import React from 'react';
import { Segment, Button, Header, Divider } from 'semantic-ui-react';
import { getPrettyDate, getPrettyTime } from '../utils/date';

export default class EmailDetails extends React.Component {

  getDeleteButton = () => {
    if (this.props.email.tag !== 'deleted') {
      return (
        <Button inverted color='orange' onClick={() => this.props.onDelete(this.props.email.id)}>
          Delete
        </Button>
      );
    }
    return undefined;
  }

  createMarkup = () => {
    return {__html: this.props.email.message}
  }

  render() {
    if (!this.props.email) {
      return (
        <div className='maildetail'>
          <Segment>请选择邮件。</Segment>
        </div>
      );
    }

    const date = `${getPrettyDate(this.props.email.time)} · ${getPrettyTime(this.props.email.time)}`;

    return (
      <div className='maildetail'>
        <Segment>
          <Header textAlign='left'>
            <Header.Content>
              <div className='contenthead'>
                {this.props.email.subject}
              </div>
              <Divider fitted />
              <Header.Subheader>
                发件人：{this.props.email.from}
                <br />
                时间：{date}
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Divider fitted />
          <br />
          <div dangerouslySetInnerHTML={this.createMarkup()} className='realcontent'>
          {/* {this.props.email.message} */}
          </div>
        </Segment>
      </div>
    );
  }

}