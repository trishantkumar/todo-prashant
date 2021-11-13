import React from 'react';
import MetaTags from 'react-meta-tags';
import { BlockReserveLoading } from 'react-loadingg';

export default class Footer extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    constructor(props) {
        super(props);
        this.state = {
          pinCode: "",
          data: [],
          status: '',
          isApirunning: false,
          isSearchByPinCode: false,
          cityname: ''
        };
    }
    changePinText(event) {
        this.setState({
            cityname: ''
        });
        this.setState({
        pinCode: event.target.value
        });
    }
    fetchByPinCode() {
        this.setState({
            isApirunning: true
        })
        this.pincodeUrl = "https://reqres.in/api/users?page=2 "+this.state.pinCode
        fetch(this.pincodeUrl)
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    status: result[0].Status
                })
                this.setState({
                    isApirunning: false
                })
                this.setState({
                    data: result[0].PostOffice
                })
            },
            (error) => {
                console.log(error)
                this.setState({
                    isApirunning: false
                })
            }
          )
    }
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            if(this.state.cityname.length){
                this.fetchByCityName();
            } else {
                this.fetchByPinCode();
            }
        }
    }
    changeSearchMethod() {
        if(this.state.isSearchByPinCode === true){
            this.setState({
                isSearchByPinCode: false
            })
        } if(this.state.isSearchByPinCode === false) {
            this.setState({
                isSearchByPinCode: true
            })
        }
    }
    fetchByCityName() {
        this.setState({
            isApirunning: true
        })
        this.cityNameUrl = "https://api.postalpincode.in/postoffice/"+this.state.cityname
        fetch(this.cityNameUrl)
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    status: result[0].Status
                })
                this.setState({
                    isApirunning: false
                })
                this.setState({
                    data: result[0].PostOffice
                })
            },
            (error) => {
                console.log(error)
                this.setState({
                    isApirunning: false
                })
            }
          )
    }
    changeCityText(event) {
        this.setState({
            pincode: ''
        });
        this.setState({
        cityname: event.target.value
        });
    }
    render() {
        return(
            <>
                <MetaTags>
                    <title>TutsFinder - PinCode Checker</title>
                    <meta name="description" content = "Get pincode details of all regions of india by pincode only. By pincode you can get post office details, full address, district and state." />
                    <meta name="keywords" content="pincode, pin code, pincode search, pin, tutsfinder, post office, pincode checker, pincode check, tutsfinder pincode, postal pincode, pin code of india, pin code number, pin code up, delhi, delhi pincode, enter pin code number, pincode of my location right now, 6 digit pin code of india, pincode near me, pin code of my location right now, pincode *, pincode of my location, pincode of my current location, pincode of delhi, pincode of pune, mumbai pin code, pincode of surat, pincode of bangalore, pincode of hyderabad, kolkata pin code, vijayawada pincode, coimbatore pincode, tirupati pincode, surat pincode, bangalore pin code, guntur pincode, madurai pincode, trichy pincode" />
                    <meta name="theme-color" content="#08D4F2" />
                    <meta name="msapplication-navbutton-color" content="#08D4F2" />

                    <meta property="og:title" content="TutsFinder - PinCode Checker" />
                    <meta property="og:description" content="Get pincode details of all regions of india by pincode only. By pincode you can get post office details, full address, district and state." />
                    <meta property="og:site_name" content="www.tutsfinder.com" />
                    <meta property="og:url" content="https://www.tutsfinder.com/pincode" />
                </MetaTags>
                {this.state.isApirunning === true &&
                    <BlockReserveLoading size='large'/>
                }
                <div className={"row main-pincode-container " + (this.state.isApirunning === true ? 'disable-class' : '')}>
                    {this.state.isSearchByPinCode === true &&
                    <div className="col-md-8 sub-main-container">
                        <div style={{padding: `10px 0`}}>
                            <span style={{fontSize: `25px`}}>Enter Pin Code</span>
                        </div>
                        <div style={{padding: `10px 0`}}>
                            <input type="text" name="pin" onChange={this.changePinText.bind(this)} style={{height: `30px`, width: '10rem'}} onKeyPress={this.handleKeyPress}/>
                        </div>
                        <button className="pin-search-button" onClick={() => this.fetchByPinCode(this.state.pinCode)}>Search</button>
                        <br/><br/>
                        <span>Search post office by Pin Code</span>
                        <br/><br/>
                        <span>Or</span>
                        <br/><br/>
                        <span>Search post office by city name</span>
                        <br/><br/>
                        <button className="pin-search-button" onClick={() => this.changeSearchMethod()}>Click here!</button>
                                {this.state.data !== null && this.state.status === 'Success' && this.state.data.map((item, index) => {
                                    return (
                                        <>
                                            {item.BranchType === "Sub Post Office" &&
                                            <div className="main-pincode">
                                                <span className="main-pincode-heading">{item.Pincode} PinCode of {item.Name}, {item.District}, {item.State}.</span>
                                                <br/>
                                                <span className="main-pincode-details">Get pincode details of all regions of india by pincode only. By pincode you can get post office
                                                    details, full address, district and state.
                                                </span>
                                                <br/>
                                                <span className="main-pincode-details">Pincode is of 6 digits in which First digit reflects region, second the sub-region, third the sorting district, and last three represent the post office code.</span>
                                            </div>
                                            }
                                        </>
                                    );
                                })}
                                {   (this.state.data == null && this.state.status !== 'Success') &&
                                    <>
                                        <br/><br/>
                                        <span className="no-records-found">No Records Found!</span>
                                    </>
                                }
                            <div>
                                {this.state.data !== null && this.state.status === 'Success' &&this.state.data.map((item, index) => {
                                    return (
                                        <>
                                            <hr/>
                                            <div style={{marginTop: `2.5rem`}} key={index}>
                                                <span style={{fontSize: `1.5rem`, lineHeight: `30px`}}>PinCode: {item.Pincode}, {item.BranchType}, {item.Name}, {item.District}, {item.State}</span>
                                                <table className="pincode-table">
                                                    <tbody className="pincode-table-body">
                                                        <tr>
                                                            <th>Post Office</th>
                                                            <th>{item.Name}</th>
                                                        </tr>
                                                        <tr>
                                                            <td>PinCode</td>
                                                            <td>{item.Pincode}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Delivery Status</td>
                                                            <td>{item.DeliveryStatus}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Branch Type</td>
                                                            <td>{item.BranchType}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Block</td>
                                                            <td>{item.Block}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>District</td>
                                                            <td>{item.District}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Division</td>
                                                            <td>{item.Division}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Circle</td>
                                                            <td>{item.Circle}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Country</td>
                                                            <td>{item.Country}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Region</td>
                                                            <td>{item.Region}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>State</td>
                                                            <td>{item.State}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                    </div>
                    }
                    {this.state.isSearchByPinCode === false &&
                    <div className="col-md-8 sub-main-container">
                        <div style={{padding: `10px 0`}}>
                            <span style={{fontSize: `25px`}}>Enter City Name</span>
                        </div>
                        <div style={{padding: `10px 0`}}>
                            <input type="text" name="pin" onChange={this.changeCityText.bind(this)} style={{height: `30px`, width: '10rem'}} onKeyPress={this.handleKeyPress}/>
                        </div>
                        <button className="pin-search-button" onClick={() => this.fetchByCityName(this.state.pinCode)}>Search</button>
                        <br/><br/>
                        <span>Search post office by City Name</span>
                        <br/><br/>
                        <span>Or</span>
                        <br/><br/>
                        <span>Search post office by Pin Code</span>
                        <br/><br/>
                        <button className="pin-search-button" onClick={() => this.changeSearchMethod()}>Click here!</button>
                                {this.state.data !== null && this.state.status === 'Success' && this.state.data.map((item, index) => {
                                    return (
                                        <>
                                            {item.BranchType === "Sub Post Office" &&
                                            <div className="main-pincode">
                                                <span className="main-pincode-heading">{item.Pincode} PinCode of {item.Name}, {item.District}, {item.State}.</span>
                                                <br/>
                                                <span className="main-pincode-details">Get pincode details of all regions of india by pincode only. By pincode you can get post office
                                                    details, full address, district and state.
                                                </span>
                                                <br/>
                                                <span className="main-pincode-details">Pincode is of 6 digits in which First digit reflects region, second the sub-region, third the sorting district, and last three represent the post office code.</span>
                                            </div>
                                            }
                                        </>
                                    );
                                })}
                                {   (this.state.data == null && this.state.status !== 'Success') &&
                                    <>
                                        <br/><br/>
                                        <span className="no-records-found">No Records Found!</span>
                                    </>
                                }
                            <div>
                                {this.state.data !== null && this.state.status === 'Success' &&this.state.data.map((item, index1) => {
                                    return (
                                        <>
                                            <hr/>
                                            <div style={{marginTop: `2.5rem`}} key={index1}>
                                                <span style={{fontSize: `1.5rem`, lineHeight: `30px`}}>PinCode: {item.Pincode}, {item.BranchType}, {item.Name}, {item.District}, {item.State}</span>
                                                <table className="pincode-table">
                                                    <tbody className="pincode-table-body">
                                                        <tr>
                                                            <th>Post Office</th>
                                                            <th>{item.Name}</th>
                                                        </tr>
                                                        <tr>
                                                            <td>PinCode</td>
                                                            <td>{item.Pincode}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Delivery Status</td>
                                                            <td>{item.DeliveryStatus}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Branch Type</td>
                                                            <td>{item.BranchType}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Block</td>
                                                            <td>{item.Block}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>District</td>
                                                            <td>{item.District}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Division</td>
                                                            <td>{item.Division}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Circle</td>
                                                            <td>{item.Circle}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Country</td>
                                                            <td>{item.Country}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Region</td>
                                                            <td>{item.Region}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>State</td>
                                                            <td>{item.State}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                           
                                        </>
                                    );
                                })}
                            </div>
                    </div>
                    }
                </div>
            </>
        )
    }
}