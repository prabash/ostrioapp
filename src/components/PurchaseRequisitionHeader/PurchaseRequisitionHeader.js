import React, { Component } from "react";
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { Form, Item, Input, Textarea, Label } from "native-base";
import { ListItem, Icon } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";


export default class PurchaseRequisitionHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      comments: "Test Comments"
    };
  }

  render() {
    const { multipleSelect, activeSections, checked } = this.state;
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
                  &nbsp;OTT/150000
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
                        <Input disabled value={this.state.prNo} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>PR Date</Label>
                        <Input disabled value={this.state.prDate} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Branch ID</Label>
                        <Input disabled value={this.state.branchId} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Route Dept.</Label>
                        <Input disabled value={this.state.routeDept} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Priority</Label>
                        <Input disabled value={this.state.priority} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Status</Label>
                        <Input disabled value={this.state.status} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Requester</Label>
                        <Input disabled value={this.state.requester} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Ship To</Label>
                        <Input disabled value={this.state.shipTo} />
                      </Item>
                    </Col>
                  </Row>
                  <Item stackedLabel>
                    <Label>Address</Label>
                    <Textarea
                      disabled
                      value={this.state.address}
                      rowSpan={3}
                      style={{ alignSelf: "flex-start" }}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Remarks</Label>
                    <Textarea
                      disabled
                      value={this.state.remarks}
                      rowSpan={3}
                      style={{ alignSelf: "flex-start" }}
                    />
                  </Item>
                  <Item stackedLabel last>
                    <Label>Comments</Label>
                    <Textarea
                      disabled
                      value={this.state.comments}
                      rowSpan={3}
                      style={{ alignSelf: "flex-start" }}
                    />
                  </Item>
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
  }
});
