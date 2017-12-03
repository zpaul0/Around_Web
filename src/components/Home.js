import React from 'react';
import {Tabs, Button, Spin} from 'antd';
import {GEO_OPTIONS, POST_KEY} from "../constants"



const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;

export class Home extends React.Component {
    state = {
        loadingGeoLocation: false,
    }

    componentDidMount() {
        if ("geolocation" in navigator) {
            this.setState({loadingGeoLocation: true})
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS,
            );
        } else {
            console.log('geo location not suported')
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        this.setState({loadingGeoLocation: false})
        console.log(position);
        const {latitude: lat, longitude: lon} = position.coords;
        localStorage.setItem(POST_KEY, JSON.stringify({lat: lat, lon: lon}));
    }
    onFailedLoadGeoLocation = (position) => {
        this.setState({loadingGeoLocation: false})
    }
    getGalleryPanelContent = () => {
        if (this.state.loadingGeoLocation) {
            //show spin
            return <Spin tip = "Loading geo Location ..."/>
        }
        return null;
    }

    render() {
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Posts" key="1">
                    {this.getGalleryPanelContent()}
                </TabPane>
                <TabPane tab="Map" key="2">
                    Content Of Tab 2
                </TabPane>
            </Tabs>
        );
    }
}
