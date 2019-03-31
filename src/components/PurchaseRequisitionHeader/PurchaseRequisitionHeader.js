import React, { Component } from "react";
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";
import {
  Button,
  Header,
  Left,
  Body,
  Item,
  Input,
  Title,
  Form,
  Textarea,
  Label
} from "native-base";
import { ListItem, Icon } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import { getPRHeaderById } from "../../services/PurchaseRequisitionsService";

const numColumns = 5;
export default class PurchaseRequisitionHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      branchId: "OTT",
      prNo: "OTT/150000",
      prDate: "31/12/2018",
      routeDept: "OTT2",
      priority: "Medium",
      status: "Pending",
      requester: "WPWONG",
      shipTo: "DEFAULT",
      address: "Block H, 13,\nPetaling Jaya \nSelangor, Malaysia",
      remarks:
        "Refreshments for level 2\nThe final will be based on price \nDay of the delivery may vary",
      comments: "Test Comments",
      attachments: [
        {
          key: "1234.png",
          icon: "image"
        },
        {
          key: "abcas.pdf",
          icon: "paperclip"
        },
        {
          key: "124-131.jpg",
          icon: "image"
        },
        {
          key: "afuag.jpg",
          icon: "image"
        },
        {
          key: "asgome.pdf",
          icon: "paperclip"
        },
        {
          key: "2423.pdf",
          icon: "paperclip"
        },
        {
          key: "5424.pdf",
          icon: "paperclip"
        }
      ]
    };
  }

  componentDidMount() {
    var PRHeaderId = this.props.navigation.state.params.PRHeaderId;
    getPRHeaderById(PRHeaderId).then(res => {
      const headerData = JSON.parse(res.data);
      this.setState({ headerData: headerData, loading: false }, function() {
        console.log(this.state.headerData);
        console.log("++++++++++ " + this.state.headerData.PRNumber);
      });
    });
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return (
        <View style={[styles.flatListItem, styles.flatListItemInvisible]} />
      );
    }
    return (
      <View style={styles.flatListItem}>
        <TouchableOpacity style={styles.flatListItem}>
          <View>
            <Icon
              name={item.icon}
              type="evilicon"
              size={30}
              color={global.themeColor}
            />
            <Text style={styles.flatListItemText}>{item.key}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { headerData } = this.state;
    // If the data is still loading, return the activity indicator view with heading
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Header searchBar rounded style={{ backgroundColor : global.themeColor}} androidStatusBarColor={global.themeColor}>
            <Left>
              <Button transparent>
                <Icon
                  name="chevron-left"
                  type="evilicon"
                  size={40}
                  onPress={() => this.props.navigation.goBack(null)}
                  color={global.headerForegroundColor}
                />
              </Button>
            </Left>
            <Body style={{ flex: 2 }}>
              <Title style={{color: global.headerForegroundColor}}>PR Header</Title>
            </Body>
          </Header>
          <View style={styles.headerContainer}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "500",
                paddingLeft: 20,
                color: global.foregroundColor
              }}
            >
              PR No:
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "100",
                color: global.foregroundColor
              }}
            >
              &nbsp;..
            </Text>
          </View>
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator
              animating={this.state.loading}
              hidesWhenStopped={true}
              color={global.accentColor}
              size="large"
              style={styles.activityIndicator}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Header searchBar rounded style={{ backgroundColor : global.themeColor}} androidStatusBarColor={global.themeColor}>
          <Left>
            <Button transparent>
              <Icon
                name="chevron-left"
                type="evilicon"
                size={40}
                onPress={() => this.props.navigation.goBack(null)}
                color={global.headerForegroundColor}
              />
            </Button>
          </Left>
          <Body style={{ flex: 2 }}>
            <Title style={{color: global.headerForegroundColor}}>PR Header</Title>
          </Body>
        </Header>
        <Grid>
          <Row size={0.4}>
            <Grid style={{ flex: 1 }}>
              <Row />
              <Row
                size={2}
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  alignContent: "flex-start"
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "500",
                    paddingLeft: 20,
                    color: global.foregroundColor
                  }}
                >
                  PR No:
                </Text>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "100",
                    color: global.foregroundColor
                  }}
                >
                  &nbsp;{this.state.headerData.PRNumber}
                </Text>
              </Row>
            </Grid>
          </Row>
          <Row size={3}>
            <View style={{ flex: 1 }}>
              <ScrollView style={styles.accordianContainer}>
                <Form>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>PR No</Label>
                        <Input
                          disabled
                          value={this.state.headerData.PRNumber}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>PR Date</Label>
                        <Input
                          disabled
                          value={this.state.headerData.PR_Date}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Branch ID</Label>
                        <Input
                          disabled
                          value={this.state.headerData.BranchID}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Route Dept.</Label>
                        <Input
                          disabled
                          value={this.state.headerData.Department}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Priority</Label>
                        <Input
                          disabled
                          value={this.state.headerData.Priority}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Status</Label>
                        <Input
                          disabled
                          value={this.state.headerData.Status}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Requester</Label>
                        <Input
                          disabled
                          value={this.state.headerData.Requester}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Ship To</Label>
                        <Input
                          disabled
                          value={this.state.headerData.ShipTo}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Item stackedLabel>
                    <Label style={styles.label}>Address</Label>
                    <Textarea
                      disabled
                      value={
                        this.state.headerData.ShipAdd1 +
                        "\n" +
                        this.state.headerData.ShipAdd2 +
                        "\n" +
                        this.state.headerData.ShipAdd3
                      }
                      rowSpan={3}
                      style={[styles.content, { alignSelf: "flex-start" }]}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label style={styles.label}>Remarks</Label>
                    <Textarea
                      disabled
                      value={this.state.headerData.Remark}
                      rowSpan={3}
                      style={[styles.content, { alignSelf: "flex-start" }]}
                    />
                  </Item>
                  <Item stackedLabel last>
                    <Label style={styles.label}>Comments</Label>
                    <Textarea
                      disabled
                      value={this.state.headerData.Memo}
                      rowSpan={3}
                      style={[styles.content, { alignSelf: "flex-start" }]}
                    />
                  </Item>
                  <Label
                    style={[styles.label, { paddingLeft: 15, paddingTop: 10 }]}
                  >
                    Attachments
                  </Label>
                </Form>
              </ScrollView>
            </View>
          </Row>
        </Grid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: global.backgroundColor
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  activityIndicator: {
    justifyContent: "center",
    alignItems: "center"
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignContent: "flex-start"
  },
  header: {
    flexDirection: "row"
  },
  headerTitle: {
    color: global.foregroundColor
  },
  logo: {
    width: 50,
    height: 50
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "300",
    marginBottom: 20
  },
  label: {
    color: global.foregroundColor
  },
  content: {
    color: global.foregroundColor
  },
  flatList: {
    flex: 1
  },
  flatListItem: {
    backgroundColor: global.backgroundOffsetColor,
    flex: 1,
    margin: 5,
    borderRadius: 10,
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  flatListItemInvisible: {
    backgroundColor: "transparent"
  },
  flatListItemText: {
    color: global.foregroundColor,
    fontSize: 12
  }
});
