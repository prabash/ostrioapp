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
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import {
  getPRLineById,
  getAttachments
} from "../../services/PurchaseRequisitionsService";

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
      memo: "Test Comments",
      attachments: [
        {
          src:
            "https://www.adobe.com/be_en/active-use/pdf/Alice_in_Wonderland.pdf",
          name: "Alice In Wonderland",
          icon: "image"
        },
        {
          src: "abcas.pdf",
          name: "abcas.pdf",
          icon: "paperclip"
        }
      ]
    };
  }

  componentDidMount() {
    var PRHeaderId = this.props.navigation.state.params.PRHeaderID;
    var PRLineId = this.props.navigation.state.params.PRLineId;
    var PRLineNo = this.props.navigation.state.params.PRLineNo;
    console.log("PRHeaderID : " + PRHeaderId);

    getPRLineById(PRLineId).then(res => {
      const lineData = JSON.parse(res.data);
      this.setState({ lineData: lineData, loading: false });
    });

    console.log(
      "+++++ ATTACHMENTS FOR HeaderID :" +
        PRHeaderId +
        ", PRLineNo: " +
        PRLineNo
    );
    getAttachments(PRHeaderId, PRLineNo).then(res => {
      const attachmentsJSON = JSON.parse(res.data);
      var _attachments = [];

      for (var i = 0; i < attachmentsJSON.length; i++) {
        var iconImage = "";
        var obj = attachmentsJSON[i];
        if (obj.FileType === "docx" || obj.FileType === "pdf") {
          iconImage = "paperclip";
        } else {
          iconImage = "image";
        }
        _attachments.push({
          src: obj.FileLocation,
          name: obj.FileName,
          icon: iconImage
        });
      }

      console.log ("_attachments : " + _attachments);
      this.setState({
        attachments: _attachments
      });
    });
  }

  getLocalPath = url => {
    console.log("url" + url);
    const filename = url.split("/").pop();
    // feel free to change main path according to your requirements
    return `${RNFS.DocumentDirectoryPath}/${filename}`;
  };

  viewFile = url => {
    const localFile = this.getLocalPath(url);

    const options = {
      fromUrl: url,
      toFile: localFile
    };
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
        // success
      })
      .catch(error => {
        // error
      });
  };

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return (
        <View style={[styles.flatListItem, styles.flatListItemInvisible]} />
      );
    }
    return (
      <View style={styles.flatListItem}>
        <TouchableOpacity
          style={styles.flatListItem}
          onPress={() => this.viewFile(item.src)}
        >
          <View>
            <Icon
              name={item.icon}
              type="evilicon"
              size={30}
              color={global.themeColor}
            />
            <Text style={styles.flatListItemText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    // If the data is still loading, return the activity indicator view with heading
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Header
            searchBar
            rounded
            style={{ backgroundColor: global.themeColor }}
            androidStatusBarColor={global.themeColor}
          >
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
              <Title style={{ color: global.headerForegroundColor }}>
                PR Line
              </Title>
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
        <Header
          searchBar
          rounded
          style={{ backgroundColor: global.themeColor }}
          androidStatusBarColor={global.themeColor}
        >
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
            <Title style={{ color: global.headerForegroundColor }}>
              PR Line
            </Title>
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
                    fontSize: 25,
                    fontWeight: "500",
                    paddingLeft: 20,
                    color: global.foregroundColor
                  }}
                >
                  {this.state.lineData.PRNumber} -
                </Text>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "100",
                    color: global.foregroundColor
                  }}
                >
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
                        <Label style={styles.label}>PR No</Label>
                        <Input
                          disabled
                          value={this.state.lineData.PRNumber}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Line No</Label>
                        <Input
                          disabled
                          value={this.state.lineData.PRLine.toString()}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Vendor Type</Label>
                        <Input
                          disabled
                          value={this.state.lineData.VendorType}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Vendor ID</Label>
                        <Input
                          disabled
                          value={this.state.lineData.VendorID}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Vendor Name</Label>
                        <Textarea
                          disabled
                          value={this.state.lineData.VendorName}
                          rowSpan={2}
                          style={[
                            styles.content,
                            {
                              alignSelf: "flex-start",
                              justifyContent: "flex-end"
                            }
                          ]}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Currency Code</Label>
                        <Input
                          disabled
                          value={this.state.lineData.CurrencyCode}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Currency Rate</Label>
                        <Input
                          disabled
                          value={this.state.lineData.CurrencyRate.toString()}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>SST Code</Label>
                        <Input
                          disabled
                          value={this.state.lineData.VATCode}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>SST Percent (%)</Label>
                        <Input
                          disabled
                          value={this.state.lineData.VATPercentage.toString()}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Terms</Label>
                        <Input
                          disabled
                          value={this.state.lineData.PayTerms.toString()}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Tax Category</Label>
                        <Input
                          disabled
                          value={this.state.lineData.TaxCode}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Type</Label>
                        <Input
                          disabled
                          value={this.state.lineData.PRType}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Stock Code</Label>
                        <Input
                          disabled
                          value={this.state.lineData.StockCode}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>UOM</Label>
                        <Input
                          disabled
                          value={this.state.lineData.UMCode}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>ETA Date</Label>
                        <Input
                          disabled
                          value={this.state.lineData.ETADate}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Quantity</Label>
                        <Input
                          disabled
                          value={this.state.lineData.Quantity.toString()}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Unit Price</Label>
                        <Input
                          disabled
                          value={this.state.lineData.UnitPrice.toString()}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Discount (%)</Label>
                        <Input
                          disabled
                          value={this.state.lineData.Discount.toString()}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Discount Amount</Label>
                        <Input
                          disabled
                          value={this.state.lineData.DiscAmount.toString()}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Extended Price</Label>
                        <Input
                          disabled
                          value={this.state.lineData.TotalPrice.toString()}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Local Amount</Label>
                        <Input
                          disabled
                          value={this.state.lineData.LocalUnitPrice.toString()}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Approval Status</Label>
                        <Input
                          disabled
                          value={this.state.lineData.Status}
                          style={styles.content}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Description</Label>
                        <Textarea
                          disabled
                          value={this.state.lineData.StockDesc}
                          rowSpan={4}
                          style={[
                            styles.content,
                            {
                              alignSelf: "flex-start",
                              justifyContent: "flex-end"
                            }
                          ]}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Remark/Justification</Label>
                        <Textarea
                          disabled
                          value={this.state.lineData.Remark}
                          rowSpan={4}
                          style={[
                            styles.content,
                            {
                              alignSelf: "flex-start",
                              justifyContent: "flex-end"
                            }
                          ]}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Item stackedLabel>
                        <Label style={styles.label}>Memo/Margin</Label>
                        <Textarea
                          disabled
                          value={this.state.lineData.Memo}
                          rowSpan={4}
                          style={[
                            styles.content,
                            {
                              alignSelf: "flex-start",
                              justifyContent: "flex-end"
                            }
                          ]}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Label
                    style={[styles.label, { paddingLeft: 15, paddingTop: 10 }]}
                  >
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
                      key={this.state.attachments}
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
  label: {
    color: global.foregroundColor
  },
  content: {
    color: global.foregroundColor
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
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "300",
    marginBottom: 20
  }
});
