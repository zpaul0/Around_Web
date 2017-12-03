import React from 'react';
import { Tabs, Button} from 'antd';
import { GEO_OPTIONS, POST_KEY} from "../constants"


const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;

export class Home extends React.Component {
    componentDidMount() {
        if ("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS,
            );
        }else {
            console.log('geo location not suported')
        }
    }
    onSuccessLoadGeoLocation = (position) =>{
        console.log(position);
        const {latitude:lat, longitude:lon} = position.coords;
        localStorage.setItem(POST_KEY, JSON.stringify({lat: lat, lon: lon}));
    }
    onFailedLoadGeoLocation = (position) =>{

    }
    render() {
        return (
            <Tabs tabBarExtraContent={operations} className = "main-tabs">
                <TabPane tab="Posts" key="1">
                   content of tab1
                </TabPane>
                <TabPane tab="Map" key="2">
                    Content Of Tab 2
                </TabPane>
            </Tabs>
        );
    }
}
