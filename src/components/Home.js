import React from 'react';
import $ from 'jquery';
import {Tabs, Button, Spin} from 'antd';
import {API_ROOT, GEO_OPTIONS, POST_KEY, TOKEN_KEY, AUTH_PREFIX} from "../constants"


const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;

export class Home extends React.Component {
    state = {
        error: '',
        posts: [],
        loadingPosts: false,
        loadingGeoLocation: false,
    }

    componentDidMount() {
        if ("geolocation" in navigator) {
            this.setState({loadingGeoLocation: true, error: ''})
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS,
            );
        } else {
            this.setState({error: 'Your browser does not support geolocation!'})
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        this.setState({loadingGeoLocation: false})
        console.log(position);
        const {latitude: lat, longitude: lon} = position.coords;
        localStorage.setItem(POST_KEY, JSON.stringify({lat: lat, lon: lon}));
        this.loadNearbyPosts();
    }
    onFailedLoadGeoLocation = (error) => {
        this.setState({error: 'Your browser does not support geolocation!'})

    }
    getGalleryPanelContent = () => {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        }
        if (this.state.loadingGeoLocation) {
            //show spin
            return <Spin tip="Loading geo Location ..."/>
        } else if (this.state.posts) {
            return <Spin tip="Loading posts ..."/>
        }
        return null;
    }
    loadNearbyPosts = () => {
        //const {lat, lon} = JSON.parse(localStorage.getItem(POST_KEY));
        const {lat, lon} = {"lat": 37.5629917, "lon": -122.32552539999998};
        this.setState({loadingPosts: true})
        console.log();
        return $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
            },
        }).then((response) => {
            this.setState({posts: response, loadingPosts: false})
            console.log(response);
        }, (error) => {
            this.setState({loadingPosts: false, error: error.responseText})
        }).then(() => {
            this.setState({loadingPosts: false});
        }).catch((error) => {
            console.log(error);
        });
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
