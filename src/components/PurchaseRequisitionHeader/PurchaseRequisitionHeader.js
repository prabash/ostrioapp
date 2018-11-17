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
import { Form, Item, Input, Textarea, Label } from "native-base";
import { ListItem, Icon } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import { getPRHeaderById } from "../../services/GetPurchaseRequisitions";

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
          <View style={styles.headerContainer}>
            <Text style={{ fontSize: 30, fontWeight: "500", paddingLeft: 20 }}>
              PR No:
            </Text>
            <Text style={{ fontSize: 30, fontWeight: "100" }}>
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
                  style={{ fontSize: 30, fontWeight: "500", paddingLeft: 20 }}
                >
                  PR No:
                </Text>
                <Text style={{ fontSize: 30, fontWeight: "100" }}>
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
                        <Label>PR No</Label>
                        <Input disabled value={this.state.headerData.PRNumber} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>PR Date</Label>
                        <Input disabled value={this.state.headerData.PR_Date} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Branch ID</Label>
                        <Input disabled value={this.state.headerData.BranchID} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Route Dept.</Label>
                        <Input disabled value={this.state.headerData.Department} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Priority</Label>
                        <Input disabled value={this.state.headerData.Priority} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Status</Label>
                        <Input disabled value={this.state.headerData.Status} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Requester</Label>
                        <Input disabled value={this.state.headerData.Requester} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Ship To</Label>
                        <Input disabled value={this.state.headerData.ShipTo} />
                      </Item>
                    </Col>
                  </Row>
                  <Item stackedLabel>
                    <Label>Address</Label>
                    <Textarea
                      disabled
                      value={this.state.headerData.ShipAdd1 + "\n"+this.state.headerData.ShipAdd2 + "\n"+this.state.headerData.ShipAdd3 }
                      rowSpan={3}
                      style={{ alignSelf: "flex-start" }}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Remarks</Label>
                    <Textarea
                      disabled
                      value={this.state.headerData.Remark}
                      rowSpan={3}
                      style={{ alignSelf: "flex-start" }}
                    />
                  </Item>
                  <Item stackedLabel last>
                    <Label>Comments</Label>
                    <Textarea
                      disabled
                      value={this.state.headerData.Memo }
                      rowSpan={3}
                      style={{ alignSelf: "flex-start" }}
                    />
                  </Item>
                  <Label style={{ paddingLeft: 15, paddingTop: 10 }}>
                    Attachments
                  </Label>
                  <ScrollView
                    horizontal
                    style={{
                      marginLeft: 20,
                      marginBottom: 20,
                      marginTop: 10,
                      marginRight: 10,
                      paddingBottom: 5
                    }}
                  >
                    <FlatList
                      data={this.state.attachments}
                      style={styles.flatList}
                      renderItem={this.renderItem}
                      horizontal
                    />
                  </ScrollView>
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
