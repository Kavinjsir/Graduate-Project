import React from 'react';
import Carousel from 'nuka-carousel';
import { Card, Image } from 'semantic-ui-react';

export default class HomePage extends React.Component {
  render() {
    const ImgList = [
      // "http://placehold.it/1000x400/ffffff/c0392b/&text=slide1",
      "http://oyy735z2r.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202018-05-03%20%E4%B8%8B%E5%8D%888.28.43.png",
      "http://oyy735z2r.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202018-05-03%20%E4%B8%8B%E5%8D%888.21.24.png",
      "http://oyy735z2r.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202018-05-03%20%E4%B8%8B%E5%8D%888.32.53.png",
      "http://oyy735z2r.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202018-05-03%20%E4%B8%8B%E5%8D%888.46.55.png"
    ]
    return (
      <div className="homepage">
        <Carousel
          autoplay={true}
          dragging={true}
          renderCenterLeftControls={null}
          renderCenterRightControls={null}
          cellSpacing={20}
          vertical={true}
          wrapAround={true}
        >
          <Card fluid centered>
            <Card.Content>
              <Image floated='right' src={ImgList[0]} size='massive' />
              <Card.Header textAlign='right'>
                <h1>文本挖掘系统</h1>
              </Card.Header>
              <Card.Meta textAlign='right'>
                <hr />
                一个服务于企业的信息系统，基于『Spark大数据架构』和『自然语言处理算法』的文本挖掘解决方案。<br />
                为使用者提供用于文本分析及挖掘的核心工具，帮助用户更好的处理文本分析需求。
              </Card.Meta>
            </Card.Content>
          </Card>

          <Card fluid centered>
            <Card.Content>
              <Image floated='right' src={ImgList[1]} size='massive' />
              <Card.Header textAlign='right'>
                <h1>邮件监管模块</h1>
              </Card.Header>
              <Card.Meta textAlign='right'>
                <hr />
                利用大数据处理技术，将邮件作为文本信息载体，与机器学习等方法有机结合。<br />
                提供基于若干机器学习方法的垃圾邮件分类、涉密邮件识别、敏感信息审查模块。
              </Card.Meta>
            </Card.Content>
          </Card>

          <Card fluid centered>
            <Card.Content>
              <Image floated='right' src={ImgList[2]} size='massive' />
              <Card.Header textAlign='right'>
                <h1>信息抽取模块</h1>
              </Card.Header>
              <Card.Meta textAlign='right'>
                <hr />
                基于若干分词技术与机器学习方法的结合，依托spark分析平台<br />
                提供了基于文本的个人标签信息抽取的服务
              </Card.Meta>
            </Card.Content>
          </Card>

          <Card fluid centered>
            <Card.Content>
              <Image floated='right' src={ImgList[3]} size='massive' />
              <Card.Header textAlign='right'>
                <h1>算法管理</h1>
              </Card.Header>
              <Card.Meta textAlign='right'>
                <hr />
                可视化管理平台，支持：<br />
                查看当前算法<br />
                浏览可用算法<br />
                替换当前算法<br />
                升级指定算法<br />
              </Card.Meta>
            </Card.Content>
          </Card>

        </Carousel>
      </div>
    );
  }
}