import React, { Component } from "react";
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator
} from "react-native";
import { Form, Item, Input, Textarea, Label } from "native-base";
import { ListItem, Icon } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import { getPRLineById } from "../../services/GetPurchaseRequisitions";

export default class PurchaseRequisitionLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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

  componentDidMount() {
    var PRLineId = this.props.navigation.state.params.PRLineId;
    getPRLineById(PRLineId).then(res => {
      const lineData = JSON.parse(res.data);
      this.setState({ lineData: lineData, loading: false });
    });
  }

  render() {
    // If the data is still loading, return the activity indicator view with heading
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={{ fontSize: 30, fontWeight: "500", paddingLeft: 20 }}>
              PR No:
            </Text>
            <Text style={{ fontSize: 30, fontWeight: "100" }}>
              &nbsp;Line No
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
                  style={{ fontSize: 25, fontWeight: "500", paddingLeft: 20 }}
                >
                  {this.state.lineData.PRNumber} -
                </Text>
                <Text style={{ fontSize: 25, fontWeight: "100" }}>
                  &nbsp;Line No: {this.state.lineData.PRLine}
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
                        <Input disabled value={this.state.lineData.PRNumber} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Line No</Label>
                        <Input disabled value={this.state.lineData.PRLine.toString()} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Vendor Type</Label>
                        <Input disabled value={this.state.lineData.VendorType} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Vendor ID</Label>
                        <Input disabled value={this.state.lineData.VendorID} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Vendor Name</Label>
                        <Textarea
                          disabled
                          value={this.state.lineData.VendorName}
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
                        <Input disabled value={this.state.lineData.CurrencyCode} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Currency Rate</Label>
                        <Input disabled value={this.state.lineData.CurrencyRate.toString()} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>SST Code</Label>
                        <Input disabled value={this.state.lineData.VATCode} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>SST Percent (%)</Label>
                        <Input disabled value={this.state.lineData.VATPercentage.toString()} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Terms</Label>
                        <Input disabled value={this.state.lineData.PayTerms.toString()} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Tax Category</Label>
                        <Input disabled value={this.state.lineData.TaxCode} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Type</Label>
                        <Input disabled value={this.state.lineData.PRType} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Stock Code</Label>
                        <Input disabled value={this.state.lineData.StockCode} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>UOM</Label>
                        <Input disabled value={this.state.lineData.UMCode} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>ETA Date</Label>
                        <Input disabled value={this.state.lineData.ETADate} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Quantity</Label>
                        <Input disabled value={this.state.lineData.Quantity.toString()} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Unit Price</Label>
                        <Input disabled value={this.state.lineData.UnitPrice.toString()} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Discount (%)</Label>
                        <Input disabled value={this.state.lineData.Discount.toString()} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Discount Amount</Label>
                        <Input disabled value={this.state.lineData.DiscAmount.toString()} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Extended Price</Label>
                        <Input disabled value={this.state.lineData.TotalPrice.toString()} />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label>Local Amount</Label>
                        <Input disabled value={this.state.lineData.LocalUnitPrice.toString()} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Approval Status</Label>
                        <Input disabled value={this.state.lineData.Status.toString()} />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label>Description</Label>
                        <Textarea
                          disabled
                          value={this.state.lineData.StockDesc}
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
                          value={this.state.lineData.Remark}
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
                          value={this.state.lineData.Memo}
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
  }
});
