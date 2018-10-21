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

export default class PurchaseRequisitionLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prNo: "OTT/150000",
      lineNo: "1",
      vendorType: "Existing",
      vendorId: "Z-G001",
      vendorName: "NO VENDOR (GENERAL USE FOR OTT & OTB)",
      terms: "60",
      currencyCode: "RM",
      currencyRate: "1.00000",
      sstCode: "NR",
      sstPercent: "0.00",
      taxCategory: "None",
      type: "Indirect",
      stockCode: "CONF-TIDBITS",
      uom: "LOT",
      etaDate: "24/10/2018",
      quantity: "1.00",
      unitPrice: "8.14",
      discount: "0.00",
      discountAmt: "0.00",
      extendedPrice: "8.14",
      localAmount: "8.14",
      approvalStatus: "Pending",
      description: "Refreshments for level 2\nROOM-TIDBITS\n1. Sweets",
      remarks:
        "Refreshments for level 2\nThe final will be based on price \nDay of the delivery may vary",
      memo: "Test Comments"
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
                  OTT/150000 -
                </Text>
                <Text style={{ fontSize: 30, fontWeight: "100" }}>
                  &nbsp;Line No: 1
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
                        <Label>Line No</Label>
                        <Input disabled value={this.state.lineNo} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Vendor Type</Label>
                        <Input disabled value={this.state.vendorType} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Vendor ID</Label>
                        <Input disabled value={this.state.vendorId} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Vendor Name</Label>
                        <Textarea
                          disabled
                          value={this.state.vendorName}
                          rowSpan={2}
                          style={{
                            alignSelf: "flex-start",
                            justifyContent: "flex-end"
                          }}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Currency Code</Label>
                        <Input disabled value={this.state.currencyCode} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Currency Rate</Label>
                        <Input disabled value={this.state.currencyRate} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>SST Code</Label>
                        <Input disabled value={this.state.sstCode} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>SST Percent (%)</Label>
                        <Input disabled value={this.state.sstPercent} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Terms</Label>
                        <Input disabled value={this.state.terms} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Tax Category</Label>
                        <Input disabled value={this.state.taxCategory} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Type</Label>
                        <Input disabled value={this.state.type} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Stock Code</Label>
                        <Input disabled value={this.state.stockCode} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>UOM</Label>
                        <Input disabled value={this.state.uom} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>ETA Date</Label>
                        <Input disabled value={this.state.etaDate} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Quantity</Label>
                        <Input disabled value={this.state.quantity} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Unit Price</Label>
                        <Input disabled value={this.state.unitPrice} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Discount (%)</Label>
                        <Input disabled value={this.state.discount} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Discount Amount</Label>
                        <Input disabled value={this.state.discountAmt} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Extended Price</Label>
                        <Input disabled value={this.state.extendedPrice} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Local Amount</Label>
                        <Input disabled value={this.state.localAmount} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Approval Status</Label>
                        <Input disabled value={this.state.approvalStatus} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Description</Label>
                        <Textarea
                          disabled
                          value={this.state.description}
                          rowSpan={4}
                          style={{
                            alignSelf: "flex-start",
                            justifyContent: "flex-end"
                          }}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Remark/Justification</Label>
                        <Textarea
                          disabled
                          value={this.state.remarks}
                          rowSpan={4}
                          style={{
                            alignSelf: "flex-start",
                            justifyContent: "flex-end"
                          }}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Memo/Margin</Label>
                        <Textarea
                          disabled
                          value={this.state.memo}
                          rowSpan={4}
                          style={{
                            alignSelf: "flex-start",
                            justifyContent: "flex-end"
                          }}
                        />
                      </Item>
                    </Col>
                  </Row>
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
