
import React, { Component } from 'react';
import $ from 'jquery';
import { Tabs, Spin } from 'antd';
import { Gallery } from './Gallery';
import { CreatePostButton } from './CreatePostButton';
import { API_ROOT, TOKEN_KEY, AUTH_PREFIX, GEO_OPTIONS, POST_KEY } from '../constants';
import { WrappedAroundMap } from './AroundMap';



export class Home extends Component {
    state = {
        posts: [],
        loadingGeoLocation: false,
        loadingPosts: false,
        error: '',
    }

    onTabChange = (key) => {
        console.log(key);
    }

    getGeoLocation = () => {
        if (navigator && navigator.geolocation) {
            this.setState({ loadingGeoLocation: true, error: '' });
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS
            );
        } else {
            this.setState({ error: 'Your browser does not support geolocation!'});
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        this.setState({ loadingGeoLocation: false, error: '' });
        const { latitude: lat, longitude: lon } = position.coords
        localStorage.setItem(POST_KEY, JSON.stringify({ lat: lat, lon: lon }));
        this.loadNearbyPosts();
    }

    onFailedLoadGeoLocation = () => {
        this.setState({ loadingGeoLocation: false, error: 'Failed to load geo location!' });
    }

    componentDidMount() {
        this.getGeoLocation();
    }

    loadNearbyPosts = () => {
        const { lat, lon } = JSON.parse(localStorage.getItem(POST_KEY));
        this.setState({ loadingPosts: true });
        return $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
            },
        }).then((response) => {
            this.setState({ posts: response, error: '' });
            console.log(response);
        }, (error) => {
            this.setState({ error: error.responseText });
        }).then(() => {
            this.setState({ loadingPosts: false });
        }).catch((error) => {
            console.log(error);
        });
    }

    getGalleryPanelContent = () => {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        } else if (this.state.loadingGeoLocation) {
            return <Spin tip="Loading geo location ..."/>
        } else if (this.state.loadingPosts) {
            return <Spin tip="Loading posts ..."/>
        } else if (this.state.posts) {
            const images = this.state.posts.map((post) => {
                return {
                    user: post.user,
                    src: post.url,
                    thumbnail: post.url,
                    thumbnailWidth: 400,
                    thumbnailHeight: 300,
                    caption: post.message,
                };
            });

            return (
                <Gallery
                    images={images}
                />
            );
        }
        return null;
    }

    render() {
        const TabPane = Tabs.TabPane;
        const createPostButton = <CreatePostButton loadNearbyPosts={this.loadNearbyPosts}/>;
        return (
            <Tabs
                onChange={this.onTabChange}
                tabBarExtraContent={createPostButton}
                className="main-tabs"
            >
                <TabPane tab="Posts" key="1">
                    {this.getGalleryPanelContent()}
                </TabPane>
                <TabPane tab="Map" key="2">
                    <WrappedAroundMap
                        posts={this.state.posts}
                        loadNearbyPosts={this.loadNearbyPosts}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `600px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </TabPane>
            </Tabs>
        );
    }
}


